import React from 'react';
import { useBuilder } from '../../context/BuilderContext';
import { ElementRenderer } from './ElementRenderer';
import { Plus } from 'lucide-react';

export const Canvas: React.FC = () => {
  const {
    elements,
    activeBreakpoint,
    zoom,
    previewMode,
    selectElement,
    addElement,
  } = useBuilder();

  const getCanvasWidth = () => {
    switch (activeBreakpoint) {
      case 'desktop':
        return 'w-full max-w-[1280px]';
      case 'tablet':
        return 'w-[768px]';
      case 'mobile':
        return 'w-[375px]';
      default:
        return 'w-full max-w-[1280px]';
    }
  };

  const getViewportBadge = () => {
    switch (activeBreakpoint) {
      case 'desktop':
        return 'Desktop — 1280px';
      case 'tablet':
        return 'Tablet — 768px';
      case 'mobile':
        return 'Mobile Portrait — 375px';
    }
  };

  return (
    <main
      onClick={() => selectElement(null)}
      className="flex-1 h-full bg-[#070b0b] overflow-y-auto overflow-x-auto relative select-none p-4 md:p-8 custom-scrollbar"
      style={{
        backgroundImage: 'radial-gradient(#142424 1px, transparent 1px)',
        backgroundSize: '24px 24px',
      }}
    >
      <div className="min-w-fit min-h-full flex flex-col items-center pb-24">
        {/* Viewport Width & Zoom Indicator (Static above canvas, NOT floating over content) */}
        {!previewMode && (
          <div className="mb-4 text-xs font-mono text-gray-400 flex items-center gap-2 select-none">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            <span className="font-semibold text-gray-200">{getViewportBadge()}</span>
            <span className="text-gray-600">|</span>
            <span className="text-teal-400 font-semibold">{zoom}% Zoom</span>
          </div>
        )}

        {/* Main Viewport Artboard Container */}
        <div
          onClick={(e) => {
            e.stopPropagation();
          }}
          style={{
            transform: `scale(${zoom / 100})`,
            transformOrigin: 'top center',
            transition: 'width 0.25s ease-out, transform 0.15s ease-out',
            boxSizing: 'border-box',
          }}
          className={`${getCanvasWidth()} bg-white shadow-neu rounded-sm border border-emerald-950/40 min-h-[800px] flex flex-col relative transition-all duration-300 isolate overflow-x-hidden max-w-full`}
        >
          {elements.length === 0 ? (
            <div className="h-96 flex flex-col items-center justify-center text-center p-8 text-gray-500">
              <div className="w-12 h-12 rounded-2xl bg-emerald-950/30 border border-emerald-500/20 flex items-center justify-center text-emerald-400 mb-3 shadow-neu-sm">
                <Plus className="w-6 h-6" />
              </div>
              <h4 className="text-sm font-semibold text-gray-700">Empty Page Canvas</h4>
              <p className="text-xs text-gray-500 max-w-sm mt-1 mb-4">
                Click below to insert a new section or add elements from the left panel.
              </p>
              <button
                onClick={() => addElement('section')}
                className="px-4 py-2 bg-gradient-to-r from-emerald-500 to-teal-500 hover:brightness-110 text-white text-xs font-semibold rounded-xl shadow-neu-sm transition"
              >
                Add Section
              </button>
            </div>
          ) : (
            elements.map((el) => <ElementRenderer key={el.id} element={el} />)
          )}
        </div>
      </div>
    </main>
  );
};
