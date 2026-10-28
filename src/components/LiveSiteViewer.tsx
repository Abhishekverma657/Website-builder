import React, { useEffect, useState } from 'react';
import { BuilderElement, Breakpoint } from '../types/builder';
import { ElementRenderer } from './Canvas/ElementRenderer';
import {
  ArrowLeft,
  ArrowUp,
  Sparkles,
  CheckCircle,
  ShoppingBag,
  Info,
  X,
} from 'lucide-react';
import { FULL_TEMPLATES_CATALOG } from '../templates/templatesCatalog';
import { initialElements } from '../templates/initialProject';
import { WebsiteTemplate } from '../templates/types';
import { BreakpointOverrideContext, PreviewOverrideContext } from '../context/BuilderContext';

const safeGetLocalStorage = (key: string): string | null => {
  try {
    return typeof window !== 'undefined' && window.localStorage ? window.localStorage.getItem(key) : null;
  } catch (e) {
    return null;
  }
};

interface LiveSiteViewerProps {
  siteSlug: string;
}

const clean = (s: string) => s.toLowerCase().replace(/[^a-z0-9]/g, '');
const toSlug = (s: string) =>
  s
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '');

function findTemplateBySlug(slug: string, catalog: WebsiteTemplate[]): WebsiteTemplate | undefined {
  if (!slug) return undefined;
  const target = slug.trim().toLowerCase();
  const targetClean = clean(target);
  const targetSlug = toSlug(target);

  // 1. Exact ID match (e.g. 'ecom-velvet' === 'ecom-velvet')
  let found = catalog.find((t) => t.id.toLowerCase() === target);
  if (found) return found;

  // 2. ID clean match (e.g. 'ecomvelvet' === 'ecomvelvet')
  found = catalog.find((t) => clean(t.id) === targetClean);
  if (found) return found;

  // 3. Name slug match (e.g. toSlug('Velvet & Clay') -> 'velvet-clay' === 'velvet-clay')
  found = catalog.find((t) => toSlug(t.name || '') === targetSlug);
  if (found) return found;

  // 4. Clean Name match (e.g. clean('Velvet & Clay') -> 'velvetclay' === 'velvetclay')
  found = catalog.find((t) => clean(t.name || '') === targetClean);
  if (found) return found;

  // 5. Match without category prefix on id (e.g. 'ecom-velvet' -> 'velvet' vs 'velvet-clay')
  found = catalog.find((t) => {
    const idWithoutCategory = t.id.replace(/^[a-z]+-/, '');
    return targetSlug.includes(idWithoutCategory) || idWithoutCategory.includes(targetSlug);
  });
  if (found) return found;

  // 6. Substring match on name or ID
  found = catalog.find((t) => {
    const tClean = clean(t.name || '');
    const tIdClean = clean(t.id);
    return (
      (targetClean.length >= 3 && (tClean.includes(targetClean) || targetClean.includes(tClean))) ||
      (targetClean.length >= 3 && (tIdClean.includes(targetClean) || targetClean.includes(tIdClean)))
    );
  });
  if (found) return found;

  return undefined;
}

interface ToastItem {
  id: string;
  type: 'success' | 'cart' | 'info';
  title: string;
  message: string;
}

