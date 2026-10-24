import React from 'react';
import {
  AlignLeft,
  AlignCenter,
  AlignRight,
  AlignJustify,
  Maximize2,
  Minimize2,
  Square,
  LayoutGrid,
  Columns,
  Eye,
  Type,
  Palette,
  Box,
} from 'lucide-react';
import { useBuilder } from '../../context/BuilderContext';
import { SpacingBoxModel } from './SpacingBoxModel';
import { DisplayType, FlexDirection, FlexAlign, FlexJustify, PositionType, TextAlign } from '../../types/builder';

export const StylePanel: React.FC = () => {
  const { selectedElement, activeBreakpoint, updateElementStyles } = useBuilder();

  if (!selectedElement) {
    return (
      <div className="h-full flex flex-col items-center justify-center p-6 text-center text-gray-500">
        <Box className="w-10 h-10 mb-2 text-gray-600" />
        <p className="text-xs font-semibold text-gray-400">No Element Selected</p>
        <p className="text-[11px] text-gray-600 mt-1 max-w-[200px]">
          Click any element on the canvas to inspect and customize its styles.
        </p>
      </div>
    );
  }

  const activeStyles = {
    ...selectedElement.styles.desktop,
    ...(activeBreakpoint === 'tablet' ? selectedElement.styles.tablet : {}),
    ...(activeBreakpoint === 'mobile' ? { ...selectedElement.styles.tablet, ...selectedElement.styles.mobile } : {}),
  };

  const handleUpdate = (field: string, value: any) => {
    updateElementStyles(selectedElement.id, { [field]: value });
  };

  return (
    <div className="h-full flex flex-col bg-[#0d1414] text-xs text-gray-300 select-none overflow-y-auto custom-scrollbar">
      {/* 1. Selector Bar */}
      <div className="p-3 bg-[#091010] border-b border-emerald-950/40">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-1.5">
            <span className="px-1.5 py-0.5 rounded bg-gradient-to-r from-emerald-500 to-teal-500 text-white font-mono text-[10px] uppercase font-bold shadow-neu-sm">
              {selectedElement.tag}
            </span>
            <span className="font-semibold text-white text-xs truncate max-w-[140px]">
              {selectedElement.name}
            </span>
          </div>
          <span className="text-[10px] font-mono text-teal-300 capitalize bg-teal-500/10 px-1.5 py-0.5 rounded border border-teal-500/20">
            {activeBreakpoint}
          </span>
        </div>

        {/* Webflow Style Selector Class Badge */}
        <div className="mt-2 flex items-center justify-between pt-2 border-t border-emerald-950/40">
          <span className="text-[10px] text-gray-400 uppercase font-semibold">Selector</span>
          <div className="flex items-center gap-1">
            <span className="px-2 py-0.5 rounded bg-emerald-500/10 text-emerald-400 font-mono text-[11px] border border-emerald-500/25">
              .{selectedElement.id}
            </span>
            <span className="px-1.5 py-0.5 rounded bg-[#142020] text-gray-300 text-[10px] border border-emerald-950/60">
              Normal
            </span>
          </div>
        </div>
      </div>

      <div className="p-3 space-y-4">
        {/* 2. Layout & Display */}
        <div className="space-y-2">
          <div className="text-[10px] font-bold uppercase tracking-wider text-gray-400 flex items-center gap-1">
            <Square className="w-3 h-3 text-emerald-400" />
            <span>Display</span>
          </div>

          <div className="grid grid-cols-4 gap-1 bg-[#121620] p-1 rounded-lg border border-[#273142]">
            {(['block', 'flex', 'grid', 'none'] as DisplayType[]).map((d) => (
              <button
                key={d}
                onClick={() => handleUpdate('display', d)}
                className={`py-1 rounded text-[11px] font-medium capitalize transition ${
                  activeStyles.display === d
                    ? 'bg-[#10b981] text-white shadow'
                    : 'text-gray-400 hover:text-white hover:bg-[#1f2736]'
                }`}
              >
                {d}
              </button>
            ))}
          </div>

          {/* Flexbox Controls */}
          {activeStyles.display === 'flex' && (
            <div className="mt-2 p-2.5 bg-[#141a24] rounded-lg border border-[#242e3f] space-y-2.5">
              {/* Flex Direction */}
              <div>
                <label className="text-[10px] text-gray-400 uppercase font-semibold">Direction</label>
                <div className="grid grid-cols-2 gap-1 mt-1">
                  {(['row', 'column'] as FlexDirection[]).map((dir) => (
                    <button
                      key={dir}
                      onClick={() => handleUpdate('flexDirection', dir)}
                      className={`py-1 rounded text-[11px] capitalize transition ${
                        activeStyles.flexDirection === dir
                          ? 'bg-emerald-600 text-white'
                          : 'bg-[#1e2634] text-gray-400 hover:text-white'
                      }`}
                    >
                      {dir}
                    </button>
                  ))}
                </div>
              </div>

              {/* Flex Align Items */}
              <div>
                <label className="text-[10px] text-gray-400 uppercase font-semibold">Align</label>
                <div className="grid grid-cols-4 gap-1 mt-1">
                  {(['flex-start', 'center', 'flex-end', 'stretch'] as FlexAlign[]).map((align) => (
                    <button
                      key={align}
                      onClick={() => handleUpdate('alignItems', align)}
                      className={`py-1 rounded text-[10px] transition ${
                        activeStyles.alignItems === align
                          ? 'bg-emerald-600 text-white'
                          : 'bg-[#1e2634] text-gray-400 hover:text-white'
                      }`}
                    >
                      {align.replace('flex-', '')}
                    </button>
                  ))}
                </div>
              </div>

              {/* Flex Justify Content */}
              <div>
                <label className="text-[10px] text-gray-400 uppercase font-semibold">Justify</label>
                <div className="grid grid-cols-4 gap-1 mt-1">
                  {(['flex-start', 'center', 'flex-end', 'space-between'] as FlexJustify[]).map((j) => (
                    <button
                      key={j}
                      onClick={() => handleUpdate('justifyContent', j)}
                      className={`py-1 rounded text-[10px] transition ${
                        activeStyles.justifyContent === j
                          ? 'bg-emerald-600 text-white'
                          : 'bg-[#1e2634] text-gray-400 hover:text-white'
                      }`}
                    >
                      {j.replace('flex-', '').replace('space-', '')}
                    </button>
                  ))}
                </div>
              </div>

              {/* Gap */}
              <div className="flex items-center justify-between">
                <label className="text-[10px] text-gray-400 uppercase font-semibold">Gap</label>
                <input
                  type="text"
                  value={activeStyles.gap || ''}
                  placeholder="e.g. 16px"
                  onChange={(e) => handleUpdate('gap', e.target.value)}
                  className="w-24 px-2 py-1 bg-[#10141d] border border-[#2b3546] rounded text-right text-xs text-white focus:outline-none focus:border-emerald-500"
                />
              </div>
            </div>
          )}

          {/* Grid Template Columns */}
          {activeStyles.display === 'grid' && (
            <div className="mt-2 p-2 bg-[#141a24] rounded-lg border border-[#242e3f] space-y-2">
              <label className="text-[10px] text-gray-400 uppercase font-semibold">Columns Template</label>
              <input
                type="text"
                value={activeStyles.gridTemplateColumns || 'repeat(3, 1fr)'}
                onChange={(e) => handleUpdate('gridTemplateColumns', e.target.value)}
                className="w-full px-2 py-1 bg-[#10141d] border border-[#2b3546] rounded text-xs text-white focus:outline-none focus:border-emerald-500 font-mono"
              />
              <div className="flex items-center justify-between">
                <label className="text-[10px] text-gray-400 uppercase font-semibold">Gap</label>
                <input
                  type="text"
                  value={activeStyles.gap || '24px'}
                  onChange={(e) => handleUpdate('gap', e.target.value)}
                  className="w-24 px-2 py-1 bg-[#10141d] border border-[#2b3546] rounded text-right text-xs text-white focus:outline-none"
                />
              </div>
            </div>
          )}
        </div>

        {/* 3. Spacing Box Model */}
        <SpacingBoxModel />

        {/* 4. Size Dimensions */}
        <div className="space-y-2">
          <div className="text-[10px] font-bold uppercase tracking-wider text-gray-400 flex items-center gap-1">
            <Maximize2 className="w-3 h-3 text-emerald-400" />
            <span>Size</span>
          </div>

          <div className="grid grid-cols-2 gap-2">
            <div>
              <label className="text-[9px] text-gray-500 uppercase">Width</label>
              <input
                type="text"
                value={activeStyles.width || ''}
                placeholder="auto / 100%"
                onChange={(e) => handleUpdate('width', e.target.value)}
                className="w-full px-2 py-1 bg-[#121620] border border-[#273142] rounded text-xs text-white focus:outline-none focus:border-emerald-500 font-mono"
              />
            </div>
            <div>
              <label className="text-[9px] text-gray-500 uppercase">Height</label>
              <input
                type="text"
                value={activeStyles.height || ''}
                placeholder="auto"
                onChange={(e) => handleUpdate('height', e.target.value)}
                className="w-full px-2 py-1 bg-[#121620] border border-[#273142] rounded text-xs text-white focus:outline-none focus:border-emerald-500 font-mono"
              />
            </div>
            <div>
              <label className="text-[9px] text-gray-500 uppercase">Max Width</label>
              <input
                type="text"
                value={activeStyles.maxWidth || ''}
                placeholder="none / 1200px"
                onChange={(e) => handleUpdate('maxWidth', e.target.value)}
                className="w-full px-2 py-1 bg-[#121620] border border-[#273142] rounded text-xs text-white focus:outline-none focus:border-emerald-500 font-mono"
              />
            </div>
            <div>
              <label className="text-[9px] text-gray-500 uppercase">Overflow</label>
              <select
                value={activeStyles.overflow || 'visible'}
                onChange={(e) => handleUpdate('overflow', e.target.value)}
                className="w-full px-2 py-1 bg-[#121620] border border-[#273142] rounded text-xs text-white focus:outline-none cursor-pointer"
              >
                <option value="visible">Visible</option>
                <option value="hidden">Hidden</option>
                <option value="scroll">Scroll</option>
                <option value="auto">Auto</option>
              </select>
            </div>
          </div>
        </div>

        {/* 5. Typography */}
        <div className="space-y-2">
          <div className="text-[10px] font-bold uppercase tracking-wider text-gray-400 flex items-center gap-1">
            <Type className="w-3 h-3 text-emerald-400" />
            <span>Typography</span>
          </div>

          <div className="space-y-2">
            <div>
              <label className="text-[9px] text-gray-500 uppercase">Font Family</label>
              <select
                value={activeStyles.fontFamily || 'Inter'}
                onChange={(e) => handleUpdate('fontFamily', e.target.value)}
                className="w-full px-2 py-1.5 bg-[#121620] border border-[#273142] rounded text-xs text-white focus:outline-none cursor-pointer"
              >
                <option value="Inter">Inter (Clean Modern Sans)</option>
                <option value="Plus Jakarta Sans">Plus Jakarta Sans (Tech / SaaS)</option>
                <option value="Outfit">Outfit (Geometric Sans)</option>
                <option value="Playfair Display">Playfair Display (Editorial Serif)</option>
                <option value="Space Grotesk">Space Grotesk (Neo-Brutalist)</option>
                <option value="Poppins">Poppins (Friendly Sans)</option>
                <option value="Syne">Syne (Creative Studio)</option>
                <option value="DM Sans">DM Sans (Humanist)</option>
                <option value="Cinzel">Cinzel (Luxury Serif)</option>
                <option value="JetBrains Mono">JetBrains Mono (Monospace)</option>
                <option value="Roboto">Roboto (Classic Sans)</option>
                <option value="system-ui">System Default</option>
              </select>
            </div>

            <div className="grid grid-cols-2 gap-2">
              <div>
                <label className="text-[9px] text-gray-500 uppercase">Size</label>
                <input
                  type="text"
                  value={activeStyles.fontSize || '16px'}
                  onChange={(e) => handleUpdate('fontSize', e.target.value)}
                  className="w-full px-2 py-1 bg-[#121620] border border-[#273142] rounded text-xs text-white focus:outline-none font-mono"
                />
              </div>
              <div>
                <label className="text-[9px] text-gray-500 uppercase">Weight</label>
                <select
                  value={activeStyles.fontWeight || '400'}
                  onChange={(e) => handleUpdate('fontWeight', e.target.value)}
                  className="w-full px-2 py-1 bg-[#121620] border border-[#273142] rounded text-xs text-white focus:outline-none cursor-pointer"
                >
                  <option value="300">Light (300)</option>
                  <option value="400">Regular (400)</option>
                  <option value="500">Medium (500)</option>
                  <option value="600">Semibold (600)</option>
                  <option value="700">Bold (700)</option>
                  <option value="800">Extrabold (800)</option>
                </select>
              </div>
            </div>

            <div className="flex items-center justify-between">
              <label className="text-[9px] text-gray-500 uppercase">Text Color</label>
              <div className="flex items-center gap-2">
                <input
                  type="color"
                  value={activeStyles.color?.startsWith('#') ? activeStyles.color : '#ffffff'}
                  onChange={(e) => handleUpdate('color', e.target.value)}
                  className="w-6 h-6 rounded cursor-pointer bg-transparent border-0"
                />
                <input
                  type="text"
                  value={activeStyles.color || ''}
                  onChange={(e) => handleUpdate('color', e.target.value)}
                  className="w-20 px-1.5 py-0.5 bg-[#121620] border border-[#273142] rounded text-xs text-white font-mono"
                />
              </div>
            </div>

            {/* Alignment buttons */}
            <div>
              <label className="text-[9px] text-gray-500 uppercase">Align</label>
              <div className="grid grid-cols-4 gap-1 mt-1 bg-[#121620] p-1 rounded border border-[#273142]">
                {[
                  { id: 'left', icon: AlignLeft },
                  { id: 'center', icon: AlignCenter },
                  { id: 'right', icon: AlignRight },
                  { id: 'justify', icon: AlignJustify },
                ].map((a) => {
                  const Icon = a.icon;
                  return (
                    <button
                      key={a.id}
                      onClick={() => handleUpdate('textAlign', a.id as TextAlign)}
                      className={`flex justify-center py-1 rounded transition ${
                        activeStyles.textAlign === a.id
                          ? 'bg-[#10b981] text-white'
                          : 'text-gray-400 hover:text-white'
                      }`}
                    >
                      <Icon className="w-3.5 h-3.5" />
                    </button>
                  );
                })}
              </div>
            </div>
          </div>
        </div>

        {/* 6. Backgrounds */}
        <div className="space-y-2">
          <div className="text-[10px] font-bold uppercase tracking-wider text-gray-400 flex items-center gap-1">
            <Palette className="w-3 h-3 text-emerald-400" />
            <span>Background</span>
          </div>

          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <label className="text-[9px] text-gray-500 uppercase">Color</label>
              <div className="flex items-center gap-2">
                <input
                  type="color"
                  value={
                    activeStyles.backgroundColor?.startsWith('#')
                      ? activeStyles.backgroundColor
                      : '#ffffff'
                  }
                  onChange={(e) => handleUpdate('backgroundColor', e.target.value)}
                  className="w-6 h-6 rounded cursor-pointer bg-transparent border-0"
                />
                <input
                  type="text"
                  value={activeStyles.backgroundColor || ''}
                  placeholder="transparent"
                  onChange={(e) => handleUpdate('backgroundColor', e.target.value)}
                  className="w-24 px-1.5 py-0.5 bg-[#121620] border border-[#273142] rounded text-xs text-white font-mono"
                />
              </div>
            </div>
          </div>
        </div>

        {/* 7. Borders & Corners */}
        <div className="space-y-2">
          <div className="text-[10px] font-bold uppercase tracking-wider text-gray-400 flex items-center gap-1">
            <Box className="w-3 h-3 text-emerald-400" />
            <span>Borders &amp; Radius</span>
          </div>

          <div className="space-y-2">
            <div className="grid grid-cols-2 gap-2">
              <div>
                <label className="text-[9px] text-gray-500 uppercase">Radius</label>
                <input
                  type="text"
                  value={activeStyles.border?.radius || '0px'}
                  onChange={(e) =>
                    handleUpdate('border', {
                      ...(activeStyles.border || { width: '1px', style: 'solid', color: '#e2e8f0', radius: '0px' }),
                      radius: e.target.value,
                    })
                  }
                  className="w-full px-2 py-1 bg-[#121620] border border-[#273142] rounded text-xs text-white font-mono"
                />
              </div>
              <div>
                <label className="text-[9px] text-gray-500 uppercase">Width</label>
                <input
                  type="text"
                  value={activeStyles.border?.width || '0px'}
                  onChange={(e) =>
                    handleUpdate('border', {
                      ...(activeStyles.border || { width: '1px', style: 'solid', color: '#e2e8f0', radius: '0px' }),
                      width: e.target.value,
                    })
                  }
                  className="w-full px-2 py-1 bg-[#121620] border border-[#273142] rounded text-xs text-white font-mono"
                />
              </div>
            </div>

            <div className="flex items-center justify-between">
              <label className="text-[9px] text-gray-500 uppercase">Border Color</label>
              <div className="flex items-center gap-2">
                <input
                  type="color"
                  value={
                    activeStyles.border?.color?.startsWith('#')
                      ? activeStyles.border.color
                      : '#cbd5e1'
                  }
                  onChange={(e) =>
                    handleUpdate('border', {
                      ...(activeStyles.border || { width: '1px', style: 'solid', color: '#cbd5e1', radius: '0px' }),
                      color: e.target.value,
                    })
                  }
                  className="w-6 h-6 rounded cursor-pointer bg-transparent border-0"
                />
                <input
                  type="text"
                  value={activeStyles.border?.color || ''}
                  placeholder="#cbd5e1"
                  onChange={(e) =>
                    handleUpdate('border', {
                      ...(activeStyles.border || { width: '1px', style: 'solid', color: '#cbd5e1', radius: '0px' }),
                      color: e.target.value,
                    })
                  }
                  className="w-24 px-1.5 py-0.5 bg-[#121620] border border-[#273142] rounded text-xs text-white font-mono"
                />
              </div>
            </div>
          </div>
        </div>

        {/* 8. Effects (Shadow & Opacity) */}
        <div className="space-y-2">
          <div className="text-[10px] font-bold uppercase tracking-wider text-gray-400">Effects</div>

          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <label className="text-[9px] text-gray-500 uppercase">Opacity</label>
              <input
                type="range"
                min="0"
                max="1"
                step="0.05"
                value={activeStyles.opacity || 1}
                onChange={(e) => handleUpdate('opacity', e.target.value)}
                className="w-32 accent-emerald-500 cursor-pointer"
              />
            </div>

            <div>
              <label className="text-[9px] text-gray-500 uppercase">Shadow &amp; 3D Lighting</label>
              <div className="grid grid-cols-4 gap-1 mt-1">
                {[
                  { label: 'None', val: 'none' },
                  { label: 'Card', val: '0 4px 6px -1px rgba(0, 0, 0, 0.1)' },
                  { label: 'Deep', val: '0 20px 25px -5px rgba(0, 0, 0, 0.4)' },
                  { label: 'Neon', val: '0 0 25px rgba(16, 185, 129, 0.65)' },
                ].map((s) => (
                  <button
                    key={s.label}
                    onClick={() => handleUpdate('boxShadow', s.val)}
                    className={`py-1 rounded text-[10px] transition ${
                      activeStyles.boxShadow === s.val
                        ? 'bg-emerald-600 text-white'
                        : 'bg-[#121620] text-gray-400 hover:text-white'
                    }`}
                  >
                    {s.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Glassmorphism / Frosted Glass Preset */}
            <div className="pt-2 border-t border-[#1e2634]">
              <label className="text-[9px] text-gray-500 uppercase">Glassmorphism / Frosted Backdrop</label>
              <div className="grid grid-cols-3 gap-1 mt-1">
                {[
                  {
                    label: 'Glass Dark',
                    apply: () => {
                      handleUpdate('backgroundColor', 'rgba(15, 23, 42, 0.65)');
                      handleUpdate('backdropFilter', 'blur(16px)');
                      handleUpdate('border', { width: '1px', style: 'solid', color: 'rgba(255, 255, 255, 0.12)', radius: '16px' });
                    },
                  },
                  {
                    label: 'Glass Light',
                    apply: () => {
                      handleUpdate('backgroundColor', 'rgba(255, 255, 255, 0.7)');
                      handleUpdate('backdropFilter', 'blur(16px)');
                      handleUpdate('border', { width: '1px', style: 'solid', color: 'rgba(255, 255, 255, 0.4)', radius: '16px' });
                    },
                  },
                  {
                    label: 'Clear Glass',
                    apply: () => {
                      handleUpdate('backdropFilter', 'none');
                    },
                  },
                ].map((g) => (
                  <button
                    key={g.label}
                    onClick={g.apply}
                    className="py-1 px-1 rounded bg-[#121620] hover:bg-emerald-600/30 text-gray-300 hover:text-white text-[10px] border border-[#273142] transition"
                  >
                    {g.label}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
