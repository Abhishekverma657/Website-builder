import React, { useState } from 'react';
import {
  X,
  Copy,
  Check,
  Download,
  FileCode,
  FolderTree,
  Braces,
  Sparkles,
  Layers,
  ExternalLink,
} from 'lucide-react';
import { useBuilder } from '../../context/BuilderContext';
import {
  generateCompleteHtml,
  generateReactProjectFiles,
  downloadZipArchive,
} from '../../utils/codeExporter';

interface ExportModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const ExportModal: React.FC<ExportModalProps> = ({ isOpen, onClose }) => {
  const { elements, project } = useBuilder();
  const [activeTab, setActiveTab] = useState<'react-tree' | 'html' | 'json'>('react-tree');
  const [selectedFile, setSelectedFile] = useState<string>('App.jsx');
  const [copied, setCopied] = useState(false);
  const [isExporting, setIsExporting] = useState(false);

  if (!isOpen) return null;

  const projectFiles = generateReactProjectFiles(elements, project.name);
  const htmlData = generateCompleteHtml(elements, project.name);
  const jsonCode = JSON.stringify(elements, null, 2);

  const getFileContent = (filename: string): string => {
    if (filename === 'package.json') return projectFiles.packageJson;
    if (filename === 'vite.config.js') return projectFiles.viteConfig;
    if (filename === 'index.html') return projectFiles.indexHtml;
    if (filename === 'README.md') return projectFiles.readmeMd;
    if (filename === 'main.jsx') return projectFiles.mainJsx;
    if (filename === 'App.jsx') return projectFiles.appJsx;
    if (filename === 'App.css') return projectFiles.appCss;

    const matchedSection = projectFiles.sections.find((s) => `${s.name}.jsx` === filename);
    if (matchedSection) return matchedSection.code;

    return projectFiles.appJsx;
  };

