import React, { useState } from 'react';
import { WebsiteTemplate } from '../../templates/types';
import { ElementRenderer } from '../Canvas/ElementRenderer';
import {
  Monitor,
  Tablet,
  Smartphone,
  X,
  ArrowRight,
  ExternalLink,
  Sparkles,
  Layers,
  CheckCircle2,
} from 'lucide-react';
import { Breakpoint } from '../../types/builder';
import { BreakpointOverrideContext, PreviewOverrideContext } from '../../context/BuilderContext';

interface TemplatePreviewModalProps {
  template: WebsiteTemplate | null;
  isOpen: boolean;
  onClose: () => void;
  onApplyTemplate: (template: WebsiteTemplate) => void;
}

export const TemplatePreviewModal: React.FC<TemplatePreviewModalProps> = ({
  template,
  isOpen,
  onClose,
  onApplyTemplate,
}) => {
  const [device, setDevice] = useState<Breakpoint>('desktop');

  if (!isOpen || !template) return null;

  const getViewportWidth = () => {
    switch (device) {
      case 'desktop':
        return 'w-full max-w-[1280px]';
      case 'tablet':
        return 'w-[768px] shadow-2xl rounded-2xl border-4 border-[#1e293b]';
      case 'mobile':
        return 'w-[375px] shadow-2xl rounded-3xl border-8 border-[#1e293b]';
    }
  };

  return (
    <div className="fixed inset-0 z-[100000] flex flex-col bg-[#070b0b] text-[#e2e8f0] animate-in fade-in duration-200">
      {/* Top Floating Control Bar (Dark Neumorphic Preview Bar) */}
      <header className="h-14 bg-[#0b1313] border-b border-emerald-950/50 px-4 md:px-8 flex items-center justify-between z-30 shadow-neu">
        {/* Left: Template Details */}
        <div className="flex items-center gap-3">
          <button
            onClick={onClose}
            className="p-1.5 rounded-xl hover:bg-emerald-950/40 text-gray-400 hover:text-white transition"
            title="Back to Catalog"
          >
            <X className="w-5 h-5" />
          </button>
          <div className="h-4 w-px bg-emerald-900/40 hidden sm:block" />
          <div>
            <div className="flex items-center gap-2">
              <span className="font-bold text-sm text-white">{template.name}</span>
              <span className="px-2 py-0.5 rounded text-[10px] font-extrabold tracking-wider bg-emerald-500/15 text-emerald-400 border border-emerald-500/30">
                {template.badge}
              </span>
            </div>
            <p className="text-[11px] text-gray-400 hidden md:block">
              {template.category} • {template.elements.length} Fully Responsive Interactive Sections
            </p>
          </div>
        </div>

        {/* Center: Device Switcher (Desktop / Tablet / Mobile) */}
        <div className="flex items-center gap-1 bg-[#070e0e] p-1 rounded-xl border border-emerald-950/60 shadow-neu-inset">
          <button
            onClick={() => setDevice('desktop')}
            className={`flex items-center gap-1.5 px-3 py-1 rounded-lg text-xs font-semibold transition ${
              device === 'desktop'
                ? 'bg-gradient-to-r from-emerald-500 to-teal-500 text-white shadow-md'
                : 'text-gray-400 hover:text-white'
            }`}
            title="Desktop View (1280px)"
          >
            <Monitor className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Desktop</span>
          </button>

          <button
            onClick={() => setDevice('tablet')}
            className={`flex items-center gap-1.5 px-3 py-1 rounded-lg text-xs font-semibold transition ${
              device === 'tablet'
                ? 'bg-gradient-to-r from-emerald-500 to-teal-500 text-white shadow-md'
                : 'text-gray-400 hover:text-white'
            }`}
            title="Tablet View (768px)"
          >
            <Tablet className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Tablet</span>
          </button>

          <button
            onClick={() => setDevice('mobile')}
            className={`flex items-center gap-1.5 px-3 py-1 rounded-lg text-xs font-semibold transition ${
              device === 'mobile'
                ? 'bg-gradient-to-r from-emerald-500 to-teal-500 text-white shadow-md'
                : 'text-gray-400 hover:text-white'
            }`}
            title="Mobile View (375px)"
          >
            <Smartphone className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Mobile</span>
          </button>
        </div>

        {/* Right: Apply & Start Editing Action */}
        <div className="flex items-center gap-2">
          <button
            onClick={onClose}
            className="px-3 py-1.5 rounded-xl text-xs font-medium text-gray-400 hover:text-white hover:bg-emerald-950/40 transition"
          >
            Close Preview
          </button>
          <button
            onClick={() => onApplyTemplate(template)}
            className="flex items-center gap-2 px-4 py-1.5 rounded-xl font-bold text-xs bg-gradient-to-r from-emerald-500 to-teal-500 hover:brightness-110 text-white shadow-neu transition"
          >
            <span>Use Template & Edit</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>
      </header>

      {/* Main Preview Frame */}
      <main className="flex-1 overflow-y-auto overflow-x-auto bg-[#070b0b] p-4 md:p-8 flex justify-center custom-scrollbar">
        <div
          className={`${getViewportWidth()} transition-all duration-300 bg-white min-h-[900px] overflow-hidden shadow-2xl relative self-start`}
          style={{
            backgroundColor: template.darkTheme ? '#0b0f17' : '#ffffff',
          }}
        >
          {/* Simulated Mobile Top Bar if in mobile view */}
          {device === 'mobile' && (
            <div className="h-6 bg-black flex items-center justify-between px-6 text-[10px] text-gray-400 select-none">
              <span>9:41</span>
              <div className="flex items-center gap-1">
                <span>5G</span>
                <span>100%</span>
              </div>
            </div>
          )}

          {/* Render Elements in Pure Preview Mode with Dynamic Breakpoint Override */}
          <PreviewOverrideContext.Provider value={true}>
            <BreakpointOverrideContext.Provider value={device}>
              <div className="w-full pointer-events-auto">
                {template.elements.map((el) => (
                  <ElementRenderer key={el.id} element={el} />
                ))}
              </div>
            </BreakpointOverrideContext.Provider>
          </PreviewOverrideContext.Provider>
        </div>
      </main>
    </div>
  );
};
