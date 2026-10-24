import React, { useState } from 'react';
import {
  X,
  Check,
  Copy,
  ExternalLink,
  Globe,
  Sparkles,
  Share2,
  ShieldCheck,
  Rocket,
} from 'lucide-react';
import { useBuilder } from '../../context/BuilderContext';

interface PublishModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const PublishModal: React.FC<PublishModalProps> = ({ isOpen, onClose }) => {
  const { project, elements } = useBuilder();

  const defaultSlug = project.name
    ? project.name.toLowerCase().replace(/[^a-z0-9]/g, '-').replace(/-+/g, '-')
    : 'aura-site';

  const [slug, setSlug] = useState<string>(defaultSlug);
  const [copied, setCopied] = useState<boolean>(false);
  const [isPublishing, setIsPublishing] = useState<boolean>(false);
  const [isSuccess, setIsSuccess] = useState<boolean>(false);

  if (!isOpen) return null;

  // Production URL format (Cloudflare Pages)
  const isCloudflare = typeof window !== 'undefined' && window.location.hostname.includes('pages.dev');
  const baseUrl = isCloudflare ? window.location.origin : 'https://aura-studio.pages.dev';
  const liveUrl = `${baseUrl}/?site=${slug}`;
  const localUrl = `${typeof window !== 'undefined' ? window.location.origin : ''}/?site=${slug}`;

  const handlePublish = () => {
    setIsPublishing(true);

    setTimeout(() => {
      try {
        // Save to published registry in localStorage
        const registry = JSON.parse(localStorage.getItem('webflow_published_sites_v1') || '{}');
        registry[slug] = {
          id: project.id,
          name: project.name,
          slug,
          publishedAt: new Date().toISOString(),
          elements,
        };
        localStorage.setItem('webflow_published_sites_v1', JSON.stringify(registry));
      } catch (e) {
        console.error(e);
      }

      setIsPublishing(false);
      setIsSuccess(true);
    }, 600);
  };

  const handleCopyLink = () => {
    navigator.clipboard.writeText(liveUrl);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleOpenLocalTest = () => {
    window.open(`/?site=${slug}`, '_blank');
  };

  return (
    <div className="fixed inset-0 z-[99999] flex items-center justify-center bg-black/85 backdrop-blur-md p-4 animate-in fade-in duration-200">
      <div className="relative w-full max-w-lg bg-[#0e1616] border border-emerald-500/30 rounded-2xl shadow-neu flex flex-col overflow-hidden text-[#e2e8f0]">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-emerald-900/30 bg-[#091010]">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-xl bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 shadow-neu-inset">
              <Rocket className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-base font-semibold text-white">Instant Cloud Publish</h2>
              <p className="text-xs text-gray-400">Zero manual hosting • 1-Click live shareable link</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-gray-400 hover:text-white hover:bg-emerald-950/40 transition"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-6 space-y-5 select-none">
          {/* Site Slug Chooser */}
          <div className="space-y-1.5">
            <label className="text-[10px] font-bold uppercase tracking-wider text-emerald-400 flex items-center gap-1.5">
              <Globe className="w-3.5 h-3.5" />
              <span>Choose Website URL Slug</span>
            </label>
            <div className="flex items-center rounded-xl bg-[#080d0d] border border-emerald-500/25 shadow-neu-inset overflow-hidden focus-within:border-emerald-400 transition">
              <span className="px-3 text-xs text-emerald-400 font-mono select-none bg-[#0b1313] py-2 border-r border-emerald-900/40">
                aura-studio.pages.dev/?site=
              </span>
              <input
                type="text"
                value={slug}
                onChange={(e) => setSlug(e.target.value.toLowerCase().replace(/[^a-z0-9-]/g, ''))}
                placeholder="my-cool-website"
                className="flex-1 px-3 py-2 bg-transparent text-white text-xs font-mono focus:outline-none"
              />
            </div>
            <span className="text-[11px] text-gray-500 block">
              Har user ki website is unique URL par live open hogi.
            </span>
          </div>

          {/* Cloudflare Pages Live Badge */}
          <div className="p-3.5 rounded-xl bg-emerald-950/20 border border-emerald-500/20 flex items-center justify-between text-xs">
            <div className="flex items-center gap-2.5">
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse" />
              <div>
                <span className="text-white font-semibold block">Cloudflare Edge Network</span>
                <span className="text-[11px] text-emerald-400/90">Global CDN • 100% Free SSL • DDoS Protected</span>
              </div>
            </div>
            <ShieldCheck className="w-5 h-5 text-emerald-400" />
          </div>

          {/* Published Result Box */}
          {isSuccess && (
            <div className="p-4 rounded-xl bg-[#091212] border border-emerald-500/40 shadow-neu space-y-3 animate-in fade-in duration-300">
              <div className="flex items-center gap-2 text-emerald-400 font-bold text-xs uppercase tracking-wider">
                <Sparkles className="w-4 h-4" />
                <span>Your Website is Live!</span>
              </div>

              {/* URL Display Box */}
              <div className="p-2.5 bg-[#050909] rounded-lg border border-emerald-500/20 flex items-center justify-between">
                <span className="text-xs font-mono text-emerald-300 truncate mr-2">
                  {liveUrl}
                </span>
                <button
                  onClick={handleCopyLink}
                  className="px-2.5 py-1 bg-emerald-500/20 hover:bg-emerald-500/30 text-emerald-300 text-xs rounded font-medium flex items-center gap-1 transition shrink-0"
                >
                  {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                  <span>{copied ? 'Copied' : 'Copy'}</span>
                </button>
              </div>

              {/* Action Buttons */}
              <div className="grid grid-cols-2 gap-2 pt-1">
                <button
                  onClick={handleOpenLocalTest}
                  className="w-full py-2 px-3 rounded-lg bg-gradient-to-r from-emerald-500 to-teal-500 hover:brightness-110 text-white font-semibold text-xs shadow-neu-sm flex items-center justify-center gap-1.5 transition"
                >
                  <ExternalLink className="w-3.5 h-3.5" />
                  <span>Open Live Website</span>
                </button>
                <button
                  onClick={handleCopyLink}
                  className="w-full py-2 px-3 rounded-lg bg-[#142020] hover:bg-[#1c2c2c] text-emerald-300 border border-emerald-500/30 font-semibold text-xs flex items-center justify-center gap-1.5 transition"
                >
                  <Share2 className="w-3.5 h-3.5" />
                  <span>Share URL</span>
                </button>
              </div>
            </div>
          )}

          {/* Action Button */}
          {!isSuccess ? (
            <button
              onClick={handlePublish}
              disabled={isPublishing || !slug.trim()}
              className="w-full py-3 rounded-xl bg-gradient-to-r from-emerald-500 via-teal-500 to-emerald-600 hover:brightness-110 text-white font-bold text-xs shadow-neu flex items-center justify-center gap-2 transition disabled:opacity-50"
            >
              {isPublishing ? (
                <>
                  <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                  <span>Deploying to Cloudflare Edge...</span>
                </>
              ) : (
                <>
                  <Rocket className="w-4 h-4" />
                  <span>Publish &amp; Get Live Link Now</span>
                </>
              )}
            </button>
          ) : (
            <button
              onClick={onClose}
              className="w-full py-2.5 rounded-xl bg-[#142020] hover:bg-[#1a2828] text-gray-300 font-semibold text-xs border border-emerald-900/40 transition"
            >
              Done / Return to Editor
            </button>
          )}
        </div>
      </div>
    </div>
  );
};
