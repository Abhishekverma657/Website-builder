import React, { createContext, useContext, useState, useEffect, useCallback, useMemo } from 'react';
import {
  BuilderElement,
  Breakpoint,
  ElementStyles,
  Page,
  Project,
  ElementType,
  Asset,
  LinkSettings,
} from '../types/builder';
import { initialProject } from '../templates/initialProject';
import { createNewElement, createPrebuiltSection, PrebuiltSectionKey } from '../utils/defaultStyles';

const STORAGE_PROJECTS_KEY = 'webflow_saved_projects_v2';
const STORAGE_CURRENT_PROJECT_KEY = 'webflow_active_project_id_v2';

export const BreakpointOverrideContext = createContext<Breakpoint | null>(null);
export const PreviewOverrideContext = createContext<boolean | null>(null);

export const useEffectiveBreakpoint = (): Breakpoint => {
  const override = useContext(BreakpointOverrideContext);
  const context = useContext(BuilderContext);
  if (override !== null && override !== undefined) return override;
  return context?.activeBreakpoint || 'desktop';
};

export const useEffectivePreviewMode = (): boolean => {
  const override = useContext(PreviewOverrideContext);
  const context = useContext(BuilderContext);
  if (override !== null && override !== undefined) return override;
  return context?.previewMode || false;
};

interface BuilderContextType {
  project: Project;
  savedProjects: Project[];
  activePage: Page;
  elements: BuilderElement[];
  selectedElementId: string | null;
  selectedElement: BuilderElement | null;
  hoveredElementId: string | null;
  activeBreakpoint: Breakpoint;
  zoom: number;
  previewMode: boolean;
  activeLeftTab: 'add' | 'navigator' | 'pages' | 'assets';
  canUndo: boolean;
  canRedo: boolean;

  // Actions
  selectElement: (id: string | null) => void;
  hoverElement: (id: string | null) => void;
  setBreakpoint: (bp: Breakpoint) => void;
  setZoom: (zoom: number) => void;
  setPreviewMode: (preview: boolean) => void;
  setActiveLeftTab: (tab: 'add' | 'navigator' | 'pages' | 'assets') => void;
  updateElementStyles: (id: string, styles: Partial<ElementStyles>) => void;
  updateElementContent: (id: string, content: string) => void;
  updateElementAttributes: (id: string, attributes: Record<string, string>) => void;
  updateElementLinkSettings: (id: string, linkSettings: LinkSettings) => void;
  updateElementName: (id: string, name: string) => void;
  addElement: (type: ElementType, targetId?: string | null) => void;
  addPrebuiltSection: (key: PrebuiltSectionKey) => void;
  deleteElement: (id: string) => void;
  duplicateElement: (id: string) => void;
  moveElement: (draggedId: string, targetParentId: string | null, targetIndex: number) => void;
  moveElementUp: (id: string) => void;
  moveElementDown: (id: string) => void;
  toggleLock: (id: string) => void;
  toggleHide: (id: string) => void;
  switchPage: (pageId: string) => void;
  addPage: (name: string, slug: string) => void;
  addAsset: (asset: Asset) => void;
  deleteAsset: (assetId: string) => void;
  loadProject: (project: Project) => void;
  resetToDefaultResponsiveTemplate: () => void;
  setSavedProjects: (projects: Project[]) => void;
  undo: () => void;
  redo: () => void;
}

const BuilderContext = createContext<BuilderContextType | undefined>(undefined);

const findElementById = (
  elements: BuilderElement[],
  id: string
): BuilderElement | null => {
  for (const el of elements) {
    if (el.id === id) return el;
    if (el.children && el.children.length > 0) {
      const found = findElementById(el.children, id);
      if (found) return found;
    }
  }
  return null;
};

const cloneElements = (elements: BuilderElement[]): BuilderElement[] => {
  return JSON.parse(JSON.stringify(elements));
};

const CONTAINER_TYPES: ElementType[] = [
  'section',
  'container',
  'div',
  'grid',
  'columns',
  'card',
  'navbar',
  'footer',
  'form',
];

