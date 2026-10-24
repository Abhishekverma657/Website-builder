import React, { useEffect, useState } from 'react';
import { BuilderProvider, useBuilder } from './context/BuilderContext';
import { TopNav } from './components/TopNav/TopNav';
import { LeftSidebar } from './components/LeftSidebar/LeftSidebar';
import { Canvas } from './components/Canvas/Canvas';
import { BreadcrumbBar } from './components/Canvas/BreadcrumbBar';
import { RightSidebar } from './components/RightSidebar/RightSidebar';
import { LiveSiteViewer } from './components/LiveSiteViewer';

const BuilderWorkspace: React.FC = () => {
  const {
    previewMode,
    undo,
    redo,
    deleteElement,
    selectedElementId,
    selectElement,
  } = useBuilder();

  // Keyboard shortcut listener
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      const activeTagName = (document.activeElement?.tagName || '').toLowerCase();
      const isInputActive = ['input', 'textarea'].includes(activeTagName) || document.activeElement?.getAttribute('contenteditable') === 'true';

      // Undo / Redo
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'z') {
        if (e.shiftKey) {
          e.preventDefault();
          redo();
        } else {
          e.preventDefault();
          undo();
        }
      } else if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'y') {
        e.preventDefault();
        redo();
      }

      // Delete key
      if (!isInputActive && (e.key === 'Delete' || e.key === 'Backspace') && selectedElementId) {
        e.preventDefault();
        deleteElement(selectedElementId);
      }

      // Escape key to deselect
      if (e.key === 'Escape') {
        selectElement(null);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [undo, redo, deleteElement, selectedElementId, selectElement]);

  return (
    <div className="flex flex-col h-screen w-screen overflow-hidden select-none bg-[#0a1010] text-[#e2e8f0]">
      {/* Top Navigation */}
      <TopNav />

      {/* Main Workspace Body */}
      <div className="flex-1 flex overflow-hidden relative">
        {/* Left Sidebar (Navigator, Elements, Pages, Assets) */}
        {!previewMode && <LeftSidebar />}

        {/* Center Interactive Responsive Canvas with Bottom Breadcrumbs */}
        <div className="flex-1 flex flex-col h-full overflow-hidden relative">
          <Canvas />
          {!previewMode && <BreadcrumbBar />}
        </div>

        {/* Right Sidebar (Webflow CSS Style Inspector & Settings) */}
        {!previewMode && <RightSidebar />}
      </div>
    </div>
  );
};

const getSlugFromLocation = (): string | null => {
  const searchParams = new URLSearchParams(window.location.search);
  if (searchParams.has('view')) return searchParams.get('view');
  if (searchParams.has('site')) return searchParams.get('site');
  const hash = window.location.hash;
  if (hash.startsWith('#/view/')) return hash.replace('#/view/', '');
  if (hash.startsWith('#view=')) return hash.replace('#view=', '');
  if (hash.startsWith('#site=')) return hash.replace('#site=', '');
  if (window.location.pathname.startsWith('/sites/')) {
    const parts = window.location.pathname.split('/');
    if (parts[2]) return parts[2];
  }
  return null;
};

export default function App() {
  // Check for live viewer routing: ?site=slug, ?view=slug, or #/view/slug
  const [viewSlug, setViewSlug] = useState<string | null>(getSlugFromLocation);

  useEffect(() => {
    const handleHashChange = () => {
      setViewSlug(getSlugFromLocation());
    };

    window.addEventListener('popstate', handleHashChange);
    window.addEventListener('hashchange', handleHashChange);
    return () => {
      window.removeEventListener('popstate', handleHashChange);
      window.removeEventListener('hashchange', handleHashChange);
    };
  }, []);

  // If in view mode, render standalone live website directly wrapped in BuilderProvider with live preview active
  if (viewSlug) {
    return (
      <BuilderProvider initialPreviewMode={true}>
        <LiveSiteViewer siteSlug={viewSlug} />
      </BuilderProvider>
    );
  }

  // Otherwise, render full visual builder workspace
  return (
    <BuilderProvider>
      <BuilderWorkspace />
    </BuilderProvider>
  );
}
