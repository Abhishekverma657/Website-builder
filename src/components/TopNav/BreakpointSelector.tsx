import React from 'react';
import { Monitor, Tablet, Smartphone } from 'lucide-react';
import { Breakpoint } from '../../types/builder';
import { useBuilder } from '../../context/BuilderContext';

export const BreakpointSelector: React.FC = () => {
  const { activeBreakpoint, setBreakpoint } = useBuilder();

  const breakpoints: { id: Breakpoint; label: string; icon: typeof Monitor; width: string }[] = [
    { id: 'desktop', label: 'Desktop (1200px+)', icon: Monitor, width: '100%' },
    { id: 'tablet', label: 'Tablet (768px)', icon: Tablet, width: '768px' },
    { id: 'mobile', label: 'Mobile Portrait (375px)', icon: Smartphone, width: '375px' },
  ];

  return (
    <div className="flex items-center bg-[#091010] p-1 rounded-xl border border-emerald-950/60 shadow-neu-sm">
      {breakpoints.map((bp) => {
        const Icon = bp.icon;
        const isActive = activeBreakpoint === bp.id;
        return (
          <button
            key={bp.id}
            onClick={() => setBreakpoint(bp.id)}
            title={bp.label}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
              isActive
                ? 'bg-gradient-to-r from-emerald-500 to-teal-500 text-white shadow-neu-sm'
                : 'text-gray-400 hover:text-emerald-300 hover:bg-[#121c1c]'
            }`}
          >
            <Icon className="w-3.5 h-3.5" />
            <span className="capitalize hidden md:inline">{bp.id}</span>
          </button>
        );
      })}
    </div>
  );
};