export const BuilderProvider: React.FC<{
  children: React.ReactNode;
  initialPreviewMode?: boolean;
}> = ({ children, initialPreviewMode = false }) => {
  // Load from localStorage or fallback to initialProject
  const [savedProjects, setSavedProjectsState] = useState<Project[]>(() => {
    try {
      const stored = localStorage.getItem(STORAGE_PROJECTS_KEY);
      if (stored) {
        const parsed = JSON.parse(stored);
        if (Array.isArray(parsed) && parsed.length > 0) return parsed;
      }
    } catch (e) {
      console.error(e);
    }
    return [initialProject];
  });

  const [project, setProject] = useState<Project>(() => {
    try {
      const storedActiveId = localStorage.getItem(STORAGE_CURRENT_PROJECT_KEY);
      if (storedActiveId) {
        const found = savedProjects.find((p) => p.id === storedActiveId);
        if (found) return found;
      }
    } catch (e) {
      console.error(e);
    }
    return savedProjects[0] || initialProject;
  });

  const [selectedElementId, setSelectedElementId] = useState<string | null>(initialPreviewMode ? null : 'hero-headline');
  const [hoveredElementId, setHoveredElementId] = useState<string | null>(null);
  const [activeBreakpoint, setActiveBreakpoint] = useState<Breakpoint>('desktop');
  const [zoom, setZoom] = useState<number>(100);
  const [previewMode, setPreviewMode] = useState<boolean>(initialPreviewMode);
  const [activeLeftTab, setActiveLeftTab] = useState<'add' | 'navigator' | 'pages' | 'assets'>('navigator');

  // In preview or live mode, automatically adapt breakpoint to current device screen width
  useEffect(() => {
    if (!previewMode) return;
    const handleResize = () => {
      const w = window.innerWidth;
      if (w < 768) {
        setActiveBreakpoint('mobile');
      } else if (w < 1024) {
        setActiveBreakpoint('tablet');
      } else {
        setActiveBreakpoint('desktop');
      }
    };
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [previewMode]);

  // History for Undo/Redo
  const [history, setHistory] = useState<BuilderElement[][]>([cloneElements(project.pages[0]?.elements || initialProject.pages[0].elements)]);
  const [historyIndex, setHistoryIndex] = useState<number>(0);

  // Sync to localStorage
  useEffect(() => {
    try {
      const updatedList = savedProjects.map((p) =>
        p.id === project.id ? { ...project, updatedAt: new Date().toLocaleTimeString() } : p
      );
      if (!updatedList.some((p) => p.id === project.id)) {
        updatedList.unshift({ ...project, updatedAt: new Date().toLocaleTimeString() });
      }
      localStorage.setItem(STORAGE_PROJECTS_KEY, JSON.stringify(updatedList));
      localStorage.setItem(STORAGE_CURRENT_PROJECT_KEY, project.id);
    } catch (e) {
      console.error(e);
    }
  }, [project, savedProjects]);

  const setSavedProjects = useCallback((projects: Project[]) => {
    setSavedProjectsState(projects);
    try {
      localStorage.setItem(STORAGE_PROJECTS_KEY, JSON.stringify(projects));
    } catch (e) {
      console.error(e);
    }
  }, []);

  const loadProject = useCallback((newProj: Project) => {
    setProject(newProj);
    setSelectedElementId(null);
    if (newProj.pages && newProj.pages.length > 0) {
      setHistory([cloneElements(newProj.pages[0].elements)]);
      setHistoryIndex(0);
    }
  }, []);

  const resetToDefaultResponsiveTemplate = useCallback(() => {
    const freshElements = cloneElements(initialProject.pages[0].elements);
    setProject((prev) => ({
      ...prev,
      pages: prev.pages.map((p) =>
        p.id === prev.activePageId ? { ...p, elements: freshElements } : p
      ),
    }));
    setHistory([cloneElements(freshElements)]);
    setHistoryIndex(0);
    setSelectedElementId('hero-headline');
  }, []);

  const activePage = useMemo(() => {
    return project.pages.find((p) => p.id === project.activePageId) || project.pages[0];
  }, [project]);

  const elements = activePage.elements;

  const pushHistory = useCallback(
    (newElements: BuilderElement[]) => {
      const updatedHistory = history.slice(0, historyIndex + 1);
      updatedHistory.push(cloneElements(newElements));
      setHistory(updatedHistory);
      setHistoryIndex(updatedHistory.length - 1);
    },
    [history, historyIndex]
  );

  const setElementsForActivePage = useCallback(
    (newElements: BuilderElement[], recordHistory = true) => {
      setProject((prev) => ({
        ...prev,
        pages: prev.pages.map((page) =>
          page.id === prev.activePageId ? { ...page, elements: newElements } : page
        ),
      }));
      if (recordHistory) {
        pushHistory(newElements);
      }
    },
    [pushHistory]
  );

  const selectedElement = useMemo(() => {
    if (!selectedElementId) return null;
    return findElementById(elements, selectedElementId);
  }, [elements, selectedElementId]);

  const selectElement = useCallback((id: string | null) => {
    setSelectedElementId(id);
  }, []);

  const hoverElement = useCallback((id: string | null) => {
    setHoveredElementId(id);
  }, []);

  const updateElementStyles = useCallback(
    (id: string, partialStyles: Partial<ElementStyles>) => {
      const updateRecursive = (list: BuilderElement[]): BuilderElement[] => {
        return list.map((item) => {
          if (item.id === id) {
            const currentStyles = item.styles[activeBreakpoint] || {};
            const updatedForBreakpoint = { ...currentStyles, ...partialStyles };
            return {
              ...item,
              styles: {
                ...item.styles,
                [activeBreakpoint]: updatedForBreakpoint,
              },
            };
          }
          if (item.children) {
            return { ...item, children: updateRecursive(item.children) };
          }
          return item;
        });
      };

      const updated = updateRecursive(elements);
      setElementsForActivePage(updated);
    },
    [activeBreakpoint, elements, setElementsForActivePage]
  );

  const updateElementContent = useCallback(
    (id: string, content: string) => {
      const updateRecursive = (list: BuilderElement[]): BuilderElement[] => {
        return list.map((item) => {
          if (item.id === id) {
            return { ...item, content };
          }
          if (item.children) {
            return { ...item, children: updateRecursive(item.children) };
          }
          return item;
        });
      };
      const updated = updateRecursive(elements);
      setElementsForActivePage(updated);
    },
    [elements, setElementsForActivePage]
  );

  const updateElementAttributes = useCallback(
    (id: string, attributes: Record<string, string>) => {
      const updateRecursive = (list: BuilderElement[]): BuilderElement[] => {
        return list.map((item) => {
          if (item.id === id) {
            return {
              ...item,
              attributes: { ...(item.attributes || {}), ...attributes },
            };
          }
          if (item.children) {
            return { ...item, children: updateRecursive(item.children) };
          }
          return item;
        });
      };
      const updated = updateRecursive(elements);
      setElementsForActivePage(updated);
    },
    [elements, setElementsForActivePage]
  );

  const updateElementLinkSettings = useCallback(
    (id: string, linkSettings: LinkSettings) => {
      const updateRecursive = (list: BuilderElement[]): BuilderElement[] => {
        return list.map((item) => {
          if (item.id === id) {
            return {
              ...item,
              linkSettings,
              attributes: {
                ...(item.attributes || {}),
                href: linkSettings.type === 'url' ? linkSettings.url || '#' : '#',
                target: linkSettings.openInNewTab ? '_blank' : '_self',
              },
            };
          }
          if (item.children) {
            return { ...item, children: updateRecursive(item.children) };
          }
          return item;
        });
      };
      const updated = updateRecursive(elements);
      setElementsForActivePage(updated);
    },
    [elements, setElementsForActivePage]
  );

  const updateElementName = useCallback(
    (id: string, name: string) => {
      const updateRecursive = (list: BuilderElement[]): BuilderElement[] => {
        return list.map((item) => {
          if (item.id === id) {
            return { ...item, name };
          }
          if (item.children) {
            return { ...item, children: updateRecursive(item.children) };
          }
          return item;
        });
      };
      const updated = updateRecursive(elements);
      setElementsForActivePage(updated);
    },
    [elements, setElementsForActivePage]
  );

  const addElement = useCallback(
    (type: ElementType, targetId?: string | null) => {
      const newEl = createNewElement(type);
      const target = targetId ? findElementById(elements, targetId) : null;

      if (!target) {
        const updated = [...elements, newEl];
        setElementsForActivePage(updated);
        setSelectedElementId(newEl.id);
        return;
      }

      if (CONTAINER_TYPES.includes(target.type)) {
        const addToContainer = (list: BuilderElement[]): BuilderElement[] => {
          return list.map((item) => {
            if (item.id === target.id) {
              const children = item.children ? [...item.children, newEl] : [newEl];
              return { ...item, children };
            }
            if (item.children) {
              return { ...item, children: addToContainer(item.children) };
            }
            return item;
          });
        };
        const updated = addToContainer(cloneElements(elements));
        setElementsForActivePage(updated);
        setSelectedElementId(newEl.id);
        return;
      }

      const insertAfterInParent = (list: BuilderElement[]): { updated: BuilderElement[]; inserted: boolean } => {
        const idx = list.findIndex((item) => item.id === target.id);
        if (idx !== -1) {
          const next = [...list];
          next.splice(idx + 1, 0, newEl);
          return { updated: next, inserted: true };
        }
        let inserted = false;
        const next = list.map((item) => {
          if (!inserted && item.children && item.children.length > 0) {
            const res = insertAfterInParent(item.children);
            if (res.inserted) {
              inserted = true;
              return { ...item, children: res.updated };
            }
          }
          return item;
        });
        return { updated: next, inserted };
      };

      const res = insertAfterInParent(cloneElements(elements));
      setElementsForActivePage(res.updated);
      setSelectedElementId(newEl.id);
    },
    [elements, setElementsForActivePage]
  );

  const addPrebuiltSection = useCallback(
    (key: PrebuiltSectionKey) => {
      const newSection = createPrebuiltSection(key);
      const updated = [...elements, newSection];
      setElementsForActivePage(updated);
      setSelectedElementId(newSection.id);
    },
    [elements, setElementsForActivePage]
  );

  const deleteElement = useCallback(
    (id: string) => {
      const removeRecursive = (list: BuilderElement[]): BuilderElement[] => {
        return list
          .filter((item) => item.id !== id)
          .map((item) => {
            if (item.children) {
              return { ...item, children: removeRecursive(item.children) };
            }
            return item;
          });
      };

      const updated = removeRecursive(elements);
      setElementsForActivePage(updated);
      if (selectedElementId === id) {
        setSelectedElementId(null);
      }
    },
    [elements, selectedElementId, setElementsForActivePage]
  );

  const duplicateElement = useCallback(
    (id: string) => {
      const target = findElementById(elements, id);
      if (!target) return;

      const regenerateIds = (el: BuilderElement): BuilderElement => {
        const newId = `el-${Date.now()}-${Math.floor(Math.random() * 1000)}`;
        return {
          ...el,
          id: newId,
          name: `${el.name} Copy`,
          children: el.children ? el.children.map(regenerateIds) : [],
        };
      };

      const duplicated = regenerateIds(target);

      const insertDuplicate = (list: BuilderElement[]): BuilderElement[] => {
        const result: BuilderElement[] = [];
        for (const item of list) {
          result.push(item);
          if (item.id === id) {
            result.push(duplicated);
          } else if (item.children) {
            item.children = insertDuplicate(item.children);
          }
        }
        return result;
      };

      const updated = insertDuplicate(cloneElements(elements));
      setElementsForActivePage(updated);
      setSelectedElementId(duplicated.id);
    },
    [elements, setElementsForActivePage]
  );

  const moveElementUp = useCallback(
    (id: string) => {
      const moveInList = (list: BuilderElement[]): { updated: BuilderElement[]; moved: boolean } => {
        const idx = list.findIndex((el) => el.id === id);
        if (idx > 0) {
          const copy = [...list];
          const temp = copy[idx - 1];
          copy[idx - 1] = copy[idx];
          copy[idx] = temp;
          return { updated: copy, moved: true };
        }
        let moved = false;
        const updated = list.map((item) => {
          if (!moved && item.children && item.children.length > 0) {
            const res = moveInList(item.children);
            if (res.moved) {
              moved = true;
              return { ...item, children: res.updated };
            }
          }
          return item;
        });
        return { updated, moved };
      };

      const res = moveInList(cloneElements(elements));
      if (res.moved) {
        setElementsForActivePage(res.updated);
      }
    },
    [elements, setElementsForActivePage]
  );

  const moveElementDown = useCallback(
    (id: string) => {
      const moveInList = (list: BuilderElement[]): { updated: BuilderElement[]; moved: boolean } => {
        const idx = list.findIndex((el) => el.id === id);
        if (idx !== -1 && idx < list.length - 1) {
          const copy = [...list];
          const temp = copy[idx + 1];
          copy[idx + 1] = copy[idx];
          copy[idx] = temp;
          return { updated: copy, moved: true };
        }
        let moved = false;
        const updated = list.map((item) => {
          if (!moved && item.children && item.children.length > 0) {
            const res = moveInList(item.children);
            if (res.moved) {
              moved = true;
              return { ...item, children: res.updated };
            }
          }
          return item;
        });
        return { updated, moved };
      };

      const res = moveInList(cloneElements(elements));
      if (res.moved) {
        setElementsForActivePage(res.updated);
      }
    },
    [elements, setElementsForActivePage]
  );

  const moveElement = useCallback(
    (draggedId: string, targetParentId: string | null, targetIndex: number) => {
      const draggedEl = findElementById(elements, draggedId);
      if (!draggedEl) return;

      const removeDragged = (list: BuilderElement[]): BuilderElement[] => {
        return list
          .filter((item) => item.id !== draggedId)
          .map((item) => ({
            ...item,
            children: item.children ? removeDragged(item.children) : [],
          }));
      };

      const cleanedList = removeDragged(cloneElements(elements));

      if (!targetParentId) {
        cleanedList.splice(targetIndex, 0, draggedEl);
        setElementsForActivePage(cleanedList);
        return;
      }

      const insertIntoParent = (list: BuilderElement[]): BuilderElement[] => {
        return list.map((item) => {
          if (item.id === targetParentId) {
            const children = item.children ? [...item.children] : [];
            children.splice(targetIndex, 0, draggedEl);
            return { ...item, children };
          }
          if (item.children) {
            return { ...item, children: insertIntoParent(item.children) };
          }
          return item;
        });
      };

      const updated = insertIntoParent(cleanedList);
      setElementsForActivePage(updated);
    },
    [elements, setElementsForActivePage]
  );

  const toggleLock = useCallback(
    (id: string) => {
      const toggle = (list: BuilderElement[]): BuilderElement[] => {
        return list.map((item) => {
          if (item.id === id) {
            return { ...item, isLocked: !item.isLocked };
          }
          if (item.children) {
            return { ...item, children: toggle(item.children) };
          }
          return item;
        });
      };
      setElementsForActivePage(toggle(elements));
    },
    [elements, setElementsForActivePage]
  );

  const toggleHide = useCallback(
    (id: string) => {
      const toggle = (list: BuilderElement[]): BuilderElement[] => {
        return list.map((item) => {
          if (item.id === id) {
            return { ...item, isHidden: !item.isHidden };
          }
          if (item.children) {
            return { ...item, children: toggle(item.children) };
          }
          return item;
        });
      };
      setElementsForActivePage(toggle(elements));
    },
    [elements, setElementsForActivePage]
  );

  const switchPage = useCallback((pageId: string) => {
    setProject((prev) => ({
      ...prev,
      activePageId: pageId,
    }));
    setSelectedElementId(null);
  }, []);

  const addPage = useCallback(
    (name: string, slug: string) => {
      const newPage: Page = {
        id: `page-${Date.now()}`,
        name,
        slug: slug.startsWith('/') ? slug : `/${slug}`,
        title: `${name} — Studio Aura`,
        elements: [
          createNewElement('section', `${name} Section`),
        ],
      };
      setProject((prev) => ({
        ...prev,
        pages: [...prev.pages, newPage],
        activePageId: newPage.id,
      }));
      setSelectedElementId(null);
    },
    []
  );

  const addAsset = useCallback((asset: Asset) => {
    setProject((prev) => ({
      ...prev,
      assets: [asset, ...(prev.assets || [])],
    }));
  }, []);

  const deleteAsset = useCallback((assetId: string) => {
    setProject((prev) => ({
      ...prev,
      assets: (prev.assets || []).filter((a) => a.id !== assetId),
    }));
  }, []);

  const undo = useCallback(() => {
    if (historyIndex > 0) {
      const newIndex = historyIndex - 1;
      setHistoryIndex(newIndex);
      setElementsForActivePage(cloneElements(history[newIndex]), false);
    }
  }, [history, historyIndex, setElementsForActivePage]);

  const redo = useCallback(() => {
    if (historyIndex < history.length - 1) {
      const newIndex = historyIndex + 1;
      setHistoryIndex(newIndex);
      setElementsForActivePage(cloneElements(history[newIndex]), false);
    }
  }, [history, historyIndex, setElementsForActivePage]);

  const canUndo = historyIndex > 0;
  const canRedo = historyIndex < history.length - 1;

  return (
    <BuilderContext.Provider
      value={{
        project,
        savedProjects,
        activePage,
        elements,
        selectedElementId,
        selectedElement,
        hoveredElementId,
        activeBreakpoint,
        zoom,
        previewMode,
        activeLeftTab,
        canUndo,
        canRedo,
        selectElement,
        hoverElement,
        setBreakpoint: setActiveBreakpoint,
        setZoom,
        setPreviewMode,
        setActiveLeftTab,
        updateElementStyles,
        updateElementContent,
        updateElementAttributes,
        updateElementLinkSettings,
        updateElementName,
        addElement,
        addPrebuiltSection,
        deleteElement,
        duplicateElement,
        moveElement,
        moveElementUp,
        moveElementDown,
        toggleLock,
        toggleHide,
        switchPage,
        addPage,
        addAsset,
        deleteAsset,
        loadProject,
        resetToDefaultResponsiveTemplate,
        setSavedProjects,
        undo,
        redo,
      }}
    >
      {children}
    </BuilderContext.Provider>
  );
};

export const useBuilder = () => {
  const context = useContext(BuilderContext);
  if (!context) {
    // Return a safe fallback context for standalone preview / live viewers
    return {
      project: initialProject,
      savedProjects: [initialProject],
      activePage: initialProject.pages[0],
      elements: initialProject.pages[0].elements,
      selectedElementId: null,
      selectedElement: null,
      hoveredElementId: null,
      activeBreakpoint: 'desktop' as Breakpoint,
      zoom: 100,
      previewMode: true,
      activeLeftTab: 'add' as const,
      canUndo: false,
      canRedo: false,
      selectElement: () => {},
      hoverElement: () => {},
      setBreakpoint: () => {},
      setZoom: () => {},
      setPreviewMode: () => {},
      setActiveLeftTab: () => {},
      updateElementStyles: () => {},
      updateElementContent: () => {},
      updateElementAttributes: () => {},
      updateElementLinkSettings: () => {},
      updateElementName: () => {},
      addElement: () => {},
      addPrebuiltSection: () => {},
      deleteElement: () => {},
      duplicateElement: () => {},
      moveElement: () => {},
      moveElementUp: () => {},
      moveElementDown: () => {},
      toggleLock: () => {},
      toggleHide: () => {},
      switchPage: () => {},
      addPage: () => {},
      addAsset: () => {},
      deleteAsset: () => {},
      loadProject: () => {},
      resetToDefaultResponsiveTemplate: () => {},
      setSavedProjects: () => {},
      undo: () => {},
      redo: () => {},
    };
  }
  return context;
};
