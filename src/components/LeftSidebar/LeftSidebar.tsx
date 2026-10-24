import React from 'react';
import { Plus, Layers, FileText, Image as ImageIcon } from 'lucide-react';
import { useBuilder } from '../../context/BuilderContext';
import { ElementsPanel } from './ElementsPanel';
import { NavigatorPanel } from './NavigatorPanel';
import { PagesPanel } from './PagesPanel';
import { AssetsPanel } from './AssetsPanel';

export const LeftSidebar: React.FC = () => {
  const { activeLeftTab, setActiveLeftTab } = useBuilder();

  const tabs: { id: 'add' | 'navigator' | 'pages' | 'assets'; label: string; icon: typeof Plus }[] = [
    { id: 'add', label: 'Add Elements (+)', icon: Plus },
    { id: 'navigator', label: 'Navigator / Layers', icon: Layers },
    { id: 'pages', label: 'Pages', icon: FileText },
    { id: 'assets', label: 'Assets & Media', icon: ImageIcon },
  ];

  return (
    <div className="h-full flex z-20 border-r border-emerald-950/40 select-none shadow-neu">
      {/* Narrow vertical icon rail */}
      <div className="w-11 bg-[#091010] border-r border-emerald-950/40 flex flex-col items-center py-2.5 gap-2 shrink-0">
        {tabs.map((tab) => {
          const Icon = tab.icon;
          const isActive = activeLeftTab === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveLeftTab(tab.id)}
              title={tab.label}
              className={`p-2 rounded-xl transition-all ${
                isActive
                  ? 'bg-gradient-to-tr from-emerald-500 to-teal-400 text-white shadow-neu-sm'
                  : 'text-gray-400 hover:text-emerald-300 hover:bg-[#121c1c]'
              }`}
            >
              <Icon className="w-4 h-4" />
            </button>
          );
        })}
      </div>

      {/* Expandable panel content */}
      <div className="w-64 h-full bg-[#0d1414] overflow-hidden flex flex-col">
        {activeLeftTab === 'add' && <ElementsPanel />}
        {activeLeftTab === 'navigator' && <NavigatorPanel />}
        {activeLeftTab === 'pages' && <PagesPanel />}
        {activeLeftTab === 'assets' && <AssetsPanel />}
      </div>
    </div>
  );
};
