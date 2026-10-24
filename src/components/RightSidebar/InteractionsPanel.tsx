import React from 'react';
import {
  Sparkles,
  Play,
  Zap,
  MousePointer,
  Rotate3d,
  Layers,
  Activity,
  Move,
  Flame,
} from 'lucide-react';
import { useBuilder } from '../../context/BuilderContext';

export const InteractionsPanel: React.FC = () => {
  const { selectedElement, updateElementStyles } = useBuilder();

  if (!selectedElement) {
    return (
      <div className="h-full flex flex-col items-center justify-center p-6 text-center text-gray-500">
        <Sparkles className="w-10 h-10 mb-2 text-gray-600" />
        <p className="text-xs font-semibold text-gray-400">No Element Selected</p>
        <p className="text-[11px] text-gray-600 mt-1 max-w-[200px]">
          Select an element to configure triggers, hover interactions, 3D transforms, and entrance effects.
        </p>
      </div>
    );
  }

  const currentStyles = selectedElement.styles.desktop || {};

  const applyHoverEffect = (type: string) => {
    switch (type) {
      case 'lift':
        updateElementStyles(selectedElement.id, {
          boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.25)',
          transform: 'translateY(-6px)',
          transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
          cursor: 'pointer',
        });
        break;
      case 'glow':
        updateElementStyles(selectedElement.id, {
          boxShadow: '0 0 25px rgba(16, 185, 129, 0.65)',
          transition: 'all 0.3s ease',
          cursor: 'pointer',
        });
        break;
      case 'scale':
        updateElementStyles(selectedElement.id, {
          transform: 'scale(1.05)',
          boxShadow: '0 15px 30px rgba(0, 0, 0, 0.15)',
          transition: 'all 0.3s ease',
          cursor: 'pointer',
        });
        break;
      case 'tilt-3d':
        updateElementStyles(selectedElement.id, {
          transform: 'perspective(1000px) rotateX(8deg) rotateY(-8deg) scale3d(1.02, 1.02, 1.02)',
          boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.35)',
          transition: 'all 0.4s ease',
          cursor: 'pointer',
        });
        break;
      case 'none':
        updateElementStyles(selectedElement.id, {
          boxShadow: 'none',
          transform: 'none',
          transition: 'none',
        });
        break;
    }
  };

  const applyContinuousAnimation = (animClass: string) => {
    switch (animClass) {
      case 'float':
        updateElementStyles(selectedElement.id, {
          animation: 'floatSlow 5s ease-in-out infinite',
        });
        break;
      case 'pulse':
        updateElementStyles(selectedElement.id, {
          animation: 'pulseGlow 2.5s ease-in-out infinite',
        });
        break;
      case 'spin3d':
        updateElementStyles(selectedElement.id, {
          animation: 'spin3D 12s linear infinite',
          transformStyle: 'preserve-3d',
        });
        break;
      case 'bounce':
        updateElementStyles(selectedElement.id, {
          animation: 'bounceSubtle 2s ease-in-out infinite',
        });
        break;
      case 'none':
        updateElementStyles(selectedElement.id, {
          animation: 'none',
        });
        break;
    }
  };

  const applyTransition = (speed: string) => {
    updateElementStyles(selectedElement.id, {
      transition: `all ${speed} cubic-bezier(0.16, 1, 0.3, 1)`,
    });
  };

  const handleTransformChange = (transformVal: string) => {
    updateElementStyles(selectedElement.id, {
      transform: transformVal,
    });
  };

  return (
    <div className="h-full flex flex-col bg-[#171c26] text-xs text-gray-300 select-none overflow-y-auto custom-scrollbar p-3 space-y-4">
      {/* Header */}
      <div>
        <div className="text-[10px] font-bold uppercase tracking-wider text-emerald-400 flex items-center gap-1 mb-1">
          <Zap className="w-3.5 h-3.5" />
          <span>Interactions, 3D &amp; Motion</span>
        </div>
        <p className="text-[11px] text-gray-400">
          Configure live micro-animations, 3D perspective transforms, and hover physics for <strong>{selectedElement.name}</strong>.
        </p>
      </div>

      {/* 1. Continuous Animations */}
      <div className="space-y-2 p-3 bg-[#121620] rounded-xl border border-[#273142]">
        <div className="text-[10px] font-bold uppercase tracking-wider text-gray-400 flex items-center gap-1">
          <Activity className="w-3 h-3 text-teal-400" />
          <span>Continuous Ambient Animation</span>
        </div>
        <div className="grid grid-cols-2 gap-1.5 mt-2">
          {[
            { id: 'float', label: 'Floating Levitate', desc: 'Smooth sine wave float' },
            { id: 'pulse', label: 'Neon Pulse Glow', desc: 'Dynamic luminance beat' },
            { id: 'spin3d', label: '3D Orbit Rotation', desc: 'Continuous 3D spatial turn' },
            { id: 'bounce', label: 'Subtle Bounce', desc: 'Micro bounce physics' },
            { id: 'none', label: 'No Animation', desc: 'Static rendering' },
          ].map((item) => (
            <button
              key={item.id}
              onClick={() => applyContinuousAnimation(item.id)}
              className="flex flex-col text-left p-2 rounded-lg bg-[#18202d] hover:bg-[#222d3e] border border-[#2b3749] hover:border-emerald-500 transition group"
            >
              <span className="text-[11px] font-semibold text-gray-200 group-hover:text-emerald-400">
                {item.label}
              </span>
              <span className="text-[9px] text-gray-500 mt-0.5">{item.desc}</span>
            </button>
          ))}
        </div>
      </div>

      {/* 2. 3D Spatial Transforms & Perspective */}
      <div className="space-y-2 p-3 bg-[#121620] rounded-xl border border-[#273142]">
        <div className="text-[10px] font-bold uppercase tracking-wider text-gray-400 flex items-center gap-1">
          <Rotate3d className="w-3 h-3 text-indigo-400" />
          <span>3D Spatial Transforms &amp; Depth</span>
        </div>

        <div className="space-y-2 mt-2">
          <div className="grid grid-cols-2 gap-1.5">
            {[
              { label: '3D Card Tilt Right', val: 'perspective(1000px) rotateY(15deg) rotateX(5deg)' },
              { label: '3D Card Tilt Left', val: 'perspective(1000px) rotateY(-15deg) rotateX(5deg)' },
              { label: 'Elevate Forward (Z)', val: 'perspective(800px) translateZ(40px)' },
              { label: 'Reset Transform', val: 'none' },
            ].map((preset) => (
              <button
                key={preset.label}
                onClick={() => handleTransformChange(preset.val)}
                className="py-1.5 px-2 rounded bg-[#18202d] hover:bg-indigo-600/30 text-gray-300 hover:text-white border border-[#2b3749] text-[10px] text-left truncate transition"
              >
                {preset.label}
              </button>
            ))}
          </div>

          <div className="pt-2 border-t border-[#1e2634]">
            <label className="text-[9px] text-gray-500 uppercase">Custom CSS Transform</label>
            <input
              type="text"
              value={currentStyles.transform || ''}
              placeholder="e.g. perspective(800px) rotateY(12deg)"
              onChange={(e) => handleTransformChange(e.target.value)}
              className="w-full mt-1 px-2 py-1 bg-[#10141d] border border-[#2b3546] rounded text-xs text-white font-mono focus:outline-none focus:border-emerald-500"
            />
          </div>
        </div>
      </div>

      {/* 3. Hover Interaction Triggers */}
      <div className="space-y-2 p-3 bg-[#121620] rounded-xl border border-[#273142]">
        <div className="text-[10px] font-bold uppercase tracking-wider text-gray-400 flex items-center gap-1">
          <MousePointer className="w-3 h-3 text-emerald-400" />
          <span>Hover Interaction Triggers</span>
        </div>

        <div className="grid grid-cols-2 gap-1.5 mt-2">
          {[
            { id: 'lift', label: 'Lift & Deep Shadow', desc: 'Elevation on hover' },
            { id: 'scale', label: 'Pop & Scale 1.05', desc: 'Smooth zoom emphasis' },
            { id: 'tilt-3d', label: 'Dynamic 3D Tilt', desc: 'Spatial tilt on cursor' },
            { id: 'glow', label: 'Neon Blue Glow', desc: 'Vibrant edge light' },
            { id: 'none', label: 'Reset / None', desc: 'Default state' },
          ].map((eff) => (
            <button
              key={eff.id}
              onClick={() => applyHoverEffect(eff.id)}
              className="flex flex-col text-left p-2 rounded-lg bg-[#18202d] hover:bg-[#222d3e] border border-[#2b3749] hover:border-emerald-500 transition group"
            >
              <span className="text-[11px] font-semibold text-gray-200 group-hover:text-emerald-400">
                {eff.label}
              </span>
              <span className="text-[9px] text-gray-500 mt-0.5">{eff.desc}</span>
            </button>
          ))}
        </div>
      </div>

      {/* 4. Transition Speed */}
      <div className="space-y-2 p-3 bg-[#121620] rounded-xl border border-[#273142]">
        <div className="text-[10px] font-bold uppercase tracking-wider text-gray-400 flex items-center gap-1">
          <Play className="w-3 h-3 text-emerald-400" />
          <span>Smooth Transition Speed</span>
        </div>

        <div className="grid grid-cols-4 gap-1 mt-1">
          {[
            { label: 'Instant', val: '0.1s' },
            { label: 'Fast', val: '0.2s' },
            { label: 'Smooth', val: '0.35s' },
            { label: 'Cinematic', val: '0.7s' },
          ].map((t) => (
            <button
              key={t.label}
              onClick={() => applyTransition(t.val)}
              className="py-1.5 rounded bg-[#18202d] hover:bg-emerald-600 text-gray-300 hover:text-white transition text-[10px] font-mono text-center border border-[#2b3749]"
            >
              {t.label}
            </button>
          ))}
        </div>
      </div>

      {/* Live Preview Info */}
      <div className="p-3 bg-emerald-950/20 border border-emerald-800/30 rounded-xl text-[11px] text-teal-300 flex items-start gap-2">
        <Sparkles className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
        <div>
          <span className="font-semibold block text-white">Live Animation &amp; 3D Engine:</span>
          Switch between <strong>Desktop / Tablet / Mobile</strong> or press <strong>Preview</strong> at the top bar to test live cursor physics and 3D rotations!
        </div>
      </div>
    </div>
  );
};

