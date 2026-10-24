import React from 'react';
import { useBuilder } from '../../context/BuilderContext';
import { SpacingValues } from '../../types/builder';

export const SpacingBoxModel: React.FC = () => {
  const { selectedElement, activeBreakpoint, updateElementStyles } = useBuilder();

  if (!selectedElement) return null;

  const activeStyles = {
    ...selectedElement.styles.desktop,
    ...(activeBreakpoint === 'tablet' ? selectedElement.styles.tablet : {}),
    ...(activeBreakpoint === 'mobile' ? { ...selectedElement.styles.tablet, ...selectedElement.styles.mobile } : {}),
  };

  const margin: SpacingValues = activeStyles.margin || { top: '0px', right: '0px', bottom: '0px', left: '0px' };
  const padding: SpacingValues = activeStyles.padding || { top: '0px', right: '0px', bottom: '0px', left: '0px' };

  const handleMarginChange = (side: keyof SpacingValues, val: string) => {
    const formatted = val.trim() === 'auto' ? 'auto' : val.endsWith('px') || val.endsWith('%') || val.endsWith('rem') ? val : `${val}px`;
    updateElementStyles(selectedElement.id, {
      margin: { ...margin, [side]: formatted },
    });
  };

  const handlePaddingChange = (side: keyof SpacingValues, val: string) => {
    const formatted = val.endsWith('px') || val.endsWith('%') || val.endsWith('rem') ? val : `${val}px`;
    updateElementStyles(selectedElement.id, {
      padding: { ...padding, [side]: formatted },
    });
  };

  const cleanNum = (str: string) => str.replace('px', '');

  return (
    <div className="p-3 bg-[#121620] rounded-lg border border-[#273142] shadow-neu-sm">
      <div className="text-[10px] font-bold uppercase tracking-wider text-gray-400 mb-2 flex items-center justify-between">
        <span>Spacing</span>
        <span className="text-[9px] text-gray-500 font-normal">Margin &amp; Padding</span>
      </div>

      {/* Outer Margin Box (Orange/Dark Amber Tint) */}
      <div className="relative bg-[#261a10] border border-[#ff8c00]/40 rounded-lg p-6 flex flex-col items-center justify-center">
        <span className="absolute top-1 left-2 text-[9px] font-bold text-amber-400 uppercase tracking-wider">
          Margin
        </span>

        {/* Margin Top */}
        <input
          type="text"
          value={cleanNum(margin.top)}
          onChange={(e) => handleMarginChange('top', e.target.value)}
          aria-label="Margin Top"
          className="w-10 text-center bg-black/40 text-amber-200 text-[11px] font-mono rounded border border-[#ff8c00]/30 hover:border-amber-400 focus:outline-none mb-1 py-0.5"
        />

        {/* Middle row: Margin Left, Inner Padding Box, Margin Right */}
        <div className="w-full flex items-center justify-between gap-1">
          {/* Margin Left */}
          <input
            type="text"
            value={cleanNum(margin.left)}
            onChange={(e) => handleMarginChange('left', e.target.value)}
            aria-label="Margin Left"
            className="w-10 text-center bg-black/40 text-amber-200 text-[11px] font-mono rounded border border-[#ff8c00]/30 hover:border-amber-400 focus:outline-none py-0.5"
          />

          {/* Inner Padding Box (Green/Cyan Tint) */}
          <div className="relative bg-[#1c2c26] border border-[#10b981]/40 rounded-md p-4 flex flex-col items-center justify-center flex-1 mx-1">
            <span className="absolute top-0.5 left-1.5 text-[8px] font-bold text-[#10b981] uppercase tracking-wider">
              Padding
            </span>

            {/* Padding Top */}
            <input
              type="text"
              value={cleanNum(padding.top)}
              onChange={(e) => handlePaddingChange('top', e.target.value)}
              aria-label="Padding Top"
              className="w-9 text-center bg-black/50 text-emerald-200 text-[10px] font-mono rounded border border-[#10b981]/30 hover:border-emerald-400 focus:outline-none mb-1 py-0.5"
            />

            <div className="w-full flex items-center justify-between gap-1">
              {/* Padding Left */}
              <input
                type="text"
                value={cleanNum(padding.left)}
                onChange={(e) => handlePaddingChange('left', e.target.value)}
                aria-label="Padding Left"
                className="w-9 text-center bg-black/50 text-emerald-200 text-[10px] font-mono rounded border border-[#10b981]/30 hover:border-emerald-400 focus:outline-none py-0.5"
              />

              {/* Center Element Icon/Badge */}
              <div className="px-2 py-0.5 bg-black/60 rounded text-[9px] font-mono text-gray-300">
                {selectedElement.tag}
              </div>

              {/* Padding Right */}
              <input
                type="text"
                value={cleanNum(padding.right)}
                onChange={(e) => handlePaddingChange('right', e.target.value)}
                aria-label="Padding Right"
                className="w-9 text-center bg-black/50 text-emerald-200 text-[10px] font-mono rounded border border-[#10b981]/30 hover:border-emerald-400 focus:outline-none py-0.5"
              />
            </div>

            {/* Padding Bottom */}
            <input
              type="text"
              value={cleanNum(padding.bottom)}
              onChange={(e) => handlePaddingChange('bottom', e.target.value)}
              aria-label="Padding Bottom"
              className="w-9 text-center bg-black/50 text-emerald-200 text-[10px] font-mono rounded border border-[#10b981]/30 hover:border-emerald-400 focus:outline-none mt-1 py-0.5"
            />
          </div>

          {/* Margin Right */}
          <input
            type="text"
            value={cleanNum(margin.right)}
            onChange={(e) => handleMarginChange('right', e.target.value)}
            aria-label="Margin Right"
            className="w-10 text-center bg-black/40 text-amber-200 text-[11px] font-mono rounded border border-[#ff8c00]/30 hover:border-amber-400 focus:outline-none py-0.5"
          />
        </div>

        {/* Margin Bottom */}
        <input
          type="text"
          value={cleanNum(margin.bottom)}
          onChange={(e) => handleMarginChange('bottom', e.target.value)}
          aria-label="Margin Bottom"
          className="w-10 text-center bg-black/40 text-amber-200 text-[11px] font-mono rounded border border-[#ff8c00]/30 hover:border-amber-400 focus:outline-none mt-1 py-0.5"
        />
      </div>
    </div>
  );
};
