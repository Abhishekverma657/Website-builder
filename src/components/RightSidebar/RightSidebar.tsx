import React, { useState } from 'react';
import { Sliders, Paintbrush, Zap } from 'lucide-react';
import { StylePanel } from './StylePanel';
import { SettingsPanel } from './SettingsPanel';
import { InteractionsPanel } from './InteractionsPanel';

export const RightSidebar: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'style' | 'settings' | 'interactions'>('style');

  return (
    <aside className="w-72 h-full bg-[#0d1414] border-l border-emerald-950/40 flex flex-col z-20 select-none shadow-neu">
      {/* Top Tab Switcher */}
      <div className="h-10 bg-[#091010] border-b border-emerald-950/40 flex items-center px-1.5 gap-1.5">
        <button
          onClick={() => setActiveTab('style')}
          className={`flex items-center gap-1.5 px-2.5 py-1.5 rounded-xl text-xs font-semibold flex-1 justify-center transition shadow-neu-sm ${
            activeTab === 'style'
              ? 'bg-[#142020] text-emerald-400 border border-emerald-500/30'
              : 'text-gray-400 hover:text-gray-200'
          }`}
          title="Style Inspector (S)"
        >
          <Paintbrush className="w-3.5 h-3.5" />
          <span>Style</span>
        </button>

        <button
          onClick={() => setActiveTab('settings')}
          className={`flex items-center gap-1.5 px-2.5 py-1.5 rounded-xl text-xs font-semibold flex-1 justify-center transition shadow-neu-sm ${
            activeTab === 'settings'
              ? 'bg-[#142020] text-teal-400 border border-teal-500/30'
              : 'text-gray-400 hover:text-gray-200'
          }`}
          title="Element Settings (D)"
        >
          <Sliders className="w-3.5 h-3.5" />
          <span>Settings</span>
        </button>

        <button
          onClick={() => setActiveTab('interactions')}
          className={`flex items-center gap-1.5 px-2 py-1.5 rounded-xl text-xs font-semibold flex-1 justify-center transition shadow-neu-sm ${
            activeTab === 'interactions'
              ? 'bg-[#142020] text-emerald-400 border border-emerald-500/30'
              : 'text-gray-400 hover:text-gray-200'
          }`}
          title="Interactions & Triggers (H)"
        >
          <Zap className="w-3.5 h-3.5" />
          <span>Animate</span>
        </button>
      </div>

      {/* Active Tab Panel */}
      <div className="flex-1 overflow-hidden">
        {activeTab === 'style' && <StylePanel />}
        {activeTab === 'settings' && <SettingsPanel />}
        {activeTab === 'interactions' && <InteractionsPanel />}
      </div>
    </aside>
  );
};
