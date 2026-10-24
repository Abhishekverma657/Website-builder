import React, { useState, useRef } from 'react';
import {
  FolderKanban,
  Plus,
  Trash2,
  Copy,
  Edit2,
  Download,
  Upload,
  X,
  Check,
  Layout,
  ExternalLink,
  Sparkles,
  Layers,
  ArrowRight,
  Eye,
  Search,
} from 'lucide-react';
import { Project, BuilderElement } from '../../types/builder';
import {
  FULL_TEMPLATES_CATALOG,
  TEMPLATE_CATEGORIES,
  WebsiteTemplate,
} from '../../templates/templatesCatalog';
import { TemplatePreviewModal } from './TemplatePreviewModal';

interface ProjectsModalProps {
  isOpen: boolean;
  onClose: () => void;
  currentProject: Project;
  onSelectProject: (proj: Project) => void;
  savedProjects: Project[];
  onSaveProjects: (projects: Project[]) => void;
}

export const ProjectsModal: React.FC<ProjectsModalProps> = ({
  isOpen,
  onClose,
  currentProject,
  onSelectProject,
  savedProjects,
  onSaveProjects,
}) => {
  const [activeTab, setActiveTab] = useState<'templates' | 'projects'>('templates');
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [previewTemplate, setPreviewTemplate] = useState<WebsiteTemplate | null>(null);

  const [editingId, setEditingId] = useState<string | null>(null);
  const [editName, setEditName] = useState('');
  const importFileRef = useRef<HTMLInputElement>(null);

  if (!isOpen) return null;

  // Filter templates by category and search term
  const filteredTemplates = FULL_TEMPLATES_CATALOG.filter((t) => {
    const matchesCategory =
      selectedCategory === 'All' || t.category === selectedCategory;
    const matchesSearch =
      searchQuery.trim() === '' ||
      t.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      t.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      t.badge.toLowerCase().includes(searchQuery.toLowerCase()) ||
      t.category.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const handleApplyTemplate = (tmpl: WebsiteTemplate) => {
    const newProj: Project = {
      id: `proj-${Date.now()}`,
      name: `${tmpl.name}`,
      pages: [
        {
          id: 'page-home',
          name: 'Home',
          slug: 'home',
          title: tmpl.name,
          elements: JSON.parse(JSON.stringify(tmpl.elements)),
        },
      ],
      activePageId: 'page-home',
      updatedAt: new Date().toLocaleTimeString(),
    };

    const updated = [newProj, ...savedProjects];
    onSaveProjects(updated);
    onSelectProject(newProj);
    setPreviewTemplate(null);
    onClose();
  };

  const handleCreateBlank = () => {
    const newProj: Project = {
      id: `proj-${Date.now()}`,
      name: 'Blank Canvas Project',
      pages: [
        {
          id: 'page-home',
          name: 'Home',
          slug: 'home',
          title: 'Blank Canvas',
          elements: [
            {
              id: `section-${Date.now()}`,
              name: 'Main Section',
              type: 'section',
              tag: 'section',
              styles: {
                desktop: {
                  backgroundColor: '#ffffff',
                  padding: { top: '100px', right: '32px', bottom: '100px', left: '32px' },
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  justifyContent: 'center',
                },
              },
              children: [
                {
                  id: `h1-${Date.now()}`,
                  name: 'Heading',
                  type: 'h1',
                  tag: 'h1',
                  content: 'Start Building With Aura Studio',
                  styles: {
                    desktop: {
                      fontSize: '48px',
                      fontWeight: '800',
                      color: '#090d16',
                      textAlign: 'center',
                      margin: { top: '0px', right: '0px', bottom: '16px', left: '0px' },
                    },
                  },
                },
                {
                  id: `p-${Date.now()}`,
                  name: 'Subtitle',
                  type: 'paragraph',
                  tag: 'p',
                  content: 'Drag components from the left sidebar or edit directly on the canvas.',
                  styles: {
                    desktop: {
                      fontSize: '18px',
                      color: '#64748b',
                      textAlign: 'center',
                      margin: { top: '0px', right: '0px', bottom: '24px', left: '0px' },
                    },
                  },
                },
              ],
            },
          ],
        },
      ],
      activePageId: 'page-home',
      updatedAt: new Date().toLocaleTimeString(),
    };

    const updated = [newProj, ...savedProjects];
    onSaveProjects(updated);
    onSelectProject(newProj);
    onClose();
  };

  const handleDuplicate = (proj: Project) => {
    const copy: Project = {
      ...JSON.parse(JSON.stringify(proj)),
      id: `proj-${Date.now()}`,
      name: `${proj.name} (Copy)`,
      updatedAt: new Date().toLocaleTimeString(),
    };
    const updated = [copy, ...savedProjects];
    onSaveProjects(updated);
  };

  const handleDelete = (id: string) => {
    if (savedProjects.length <= 1) {
      alert('You must have at least one project.');
      return;
    }
    const updated = savedProjects.filter((p) => p.id !== id);
    onSaveProjects(updated);
    if (currentProject.id === id) {
      onSelectProject(updated[0]);
    }
  };

  const handleSaveRename = (id: string) => {
    if (!editName.trim()) return;
    const updated = savedProjects.map((p) =>
      p.id === id ? { ...p, name: editName.trim() } : p
    );
    onSaveProjects(updated);
    if (currentProject.id === id) {
      onSelectProject({ ...currentProject, name: editName.trim() });
    }
    setEditingId(null);
  };

  const handleExportJson = (proj: Project) => {
    const dataStr =
      'data:text/json;charset=utf-8,' +
      encodeURIComponent(JSON.stringify(proj, null, 2));
    const a = document.createElement('a');
    a.href = dataStr;
    a.download = `${proj.name.toLowerCase().replace(/\s+/g, '-')}-project.json`;
    a.click();
  };

  const handleImportJson = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = () => {
      try {
        const imported = JSON.parse(reader.result as string) as Project;
        imported.id = `proj-${Date.now()}`;
        imported.name = `${imported.name || 'Imported'} (Imported)`;
        imported.updatedAt = new Date().toLocaleTimeString();

        const updated = [imported, ...savedProjects];
        onSaveProjects(updated);
        onSelectProject(imported);
        onClose();
      } catch (err) {
        alert('Invalid project JSON file');
      }
    };
    reader.readAsText(file);
    if (importFileRef.current) importFileRef.current.value = '';
  };

  return (
    <>
      <div className="fixed inset-0 z-[99999] flex items-center justify-center bg-black/80 backdrop-blur-md p-2 md:p-6 animate-in fade-in duration-200">
        <div className="relative w-full max-w-7xl bg-[#0a1111] border border-emerald-950/60 rounded-2xl shadow-neu flex flex-col h-[92vh] overflow-hidden text-[#e2e8f0]">
          {/* Header */}
          <div className="flex items-center justify-between px-6 py-4 border-b border-emerald-950/60 bg-[#070c0c]">
            <div className="flex items-center gap-3">
              <div className="p-2.5 rounded-xl bg-emerald-500/15 text-emerald-400 border border-emerald-500/30 shadow-neu-inset">
                <FolderKanban className="w-5 h-5" />
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <h2 className="text-base font-bold text-white tracking-wide">
                    Website Template Marketplace & Projects
                  </h2>
                  <span className="px-2.5 py-0.5 rounded-full text-[10px] bg-emerald-500/15 text-emerald-400 border border-emerald-500/30 font-bold uppercase">
                    {FULL_TEMPLATES_CATALOG.length} Prebuilt Templates
                  </span>
                </div>
                <p className="text-xs text-gray-400">
                  Shopify & Webflow style full-website catalog • Live Interactive Preview • 1-Click Clone
                </p>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <input
                ref={importFileRef}
                type="file"
                accept=".json"
                onChange={handleImportJson}
                className="hidden"
              />
              <button
                onClick={() => importFileRef.current?.click()}
                className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-semibold text-gray-300 hover:text-white bg-[#0f1919] hover:bg-[#142222] border border-emerald-900/40 transition shadow-sm"
              >
                <Upload className="w-3.5 h-3.5 text-emerald-400" />
                Import JSON
              </button>
              <button
                onClick={onClose}
                className="p-1.5 rounded-xl text-gray-400 hover:text-white hover:bg-emerald-950/40 transition"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
          </div>

          {/* Navigation Bar (Tabs & Search Bar) */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 px-6 py-2.5 border-b border-emerald-950/60 bg-[#080e0e]">
            {/* Tab Switcher */}
            <div className="flex items-center gap-2">
              <button
                onClick={() => setActiveTab('templates')}
                className={`py-1.5 px-3 rounded-lg text-xs font-bold flex items-center gap-2 transition ${
                  activeTab === 'templates'
                    ? 'bg-gradient-to-r from-emerald-500/20 to-teal-500/20 text-emerald-400 border border-emerald-500/30 shadow-neu-sm'
                    : 'text-gray-400 hover:text-white'
                }`}
              >
                <Sparkles className="w-3.5 h-3.5 text-emerald-400" />
                Templates Marketplace ({FULL_TEMPLATES_CATALOG.length})
              </button>
              <button
                onClick={() => setActiveTab('projects')}
                className={`py-1.5 px-3 rounded-lg text-xs font-bold flex items-center gap-2 transition ${
                  activeTab === 'projects'
                    ? 'bg-gradient-to-r from-emerald-500/20 to-teal-500/20 text-emerald-400 border border-emerald-500/30 shadow-neu-sm'
                    : 'text-gray-400 hover:text-white'
                }`}
              >
                <Layers className="w-3.5 h-3.5 text-teal-400" />
                My Saved Websites ({savedProjects.length})
              </button>
            </div>

            {/* Search Bar for Templates */}
            {activeTab === 'templates' && (
              <div className="relative w-full sm:w-72">
                <Search className="w-3.5 h-3.5 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  placeholder="Search 50+ templates..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-9 pr-3 py-1.5 rounded-xl bg-[#0f1919] border border-emerald-900/40 text-xs text-white placeholder-gray-500 focus:outline-none focus:border-emerald-400 transition"
                />
                {searchQuery && (
                  <button
                    onClick={() => setSearchQuery('')}
                    className="absolute right-2.5 top-1/2 -translate-y-1/2 text-gray-400 hover:text-white text-xs"
                  >
                    ×
                  </button>
                )}
              </div>
            )}
          </div>

          {/* Content Body */}
          <div className="p-6 overflow-y-auto space-y-5 custom-scrollbar flex-1 bg-[#070b0b]">
            {activeTab === 'templates' ? (
              <div className="space-y-6">
                {/* Category Filter Pills */}
                <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-none">
                  {TEMPLATE_CATEGORIES.map((cat) => (
                    <button
                      key={cat}
                      onClick={() => setSelectedCategory(cat)}
                      className={`px-3 py-1.5 rounded-xl text-xs font-semibold whitespace-nowrap transition ${
                        selectedCategory === cat
                          ? 'bg-gradient-to-r from-emerald-500 to-teal-500 text-white shadow-md font-bold'
                          : 'bg-[#0f1919] text-gray-300 hover:text-white hover:bg-[#142222] border border-emerald-950/60'
                      }`}
                    >
                      {cat}
                    </button>
                  ))}
                </div>

                {/* Grid of Templates */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
                  {/* Option 1: Clean Slate Blank Canvas */}
                  <div className="flex flex-col justify-between p-5 rounded-2xl border-2 border-dashed border-emerald-900/50 hover:border-emerald-500 bg-[#0e1717] hover:bg-[#121c1c] transition group shadow-neu-sm">
                    <div>
                      <span className="inline-block px-2 py-0.5 rounded text-[10px] font-bold tracking-wider bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 mb-3">
                        CLEAN SLATE
                      </span>
                      <h3 className="text-base font-bold text-white group-hover:text-emerald-400 transition mb-1">
                        Blank Canvas
                      </h3>
                      <p className="text-xs text-gray-400 leading-relaxed">
                        Start completely from scratch without predefined sections or styles.
                      </p>
                    </div>
                    <button
                      onClick={handleCreateBlank}
                      className="mt-6 w-full flex items-center justify-center gap-2 py-2 px-3 rounded-xl bg-gradient-to-r from-emerald-500 to-teal-500 hover:brightness-110 text-white text-xs font-bold transition shadow-neu-sm"
                    >
                      <Plus className="w-3.5 h-3.5" /> Start Blank
                    </button>
                  </div>

                  {/* 50+ Full Templates Cards */}
                  {filteredTemplates.map((tmpl) => (
                    <div
                      key={tmpl.id}
                      className="flex flex-col justify-between rounded-2xl border border-emerald-950/60 hover:border-emerald-500/60 bg-[#0d1616] hover:shadow-neu transition group overflow-hidden shadow-neu-sm"
                    >
                      {/* Image Thumbnail with Overlay */}
                      <div className="relative w-full h-44 overflow-hidden bg-[#070c0c]">
                        <img
                          src={tmpl.previewThumbnail || tmpl.heroImage}
                          alt={tmpl.name}
                          className="w-full h-full object-cover group-hover:scale-105 transition duration-500"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-[#0d1616] via-transparent to-transparent" />
                        <div className="absolute top-3 left-3 flex items-center gap-1.5">
                          <span className="px-2 py-0.5 rounded text-[10px] font-extrabold tracking-wider bg-[#0d1616]/90 backdrop-blur-md text-emerald-400 border border-emerald-500/30 shadow-sm">
                            {tmpl.badge}
                          </span>
                        </div>
                        <div className="absolute bottom-3 right-3 flex items-center gap-1.5">
                          <span className="px-2 py-0.5 rounded-full text-[10px] font-semibold bg-black/80 backdrop-blur-md text-white border border-white/20">
                            {tmpl.elements.length} Sections
                          </span>
                        </div>
                      </div>

                      {/* Details Body */}
                      <div className="p-4 flex-1 flex flex-col justify-between bg-[#0d1616]">
                        <div>
                          <div className="text-[11px] font-bold text-emerald-400 mb-1">
                            {tmpl.category}
                          </div>
                          <h3 className="text-base font-bold text-white group-hover:text-emerald-400 transition mb-1.5 line-clamp-1">
                            {tmpl.name}
                          </h3>
                          <p className="text-xs text-gray-400 line-clamp-2 leading-relaxed mb-4">
                            {tmpl.description}
                          </p>
                        </div>

                        {/* Interactive Action Buttons */}
                        <div className="grid grid-cols-2 gap-2 pt-3 border-t border-emerald-950/60">
                          {/* 1. Live Preview Button */}
                          <button
                            onClick={() => setPreviewTemplate(tmpl)}
                            className="w-full flex items-center justify-center gap-1.5 py-2 px-2 rounded-xl bg-[#080e0e] hover:bg-[#111c1c] text-gray-300 hover:text-white text-xs font-semibold border border-emerald-950/60 transition shadow-sm"
                            title="Interactive Device Preview"
                          >
                            <Eye className="w-3.5 h-3.5 text-emerald-400" />
                            <span>Preview</span>
                          </button>

                          {/* 2. Select & Clone Button */}
                          <button
                            onClick={() => handleApplyTemplate(tmpl)}
                            className="w-full flex items-center justify-center gap-1.5 py-2 px-2 rounded-xl bg-gradient-to-r from-emerald-500 to-teal-500 hover:brightness-110 text-white text-xs font-bold transition shadow-sm"
                          >
                            <span>Use</span>
                            <ArrowRight className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                {filteredTemplates.length === 0 && (
                  <div className="text-center py-16 text-gray-400">
                    <p className="text-sm font-semibold mb-1">No templates found for "{searchQuery}"</p>
                    <p className="text-xs text-gray-500">Try searching for words like SaaS, Coffee, Portfolio, Luxury, or Music.</p>
                  </div>
                )}
              </div>
            ) : (
              /* Saved Projects Tab */
              <div>
                <div className="text-xs font-bold uppercase tracking-wider text-gray-400 mb-4 flex items-center justify-between">
                  <span>Your Saved Projects ({savedProjects.length})</span>
                  <span className="text-[11px] text-emerald-400 flex items-center gap-1 font-normal lowercase">
                    <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                    auto-saved to browser
                  </span>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {savedProjects.map((proj) => {
                    const isCurrent = proj.id === currentProject.id;
                    return (
                      <div
                        key={proj.id}
                        className={`flex flex-col justify-between p-4 rounded-xl border transition ${
                          isCurrent
                            ? 'bg-emerald-950/20 border-emerald-500 shadow-neu-sm ring-1 ring-emerald-500/50'
                            : 'bg-[#0d1616] border-emerald-950/60 hover:border-emerald-900/60 shadow-sm'
                        }`}
                      >
                        <div className="flex items-start justify-between">
                          <div className="flex-1 mr-2">
                            {editingId === proj.id ? (
                              <div className="flex items-center gap-1.5">
                                <input
                                  type="text"
                                  value={editName}
                                  onChange={(e) => setEditName(e.target.value)}
                                  onKeyDown={(e) =>
                                    e.key === 'Enter' && handleSaveRename(proj.id)
                                  }
                                  autoFocus
                                  className="px-2 py-0.5 bg-[#080e0e] border border-emerald-500 rounded text-xs text-white"
                                />
                                <button
                                  onClick={() => handleSaveRename(proj.id)}
                                  className="text-emerald-400"
                                >
                                  <Check className="w-4 h-4" />
                                </button>
                              </div>
                            ) : (
                              <div className="flex items-center gap-2">
                                <span className="text-sm font-semibold text-white truncate">
                                  {proj.name}
                                </span>
                                {isCurrent && (
                                  <span className="px-1.5 py-0.5 rounded-full text-[9px] bg-emerald-500/15 text-emerald-400 border border-emerald-500/30 font-semibold">
                                    Active
                                  </span>
                                )}
                              </div>
                            )}
                            <div className="text-[11px] text-gray-400 mt-1 flex items-center gap-3 font-mono">
                              <span>{proj.pages?.length || 1} Pages</span>
                              <span>•</span>
                              <span>Saved: {proj.updatedAt || 'Recent'}</span>
                            </div>
                          </div>

                          {/* Quick Icons */}
                          <div className="flex items-center gap-1 text-gray-400">
                            <button
                              onClick={() => {
                                setEditingId(proj.id);
                                setEditName(proj.name);
                              }}
                              title="Rename"
                              className="p-1 hover:text-white"
                            >
                              <Edit2 className="w-3.5 h-3.5" />
                            </button>
                            <button
                              onClick={() => handleDuplicate(proj)}
                              title="Duplicate"
                              className="p-1 hover:text-white"
                            >
                              <Copy className="w-3.5 h-3.5" />
                            </button>
                            <button
                              onClick={() => handleExportJson(proj)}
                              title="Export JSON"
                              className="p-1 hover:text-white"
                            >
                              <Download className="w-3.5 h-3.5" />
                            </button>
                            <button
                              onClick={() => handleDelete(proj.id)}
                              title="Delete"
                              className="p-1 hover:text-red-400"
                            >
                              <Trash2 className="w-3.5 h-3.5" />
                            </button>
                          </div>
                        </div>

                        <div className="mt-4 pt-3 border-t border-emerald-950/60 flex items-center justify-between">
                          <span className="text-[10px] text-gray-500 font-mono">
                            {proj.id}
                          </span>
                          {!isCurrent ? (
                            <button
                              onClick={() => {
                                onSelectProject(proj);
                                onClose();
                              }}
                              className="px-3 py-1 bg-gradient-to-r from-emerald-500 to-teal-500 hover:brightness-110 text-white rounded text-xs font-semibold transition"
                            >
                              Open Project
                            </button>
                          ) : (
                            <span className="text-xs text-emerald-400 font-semibold">
                              Currently Editing
                            </span>
                          )}
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Interactive Fullscreen Live Preview Modal (Desktop / Tablet / Mobile) */}
      <TemplatePreviewModal
        template={previewTemplate}
        isOpen={Boolean(previewTemplate)}
        onClose={() => setPreviewTemplate(null)}
        onApplyTemplate={handleApplyTemplate}
      />
    </>
  );
};
