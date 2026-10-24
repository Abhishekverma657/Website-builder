import React, { useState, useRef, useEffect } from 'react';
import {
  ArrowUp,
  ArrowDown,
  Copy,
  Trash2,
  Menu,
  X,
  Check,
  ChevronDown,
  ShoppingBag,
} from 'lucide-react';
import { BuilderElement } from '../../types/builder';
import { useBuilder, useEffectiveBreakpoint, useEffectivePreviewMode } from '../../context/BuilderContext';

interface ElementRendererProps {
  element: BuilderElement;
}

// Smooth scroll helper with sticky/fixed navbar offset
const smoothScrollTo = (target: HTMLElement | null) => {
  if (!target) return false;
  const navHeight = 76;
  const top = target.getBoundingClientRect().top + window.pageYOffset - navHeight;
  window.scrollTo({
    top: Math.max(0, top),
    behavior: 'smooth',
  });
  return true;
};

// Fuzzy section finder for prebuilt templates and custom IDs
const findTargetSection = (keyword: string): HTMLElement | null => {
  const k = keyword.toLowerCase().trim();
  if (k.includes('price') || k.includes('plan') || k.includes('tier') || k.includes('membership') || k.includes('rate') || k.includes('menu')) {
    return document.querySelector('[id*="-pricing-section"], [id*="pricing"], [id*="plans"], [id*="menu"]') as HTMLElement | null;
  }
  if (k.includes('feature') || k.includes('spec') || k.includes('capability') || k.includes('service') || k.includes('about') || k.includes('overview') || k.includes('philosophy') || k.includes('lineage')) {
    return document.querySelector('[id*="-features-section"], [id*="features"], [id*="services"], [id*="about"]') as HTMLElement | null;
  }
  if (k.includes('work') || k.includes('showcase') || k.includes('collection') || k.includes('product') || k.includes('gallery') || k.includes('catalog') || k.includes('portfolio') || k.includes('exhibition') || k.includes('fleet') || k.includes('property') || k.includes('listing')) {
    return document.querySelector('[id*="-showcase-section"], [id*="showcase"], [id*="gallery"], [id*="portfolio"], [id*="collection"], [id*="products"]') as HTMLElement | null;
  }
  if (k.includes('faq') || k.includes('question') || k.includes('help') || k.includes('ask') || k.includes('support')) {
    return document.querySelector('[id*="-faq-section"], [id*="faq"], [id*="questions"]') as HTMLElement | null;
  }
  if (k.includes('contact') || k.includes('inquire') || k.includes('book') || k.includes('reserve') || k.includes('trial') || k.includes('join') || k.includes('start') || k.includes('order') || k.includes('cta') || k.includes('touch') || k.includes('consult')) {
    return document.querySelector('[id*="-cta-section"], [id*="cta"], [id*="contact"], [id*="booking"]') as HTMLElement | null;
  }
  return null;
};

