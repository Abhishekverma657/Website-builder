import React, { useRef } from 'react';
import { useBuilder } from '../../context/BuilderContext';
import {
  Sliders,
  Link as LinkIcon,
  Image as ImageIcon,
  Tag,
  Upload,
  Video as VideoIcon,
  ExternalLink,
  Layers,
  Hash,
  Mail,
  Phone,
  Send,
  Globe,
  Database,
} from 'lucide-react';
import { LinkType } from '../../types/builder';

export const SettingsPanel: React.FC = () => {
  const {
    project,
    activePage,
    selectedElement,
    updateElementName,
    updateElementContent,
    updateElementAttributes,
    updateElementLinkSettings,
  } = useBuilder();

  const fileInputRef = useRef<HTMLInputElement>(null);
  const videoInputRef = useRef<HTMLInputElement>(null);

  if (!selectedElement) {
    return (
      <div className="h-full flex flex-col items-center justify-center p-6 text-center text-gray-500">
        <Sliders className="w-10 h-10 mb-2 text-gray-600" />
        <p className="text-xs font-semibold text-gray-400">No Element Selected</p>
        <p className="text-[11px] text-gray-600 mt-1 max-w-[200px]">
          Select an element to configure its links, images, properties, and attributes.
        </p>
      </div>
    );
  }

  const attrs = selectedElement.attributes || {};
  const linkSettings = selectedElement.linkSettings || {
    type: 'url',
    url: attrs.href || '',
    openInNewTab: attrs.target === '_blank',
  };

  const handleAttrChange = (key: string, val: string) => {
    updateElementAttributes(selectedElement.id, { [key]: val });
  };

  // Find all sections on the current page for anchor link dropdown
  const sectionList: { id: string; name: string }[] = [];
  const findSections = (list: typeof activePage.elements) => {
    list.forEach((el) => {
      if (el.tag === 'section' || el.type === 'section' || el.id.includes('section')) {
        sectionList.push({ id: el.id, name: el.name });
      }
      if (el.children) findSections(el.children);
    });
  };
  findSections(activePage.elements);

  const handleLinkTypeChange = (type: LinkType) => {
    updateElementLinkSettings(selectedElement.id, {
      ...linkSettings,
      type,
    });
  };

  const handleImageFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = () => {
      const dataUrl = reader.result as string;
      updateElementAttributes(selectedElement.id, {
        src: dataUrl,
        alt: file.name,
      });
    };
    reader.readAsDataURL(file);
    if (fileInputRef.current) fileInputRef.current.value = '';
  };

  const handleVideoFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = () => {
      const dataUrl = reader.result as string;
      updateElementAttributes(selectedElement.id, {
        src: dataUrl,
      });
    };
    reader.readAsDataURL(file);
    if (videoInputRef.current) videoInputRef.current.value = '';
  };

  const isLinkable =
    ['a', 'button'].includes(selectedElement.tag) ||
    ['link', 'button', 'card', 'badge'].includes(selectedElement.type);

  return (
    <div className="h-full flex flex-col bg-[#171c26] text-xs text-gray-300 select-none overflow-y-auto custom-scrollbar p-3 space-y-4">
      {/* 1. Element Identification */}
      <div className="space-y-2">
        <div className="text-[10px] font-bold uppercase tracking-wider text-gray-400 flex items-center gap-1">
          <Tag className="w-3 h-3 text-emerald-400" />
          <span>Element Identification</span>
        </div>

        <div>
          <label className="text-[9px] text-gray-500 uppercase">Label / Name</label>
          <input
            type="text"
            value={selectedElement.name}
            onChange={(e) => updateElementName(selectedElement.id, e.target.value)}
            className="w-full mt-1 px-2.5 py-1.5 bg-[#121620] border border-[#273142] rounded text-xs text-white focus:outline-none focus:border-emerald-500"
          />
        </div>

        <div>
          <label className="text-[9px] text-gray-500 uppercase">HTML Tag</label>
          <div className="mt-1 px-2.5 py-1.5 bg-[#121620] border border-[#273142] rounded text-xs text-gray-400 font-mono">
            &lt;{selectedElement.tag}&gt; • ID: #{selectedElement.id}
          </div>
        </div>
      </div>

      {/* 2. Text Content Editor */}
      {selectedElement.content !== undefined && (
        <div className="space-y-1.5">
          <label className="text-[10px] font-bold uppercase tracking-wider text-gray-400">
            Text Content
          </label>
          <textarea
            rows={3}
            value={selectedElement.content}
            onChange={(e) => updateElementContent(selectedElement.id, e.target.value)}
            className="w-full px-2.5 py-1.5 bg-[#121620] border border-[#273142] rounded text-xs text-white focus:outline-none focus:border-emerald-500 font-sans"
          />
          <span className="text-[10px] text-gray-500 block">
            Tip: Double-click text directly on the canvas to edit inline.
          </span>
        </div>
      )}

      {/* 3. Image Upload & Replacement */}
      {selectedElement.tag === 'img' && (
        <div className="space-y-2.5 p-3 bg-[#121620] rounded-xl border border-[#273142]">
          <div className="text-[10px] font-bold uppercase tracking-wider text-emerald-400 flex items-center gap-1">
            <ImageIcon className="w-3.5 h-3.5" />
            <span>Image Asset Settings</span>
          </div>

          {/* Current Image Preview */}
          {attrs.src && (
            <div className="relative rounded-lg overflow-hidden border border-[#2c3647] aspect-video bg-black/40">
              <img src={attrs.src} alt={attrs.alt || ''} className="w-full h-full object-cover" />
            </div>
          )}

          {/* Direct File Upload */}
          <input
            ref={fileInputRef}
            type="file"
            accept="image/*"
            onChange={handleImageFileUpload}
            className="hidden"
          />
          <button
            onClick={() => fileInputRef.current?.click()}
            className="w-full flex items-center justify-center gap-2 px-3 py-2 bg-emerald-600 hover:bg-emerald-500 text-white rounded-lg text-xs font-semibold shadow transition"
          >
            <Upload className="w-3.5 h-3.5" />
            <span>Upload Image from Device</span>
          </button>

          <div>
            <label className="text-[9px] text-gray-500 uppercase">Image URL (src)</label>
            <input
              type="text"
              value={attrs.src || ''}
              onChange={(e) => handleAttrChange('src', e.target.value)}
              placeholder="https://..."
              className="w-full mt-1 px-2.5 py-1.5 bg-[#0f131a] border border-[#273142] rounded text-xs text-white focus:outline-none font-mono"
            />
          </div>

          <div>
            <label className="text-[9px] text-gray-500 uppercase">Alt Text</label>
            <input
              type="text"
              value={attrs.alt || ''}
              onChange={(e) => handleAttrChange('alt', e.target.value)}
              placeholder="Descriptive label for accessibility"
              className="w-full mt-1 px-2.5 py-1.5 bg-[#0f131a] border border-[#273142] rounded text-xs text-white focus:outline-none"
            />
          </div>
        </div>
      )}

      {/* 4. Video Upload & Settings */}
      {selectedElement.tag === 'video' && (
        <div className="space-y-2.5 p-3 bg-[#121620] rounded-xl border border-[#273142]">
          <div className="text-[10px] font-bold uppercase tracking-wider text-emerald-400 flex items-center gap-1">
            <VideoIcon className="w-3.5 h-3.5" />
            <span>Video Settings</span>
          </div>

          <input
            ref={videoInputRef}
            type="file"
            accept="video/*"
            onChange={handleVideoFileUpload}
            className="hidden"
          />
          <button
            onClick={() => videoInputRef.current?.click()}
            className="w-full flex items-center justify-center gap-2 px-3 py-2 bg-emerald-600 hover:bg-emerald-500 text-white rounded-lg text-xs font-semibold shadow transition"
          >
            <Upload className="w-3.5 h-3.5" />
            <span>Upload Video from Device</span>
          </button>

          <div>
            <label className="text-[9px] text-gray-500 uppercase">Video URL (src)</label>
            <input
              type="text"
              value={attrs.src || ''}
              onChange={(e) => handleAttrChange('src', e.target.value)}
              placeholder="https://... (.mp4)"
              className="w-full mt-1 px-2.5 py-1.5 bg-[#0f131a] border border-[#273142] rounded text-xs text-white focus:outline-none font-mono"
            />
          </div>
        </div>
      )}

      {/* 5. Webflow-Style Link Settings (Navigation on Click) */}
      {isLinkable && (
        <div className="space-y-3 p-3 bg-[#121620] rounded-xl border border-[#273142]">
          <div className="text-[10px] font-bold uppercase tracking-wider text-emerald-400 flex items-center gap-1">
            <LinkIcon className="w-3.5 h-3.5" />
            <span>Link &amp; Click Navigation</span>
          </div>

          {/* Link Type Selector Tabs */}
          <div className="grid grid-cols-4 gap-1 bg-[#0d1017] p-1 rounded-lg border border-[#222a36]">
            {[
              { type: 'page' as LinkType, label: 'Page', icon: Layers },
              { type: 'section' as LinkType, label: 'Section', icon: Hash },
              { type: 'url' as LinkType, label: 'URL', icon: ExternalLink },
              { type: 'email' as LinkType, label: 'Email', icon: Mail },
            ].map((t) => {
              const Icon = t.icon;
              const isActive = (linkSettings.type || 'url') === t.type;
              return (
                <button
                  key={t.type}
                  onClick={() => handleLinkTypeChange(t.type)}
                  className={`flex flex-col items-center py-1.5 rounded text-[10px] font-medium transition ${
                    isActive
                      ? 'bg-emerald-600 text-white shadow'
                      : 'text-gray-400 hover:text-white hover:bg-[#1a212d]'
                  }`}
                >
                  <Icon className="w-3 h-3 mb-0.5" />
                  <span>{t.label}</span>
                </button>
              );
            })}
          </div>

          {/* Link Type: Page (Internal Page Navigation) */}
          {linkSettings.type === 'page' && (
            <div>
              <label className="text-[9px] text-gray-500 uppercase">Choose Page</label>
              <select
                value={linkSettings.pageId || activePage.id}
                onChange={(e) =>
                  updateElementLinkSettings(selectedElement.id, {
                    ...linkSettings,
                    pageId: e.target.value,
                  })
                }
                className="w-full mt-1 px-2.5 py-1.5 bg-[#0f131a] border border-[#273142] rounded text-xs text-white focus:outline-none cursor-pointer"
              >
                {project.pages.map((p) => (
                  <option key={p.id} value={p.id}>
                    {p.name} ({p.slug})
                  </option>
                ))}
              </select>
            </div>
          )}

          {/* Link Type: Section (Anchor on Page) */}
          {linkSettings.type === 'section' && (
            <div>
              <label className="text-[9px] text-gray-500 uppercase">Scroll to Section</label>
              <select
                value={linkSettings.sectionId || ''}
                onChange={(e) =>
                  updateElementLinkSettings(selectedElement.id, {
                    ...linkSettings,
                    sectionId: e.target.value,
                  })
                }
                className="w-full mt-1 px-2.5 py-1.5 bg-[#0f131a] border border-[#273142] rounded text-xs text-white focus:outline-none cursor-pointer"
              >
                <option value="">Select a section...</option>
                {sectionList.map((s) => (
                  <option key={s.id} value={s.id}>
                    #{s.id} ({s.name})
                  </option>
                ))}
              </select>
            </div>
          )}

          {/* Link Type: External URL */}
          {linkSettings.type === 'url' && (
            <div>
              <label className="text-[9px] text-gray-500 uppercase">Web Address (URL)</label>
              <input
                type="text"
                value={linkSettings.url || ''}
                onChange={(e) => {
                  const url = e.target.value;
                  updateElementLinkSettings(selectedElement.id, { ...linkSettings, url });
                  handleAttrChange('href', url);
                }}
                placeholder="https://example.com"
                className="w-full mt-1 px-2.5 py-1.5 bg-[#0f131a] border border-[#273142] rounded text-xs text-white focus:outline-none font-mono"
              />
            </div>
          )}

          {/* Link Type: Email */}
          {linkSettings.type === 'email' && (
            <div>
              <label className="text-[9px] text-gray-500 uppercase">Email Address</label>
              <input
                type="email"
                value={linkSettings.email || ''}
                onChange={(e) =>
                  updateElementLinkSettings(selectedElement.id, {
                    ...linkSettings,
                    email: e.target.value,
                  })
                }
                placeholder="hello@studioaura.com"
                className="w-full mt-1 px-2.5 py-1.5 bg-[#0f131a] border border-[#273142] rounded text-xs text-white focus:outline-none font-mono"
              />
            </div>
          )}

          {/* Open in new tab checkbox */}
          <label className="flex items-center gap-2 cursor-pointer pt-1 text-gray-300">
            <input
              type="checkbox"
              checked={linkSettings.openInNewTab || false}
              onChange={(e) => {
                const openInNewTab = e.target.checked;
                updateElementLinkSettings(selectedElement.id, {
                  ...linkSettings,
                  openInNewTab,
                });
                handleAttrChange('target', openInNewTab ? '_blank' : '_self');
              }}
              className="rounded bg-[#0f131a] border-gray-700 text-emerald-500 focus:ring-0"
            />
            <span className="text-[11px]">Open in new window / tab</span>
          </label>
        </div>
      )}

      {/* 5. Form Zero-Backend Handler Settings */}
      {selectedElement.tag === 'form' && (
        <div className="space-y-3 p-3 bg-[#121620] rounded-xl border border-[#273142]">
          <div className="text-[10px] font-bold uppercase tracking-wider text-emerald-400 flex items-center gap-1.5">
            <Send className="w-3.5 h-3.5" />
            <span>Form Zero-Backend Action</span>
          </div>
          <p className="text-[10px] text-gray-400 leading-normal">
            Receive messages without writing any backend server code. Use Formspree, Formkeep, or any Webhook URL.
          </p>

          <div>
            <label className="text-[9px] text-gray-500 uppercase">Action URL / Webhook Endpoint</label>
            <input
              type="text"
              value={attrs.action || ''}
              onChange={(e) => handleAttrChange('action', e.target.value)}
              placeholder="https://formspree.io/f/your_form_id"
              className="w-full mt-1 px-2.5 py-1.5 bg-[#0f131a] border border-[#273142] rounded text-xs text-white focus:outline-none font-mono"
            />
          </div>

          <div className="grid grid-cols-2 gap-2">
            <div>
              <label className="text-[9px] text-gray-500 uppercase">Method</label>
              <select
                value={attrs.method || 'POST'}
                onChange={(e) => handleAttrChange('method', e.target.value)}
                className="w-full mt-1 px-2 py-1.5 bg-[#0f131a] border border-[#273142] rounded text-xs text-white focus:outline-none"
              >
                <option value="POST">POST</option>
                <option value="GET">GET</option>
              </select>
            </div>
            <div>
              <label className="text-[9px] text-gray-500 uppercase">Redirect After Submit</label>
              <input
                type="text"
                value={attrs['data-redirect'] || ''}
                onChange={(e) => handleAttrChange('data-redirect', e.target.value)}
                placeholder="/thank-you"
                className="w-full mt-1 px-2 py-1.5 bg-[#0f131a] border border-[#273142] rounded text-xs text-white focus:outline-none font-mono"
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