export const LiveSiteViewer: React.FC<LiveSiteViewerProps> = ({ siteSlug }) => {
  const [elements, setElements] = useState<BuilderElement[] | null>(null);
  const [siteName, setSiteName] = useState<string>('Live Site');
  const [isDarkTheme, setIsDarkTheme] = useState<boolean>(true);
  const [loading, setLoading] = useState<boolean>(true);
  const [showBackToTop, setShowBackToTop] = useState<boolean>(false);
  const [toasts, setToasts] = useState<ToastItem[]>([]);
  const [liveBreakpoint, setLiveBreakpoint] = useState<Breakpoint>(() => {
    if (typeof window === 'undefined') return 'desktop';
    const w = window.innerWidth;
    if (w < 768) return 'mobile';
    if (w < 1024) return 'tablet';
    return 'desktop';
  });

  useEffect(() => {
    const handleResize = () => {
      const w = window.innerWidth;
      if (w < 768) setLiveBreakpoint('mobile');
      else if (w < 1024) setLiveBreakpoint('tablet');
      else setLiveBreakpoint('desktop');
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useEffect(() => {
    try {
      // 1. Look in 50+ Prebuilt Templates catalog FIRST (instant zero-storage lookup)
      const foundTemplate = findTemplateBySlug(siteSlug, FULL_TEMPLATES_CATALOG);
      if (foundTemplate && foundTemplate.elements && foundTemplate.elements.length > 0) {
        setElements(foundTemplate.elements);
        setSiteName(foundTemplate.name);
        setIsDarkTheme(Boolean(foundTemplate.darkTheme));
        setLoading(false);
        return;
      }

      // 2. Fallback for initial project / aura studio
      const targetSlug = toSlug(siteSlug);
      if (
        targetSlug === 'aura-site' ||
        targetSlug === 'aura-studio' ||
        targetSlug === 'aura' ||
        targetSlug === 'default'
      ) {
        setElements(initialElements);
        setSiteName('Aura Studio');
        setIsDarkTheme(false);
        setLoading(false);
        return;
      }

      // 3. Look in published sites registry (from local publish, safely guarded)
      const publishedRegistry = safeGetLocalStorage('webflow_published_sites_v1');
      if (publishedRegistry) {
        try {
          const parsed = JSON.parse(publishedRegistry);
          if (parsed[siteSlug]) {
            setElements(parsed[siteSlug].elements);
            setSiteName(parsed[siteSlug].name || siteSlug);
            setLoading(false);
            return;
          }

          // Fuzzy match across published registry keys
          const targetClean = clean(siteSlug);
          const foundKey = Object.keys(parsed).find(
            (k) => clean(k) === targetClean || toSlug(k) === targetSlug
          );
          if (foundKey && parsed[foundKey]) {
            setElements(parsed[foundKey].elements);
            setSiteName(parsed[foundKey].name || foundKey);
            setLoading(false);
            return;
          }
        } catch (err) {
          console.warn(err);
        }
      }

      // 4. Fallback to active projects
      const storedProjects =
        safeGetLocalStorage('webflow_saved_projects_v2') ||
        safeGetLocalStorage('webflow_saved_projects_v1');
      if (storedProjects) {
        try {
          const list = JSON.parse(storedProjects);
          const found = list.find((p: any) => {
            const pNameSlug = toSlug(p.name || '');
            const pClean = clean(p.name || '');
            return (
              p.id === siteSlug ||
              pNameSlug === targetSlug ||
              pClean === clean(siteSlug)
            );
          });
          if (found && found.pages && found.pages[0]) {
            setElements(found.pages[0].elements);
            setSiteName(found.name);
            setLoading(false);
            return;
          }
        } catch (err) {
          console.warn(err);
        }
      }
    } catch (e) {
      console.error(e);
    }
    setLoading(false);
  }, [siteSlug]);

  // Set document title dynamically
  useEffect(() => {
    if (siteName) {
      document.title = siteName;
    }
  }, [siteName]);

  // Track window scroll for "Back to Top" button
  useEffect(() => {
    const handleScroll = () => {
      setShowBackToTop(window.scrollY > 350);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Listen to interactive toasts dispatched by buttons / forms
  useEffect(() => {
    const handleToastEvent = (e: Event) => {
      const customEvent = e as CustomEvent<{
        type?: 'success' | 'cart' | 'info';
        title?: string;
        message?: string;
      }>;
      const detail = customEvent.detail;
      if (!detail) return;

      const newToast: ToastItem = {
        id: `toast-${Date.now()}-${Math.random()}`,
        type: detail.type || 'success',
        title: detail.title || 'Action Completed',
        message: detail.message || 'Your action was successful.',
      };

      setToasts((prev) => [...prev, newToast]);

      // Auto-dismiss after 3.5 seconds
      setTimeout(() => {
        setToasts((prev) => prev.filter((t) => t.id !== newToast.id));
      }, 3500);
    };

    window.addEventListener('aura:toast', handleToastEvent);
    return () => window.removeEventListener('aura:toast', handleToastEvent);
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen bg-[#070b0b] text-emerald-400 flex flex-col items-center justify-center font-sans">
        <div className="w-10 h-10 border-2 border-emerald-500 border-t-transparent rounded-full animate-spin mb-4" />
        <p className="text-sm tracking-wide text-gray-300">Loading published website...</p>
      </div>
    );
  }

  if (!elements || elements.length === 0) {
    return (
      <div className="min-h-screen bg-[#070b0b] text-white flex flex-col items-center justify-center p-6 text-center font-sans">
        <div className="p-4 rounded-2xl bg-[#0e1717] border border-emerald-500/20 shadow-neu mb-4 text-emerald-400">
          <Sparkles className="w-8 h-8" />
        </div>
        <h2 className="text-xl font-bold mb-2">Website Not Found</h2>
        <p className="text-sm text-gray-400 max-w-md mb-5">
          No published website found for slug:{' '}
          <span className="font-mono text-emerald-400">"{siteSlug}"</span>.
        </p>

        <div className="flex items-center gap-3 mb-8">
          <button
            onClick={() => {
              window.location.hash = '';
              window.location.search = '';
            }}
            className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-emerald-500 to-teal-500 text-white font-semibold text-xs shadow-neu hover:brightness-110 transition flex items-center gap-2"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Open Studio Builder</span>
          </button>
        </div>

        {/* Quick Launch Showcase of Popular Templates */}
        <div className="w-full max-w-xl bg-[#0c1414] border border-emerald-500/25 rounded-2xl p-5 text-left shadow-2xl">
          <div className="flex items-center justify-between mb-3 border-b border-emerald-950/80 pb-2">
            <span className="text-[11px] font-bold text-emerald-400 uppercase tracking-wider">
              Explore Available Live Templates
            </span>
            <span className="text-[10px] text-gray-400">50+ Templates Ready</span>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
            {FULL_TEMPLATES_CATALOG.slice(0, 6).map((t) => (
              <button
                key={t.id}
                onClick={() => {
                  window.location.search = `?site=${toSlug(t.name || t.id)}`;
                }}
                className="p-2.5 rounded-xl bg-[#080d0d] hover:bg-[#121c1c] border border-emerald-950/60 hover:border-emerald-500/40 text-left transition flex items-center justify-between group"
              >
                <div>
                  <div className="text-xs font-semibold text-white group-hover:text-emerald-300">
                    {t.name}
                  </div>
                  <div className="text-[10px] text-gray-400">{t.category}</div>
                </div>
                <span className="text-[10px] font-mono text-emerald-400">View →</span>
              </button>
            ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div
      className={`min-h-screen w-full transition-colors duration-300 ${
        isDarkTheme ? 'bg-[#080d12] text-white' : 'bg-white text-gray-900'
      } selection:bg-emerald-500 selection:text-white`}
      style={{ scrollBehavior: 'smooth' }}
    >
      {/* Floating Real-time Interactive Toasts Container */}
      <div className="fixed top-5 left-1/2 -translate-x-1/2 z-[100000] flex flex-col items-center gap-2 pointer-events-none w-full max-w-md px-4">
        {toasts.map((toast) => (
          <div
            key={toast.id}
            className="pointer-events-auto flex items-start gap-3 p-3.5 bg-[#091212]/95 backdrop-blur-xl border border-emerald-500/40 text-white rounded-2xl shadow-2xl animate-in fade-in slide-in-from-top-4 duration-300 w-full"
          >
            <div className="p-2 rounded-xl bg-emerald-500/15 text-emerald-400 border border-emerald-500/30 shrink-0">
              {toast.type === 'cart' ? (
                <ShoppingBag className="w-4 h-4" />
              ) : toast.type === 'info' ? (
                <Info className="w-4 h-4" />
              ) : (
                <CheckCircle className="w-4 h-4" />
              )}
            </div>
            <div className="flex-1 min-w-0 pt-0.5">
              <h4 className="text-xs font-bold text-white tracking-wide">{toast.title}</h4>
              <p className="text-[11px] text-gray-300 leading-relaxed mt-0.5">{toast.message}</p>
            </div>
            <button
              onClick={() => setToasts((prev) => prev.filter((t) => t.id !== toast.id))}
              className="text-gray-400 hover:text-white p-1"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          </div>
        ))}
      </div>

      {/* Floating Back to Top Button */}
      {showBackToTop && (
        <button
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          title="Back to Top"
          className="fixed bottom-5 left-5 z-[9999] p-3 rounded-full bg-[#0d1616]/90 hover:bg-[#152323] text-emerald-400 border border-emerald-500/30 shadow-2xl backdrop-blur-md transition-all duration-200 hover:scale-110 active:scale-95 animate-in fade-in zoom-in-75"
        >
          <ArrowUp className="w-4 h-4" />
        </button>
      )}

      {/* Render the full interactive website sections with pure preview and responsive breakpoint */}
      <PreviewOverrideContext.Provider value={true}>
        <BreakpointOverrideContext.Provider value={liveBreakpoint}>
          <main className="w-full relative">
            {elements.map((el) => (
              <ElementRenderer key={el.id} element={el} />
            ))}
          </main>
        </BreakpointOverrideContext.Provider>
      </PreviewOverrideContext.Provider>
    </div>
  );
};
