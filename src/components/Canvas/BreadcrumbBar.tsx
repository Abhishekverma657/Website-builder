import React from 'react';
import { useBuilder } from '../../context/BuilderContext';
import { ChevronRight, Box } from 'lucide-react';
import { BuilderElement } from '../../types/builder';

export const BreadcrumbBar: React.FC = () => {
  const { elements, selectedElementId, selectElement, activeBreakpoint } = useBuilder();

  // Find ancestor path to selectedElementId
  const findPath = (list: BuilderElement[], targetId: string, currentPath: BuilderElement[] = []): BuilderElement[] | null => {
    for (const el of list) {
      const path = [...currentPath, el];
      if (el.id === targetId) {
        return path;
      }
      if (el.children && el.children.length > 0) {
        const found = findPath(el.children, targetId, path);
        if (found) return found;
      }
    }
    return null;
  };

  const path = selectedElementId ? findPath(elements, selectedElementId) : null;

  return (
    <footer className="h-7 bg-[#090f0f] border-t border-emerald-950/40 px-4 flex items-center justify-between text-[11px] text-gray-400 select-none z-20 shadow-neu">
      {/* Left: DOM Path Breadcrumbs */}
      <div className="flex items-center gap-1 overflow-x-auto custom-scrollbar whitespace-nowrap">
        <button
          onClick={() => selectElement(null)}
          className={`flex items-center gap-1 hover:text-white px-1.5 py-0.5 rounded-lg transition ${
            !selectedElementId ? 'text-emerald-400 font-semibold' : 'text-gray-400'
          }`}
        >
          <Box className="w-3 h-3 text-teal-400" />
          <span>Body</span>
        </button>

        {path &&
          path.map((item, index) => {
            const isLast = index === path.length - 1;
            return (
              <React.Fragment key={item.id}>
                <ChevronRight className="w-2.5 h-2.5 text-emerald-900" />
                <button
                  onClick={() => selectElement(item.id)}
                  className={`flex items-center gap-1 px-1.5 py-0.5 rounded-lg transition font-mono ${
                    isLast
                      ? 'bg-gradient-to-r from-emerald-500 to-teal-500 text-white font-semibold shadow-neu-sm'
                      : 'text-gray-300 hover:text-emerald-300 hover:bg-[#121c1c]'
                  }`}
                >
                  <span className="uppercase text-[9px] opacity-75">{item.tag}</span>
                  <span className="font-sans text-[11px]">{item.name}</span>
                </button>
              </React.Fragment>
            );
          })}
      </div>

      {/* Right: Current Breakpoint & Info */}
      <div className="flex items-center gap-2 font-mono text-[10px] text-gray-500">
        <span>Webflow DOM Tree</span>
        <span>•</span>
        <span className="capitalize text-emerald-400/90 font-semibold">{activeBreakpoint}</span>
      </div>
    </footer>
  );
};