  const getActiveCode = () => {
    switch (activeTab) {
      case 'react-tree':
        return getFileContent(selectedFile);
      case 'html':
        return `<!-- index.html -->\n${htmlData.html}\n\n/* styles.css */\n${htmlData.css}`;
      case 'json':
        return jsonCode;
    }
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(getActiveCode());
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleDownloadZip = async () => {
    try {
      setIsExporting(true);
      await downloadZipArchive(elements, project.name.toLowerCase().replace(/\s+/g, '-'));
    } catch (err) {
      console.error(err);
    } finally {
      setIsExporting(false);
    }
  };

  return (
    <div className="fixed inset-0 z-[99999] flex items-center justify-center bg-black/85 backdrop-blur-md p-4 animate-in fade-in duration-200">
      <div className="relative w-full max-w-5xl bg-[#141822] border border-[#2c3647] rounded-2xl shadow-2xl flex flex-col max-h-[90vh] overflow-hidden text-[#e2e8f0]">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-[#2c3647] bg-[#10131c]">
          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded-xl bg-emerald-600/15 text-emerald-400 border border-emerald-500/25">
              <FolderTree className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h2 className="text-base font-semibold text-white">Full React.js Project Exporter</h2>
                <span className="px-2 py-0.5 rounded text-[10px] font-mono bg-emerald-950/60 text-emerald-400 border border-emerald-800/40 font-bold">
                  100% Static • Zero Backend
                </span>
              </div>
              <p className="text-xs text-gray-400">
                Complete modular React app with Vite, package.json, and responsive components.
              </p>
            </div>
          </div>
          <div className="flex items-center gap-2.5">
            <button
              onClick={handleDownloadZip}
              disabled={isExporting}
              className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-emerald-500 via-teal-500 to-emerald-600 hover:brightness-110 text-white text-xs font-semibold rounded-xl shadow-md transition group"
            >
              <Download className="w-4 h-4 group-hover:-translate-y-0.5 transition" />
              <span>{isExporting ? 'Packaging Project...' : 'Download Full React App ZIP'}</span>
            </button>
            <button
              onClick={onClose}
              className="p-1.5 rounded-lg text-gray-400 hover:text-white hover:bg-[#252f3f] transition"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Tab Switcher & Action bar */}
        <div className="flex items-center justify-between px-6 py-2.5 bg-[#171d28] border-b border-[#263140]">
          <div className="flex items-center gap-2">
            <button
              onClick={() => setActiveTab('react-tree')}
              className={`flex items-center gap-2 px-3 py-1.5 rounded-lg text-xs font-semibold transition ${
                activeTab === 'react-tree'
                  ? 'bg-[#222d3d] text-emerald-400 border border-emerald-500/40 shadow-sm'
                  : 'text-gray-400 hover:text-gray-200'
              }`}
            >
              <FolderTree className="w-3.5 h-3.5" />
              <span>React Folder Explorer</span>
            </button>
            <button
              onClick={() => setActiveTab('html')}
              className={`flex items-center gap-2 px-3 py-1.5 rounded-lg text-xs font-semibold transition ${
                activeTab === 'html'
                  ? 'bg-[#222d3d] text-emerald-400 border border-emerald-500/40 shadow-sm'
                  : 'text-gray-400 hover:text-gray-200'
              }`}
            >
              <FileCode className="w-3.5 h-3.5" />
              <span>Pure HTML5 + CSS</span>
            </button>
            <button
              onClick={() => setActiveTab('json')}
              className={`flex items-center gap-2 px-3 py-1.5 rounded-lg text-xs font-semibold transition ${
                activeTab === 'json'
                  ? 'bg-[#222d3d] text-emerald-400 border border-emerald-500/40 shadow-sm'
                  : 'text-gray-400 hover:text-gray-200'
              }`}
            >
              <Braces className="w-3.5 h-3.5" />
              <span>JSON Schema</span>
            </button>
          </div>

          <button
            onClick={handleCopy}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium text-gray-300 hover:text-white bg-[#202937] hover:bg-[#293649] border border-[#2f3d52] transition"
          >
            {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
            <span>{copied ? 'Copied File!' : `Copy ${activeTab === 'react-tree' ? selectedFile : 'Code'}`}</span>
          </button>
        </div>

        {/* Body Container */}
        <div className="flex-1 flex overflow-hidden">
          {/* File Tree Navigator (When in react-tree mode) */}
          {activeTab === 'react-tree' && (
            <div className="w-64 bg-[#0f131b] border-r border-[#263140] p-3 overflow-y-auto select-none text-xs">
              <div className="text-[10px] font-bold uppercase tracking-wider text-gray-500 mb-2 px-2">
                Project Files
              </div>
              <div className="space-y-0.5 font-mono text-[11px]">
                {/* Root Files */}
                {['package.json', 'vite.config.js', 'index.html', 'README.md'].map((f) => (
                  <button
                    key={f}
                    onClick={() => setSelectedFile(f)}
                    className={`w-full text-left px-2.5 py-1.5 rounded-md flex items-center justify-between transition ${
                      selectedFile === f
                        ? 'bg-emerald-600/20 text-emerald-400 font-semibold border border-emerald-500/30'
                        : 'text-gray-400 hover:bg-[#1a212e] hover:text-gray-200'
                    }`}
                  >
                    <span>{f}</span>
                  </button>
                ))}

                <div className="text-[10px] font-bold uppercase tracking-wider text-gray-500 mt-3 mb-1 px-2">
                  src/
                </div>
                {['App.jsx', 'App.css', 'main.jsx'].map((f) => (
                  <button
                    key={f}
                    onClick={() => setSelectedFile(f)}
                    className={`w-full text-left px-2.5 py-1.5 rounded-md flex items-center justify-between transition ${
                      selectedFile === f
                        ? 'bg-emerald-600/20 text-emerald-400 font-semibold border border-emerald-500/30'
                        : 'text-gray-400 hover:bg-[#1a212e] hover:text-gray-200'
                    }`}
                  >
                    <span>{f}</span>
                  </button>
                ))}

                <div className="text-[10px] font-bold uppercase tracking-wider text-gray-500 mt-3 mb-1 px-2">
                  src/components/
                </div>
                {projectFiles.sections.map((s) => {
                  const filename = `${s.name}.jsx`;
                  return (
                    <button
                      key={filename}
                      onClick={() => setSelectedFile(filename)}
                      className={`w-full text-left px-2.5 py-1.5 rounded-md flex items-center justify-between transition ${
                        selectedFile === filename
                          ? 'bg-emerald-600/20 text-emerald-400 font-semibold border border-emerald-500/30'
                          : 'text-gray-400 hover:bg-[#1a212e] hover:text-gray-200'
                      }`}
                    >
                      <span className="truncate">{filename}</span>
                    </button>
                  );
                })}
              </div>
            </div>
          )}

          {/* Code Viewer */}
          <div className="flex-1 flex flex-col bg-[#0b0e14] overflow-hidden">
            {activeTab === 'react-tree' && (
              <div className="px-4 py-2 border-b border-[#202936] bg-[#0e121a] flex items-center justify-between text-xs font-mono text-gray-400">
                <span className="text-emerald-400 font-semibold">{selectedFile}</span>
                <span className="text-[10px] text-gray-500">Ready to run with Vite &amp; React</span>
              </div>
            )}
            <div className="p-4 flex-1 overflow-auto font-mono text-xs text-gray-300 leading-relaxed select-text custom-scrollbar">
              <pre className="whitespace-pre">{getActiveCode()}</pre>
            </div>
          </div>
        </div>

        {/* Footer Quick Deployment Tip */}
        <div className="px-6 py-3 bg-[#10131c] border-t border-[#263140] flex items-center justify-between text-[11px] text-gray-400">
          <div className="flex items-center gap-2">
            <Sparkles className="w-3.5 h-3.5 text-emerald-400" />
            <span>
              <strong>Zero Backend Required:</strong> Unzip folder, run <code className="text-gray-200 bg-[#1e2533] px-1 rounded">npm install</code>, then <code className="text-gray-200 bg-[#1e2533] px-1 rounded">npm run dev</code>. To deploy free, drag &amp; drop to Netlify or Vercel!
            </span>
          </div>
          <span className="font-mono text-gray-500">Vite 5 • React 18/19</span>
        </div>
      </div>
    </div>
  );
};
