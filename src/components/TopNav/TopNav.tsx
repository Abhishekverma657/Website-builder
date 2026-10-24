import React, { useState } from 'react';
import {
  Undo2,
  Redo2,
  Eye,
  EyeOff,
  Code2,
  Share2,
  Layers,
  ChevronDown,
  Sparkles,
  ZoomIn,
  FolderKanban,
  Check,
  Rocket,
} from 'lucide-react';
import { useBuilder } from '../../context/BuilderContext';
import { BreakpointSelector } from './BreakpointSelector';
import { ExportModal } from './ExportModal';
import { ProjectsModal } from './ProjectsModal';
import { PublishModal } from './PublishModal';

export const TopNav: React.FC = () => {
  const {
    project,
    savedProjects,
    loadProject,
    setSavedProjects,
    activePage,
    switchPage,
    canUndo,
    canRedo,
    undo,
    redo,
    zoom,
    setZoom,
    previewMode,
    setPreviewMode,
  } = useBuilder();

  const [isExportOpen, setIsExportOpen] = useState(false);
  const [isProjectsOpen, setIsProjectsOpen] = useState(false);
  const [isPublishModalOpen, setIsPublishModalOpen] = useState(false);
  const [pageDropdownOpen, setPageDropdownOpen] = useState(false);

  return (
    <>
      <header className="h-12 bg-[#0a1010] border-b border-emerald-950/40 px-3 flex items-center justify-between text-xs text-gray-300 select-none z-30 relative shadow-neu">
        {/* Left Section: Logo, Projects Modal Button & Page Switcher */}
        <div className="flex items-center gap-2.5">
          {/* Brand Logo & Project Manager Trigger */}
          <button
            onClick={() => setIsProjectsOpen(true)}
            title="Open Projects Dashboard (Manage & Switch Projects)"
            className="flex items-center gap-2 px-2.5 py-1 rounded-xl bg-[#101919] hover:bg-[#162323] border border-emerald-500/25 text-white font-bold transition shadow-neu-sm group"
          >
            <div className="w-5 h-5 rounded-lg bg-gradient-to-tr from-emerald-500 to-teal-400 flex items-center justify-center text-white text-[12px] font-extrabold shadow">
              A
            </div>
            <span className="text-xs tracking-wide group-hover:text-emerald-300 transition">
              {project.name}
            </span>
            <FolderKanban className="w-3.5 h-3.5 text-emerald-400/80 group-hover:text-emerald-300" />
          </button>

          {/* Page Switcher */}
          <div className="relative">
            <button
              onClick={() => setPageDropdownOpen(!pageDropdownOpen)}
              className="flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-[#101919] hover:bg-[#162323] border border-emerald-500/20 text-gray-200 transition shadow-neu-sm"
            >
              <Layers className="w-3.5 h-3.5 text-teal-400" />
              <span>{activePage.name}</span>
              <span className="text-[10px] text-gray-400 font-normal">({activePage.slug})</span>
              <ChevronDown className="w-3 h-3 text-gray-400 ml-0.5" />
            </button>

            {pageDropdownOpen && (
              <div className="absolute top-full left-0 mt-1 w-44 bg-[#0e1616] border border-emerald-500/30 rounded-xl shadow-neu py-1 z-50">
                <div className="px-2.5 py-1 text-[10px] uppercase font-semibold text-emerald-400/80 tracking-wider">
                  Pages
                </div>
                {project.pages.map((p) => (
                  <button
                    key={p.id}
                    onClick={() => {
                      switchPage(p.id);
                      setPageDropdownOpen(false);
                    }}
                    className={`w-full text-left px-3 py-1.5 flex items-center justify-between hover:bg-[#152222] transition ${
                      p.id === activePage.id ? 'text-emerald-400 font-semibold bg-[#121c1c]' : 'text-gray-300'
                    }`}
                  >
                    <span>{p.name}</span>
                    <span className="text-[10px] text-gray-400">{p.slug}</span>
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Auto-saved badge */}
          <div className="hidden xl:flex items-center gap-1.5 px-2 py-0.5 text-[11px] font-mono text-emerald-400 bg-emerald-950/40 rounded-full border border-emerald-800/40 shadow-neu-sm">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
            <span>Saved</span>
          </div>
        </div>

        {/* Center Section: Responsive Breakpoints & Undo/Redo */}
        <div className="flex items-center gap-3">
          <BreakpointSelector />

          <div className="flex items-center gap-1 bg-[#101919] p-1 rounded-xl border border-emerald-500/20 shadow-neu-sm">
            <button
              onClick={undo}
              disabled={!canUndo}
              title="Undo (Ctrl+Z)"
              className="p-1 rounded-lg hover:bg-[#182626] disabled:opacity-30 disabled:hover:bg-transparent text-gray-300 hover:text-white transition"
            >
              <Undo2 className="w-3.5 h-3.5" />
            </button>
            <button
              onClick={redo}
              disabled={!canRedo}
              title="Redo (Ctrl+Y)"
              className="p-1 rounded-lg hover:bg-[#182626] disabled:opacity-30 disabled:hover:bg-transparent text-gray-300 hover:text-white transition"
            >
              <Redo2 className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

        {/* Right Section: Zoom, Preview, Export, Publish */}
        <div className="flex items-center gap-2">
          {/* Zoom controls */}
          <div className="flex items-center gap-1 bg-[#101919] px-2 py-1 rounded-xl border border-emerald-500/20 shadow-neu-sm text-gray-400">
            <ZoomIn className="w-3 h-3 text-teal-400" />
            <select
              value={zoom}
              onChange={(e) => setZoom(Number(e.target.value))}
              aria-label="Canvas Zoom"
              className="bg-transparent text-gray-200 font-medium text-xs focus:outline-none cursor-pointer"
            >
              <option value={100} className="bg-[#0e1616] text-white">100%</option>
              <option value={75} className="bg-[#0e1616] text-white">75%</option>
              <option value={50} className="bg-[#0e1616] text-white">50%</option>
              <option value={125} className="bg-[#0e1616] text-white">125%</option>
            </select>
          </div>

          {/* Preview Mode Toggle */}
          <button
            onClick={() => setPreviewMode(!previewMode)}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl font-medium transition shadow-neu-sm ${
              previewMode
                ? 'bg-amber-500/20 text-amber-300 border border-amber-500/40'
                : 'bg-[#101919] hover:bg-[#162323] text-gray-300 border border-emerald-500/20'
            }`}
            title="Toggle Live Visitor Preview"
          >
            {previewMode ? <EyeOff className="w-3.5 h-3.5" /> : <Eye className="w-3.5 h-3.5" />}
            <span className="hidden sm:inline">{previewMode ? 'Exit Preview' : 'Preview'}</span>
          </button>

          {/* Export Code Modal Trigger */}
          <button
            onClick={() => setIsExportOpen(true)}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl font-medium bg-[#101919] hover:bg-[#162323] text-gray-200 border border-emerald-500/25 transition shadow-neu-sm"
          >
            <Code2 className="w-3.5 h-3.5 text-teal-400" />
            <span className="hidden sm:inline">Export Code</span>
          </button>

          {/* Instant Cloudflare Publish Button */}
          <button
            onClick={() => setIsPublishModalOpen(true)}
            className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl font-bold bg-gradient-to-r from-emerald-500 via-teal-500 to-emerald-600 hover:brightness-110 text-white shadow-neu transition"
          >
            <Rocket className="w-3.5 h-3.5" />
            <span>Publish</span>
          </button>
        </div>
      </header>

      {/* Export Code Modal */}
      <ExportModal isOpen={isExportOpen} onClose={() => setIsExportOpen(false)} />

      {/* Instant Cloudflare Publish Modal */}
      <PublishModal isOpen={isPublishModalOpen} onClose={() => setIsPublishModalOpen(false)} />

      {/* Projects Dashboard Modal */}
      <ProjectsModal
        isOpen={isProjectsOpen}
        onClose={() => setIsProjectsOpen(false)}
        currentProject={project}
        onSelectProject={loadProject}
        savedProjects={savedProjects}
        onSaveProjects={setSavedProjects}
      />
    </>
  );
};
