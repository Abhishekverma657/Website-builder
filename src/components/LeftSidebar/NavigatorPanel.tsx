import React, { useState } from 'react';
import {
  ChevronRight,
  ChevronDown,
  Eye,
  EyeOff,
  Lock,
  Unlock,
  Trash2,
  Copy,
  Edit2,
  Check,
} from 'lucide-react';
import { BuilderElement } from '../../types/builder';
import { useBuilder } from '../../context/BuilderContext';

interface TreeNodeProps {
  element: BuilderElement;
  depth: number;
}

const TreeNode: React.FC<TreeNodeProps> = ({ element, depth }) => {
  const {
    selectedElementId,
    selectElement,
    hoverElement,
    deleteElement,
    duplicateElement,
    toggleLock,
    toggleHide,
    updateElementName,
  } = useBuilder();

  const [expanded, setExpanded] = useState(true);
  const [isEditingName, setIsEditingName] = useState(false);
  const [nameVal, setNameVal] = useState(element.name);

  const hasChildren = element.children && element.children.length > 0;
  const isSelected = selectedElementId === element.id;

  const handleNameSubmit = () => {
    if (nameVal.trim()) {
      updateElementName(element.id, nameVal.trim());
    }
    setIsEditingName(false);
  };

  return (
    <div>
      <div
        style={{ paddingLeft: `${depth * 14 + 8}px` }}
        onMouseEnter={() => hoverElement(element.id)}
        onMouseLeave={() => hoverElement(null)}
        onClick={(e) => {
          e.stopPropagation();
          selectElement(element.id);
        }}
        className={`group flex items-center justify-between py-1.5 pr-2 rounded text-xs cursor-pointer select-none transition ${
          isSelected
            ? 'bg-[#10b981] text-white font-medium'
            : 'text-gray-300 hover:bg-[#252f40] hover:text-white'
        }`}
      >
        <div className="flex items-center gap-1.5 flex-1 min-w-0">
          {hasChildren ? (
            <button
              onClick={(e) => {
                e.stopPropagation();
                setExpanded(!expanded);
              }}
              className="p-0.5 hover:bg-black/20 rounded text-gray-400 group-hover:text-gray-200"
            >
              {expanded ? (
                <ChevronDown className="w-3 h-3" />
              ) : (
                <ChevronRight className="w-3 h-3" />
              )}
            </button>
          ) : (
            <div className="w-3 h-3" />
          )}

          {isEditingName ? (
            <div className="flex items-center gap-1" onClick={(e) => e.stopPropagation()}>
              <input
                type="text"
                value={nameVal}
                onChange={(e) => setNameVal(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleNameSubmit()}
                autoFocus
                className="bg-[#10141d] border border-teal-400 text-white px-1.5 py-0.5 rounded text-xs w-28 focus:outline-none"
              />
              <button onClick={handleNameSubmit} className="text-green-400">
                <Check className="w-3 h-3" />
              </button>
            </div>
          ) : (
            <span
              onDoubleClick={(e) => {
                e.stopPropagation();
                setIsEditingName(true);
              }}
              className="truncate text-[11px]"
            >
              {element.name}
            </span>
          )}

          <span
            className={`text-[9px] px-1 py-0.2 rounded font-mono ${
              isSelected ? 'bg-emerald-700 text-emerald-100' : 'bg-[#1e2533] text-gray-400'
            }`}
          >
            {element.tag}
          </span>
        </div>

        {/* Hover Action icons */}
        <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition">
          <button
            onClick={(e) => {
              e.stopPropagation();
              setIsEditingName(true);
            }}
            title="Rename"
            className="p-0.5 hover:text-teal-300"
          >
            <Edit2 className="w-2.5 h-2.5" />
          </button>
          <button
            onClick={(e) => {
              e.stopPropagation();
              duplicateElement(element.id);
            }}
            title="Duplicate"
            className="p-0.5 hover:text-teal-300"
          >
            <Copy className="w-2.5 h-2.5" />
          </button>
          <button
            onClick={(e) => {
              e.stopPropagation();
              toggleHide(element.id);
            }}
            title={element.isHidden ? 'Show' : 'Hide'}
            className="p-0.5 hover:text-teal-300"
          >
            {element.isHidden ? <EyeOff className="w-2.5 h-2.5 text-amber-400" /> : <Eye className="w-2.5 h-2.5" />}
          </button>
          <button
            onClick={(e) => {
              e.stopPropagation();
              toggleLock(element.id);
            }}
            title={element.isLocked ? 'Unlock' : 'Lock'}
            className="p-0.5 hover:text-teal-300"
          >
            {element.isLocked ? <Lock className="w-2.5 h-2.5 text-amber-400" /> : <Unlock className="w-2.5 h-2.5" />}
          </button>
          <button
            onClick={(e) => {
              e.stopPropagation();
              deleteElement(element.id);
            }}
            title="Delete"
            className="p-0.5 hover:text-red-400"
          >
            <Trash2 className="w-2.5 h-2.5" />
          </button>
        </div>
      </div>

      {hasChildren && expanded && (
        <div className="border-l border-[#242d3c] ml-3">
          {element.children!.map((child) => (
            <TreeNode key={child.id} element={child} depth={depth + 1} />
          ))}
        </div>
      )}
    </div>
  );
};

export const NavigatorPanel: React.FC = () => {
  const { elements, selectElement } = useBuilder();

  return (
    <div
      onClick={() => selectElement(null)}
      className="h-full flex flex-col bg-[#171c26] select-none overflow-y-auto custom-scrollbar"
    >
      <div className="p-3 border-b border-[#242c38]">
        <h3 className="text-xs font-bold text-gray-200 uppercase tracking-wider">Navigator / Layers</h3>
        <p className="text-[11px] text-gray-400 mt-0.5">Hierarchical DOM tree structure</p>
      </div>

      <div className="p-2 space-y-0.5">
        {elements.length === 0 ? (
          <div className="text-center py-8 text-xs text-gray-400">
            No elements on this page. Click <strong>+</strong> to add one.
          </div>
        ) : (
          elements.map((el) => <TreeNode key={el.id} element={el} depth={0} />)
        )}
      </div>
    </div>
  );
};