export const ElementRenderer: React.FC<ElementRendererProps> = ({ element }) => {
  const {
    selectedElementId,
    hoveredElementId,
    selectElement,
    hoverElement,
    activeBreakpoint,
    previewMode,
    updateElementContent,
    deleteElement,
    duplicateElement,
    moveElementUp,
    moveElementDown,
    switchPage,
  } = useBuilder();

  // Effective breakpoint and preview mode (supports override from Device switcher & Live Viewer)
  const effectiveBreakpoint = useEffectiveBreakpoint();
  const effectivePreviewMode = useEffectivePreviewMode();

  const [isEditingText, setIsEditingText] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [btnSubmitted, setBtnSubmitted] = useState(false);
  const textEditRef = useRef<HTMLSpanElement>(null);

  // FAQ Accordion local state (first FAQ item open by default)
  const isFaqItem = element.id.includes('-faq-item-');
  const [isFaqOpen, setIsFaqOpen] = useState<boolean>(() => element.id.endsWith('-0'));

  const isSelected = selectedElementId === element.id && !effectivePreviewMode;
  const isHovered = hoveredElementId === element.id && !isSelected && !effectivePreviewMode;

  const handlePreviewClick = (e: React.MouseEvent) => {
    // 1. Direct Link Settings
    if (element.linkSettings) {
      const ls = element.linkSettings;
      if (ls.type === 'page' && ls.pageId) {
        e.preventDefault();
        e.stopPropagation();
        switchPage(ls.pageId);
        return;
      } else if (ls.type === 'section' && ls.sectionId) {
        e.preventDefault();
        e.stopPropagation();
        const targetSec = document.getElementById(ls.sectionId) || (document.querySelector(`[id*="${ls.sectionId}"]`) as HTMLElement | null);
        if (targetSec) {
          smoothScrollTo(targetSec);
        }
        return;
      } else if (ls.type === 'url' && ls.url) {
        e.preventDefault();
        if (ls.url.startsWith('#')) {
          const targetId = ls.url.replace('#', '');
          const targetSec = document.getElementById(targetId) || findTargetSection(targetId);
          if (targetSec) {
            smoothScrollTo(targetSec);
            return;
          }
        }
        if (ls.openInNewTab) {
          window.open(ls.url, '_blank');
        } else {
          window.location.href = ls.url;
        }
        return;
      } else if (ls.type === 'email' && ls.email) {
        e.preventDefault();
        window.location.href = `mailto:${ls.email}`;
        return;
      }
    }

    // 2. Interactive Button & Anchor Tag Handlers
    const isClickable =
      element.type === 'button' ||
      element.type === 'link' ||
      element.tag === 'button' ||
      element.tag === 'a';

    if (isClickable) {
      const contentLower = (element.content || element.name || '').toLowerCase();

      // Check navigation targets first (Pricing, Features, Gallery, FAQ, Contact)
      const matchedSec = findTargetSection(contentLower);
      if (matchedSec) {
        e.preventDefault();
        smoothScrollTo(matchedSec);
        return;
      }

      // Handle Cart actions (Add to Bag / Buy Now / Order Now)
      if (
        contentLower.includes('cart') ||
        contentLower.includes('bag') ||
        contentLower.includes('buy') ||
        contentLower.includes('order')
      ) {
        e.preventDefault();
        setBtnSubmitted(true);
        setTimeout(() => setBtnSubmitted(false), 2000);
        window.dispatchEvent(
          new CustomEvent('aura:toast', {
            detail: {
              type: 'cart',
              title: 'Added to Bag 🛍️',
              message: `${element.name || 'Product item'} added to your cart.`,
            },
          })
        );
        return;
      }

      // Handle Form / CTA submit actions (Subscribe, Send, Submit, Join, Trial)
      if (
        contentLower.includes('subscribe') ||
        contentLower.includes('send') ||
        contentLower.includes('submit') ||
        contentLower.includes('join') ||
        contentLower.includes('trial') ||
        contentLower.includes('sign') ||
        contentLower.includes('start') ||
        contentLower.includes('claim')
      ) {
        e.preventDefault();
        const container = (e.currentTarget as HTMLElement).closest('section, form, div');
        const input = container?.querySelector('input[type="email"], input[type="text"], input:not([type="hidden"])') as HTMLInputElement | null;
        const val = input?.value?.trim();
        if (input) input.value = '';

        setBtnSubmitted(true);
        setTimeout(() => setBtnSubmitted(false), 2000);

        window.dispatchEvent(
          new CustomEvent('aura:toast', {
            detail: {
              type: 'success',
              title: 'Request Received! 🎉',
              message: val
                ? `Thank you! Confirmation link sent to ${val}.`
                : 'Thank you for reaching out! We have received your request.',
            },
          })
        );
        return;
      }

      // Fallback: smooth scroll to CTA or top if nothing matched
      const ctaSec = findTargetSection('contact');
      if (ctaSec) {
        e.preventDefault();
        smoothScrollTo(ctaSec);
      }
    }
  };

  // Compute merged styles for active breakpoint (desktop is base, tablet/mobile override)
  const tabletStyles = element.styles.tablet || {};
  const mobileStyles = element.styles.mobile || {};

  const activeStylesObj = {
    ...element.styles.desktop,
    ...(effectiveBreakpoint === 'tablet' ? tabletStyles : {}),
    ...(effectiveBreakpoint === 'mobile' ? { ...tabletStyles, ...mobileStyles } : {}),
    margin: {
      ...(element.styles.desktop?.margin || {}),
      ...(effectiveBreakpoint === 'tablet' && tabletStyles.margin ? tabletStyles.margin : {}),
      ...(effectiveBreakpoint === 'mobile' ? { ...(tabletStyles.margin || {}), ...(mobileStyles.margin || {}) } : {}),
    },
    padding: {
      ...(element.styles.desktop?.padding || {}),
      ...(effectiveBreakpoint === 'tablet' && tabletStyles.padding ? tabletStyles.padding : {}),
      ...(effectiveBreakpoint === 'mobile' ? { ...(tabletStyles.padding || {}), ...(mobileStyles.padding || {}) } : {}),
    },
  };

  // Build style cleanly without mixing shorthand and non-shorthand margin/padding
  const { margin: _margin, padding: _padding, ...cleanedStyles } = activeStylesObj;

  const finalStyle: React.CSSProperties = {
    boxSizing: 'border-box',
    ...cleanedStyles,
  } as React.CSSProperties;

  if (activeStylesObj.margin) {
    finalStyle.marginTop = activeStylesObj.margin.top;
    finalStyle.marginRight = activeStylesObj.margin.right;
    finalStyle.marginBottom = activeStylesObj.margin.bottom;
    finalStyle.marginLeft = activeStylesObj.margin.left;
  }

  if (activeStylesObj.padding) {
    finalStyle.paddingTop = activeStylesObj.padding.top;
    finalStyle.paddingRight = activeStylesObj.padding.right;
    finalStyle.paddingBottom = activeStylesObj.padding.bottom;
    finalStyle.paddingLeft = activeStylesObj.padding.left;
  }

  if (activeStylesObj.border) {
    if (activeStylesObj.border.style && activeStylesObj.border.style !== 'none') {
      finalStyle.borderWidth = activeStylesObj.border.width || '1px';
      finalStyle.borderStyle = activeStylesObj.border.style;
      finalStyle.borderColor = activeStylesObj.border.color || '#e2e8f0';
    }
    if (activeStylesObj.border.radius) {
      finalStyle.borderRadius = activeStylesObj.border.radius;
    }
  }

  if (element.isHidden && !effectivePreviewMode) {
    finalStyle.opacity = 0.25;
  }

  const handleTextBlur = () => {
    setIsEditingText(false);
    if (textEditRef.current) {
      updateElementContent(element.id, textEditRef.current.innerText);
    }
  };

  const handleDoubleClick = (e: React.MouseEvent) => {
    if (effectivePreviewMode) return;
    if (element.content !== undefined) {
      e.stopPropagation();
      setIsEditingText(true);
    }
  };

  useEffect(() => {
    if (isEditingText && textEditRef.current) {
      textEditRef.current.focus();
      const range = document.createRange();
      range.selectNodeContents(textEditRef.current);
      const sel = window.getSelection();
      sel?.removeAllRanges();
      sel?.addRange(range);
    }
  }, [isEditingText]);

  const tag = element.tag || 'div';

  // Render children or text content
  const renderInner = () => {
    if (isEditingText) {
      return (
        <span
          ref={textEditRef}
          contentEditable
          suppressContentEditableWarning
          onBlur={handleTextBlur}
          onKeyDown={(e) => {
            if (e.key === 'Enter' && !e.shiftKey) {
              e.preventDefault();
              handleTextBlur();
            }
          }}
          className="outline-none bg-emerald-500/20 px-1 rounded ring-2 ring-emerald-500 text-white"
        >
          {element.content}
        </span>
      );
    }

    if (element.content !== undefined && (!element.children || element.children.length === 0)) {
      if (btnSubmitted) {
        return (
          <span className="inline-flex items-center justify-center gap-1.5 text-emerald-300 font-bold animate-in zoom-in-95 duration-150">
            <Check className="w-4 h-4 text-emerald-400" />
            <span>Done!</span>
          </span>
        );
      }
      return element.content;
    }

    if (element.children && element.children.length > 0) {
      return element.children.map((child) => (
        <ElementRenderer key={child.id} element={child} />
      ));
    }

    return null;
  };

  // Quick Action floating toolbar for selected element
  const renderSelectionBar = () => {
    if (!isSelected) return null;

    return (
      <div
        onClick={(e) => e.stopPropagation()}
        className="absolute -top-7 left-0 z-50 flex items-center bg-[#0d2822] text-white text-[11px] font-sans rounded-lg shadow-neu overflow-hidden border border-emerald-500/40 select-none animate-in fade-in duration-150"
      >
        <div className="flex items-center gap-1.5 px-2 py-0.5 font-bold">
          <span className="text-emerald-300">{element.name}</span>
          <span className="bg-[#061814] text-teal-300 px-1 rounded text-[9px] uppercase font-mono">
            {element.tag}
          </span>
        </div>

        <div className="flex items-center bg-[#091f1b] divide-x divide-emerald-900/40">
          <button
            onClick={() => moveElementUp(element.id)}
            title="Move Up"
            className="p-1 hover:bg-[#10352d] transition text-emerald-200 hover:text-white"
          >
            <ArrowUp className="w-3 h-3" />
          </button>
          <button
            onClick={() => moveElementDown(element.id)}
            title="Move Down"
            className="p-1 hover:bg-[#10352d] transition text-emerald-200 hover:text-white"
          >
            <ArrowDown className="w-3 h-3" />
          </button>
          <button
            onClick={() => duplicateElement(element.id)}
            title="Duplicate"
            className="p-1 hover:bg-[#10352d] transition text-emerald-200 hover:text-white"
          >
            <Copy className="w-3 h-3" />
          </button>
          <button
            onClick={() => deleteElement(element.id)}
            title="Delete"
            className="p-1 hover:bg-red-600 transition text-emerald-200 hover:text-white"
          >
            <Trash2 className="w-3 h-3" />
          </button>
        </div>
      </div>
    );
  };

  // Special handling for void HTML elements
  if (tag === 'img') {
    return (
      <div
        className={`relative inline-block transition-all ${
          isSelected
            ? 'ring-2 ring-emerald-500 ring-offset-2 ring-offset-black'
            : isHovered
            ? 'ring-1 ring-teal-400'
            : ''
        }`}
        onClick={(e) => {
          if (!effectivePreviewMode) {
            e.stopPropagation();
            selectElement(element.id);
          }
        }}
        onMouseEnter={(e) => {
          if (!effectivePreviewMode) {
            e.stopPropagation();
            hoverElement(element.id);
          }
        }}
        onMouseLeave={() => hoverElement(null)}
      >
        {renderSelectionBar()}
        <img
          src={element.attributes?.src || 'https://via.placeholder.com/600x400'}
          alt={element.attributes?.alt || 'Image'}
          style={finalStyle}
          className="max-w-full"
        />
      </div>
    );
  }

  if (tag === 'input') {
    return (
      <div
        className={`relative inline-block ${
          isSelected ? 'ring-2 ring-emerald-500' : isHovered ? 'ring-1 ring-teal-400' : ''
        }`}
        onClick={(e) => {
          if (!effectivePreviewMode) {
            e.stopPropagation();
            selectElement(element.id);
          }
        }}
      >
        {renderSelectionBar()}
        <input
          type={element.attributes?.type || 'text'}
          placeholder={element.attributes?.placeholder || ''}
          defaultValue={element.content || ''}
          style={finalStyle}
          disabled={!effectivePreviewMode}
          readOnly={!effectivePreviewMode}
        />
      </div>
    );
  }

  // Proper handling for <textarea>: Use defaultValue/value instead of child text nodes to prevent React warning/error
  if (tag === 'textarea') {
    return (
      <div
        className={`relative inline-block ${
          isSelected ? 'ring-2 ring-emerald-500' : isHovered ? 'ring-1 ring-teal-400' : ''
        }`}
        onClick={(e) => {
          if (!effectivePreviewMode) {
            e.stopPropagation();
            selectElement(element.id);
          }
        }}
      >
        {renderSelectionBar()}
        <textarea
          placeholder={element.attributes?.placeholder || ''}
          defaultValue={element.content || ''}
          style={finalStyle}
          disabled={!effectivePreviewMode}
          readOnly={!effectivePreviewMode}
        />
      </div>
    );
  }

  const TagName = tag as any;

  // Webflow Component Special Rendering: Navbar with responsive mobile menu toggle
  if (element.type === 'navbar' || tag === 'nav') {
    const isMobileOrTablet = effectiveBreakpoint === 'mobile' || effectiveBreakpoint === 'tablet';

    return (
      <TagName
        id={element.id}
        style={{
          ...finalStyle,
          position: finalStyle.position || 'relative',
        }}
        onClick={(e: React.MouseEvent) => {
          if (!effectivePreviewMode) {
            e.stopPropagation();
            selectElement(element.id);
          } else {
            handlePreviewClick(e);
          }
        }}
        onDoubleClick={handleDoubleClick}
        onMouseEnter={(e: React.MouseEvent) => {
          if (!effectivePreviewMode) {
            e.stopPropagation();
            hoverElement(element.id);
          }
        }}
        onMouseLeave={() => hoverElement(null)}
        className={`relative transition-all ${
          isSelected
            ? 'outline outline-2 outline-emerald-500 outline-offset-[-1px] shadow-neu-sm'
            : isHovered
            ? 'outline outline-1 outline-teal-400 outline-dashed outline-offset-[-1px]'
            : ''
        }`}
      >
        {renderSelectionBar()}

        {/* Regular Navbar Content */}
        <div className="w-full flex items-center justify-between">
          {element.children && element.children.length > 0 ? (
            element.children.map((child) => {
              // Hide nav-menu links row on mobile/tablet so links don't crowd the navbar
              if (isMobileOrTablet && child.id.includes('-nav-menu')) {
                return null;
              }
              // Hide nav-cta button on mobile to give room to Logo and Hamburger
              if (effectiveBreakpoint === 'mobile' && child.id.includes('-nav-cta')) {
                return null;
              }
              return <ElementRenderer key={child.id} element={child} />;
            })
          ) : (
            renderInner()
          )}

          {/* Webflow Mobile Hamburger Toggle */}
          {isMobileOrTablet && (
            <button
              onClick={(e) => {
                e.stopPropagation();
                setIsMobileMenuOpen((prev) => !prev);
              }}
              title="Toggle Navigation Menu"
              className="p-2 rounded-xl bg-[#091212] hover:bg-[#122020] text-emerald-300 border border-emerald-500/30 shadow-neu-sm transition shrink-0 ml-3 cursor-pointer"
            >
              {isMobileMenuOpen ? (
                <X className="w-5 h-5 text-emerald-400" />
              ) : (
                <Menu className="w-5 h-5 text-emerald-400" />
              )}
            </button>
          )}
        </div>

        {/* Webflow Mobile Dropdown Drawer Menu */}
        {isMobileOrTablet && isMobileMenuOpen && (
          <div
            onClick={(e) => e.stopPropagation()}
            className="w-full mt-3 p-4 bg-[#091010]/95 backdrop-blur-md rounded-2xl border border-emerald-500/30 shadow-neu space-y-3 animate-in fade-in slide-in-from-top-2 duration-200 text-left text-white"
          >
            <div className="text-[10px] font-bold uppercase tracking-wider text-emerald-400/80 border-b border-emerald-950 pb-2">
              Mobile Navigation Menu
            </div>
            <div className="flex flex-col space-y-2">
              <button
                onClick={() => {
                  setIsMobileMenuOpen(false);
                  smoothScrollTo(findTargetSection('showcase'));
                }}
                className="text-left py-2 px-3 rounded-lg text-sm font-semibold text-gray-200 hover:text-emerald-300 hover:bg-[#101c1c] transition"
              >
                Selected Works &amp; Portfolio
              </button>
              <button
                onClick={() => {
                  setIsMobileMenuOpen(false);
                  smoothScrollTo(findTargetSection('features'));
                }}
                className="text-left py-2 px-3 rounded-lg text-sm font-semibold text-gray-200 hover:text-emerald-300 hover:bg-[#101c1c] transition"
              >
                Services &amp; Features
              </button>
              <button
                onClick={() => {
                  setIsMobileMenuOpen(false);
                  smoothScrollTo(findTargetSection('pricing'));
                }}
                className="text-left py-2 px-3 rounded-lg text-sm font-semibold text-gray-200 hover:text-emerald-300 hover:bg-[#101c1c] transition"
              >
                Pricing &amp; Plans
              </button>
              <button
                onClick={() => {
                  setIsMobileMenuOpen(false);
                  smoothScrollTo(findTargetSection('faq'));
                }}
                className="text-left py-2 px-3 rounded-lg text-sm font-semibold text-gray-200 hover:text-emerald-300 hover:bg-[#101c1c] transition"
              >
                Frequently Asked Questions
              </button>
              <button
                onClick={() => {
                  setIsMobileMenuOpen(false);
                  smoothScrollTo(findTargetSection('contact'));
                }}
                className="text-left py-2 px-3 rounded-lg text-sm font-semibold text-gray-200 hover:text-emerald-300 hover:bg-[#101c1c] transition"
              >
                Contact &amp; Booking
              </button>
            </div>
            <div className="pt-2 border-t border-emerald-950">
              <button
                onClick={() => {
                  setIsMobileMenuOpen(false);
                  smoothScrollTo(findTargetSection('contact'));
                }}
                className="w-full py-2.5 px-4 bg-gradient-to-r from-emerald-500 to-teal-500 text-white rounded-xl text-xs font-bold text-center hover:brightness-110 shadow-neu transition"
              >
                Start a Project →
              </button>
            </div>
          </div>
        )}
      </TagName>
    );
  }

  // Interactive Accordion for FAQ items in Preview / Live Mode
  if (isFaqItem && previewMode) {
    const qChild = element.children?.[0];
    const aChild = element.children?.[1];

    return (
      <div
        id={element.id}
        style={finalStyle}
        onClick={(e) => {
          e.stopPropagation();
          setIsFaqOpen((prev) => !prev);
        }}
        className="cursor-pointer transition-all duration-200 select-none hover:border-emerald-500/50"
      >
        <div className="flex items-center justify-between gap-4">
          <div className="font-semibold text-white flex-1 text-base">
            {qChild?.content || 'Frequently Asked Question'}
          </div>
          <span
            className={`p-1.5 rounded-full bg-emerald-500/10 text-emerald-400 transition-transform duration-200 shrink-0 ${
              isFaqOpen ? 'rotate-180' : ''
            }`}
          >
            <ChevronDown className="w-4 h-4" />
          </span>
        </div>
        {isFaqOpen && (
          <div className="mt-3 pt-3 border-t border-emerald-950/40 text-gray-400 text-sm leading-relaxed animate-in fade-in slide-in-from-top-1 duration-200">
            {aChild?.content || ''}
          </div>
        )}
      </div>
    );
  }

  return (
    <TagName
      id={element.id}
      style={finalStyle}
      onClick={(e: React.MouseEvent) => {
        handlePreviewClick(e);
        if (!effectivePreviewMode) {
          e.stopPropagation();
          selectElement(element.id);
        }
      }}
      onDoubleClick={handleDoubleClick}
      onMouseEnter={(e: React.MouseEvent) => {
        if (!effectivePreviewMode) {
          e.stopPropagation();
          hoverElement(element.id);
        }
      }}
      onMouseLeave={() => hoverElement(null)}
      className={`relative transition-all ${
        isSelected
          ? 'outline outline-2 outline-emerald-500 outline-offset-[-1px] shadow-neu-sm'
          : isHovered
          ? 'outline outline-1 outline-teal-400 outline-dashed outline-offset-[-1px]'
          : ''
      } ${
        effectivePreviewMode && (tag === 'button' || element.type === 'button' || tag === 'a' || element.type === 'link')
          ? 'cursor-pointer hover:brightness-110 active:scale-95 duration-150'
          : ''
      }`}
    >
      {renderSelectionBar()}
      {renderInner()}
    </TagName>
  );
};
