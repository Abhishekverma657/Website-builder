import React, { useState } from 'react';
import { FileText, Plus, Check } from 'lucide-react';
import { useBuilder } from '../../context/BuilderContext';

export const PagesPanel: React.FC = () => {
  const { project, activePage, switchPage, addPage } = useBuilder();
  const [showAddForm, setShowAddForm] = useState(false);
  const [newPageName, setNewPageName] = useState('');
  const [newPageSlug, setNewPageSlug] = useState('');

  const handleCreatePage = (e: React.FormEvent) => {
    e.preventDefault();
    if (newPageName.trim()) {
      const slug = newPageSlug.trim() || newPageName.toLowerCase().replace(/\s+/g, '-');
      addPage(newPageName.trim(), slug);
      setNewPageName('');
      setNewPageSlug('');
      setShowAddForm(false);
    }
  };

  return (
    <div className="h-full flex flex-col bg-[#171c26] select-none overflow-y-auto custom-scrollbar">
      <div className="p-3 border-b border-[#242c38] flex items-center justify-between">
        <div>
          <h3 className="text-xs font-bold text-gray-200 uppercase tracking-wider">Pages</h3>
          <p className="text-[11px] text-gray-400 mt-0.5">Manage pages & routes</p>
        </div>
        <button
          onClick={() => setShowAddForm(!showAddForm)}
          className="p-1 rounded bg-[#252f40] hover:bg-emerald-600 text-gray-300 hover:text-white transition"
          title="Add New Page"
        >
          <Plus className="w-4 h-4" />
        </button>
      </div>

      {showAddForm && (
        <form onSubmit={handleCreatePage} className="p-3 bg-[#1e2533] border-b border-[#2e3747] space-y-2">
          <div>
            <label className="text-[10px] text-gray-400 font-semibold uppercase">Page Name</label>
            <input
              type="text"
              placeholder="e.g. Contact Us"
              value={newPageName}
              onChange={(e) => {
                setNewPageName(e.target.value);
                if (!newPageSlug) {
                  setNewPageSlug(e.target.value.toLowerCase().replace(/\s+/g, '-'));
                }
              }}
              autoFocus
              className="w-full mt-1 px-2.5 py-1.5 bg-[#141822] border border-[#333e50] rounded text-xs text-white focus:outline-none focus:border-emerald-500"
            />
          </div>
          <div>
            <label className="text-[10px] text-gray-400 font-semibold uppercase">URL Slug</label>
            <input
              type="text"
              placeholder="e.g. contact"
              value={newPageSlug}
              onChange={(e) => setNewPageSlug(e.target.value)}
              className="w-full mt-1 px-2.5 py-1.5 bg-[#141822] border border-[#333e50] rounded text-xs text-white focus:outline-none focus:border-emerald-500"
            />
          </div>
          <div className="flex justify-end gap-2 pt-1">
            <button
              type="button"
              onClick={() => setShowAddForm(false)}
              className="px-2.5 py-1 text-xs text-gray-400 hover:text-white"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="flex items-center gap-1 px-3 py-1 bg-emerald-600 hover:bg-emerald-500 text-white rounded text-xs font-semibold"
            >
              <Check className="w-3 h-3" />
              Create
            </button>
          </div>
        </form>
      )}

      <div className="p-2 space-y-1">
        {project.pages.map((p) => {
          const isActive = p.id === activePage.id;
          return (
            <div
              key={p.id}
              onClick={() => switchPage(p.id)}
              className={`flex items-center justify-between px-3 py-2 rounded-lg cursor-pointer transition ${
                isActive
                  ? 'bg-[#10b981] text-white font-semibold shadow-sm'
                  : 'text-gray-300 hover:bg-[#202836] hover:text-white'
              }`}
            >
              <div className="flex items-center gap-2.5 min-w-0">
                <FileText className={`w-4 h-4 ${isActive ? 'text-white' : 'text-gray-400'}`} />
                <div className="truncate">
                  <div className="text-xs">{p.name}</div>
                  <div className={`text-[10px] ${isActive ? 'text-emerald-100' : 'text-gray-400'}`}>
                    {p.slug}
                  </div>
                </div>
              </div>
              <span className={`text-[10px] px-1.5 py-0.5 rounded font-mono ${isActive ? 'bg-emerald-700' : 'bg-[#222a38] text-gray-400'}`}>
                {p.elements.length} blocks
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
};
