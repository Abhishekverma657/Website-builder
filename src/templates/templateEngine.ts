import { BuilderElement } from '../types/builder';
import { WebsiteTemplate, TemplateCategory } from './types';

export interface TemplateBlueprint {
  id: string;
  name: string;
  category: TemplateCategory;
  badge: string;
  tagline: string;
  description: string;
  heroImage: string;
  previewThumbnail: string;
  accentColor: string;
  darkTheme: boolean;
  navLinks: string[];
  hero: {
    badgeText: string;
    headline: string;
    highlightWord: string;
    subheadline: string;
    ctaPrimary: string;
    ctaSecondary: string;
  };
  stats?: Array<{ value: string; label: string }>;
  features: Array<{
    title: string;
    description: string;
    icon?: string;
    tag?: string;
  }>;
  showcaseSection?: {
    heading: string;
    subheading: string;
    items: Array<{
      title: string;
      subtitle: string;
      image: string;
      priceOrMetric?: string;
    }>;
  };
  pricingOrServices?: {
    heading: string;
    subheading: string;
    tiers: Array<{
      name: string;
      price: string;
      frequency?: string;
      description: string;
      highlight?: boolean;
      features: string[];
      buttonText: string;
    }>;
  };
  testimonial?: {
    quote: string;
    author: string;
    role: string;
    avatar?: string;
  };
  faqOrTrust?: {
    heading: string;
    subheading: string;
    items: Array<{ question: string; answer: string }>;
  };
  cta: {
    headline: string;
    subheadline: string;
    buttonText: string;
  };
}

export function buildTemplateFromBlueprint(bp: TemplateBlueprint): WebsiteTemplate {
  const bgMain = bp.darkTheme ? '#0b0f17' : '#ffffff';
  const bgCard = bp.darkTheme ? '#131926' : '#f8fafc';
  const textMain = bp.darkTheme ? '#ffffff' : '#0f172a';
  const textSub = bp.darkTheme ? '#94a3b8' : '#64748b';
  const borderCol = bp.darkTheme ? '#1e293b' : '#e2e8f0';
  const navBg = bp.darkTheme ? '#0b0f17' : '#ffffff';
  const accent = bp.accentColor || '#10b981';

  // Section ID targets for 1-click smooth navigation from nav buttons
  const sectionIds = {
    hero: `${bp.id}-hero`,
    about: `${bp.id}-about-section`,
    features: `${bp.id}-features-section`,
    showcase: `${bp.id}-showcase-section`,
    testimonials: `${bp.id}-testimonials-section`,
    pricing: `${bp.id}-pricing-section`,
    faq: `${bp.id}-faq-section`,
    cta: `${bp.id}-cta-section`,
  };

  const getTargetSectionForLink = (linkName: string): string => {
    const l = linkName.toLowerCase();
    if (l.includes('about') || l.includes('story') || l.includes('mission') || l.includes('heritage') || l.includes('team') || l.includes('philosophy')) {
      return sectionIds.about;
    }
    if (l.includes('price') || l.includes('pricing') || l.includes('rate') || l.includes('tier') || l.includes('plan')) {
      return sectionIds.pricing;
    }
    if (l.includes('feature') || l.includes('method') || l.includes('curriculum') || l.includes('spec') || l.includes('material') || l.includes('treatment') || l.includes('service')) {
      return sectionIds.features;
    }
    if (l.includes('testimonial') || l.includes('review') || l.includes('client') || l.includes('trust') || l.includes('proof')) {
      return sectionIds.testimonials;
    }
    if (l.includes('show') || l.includes('work') || l.includes('collection') || l.includes('catalog') || l.includes('item') || l.includes('menu') || l.includes('gallery') || l.includes('portfolio') || l.includes('product') || l.includes('residence') || l.includes('chalet') || l.includes('villa') || l.includes('headphone') || l.includes('sunglass') || l.includes('chronograph')) {
      return sectionIds.showcase;
    }
    if (l.includes('faq') || l.includes('question') || l.includes('info')) {
      return sectionIds.faq;
    }
    return sectionIds.cta;
  };

  const elements: BuilderElement[] = [];

  // 1. NAVBAR
  elements.push({
    id: `${bp.id}-nav`,
    name: 'Navbar',
    type: 'navbar',
    tag: 'nav',
    styles: {
      desktop: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: { top: '18px', right: '48px', bottom: '18px', left: '48px' },
        backgroundColor: navBg,
        color: textMain,
        border: { width: '1px', style: 'solid', color: borderCol, radius: '0px' },
        position: 'sticky',
        top: '0px',
        zIndex: '30',
      },
      mobile: {
        padding: { top: '14px', right: '20px', bottom: '14px', left: '20px' },
      },
    },
    children: [
      {
        id: `${bp.id}-logo`,
        name: 'Brand Logo',
        type: 'h3',
        tag: 'h3',
        content: bp.name,
        linkSettings: {
          type: 'section',
          sectionId: sectionIds.hero,
        },
        styles: {
          desktop: {
            fontSize: '18px',
            fontWeight: '800',
            letterSpacing: '0.02em',
            color: textMain,
            margin: { top: '0px', right: '0px', bottom: '0px', left: '0px' },
            cursor: 'pointer',
          },
        },
      },
      {
        id: `${bp.id}-nav-menu`,
        name: 'Nav Links',
        type: 'container',
        tag: 'div',
        styles: {
          desktop: {
            display: 'flex',
            alignItems: 'center',
            gap: '28px',
          },
          mobile: {
            display: 'none',
          },
        },
        children: bp.navLinks.map((link, idx) => ({
          id: `${bp.id}-navlink-${idx}`,
          name: `Link ${link}`,
          type: 'link',
          tag: 'a',
          content: link,
          linkSettings: {
            type: 'section',
            sectionId: getTargetSectionForLink(link),
          },
          styles: {
            desktop: {
              color: textSub,
              fontSize: '13px',
              fontWeight: '600',
              textDecoration: 'none',
              cursor: 'pointer',
            },
          },
        })),
      },
      {
        id: `${bp.id}-nav-cta`,
        name: 'Nav Button',
        type: 'button',
        tag: 'button',
        content: bp.hero.ctaPrimary,
        linkSettings: {
          type: 'section',
          sectionId: sectionIds.cta,
        },
        styles: {
          desktop: {
            backgroundColor: accent,
            color: '#ffffff',
            padding: { top: '9px', right: '18px', bottom: '9px', left: '18px' },
            border: { radius: '9999px' },
            fontSize: '12px',
            fontWeight: '700',
            cursor: 'pointer',
          },
          mobile: {
            display: 'none',
          },
        },
      },
    ],
  });

  // 2. HERO SECTION
  elements.push({
    id: sectionIds.hero,
    name: 'Hero Section',
    type: 'section',
    tag: 'section',
    styles: {
      desktop: {
        backgroundColor: bgMain,
        padding: { top: '90px', right: '48px', bottom: '90px', left: '48px' },
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        textAlign: 'center',
      },
      mobile: {
        padding: { top: '60px', right: '20px', bottom: '60px', left: '20px' },
      },
    },
    children: [
      {
        id: `${bp.id}-hero-badge`,
        name: 'Category Pill',
        type: 'badge',
        tag: 'span',
        content: `✦ ${bp.hero.badgeText}`,
        styles: {
          desktop: {
            display: 'inline-block',
            fontSize: '11px',
            fontWeight: '700',
            letterSpacing: '0.08em',
            textTransform: 'uppercase',
            color: accent,
            backgroundColor: `${accent}18`,
            padding: { top: '6px', right: '14px', bottom: '6px', left: '14px' },
            border: { width: '1px', style: 'solid', color: `${accent}40`, radius: '9999px' },
            margin: { top: '0px', right: '0px', bottom: '22px', left: '0px' },
          },
        },
      },
      {
        id: `${bp.id}-hero-h1`,
        name: 'Hero Headline',
        type: 'h1',
        tag: 'h1',
        content: bp.hero.headline,
        styles: {
          desktop: {
            fontSize: '52px',
            fontWeight: '800',
            lineHeight: '1.15',
            color: textMain,
            maxWidth: '900px',
            margin: { top: '0px', right: '0px', bottom: '20px', left: '0px' },
          },
          tablet: { fontSize: '40px' },
          mobile: { fontSize: '32px' },
        },
      },
      {
        id: `${bp.id}-hero-sub`,
        name: 'Hero Subtitle',
        type: 'paragraph',
        tag: 'p',
        content: bp.hero.subheadline,
        styles: {
          desktop: {
            fontSize: '17px',
            lineHeight: '1.6',
            color: textSub,
            maxWidth: '680px',
            margin: { top: '0px', right: '0px', bottom: '36px', left: '0px' },
          },
          mobile: { fontSize: '15px' },
        },
      },
      {
        id: `${bp.id}-hero-buttons`,
        name: 'Hero Buttons Container',
        type: 'container',
        tag: 'div',
        styles: {
          desktop: {
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '14px',
            margin: { top: '0px', right: '0px', bottom: '50px', left: '0px' },
          },
          mobile: {
            flexDirection: 'column',
            width: '100%',
          },
        },
        children: [
          {
            id: `${bp.id}-hero-btn1`,
            name: 'Primary CTA',
            type: 'button',
            tag: 'button',
            content: bp.hero.ctaPrimary,
            linkSettings: {
              type: 'section',
              sectionId: sectionIds.cta,
            },
            styles: {
              desktop: {
                backgroundColor: accent,
                color: '#ffffff',
                padding: { top: '14px', right: '28px', bottom: '14px', left: '28px' },
                border: { radius: '10px' },
                fontSize: '14px',
                fontWeight: '700',
                cursor: 'pointer',
              },
              mobile: { width: '100%' },
            },
          },
          {
            id: `${bp.id}-hero-btn2`,
            name: 'Secondary CTA',
            type: 'button',
            tag: 'button',
            content: bp.hero.ctaSecondary,
            linkSettings: {
              type: 'section',
              sectionId: sectionIds.features,
            },
            styles: {
              desktop: {
                backgroundColor: bp.darkTheme ? '#1e293b' : '#f1f5f9',
                color: textMain,
                padding: { top: '14px', right: '24px', bottom: '14px', left: '24px' },
                border: { width: '1px', style: 'solid', color: borderCol, radius: '10px' },
                fontSize: '14px',
                fontWeight: '600',
                cursor: 'pointer',
              },
              mobile: { width: '100%' },
            },
          },
        ],
      },
      {
        id: `${bp.id}-hero-img`,
        name: 'Hero Visual Banner',
        type: 'image',
        tag: 'img',
        attributes: {
          src: bp.heroImage,
          alt: bp.name,
        },
        styles: {
          desktop: {
            width: '100%',
            maxWidth: '1080px',
            height: '480px',
            objectFit: 'cover',
            border: { width: '1px', style: 'solid', color: borderCol, radius: '16px' },
            boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.4)',
          },
          tablet: { height: '360px' },
          mobile: { height: '240px' },
        },
      },
    ],
  });

  // 3. STATS BAR (Optional)
  if (bp.stats && bp.stats.length > 0) {
    elements.push({
      id: `${bp.id}-stats-section`,
      name: 'Key Metrics Bar',
      type: 'section',
      tag: 'section',
      styles: {
        desktop: {
          backgroundColor: bgCard,
          border: { width: '1px', style: 'solid', color: borderCol, radius: '0px' },
          padding: { top: '40px', right: '48px', bottom: '40px', left: '48px' },
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-around',
          flexWrap: 'wrap',
          gap: '24px',
        },
      },
      children: bp.stats.map((s, idx) => ({
        id: `${bp.id}-stat-${idx}`,
        name: `Stat ${s.value}`,
        type: 'container',
        tag: 'div',
        styles: {
          desktop: {
            textAlign: 'center',
          },
        },
        children: [
          {
            id: `${bp.id}-stat-val-${idx}`,
            name: 'Value',
            type: 'h2',
            tag: 'h2',
            content: s.value,
            styles: {
              desktop: {
                fontSize: '36px',
                fontWeight: '800',
                color: accent,
                margin: { top: '0px', right: '0px', bottom: '4px', left: '0px' },
              },
            },
          },
          {
            id: `${bp.id}-stat-lbl-${idx}`,
            name: 'Label',
            type: 'paragraph',
            tag: 'p',
            content: s.label,
            styles: {
              desktop: {
                fontSize: '13px',
                color: textSub,
                fontWeight: '600',
                margin: { top: '0px', right: '0px', bottom: '0px', left: '0px' },
              },
            },
          },
        ],
      })),
    });
  }

  // 3.5. ABOUT US & BRAND PHILOSOPHY SECTION
  elements.push({
    id: sectionIds.about,
    name: 'About & Brand Story',
    type: 'section',
    tag: 'section',
    styles: {
      desktop: {
        backgroundColor: bgCard,
        padding: { top: '90px', right: '48px', bottom: '90px', left: '48px' },
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        textAlign: 'center',
        border: { width: '1px', style: 'solid', color: borderCol, radius: '0px' },
      },
      mobile: {
        padding: { top: '50px', right: '20px', bottom: '50px', left: '20px' },
      },
    },
    children: [
      {
        id: `${bp.id}-about-badge`,
        name: 'About Eyebrow Badge',
        type: 'badge',
        tag: 'span',
        content: `✦ OUR PHILOSOPHY & CRAFT`,
        styles: {
          desktop: {
            display: 'inline-block',
            fontSize: '11px',
            fontWeight: '700',
            letterSpacing: '0.08em',
            textTransform: 'uppercase',
            color: accent,
            backgroundColor: `${accent}18`,
            padding: { top: '5px', right: '14px', bottom: '5px', left: '14px' },
            border: { width: '1px', style: 'solid', color: `${accent}35`, radius: '9999px' },
            margin: { top: '0px', right: '0px', bottom: '16px', left: '0px' },
          },
        },
      },
      {
        id: `${bp.id}-about-h2`,
        name: 'About Heading',
        type: 'h2',
        tag: 'h2',
        content: `Redefining Standards Across ${bp.category}`,
        styles: {
          desktop: {
            fontSize: '34px',
            fontWeight: '800',
            color: textMain,
            maxWidth: '800px',
            margin: { top: '0px', right: '0px', bottom: '16px', left: '0px' },
          },
          tablet: { fontSize: '28px' },
          mobile: { fontSize: '24px' },
        },
      },
      {
        id: `${bp.id}-about-narrative`,
        name: 'About Narrative',
        type: 'paragraph',
        tag: 'p',
        content: `${bp.description} Founded on the principle that exceptional digital architecture transforms how businesses grow, we unite bespoke craftsmanship, lightning-fast edge reliability, and meticulous user experience.`,
        styles: {
          desktop: {
            fontSize: '16px',
            lineHeight: '1.7',
            color: textSub,
            maxWidth: '720px',
            margin: { top: '0px', right: '0px', bottom: '48px', left: '0px' },
          },
          mobile: { fontSize: '14px', margin: { top: '0px', right: '0px', bottom: '32px', left: '0px' } },
        },
      },
      {
        id: `${bp.id}-about-pillars-grid`,
        name: 'Core Pillars Grid',
        type: 'grid',
        tag: 'div',
        styles: {
          desktop: {
            display: 'grid',
            gridTemplateColumns: 'repeat(3, 1fr)',
            gap: '24px',
            width: '100%',
            maxWidth: '1100px',
            textAlign: 'left',
          },
          tablet: {
            gridTemplateColumns: 'repeat(2, 1fr)',
          },
          mobile: {
            gridTemplateColumns: '1fr',
          },
        },
        children: [
          {
            id: `${bp.id}-about-p1`,
            name: 'Pillar 1 Card',
            type: 'container',
            tag: 'div',
            styles: {
              desktop: {
                backgroundColor: bgMain,
                padding: { top: '32px', right: '28px', bottom: '32px', left: '28px' },
                border: { width: '1px', style: 'solid', color: borderCol, radius: '16px' },
              },
            },
            children: [
              {
                id: `${bp.id}-about-p1-ico`,
                name: 'Icon',
                type: 'paragraph',
                tag: 'span',
                content: '🏆',
                styles: { desktop: { fontSize: '28px', display: 'inline-block', margin: { top: '0px', right: '0px', bottom: '12px', left: '0px' } } },
              },
              {
                id: `${bp.id}-about-p1-title`,
                name: 'Title',
                type: 'h3',
                tag: 'h3',
                content: 'Uncompromising Quality',
                styles: { desktop: { fontSize: '18px', fontWeight: '700', color: textMain, margin: { top: '0px', right: '0px', bottom: '8px', left: '0px' } } },
              },
              {
                id: `${bp.id}-about-p1-desc`,
                name: 'Description',
                type: 'paragraph',
                tag: 'p',
                content: 'Every curve, typography scale, and data interaction is crafted to exceed demanding standards without shortcuts.',
                styles: { desktop: { fontSize: '14px', lineHeight: '1.6', color: textSub, margin: { top: '0px', right: '0px', bottom: '0px', left: '0px' } } },
              },
            ],
          },
          {
            id: `${bp.id}-about-p2`,
            name: 'Pillar 2 Card',
            type: 'container',
            tag: 'div',
            styles: {
              desktop: {
                backgroundColor: bgMain,
                padding: { top: '32px', right: '28px', bottom: '32px', left: '28px' },
                border: { width: '1px', style: 'solid', color: borderCol, radius: '16px' },
              },
            },
            children: [
              {
                id: `${bp.id}-about-p2-ico`,
                name: 'Icon',
                type: 'paragraph',
                tag: 'span',
                content: '⚡',
                styles: { desktop: { fontSize: '28px', display: 'inline-block', margin: { top: '0px', right: '0px', bottom: '12px', left: '0px' } } },
              },
              {
                id: `${bp.id}-about-p2-title`,
                name: 'Title',
                type: 'h3',
                tag: 'h3',
                content: 'Radical Velocity',
                styles: { desktop: { fontSize: '18px', fontWeight: '700', color: textMain, margin: { top: '0px', right: '0px', bottom: '8px', left: '0px' } } },
              },
              {
                id: `${bp.id}-about-p2-desc`,
                name: 'Description',
                type: 'paragraph',
                tag: 'p',
                content: 'Engineered for sub-second speeds, smooth micro-interactions, and zero operational friction at global scale.',
                styles: { desktop: { fontSize: '14px', lineHeight: '1.6', color: textSub, margin: { top: '0px', right: '0px', bottom: '0px', left: '0px' } } },
              },
            ],
          },
          {
            id: `${bp.id}-about-p3`,
            name: 'Pillar 3 Card',
            type: 'container',
            tag: 'div',
            styles: {
              desktop: {
                backgroundColor: bgMain,
                padding: { top: '32px', right: '28px', bottom: '32px', left: '28px' },
                border: { width: '1px', style: 'solid', color: borderCol, radius: '16px' },
              },
            },
            children: [
              {
                id: `${bp.id}-about-p3-ico`,
                name: 'Icon',
                type: 'paragraph',
                tag: 'span',
                content: '🛡️',
                styles: { desktop: { fontSize: '28px', display: 'inline-block', margin: { top: '0px', right: '0px', bottom: '12px', left: '0px' } } },
              },
              {
                id: `${bp.id}-about-p3-title`,
                name: 'Title',
                type: 'h3',
                tag: 'h3',
                content: 'Security & Longevity',
                styles: { desktop: { fontSize: '18px', fontWeight: '700', color: textMain, margin: { top: '0px', right: '0px', bottom: '8px', left: '0px' } } },
              },
              {
                id: `${bp.id}-about-p3-desc`,
                name: 'Description',
                type: 'paragraph',
                tag: 'p',
                content: 'Built on rock-solid foundations with modern security practices, transparent data control, and guaranteed uptime.',
                styles: { desktop: { fontSize: '14px', lineHeight: '1.6', color: textSub, margin: { top: '0px', right: '0px', bottom: '0px', left: '0px' } } },
              },
            ],
          },
        ],
      },
    ],
  });

  // 4. FEATURES GRID
  elements.push({
    id: sectionIds.features,
    name: 'Features & Capabilities',
    type: 'section',
    tag: 'section',
    styles: {
      desktop: {
        backgroundColor: bgMain,
        padding: { top: '100px', right: '48px', bottom: '100px', left: '48px' },
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
      },
      mobile: {
        padding: { top: '60px', right: '20px', bottom: '60px', left: '20px' },
      },
    },
    children: [
      {
        id: `${bp.id}-feat-heading`,
        name: 'Features Title',
        type: 'h2',
        tag: 'h2',
        content: `Engineered for Exceptional Results`,
        styles: {
          desktop: {
            fontSize: '36px',
            fontWeight: '800',
            color: textMain,
            textAlign: 'center',
            margin: { top: '0px', right: '0px', bottom: '12px', left: '0px' },
          },
          mobile: { fontSize: '26px' },
        },
      },
      {
        id: `${bp.id}-feat-sub`,
        name: 'Features Subtitle',
        type: 'paragraph',
        tag: 'p',
        content: bp.tagline,
        styles: {
          desktop: {
            fontSize: '15px',
            color: textSub,
            textAlign: 'center',
            maxWidth: '600px',
            margin: { top: '0px', right: '0px', bottom: '50px', left: '0px' },
          },
        },
      },
      {
        id: `${bp.id}-feat-grid`,
        name: 'Features Grid',
        type: 'grid',
        tag: 'div',
        styles: {
          desktop: {
            display: 'grid',
            gridTemplateColumns: 'repeat(3, 1fr)',
            gap: '24px',
            width: '100%',
            maxWidth: '1100px',
          },
          tablet: {
            gridTemplateColumns: 'repeat(2, 1fr)',
          },
          mobile: {
            gridTemplateColumns: '1fr',
          },
        },
        children: bp.features.map((f, idx) => ({
          id: `${bp.id}-feat-card-${idx}`,
          name: `Feature Card ${idx + 1}`,
          type: 'container',
          tag: 'div',
          styles: {
            desktop: {
              backgroundColor: bgCard,
              padding: { top: '32px', right: '28px', bottom: '32px', left: '28px' },
              border: { width: '1px', style: 'solid', color: borderCol, radius: '14px' },
              display: 'flex',
              flexDirection: 'column',
            },
          },
          children: [
            {
              id: `${bp.id}-feat-icon-${idx}`,
              name: 'Card Icon/Badge',
              type: 'badge',
              tag: 'span',
              content: f.tag || '⚡',
              styles: {
                desktop: {
                  fontSize: '20px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  width: '42px',
                  height: '42px',
                  backgroundColor: `${accent}18`,
                  color: accent,
                  border: { radius: '10px' },
                  margin: { top: '0px', right: '0px', bottom: '18px', left: '0px' },
                },
              },
            },
            {
              id: `${bp.id}-feat-title-${idx}`,
              name: 'Feature Title',
              type: 'h3',
              tag: 'h3',
              content: f.title,
              styles: {
                desktop: {
                  fontSize: '18px',
                  fontWeight: '700',
                  color: textMain,
                  margin: { top: '0px', right: '0px', bottom: '10px', left: '0px' },
                },
              },
            },
            {
              id: `${bp.id}-feat-desc-${idx}`,
              name: 'Feature Description',
              type: 'paragraph',
              tag: 'p',
              content: f.description,
              styles: {
                desktop: {
                  fontSize: '14px',
                  lineHeight: '1.6',
                  color: textSub,
                  margin: { top: '0px', right: '0px', bottom: '0px', left: '0px' },
                },
              },
            },
          ],
        })),
      },
    ],
  });

  // 5. SHOWCASE / GALLERY SECTION (If present)
  if (bp.showcaseSection && bp.showcaseSection.items.length > 0) {
    elements.push({
      id: sectionIds.showcase,
      name: 'Showcase Section',
      type: 'section',
      tag: 'section',
      styles: {
        desktop: {
          backgroundColor: bgCard,
          padding: { top: '90px', right: '48px', bottom: '90px', left: '48px' },
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        },
        mobile: {
          padding: { top: '60px', right: '20px', bottom: '60px', left: '20px' },
        },
      },
      children: [
        {
          id: `${bp.id}-showcase-h2`,
          name: 'Showcase Heading',
          type: 'h2',
          tag: 'h2',
          content: bp.showcaseSection.heading,
          styles: {
            desktop: {
              fontSize: '34px',
              fontWeight: '800',
              color: textMain,
              textAlign: 'center',
              margin: { top: '0px', right: '0px', bottom: '12px', left: '0px' },
            },
          },
        },
        {
          id: `${bp.id}-showcase-sub`,
          name: 'Showcase Subtitle',
          type: 'paragraph',
          tag: 'p',
          content: bp.showcaseSection.subheading,
          styles: {
            desktop: {
              fontSize: '15px',
              color: textSub,
              textAlign: 'center',
              maxWidth: '650px',
              margin: { top: '0px', right: '0px', bottom: '48px', left: '0px' },
            },
          },
        },
        {
          id: `${bp.id}-showcase-grid`,
          name: 'Showcase Grid',
          type: 'grid',
          tag: 'div',
          styles: {
            desktop: {
              display: 'grid',
              gridTemplateColumns: 'repeat(3, 1fr)',
              gap: '24px',
              width: '100%',
              maxWidth: '1100px',
            },
            tablet: {
              gridTemplateColumns: 'repeat(2, 1fr)',
            },
            mobile: {
              gridTemplateColumns: '1fr',
            },
          },
          children: bp.showcaseSection.items.map((item, idx) => ({
            id: `${bp.id}-showcase-item-${idx}`,
            name: `Showcase Item ${idx + 1}`,
            type: 'container',
            tag: 'div',
            styles: {
              desktop: {
                backgroundColor: bgMain,
                border: { width: '1px', style: 'solid', color: borderCol, radius: '14px' },
                overflow: 'hidden',
                display: 'flex',
                flexDirection: 'column',
              },
            },
            children: [
              {
                id: `${bp.id}-showcase-img-${idx}`,
                name: 'Item Image',
                type: 'image',
                tag: 'img',
                attributes: {
                  src: item.image,
                  alt: item.title,
                },
                styles: {
                  desktop: {
                    width: '100%',
                    height: '220px',
                    objectFit: 'cover',
                  },
                },
              },
              {
                id: `${bp.id}-showcase-body-${idx}`,
                name: 'Item Content',
                type: 'container',
                tag: 'div',
                styles: {
                  desktop: {
                    padding: { top: '20px', right: '20px', bottom: '20px', left: '20px' },
                    display: 'flex',
                    flexDirection: 'column',
                  },
                },
                children: [
                  {
                    id: `${bp.id}-showcase-ititle-${idx}`,
                    name: 'Item Title',
                    type: 'h3',
                    tag: 'h3',
                    content: item.title,
                    styles: {
                      desktop: {
                        fontSize: '17px',
                        fontWeight: '700',
                        color: textMain,
                        margin: { top: '0px', right: '0px', bottom: '6px', left: '0px' },
                      },
                    },
                  },
                  {
                    id: `${bp.id}-showcase-isub-${idx}`,
                    name: 'Item Subtitle',
                    type: 'paragraph',
                    tag: 'p',
                    content: item.subtitle,
                    styles: {
                      desktop: {
                        fontSize: '13px',
                        color: textSub,
                        margin: { top: '0px', right: '0px', bottom: '14px', left: '0px' },
                      },
                    },
                  },
                  ...(item.priceOrMetric
                    ? [
                        {
                          id: `${bp.id}-showcase-iprice-${idx}`,
                          name: 'Price / Highlight',
                          type: 'badge' as const,
                          tag: 'span',
                          content: item.priceOrMetric,
                          styles: {
                            desktop: {
                              fontSize: '14px',
                              fontWeight: '800',
                              color: accent,
                            },
                          },
                        },
                      ]
                    : []),
                ],
              },
            ],
          })),
        },
      ],
    });
  }

  // 5.5. TESTIMONIALS & REVIEWS SECTION
  elements.push({
    id: sectionIds.testimonials,
    name: 'Client Reviews & Social Proof',
    type: 'section',
    tag: 'section',
    styles: {
      desktop: {
        backgroundColor: bgCard,
        padding: { top: '90px', right: '48px', bottom: '90px', left: '48px' },
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        textAlign: 'center',
        border: { width: '1px', style: 'solid', color: borderCol, radius: '0px' },
      },
      mobile: {
        padding: { top: '50px', right: '20px', bottom: '50px', left: '20px' },
      },
    },
    children: [
      {
        id: `${bp.id}-test-badge`,
        name: 'Testimonials Badge',
        type: 'badge',
        tag: 'span',
        content: `★ VERIFIED CLIENT REVIEWS`,
        styles: {
          desktop: {
            display: 'inline-block',
            fontSize: '11px',
            fontWeight: '700',
            letterSpacing: '0.08em',
            textTransform: 'uppercase',
            color: accent,
            backgroundColor: `${accent}18`,
            padding: { top: '5px', right: '14px', bottom: '5px', left: '14px' },
            border: { width: '1px', style: 'solid', color: `${accent}35`, radius: '9999px' },
            margin: { top: '0px', right: '0px', bottom: '16px', left: '0px' },
          },
        },
      },
      {
        id: `${bp.id}-test-h2`,
        name: 'Testimonials Heading',
        type: 'h2',
        tag: 'h2',
        content: `Trusted by 25,000+ Creators & Leaders`,
        styles: {
          desktop: {
            fontSize: '34px',
            fontWeight: '800',
            color: textMain,
            maxWidth: '750px',
            margin: { top: '0px', right: '0px', bottom: '16px', left: '0px' },
          },
          tablet: { fontSize: '28px' },
          mobile: { fontSize: '24px' },
        },
      },
      {
        id: `${bp.id}-test-sub`,
        name: 'Testimonials Subtitle',
        type: 'paragraph',
        tag: 'p',
        content: `Real impact and verifiable outcomes from teams who chose ${bp.name} to achieve their boldest objectives.`,
        styles: {
          desktop: {
            fontSize: '15px',
            lineHeight: '1.6',
            color: textSub,
            maxWidth: '620px',
            margin: { top: '0px', right: '0px', bottom: '48px', left: '0px' },
          },
          mobile: { fontSize: '14px', margin: { top: '0px', right: '0px', bottom: '32px', left: '0px' } },
        },
      },
      {
        id: `${bp.id}-test-grid`,
        name: 'Testimonials Grid',
        type: 'grid',
        tag: 'div',
        styles: {
          desktop: {
            display: 'grid',
            gridTemplateColumns: 'repeat(3, 1fr)',
            gap: '24px',
            width: '100%',
            maxWidth: '1100px',
            textAlign: 'left',
          },
          tablet: {
            gridTemplateColumns: 'repeat(2, 1fr)',
          },
          mobile: {
            gridTemplateColumns: '1fr',
          },
        },
        children: [
          {
            id: `${bp.id}-test-c1`,
            name: 'Review Card 1',
            type: 'container',
            tag: 'div',
            styles: {
              desktop: {
                backgroundColor: bgMain,
                padding: { top: '32px', right: '28px', bottom: '32px', left: '28px' },
                border: { width: '1px', style: 'solid', color: borderCol, radius: '16px' },
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
              },
            },
            children: [
              {
                id: `${bp.id}-test-c1-stars`,
                name: 'Stars',
                type: 'paragraph',
                tag: 'div',
                content: '★★★★★',
                styles: { desktop: { color: '#f59e0b', fontSize: '18px', letterSpacing: '0.1em', margin: { top: '0px', right: '0px', bottom: '12px', left: '0px' } } },
              },
              {
                id: `${bp.id}-test-c1-quote`,
                name: 'Quote',
                type: 'paragraph',
                tag: 'p',
                content: bp.testimonial?.quote || `"${bp.name} completely elevated our digital presence. Our engagement rates doubled within weeks of launch."`,
                styles: { desktop: { fontSize: '14px', lineHeight: '1.6', color: textMain, fontStyle: 'italic', margin: { top: '0px', right: '0px', bottom: '20px', left: '0px' } } },
              },
              {
                id: `${bp.id}-test-c1-author`,
                name: 'Author Row',
                type: 'container',
                tag: 'div',
                styles: { desktop: { display: 'flex', alignItems: 'center', gap: '12px' } },
                children: [
                  {
                    id: `${bp.id}-test-c1-avatar`,
                    name: 'Avatar',
                    type: 'image',
                    tag: 'img',
                    attributes: {
                      src: bp.testimonial?.avatar || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=150&q=80',
                      alt: 'Client Avatar',
                    },
                    styles: { desktop: { width: '42px', height: '42px', border: { radius: '9999px' } } },
                  },
                  {
                    id: `${bp.id}-test-c1-meta`,
                    name: 'Author Info',
                    type: 'container',
                    tag: 'div',
                    styles: { desktop: { display: 'flex', flexDirection: 'column' } },
                    children: [
                      {
                        id: `${bp.id}-test-c1-name`,
                        name: 'Name',
                        type: 'paragraph',
                        tag: 'p',
                        content: bp.testimonial?.author || 'Sarah Jenkins',
                        styles: { desktop: { fontSize: '13px', fontWeight: '700', color: textMain, margin: { top: '0px', right: '0px', bottom: '2px', left: '0px' } } },
                      },
                      {
                        id: `${bp.id}-test-c1-role`,
                        name: 'Role',
                        type: 'paragraph',
                        tag: 'p',
                        content: bp.testimonial?.role || 'Head of Growth, Horizon Labs',
                        styles: { desktop: { fontSize: '11px', color: textSub, margin: { top: '0px', right: '0px', bottom: '0px', left: '0px' } } },
                      },
                    ],
                  },
                ],
              },
            ],
          },
          {
            id: `${bp.id}-test-c2`,
            name: 'Review Card 2',
            type: 'container',
            tag: 'div',
            styles: {
              desktop: {
                backgroundColor: bgMain,
                padding: { top: '32px', right: '28px', bottom: '32px', left: '28px' },
                border: { width: '1px', style: 'solid', color: borderCol, radius: '16px' },
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
              },
            },
            children: [
              {
                id: `${bp.id}-test-c2-stars`,
                name: 'Stars',
                type: 'paragraph',
                tag: 'div',
                content: '★★★★★',
                styles: { desktop: { color: '#f59e0b', fontSize: '18px', letterSpacing: '0.1em', margin: { top: '0px', right: '0px', bottom: '12px', left: '0px' } } },
              },
              {
                id: `${bp.id}-test-c2-quote`,
                name: 'Quote',
                type: 'paragraph',
                tag: 'p',
                content: `"The cleanest, most intuitive visual architecture we have ever deployed. It helped us secure our next round of clients."`,
                styles: { desktop: { fontSize: '14px', lineHeight: '1.6', color: textMain, fontStyle: 'italic', margin: { top: '0px', right: '0px', bottom: '20px', left: '0px' } } },
              },
              {
                id: `${bp.id}-test-c2-author`,
                name: 'Author Row',
                type: 'container',
                tag: 'div',
                styles: { desktop: { display: 'flex', alignItems: 'center', gap: '12px' } },
                children: [
                  {
                    id: `${bp.id}-test-c2-avatar`,
                    name: 'Avatar',
                    type: 'image',
                    tag: 'img',
                    attributes: {
                      src: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=150&q=80',
                      alt: 'Client Avatar',
                    },
                    styles: { desktop: { width: '42px', height: '42px', border: { radius: '9999px' } } },
                  },
                  {
                    id: `${bp.id}-test-c2-meta`,
                    name: 'Author Info',
                    type: 'container',
                    tag: 'div',
                    styles: { desktop: { display: 'flex', flexDirection: 'column' } },
                    children: [
                      {
                        id: `${bp.id}-test-c2-name`,
                        name: 'Name',
                        type: 'paragraph',
                        tag: 'p',
                        content: 'Marcus Vance',
                        styles: { desktop: { fontSize: '13px', fontWeight: '700', color: textMain, margin: { top: '0px', right: '0px', bottom: '2px', left: '0px' } } },
                      },
                      {
                        id: `${bp.id}-test-c2-role`,
                        name: 'Role',
                        type: 'paragraph',
                        tag: 'p',
                        content: 'Founder & Principal, Atelier',
                        styles: { desktop: { fontSize: '11px', color: textSub, margin: { top: '0px', right: '0px', bottom: '0px', left: '0px' } } },
                      },
                    ],
                  },
                ],
              },
            ],
          },
          {
            id: `${bp.id}-test-c3`,
            name: 'Review Card 3',
            type: 'container',
            tag: 'div',
            styles: {
              desktop: {
                backgroundColor: bgMain,
                padding: { top: '32px', right: '28px', bottom: '32px', left: '28px' },
                border: { width: '1px', style: 'solid', color: borderCol, radius: '16px' },
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
              },
            },
            children: [
              {
                id: `${bp.id}-test-c3-stars`,
                name: 'Stars',
                type: 'paragraph',
                tag: 'div',
                content: '★★★★★',
                styles: { desktop: { color: '#f59e0b', fontSize: '18px', letterSpacing: '0.1em', margin: { top: '0px', right: '0px', bottom: '12px', left: '0px' } } },
              },
              {
                id: `${bp.id}-test-c3-quote`,
                name: 'Quote',
                type: 'paragraph',
                tag: 'p',
                content: `"Superb attention to detail and zero learning curve. Our customers regularly comment on how fast the site feels."`,
                styles: { desktop: { fontSize: '14px', lineHeight: '1.6', color: textMain, fontStyle: 'italic', margin: { top: '0px', right: '0px', bottom: '20px', left: '0px' } } },
              },
              {
                id: `${bp.id}-test-c3-author`,
                name: 'Author Row',
                type: 'container',
                tag: 'div',
                styles: { desktop: { display: 'flex', alignItems: 'center', gap: '12px' } },
                children: [
                  {
                    id: `${bp.id}-test-c3-avatar`,
                    name: 'Avatar',
                    type: 'image',
                    tag: 'img',
                    attributes: {
                      src: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=150&q=80',
                      alt: 'Client Avatar',
                    },
                    styles: { desktop: { width: '42px', height: '42px', border: { radius: '9999px' } } },
                  },
                  {
                    id: `${bp.id}-test-c3-meta`,
                    name: 'Author Info',
                    type: 'container',
                    tag: 'div',
                    styles: { desktop: { display: 'flex', flexDirection: 'column' } },
                    children: [
                      {
                        id: `${bp.id}-test-c3-name`,
                        name: 'Name',
                        type: 'paragraph',
                        tag: 'p',
                        content: 'Elena Moreau',
                        styles: { desktop: { fontSize: '13px', fontWeight: '700', color: textMain, margin: { top: '0px', right: '0px', bottom: '2px', left: '0px' } } },
                      },
                      {
                        id: `${bp.id}-test-c3-role`,
                        name: 'Role',
                        type: 'paragraph',
                        tag: 'p',
                        content: 'Chief Experience Officer, Vesper',
                        styles: { desktop: { fontSize: '11px', color: textSub, margin: { top: '0px', right: '0px', bottom: '0px', left: '0px' } } },
                      },
                    ],
                  },
                ],
              },
            ],
          },
        ],
      },
    ],
  });

  // 6. PRICING OR SERVICES SECTION (If present)
  if (bp.pricingOrServices && bp.pricingOrServices.tiers.length > 0) {
    elements.push({
      id: sectionIds.pricing,
      name: 'Pricing Plans',
      type: 'section',
      tag: 'section',
      styles: {
        desktop: {
          backgroundColor: bgMain,
          padding: { top: '100px', right: '48px', bottom: '100px', left: '48px' },
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        },
        mobile: {
          padding: { top: '60px', right: '20px', bottom: '60px', left: '20px' },
        },
      },
      children: [
        {
          id: `${bp.id}-pricing-h2`,
          name: 'Pricing Heading',
          type: 'h2',
          tag: 'h2',
          content: bp.pricingOrServices.heading,
          styles: {
            desktop: {
              fontSize: '34px',
              fontWeight: '800',
              color: textMain,
              textAlign: 'center',
              margin: { top: '0px', right: '0px', bottom: '12px', left: '0px' },
            },
          },
        },
        {
          id: `${bp.id}-pricing-sub`,
          name: 'Pricing Subtitle',
          type: 'paragraph',
          tag: 'p',
          content: bp.pricingOrServices.subheading,
          styles: {
            desktop: {
              fontSize: '15px',
              color: textSub,
              textAlign: 'center',
              maxWidth: '600px',
              margin: { top: '0px', right: '0px', bottom: '48px', left: '0px' },
            },
          },
        },
        {
          id: `${bp.id}-pricing-grid`,
          name: 'Pricing Grid',
          type: 'grid',
          tag: 'div',
          styles: {
            desktop: {
              display: 'grid',
              gridTemplateColumns: `repeat(${bp.pricingOrServices.tiers.length}, 1fr)`,
              gap: '24px',
              width: '100%',
              maxWidth: '1050px',
            },
            tablet: {
              gridTemplateColumns: 'repeat(2, 1fr)',
            },
            mobile: {
              gridTemplateColumns: '1fr',
            },
          },
          children: bp.pricingOrServices.tiers.map((tier, idx) => ({
            id: `${bp.id}-tier-card-${idx}`,
            name: `Tier ${tier.name}`,
            type: 'container',
            tag: 'div',
            styles: {
              desktop: {
                backgroundColor: tier.highlight ? (bp.darkTheme ? '#172033' : '#f0fdf4') : bgCard,
                border: {
                  width: '2px',
                  style: 'solid',
                  color: tier.highlight ? accent : borderCol,
                  radius: '16px',
                },
                padding: { top: '36px', right: '28px', bottom: '36px', left: '28px' },
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
              },
            },
            children: [
              {
                id: `${bp.id}-tier-top-${idx}`,
                name: 'Tier Details',
                type: 'container',
                tag: 'div',
                styles: {
                  desktop: {
                    display: 'flex',
                    flexDirection: 'column',
                  },
                },
                children: [
                  {
                    id: `${bp.id}-tier-name-${idx}`,
                    name: 'Plan Name',
                    type: 'h3',
                    tag: 'h3',
                    content: tier.name,
                    styles: {
                      desktop: {
                        fontSize: '18px',
                        fontWeight: '700',
                        color: textMain,
                        margin: { top: '0px', right: '0px', bottom: '6px', left: '0px' },
                      },
                    },
                  },
                  {
                    id: `${bp.id}-tier-desc-${idx}`,
                    name: 'Plan Description',
                    type: 'paragraph',
                    tag: 'p',
                    content: tier.description,
                    styles: {
                      desktop: {
                        fontSize: '13px',
                        color: textSub,
                        margin: { top: '0px', right: '0px', bottom: '20px', left: '0px' },
                      },
                    },
                  },
                  {
                    id: `${bp.id}-tier-price-${idx}`,
                    name: 'Price Tag',
                    type: 'h2',
                    tag: 'h2',
                    content: `${tier.price} ${tier.frequency || ''}`,
                    styles: {
                      desktop: {
                        fontSize: '32px',
                        fontWeight: '800',
                        color: tier.highlight ? accent : textMain,
                        margin: { top: '0px', right: '0px', bottom: '24px', left: '0px' },
                      },
                    },
                  },
                  {
                    id: `${bp.id}-tier-features-${idx}`,
                    name: 'Feature List',
                    type: 'container',
                    tag: 'div',
                    styles: {
                      desktop: {
                        display: 'flex',
                        flexDirection: 'column',
                        gap: '10px',
                        margin: { top: '0px', right: '0px', bottom: '32px', left: '0px' },
                      },
                    },
                    children: tier.features.map((feat, fIdx) => ({
                      id: `${bp.id}-tier-${idx}-feat-${fIdx}`,
                      name: 'Feature Item',
                      type: 'paragraph',
                      tag: 'p',
                      content: `✓  ${feat}`,
                      styles: {
                        desktop: {
                          fontSize: '13px',
                          color: textSub,
                          margin: { top: '0px', right: '0px', bottom: '0px', left: '0px' },
                        },
                      },
                    })),
                  },
                ],
              },
              {
                id: `${bp.id}-tier-btn-${idx}`,
                name: 'Plan CTA',
                type: 'button',
                tag: 'button',
                content: tier.buttonText,
                linkSettings: {
                  type: 'section',
                  sectionId: sectionIds.cta,
                },
                styles: {
                  desktop: {
                    width: '100%',
                    backgroundColor: tier.highlight ? accent : (bp.darkTheme ? '#1e293b' : '#e2e8f0'),
                    color: tier.highlight ? '#ffffff' : textMain,
                    padding: { top: '12px', right: '20px', bottom: '12px', left: '20px' },
                    border: { radius: '8px' },
                    fontSize: '13px',
                    fontWeight: '700',
                    cursor: 'pointer',
                  },
                },
              },
            ],
          })),
        },
      ],
    });
  }

  // 7. DEEP ACCORDION FAQ OR TRUST SECTION
  elements.push({
    id: sectionIds.faq,
    name: 'FAQ & Trust Section',
    type: 'section',
    tag: 'section',
    styles: {
      desktop: {
        backgroundColor: bgCard,
        padding: { top: '90px', right: '48px', bottom: '90px', left: '48px' },
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
      },
      mobile: {
        padding: { top: '60px', right: '20px', bottom: '60px', left: '20px' },
      },
    },
    children: [
      {
        id: `${bp.id}-faq-h2`,
        name: 'FAQ Heading',
        type: 'h2',
        tag: 'h2',
        content: bp.faqOrTrust?.heading || 'Frequently Asked Questions',
        styles: {
          desktop: {
            fontSize: '32px',
            fontWeight: '800',
            color: textMain,
            textAlign: 'center',
            margin: { top: '0px', right: '0px', bottom: '10px', left: '0px' },
          },
        },
      },
      {
        id: `${bp.id}-faq-sub`,
        name: 'FAQ Subtitle',
        type: 'paragraph',
        tag: 'p',
        content: bp.faqOrTrust?.subheading || 'Everything you need to know about our standards, onboarding and warranties.',
        styles: {
          desktop: {
            fontSize: '15px',
            color: textSub,
            textAlign: 'center',
            maxWidth: '600px',
            margin: { top: '0px', right: '0px', bottom: '40px', left: '0px' },
          },
        },
      },
      {
        id: `${bp.id}-faq-list`,
        name: 'FAQ Accordion List',
        type: 'container',
        tag: 'div',
        styles: {
          desktop: {
            width: '100%',
            maxWidth: '850px',
            display: 'flex',
            flexDirection: 'column',
            gap: '16px',
          },
        },
        children: (bp.faqOrTrust?.items || [
          {
            question: `How does ${bp.name} ensure world-class quality?`,
            answer: `Every deliverable is rigorously inspected and verified according to international standards before release, backed by our comprehensive warranty and dedicated customer support team.`,
          },
          {
            question: `What is the timeline from consultation to final delivery?`,
            answer: `Typical onboarding takes between 2 to 7 business days. Our dedicated concierge guides you step-by-step through our transparent project milestones.`,
          },
          {
            question: `Can I customize or adjust my plan as requirements change?`,
            answer: `Yes, all plans and engagements are fully modular. You can scale, pause, or adjust your deliverables at any time with zero penalty.`,
          },
        ]).map((item, qIdx) => ({
          id: `${bp.id}-faq-item-${qIdx}`,
          name: `FAQ Item ${qIdx + 1}`,
          type: 'container',
          tag: 'div',
          styles: {
            desktop: {
              backgroundColor: bgMain,
              padding: { top: '22px', right: '26px', bottom: '22px', left: '26px' },
              border: { width: '1px', style: 'solid', color: borderCol, radius: '12px' },
              display: 'flex',
              flexDirection: 'column',
            },
          },
          children: [
            {
              id: `${bp.id}-faq-q-${qIdx}`,
              name: 'Question',
              type: 'h3',
              tag: 'h3',
              content: item.question,
              styles: {
                desktop: {
                  fontSize: '16px',
                  fontWeight: '700',
                  color: textMain,
                  margin: { top: '0px', right: '0px', bottom: '8px', left: '0px' },
                },
              },
            },
            {
              id: `${bp.id}-faq-a-${qIdx}`,
              name: 'Answer',
              type: 'paragraph',
              tag: 'p',
              content: item.answer,
              styles: {
                desktop: {
                  fontSize: '14px',
                  lineHeight: '1.6',
                  color: textSub,
                  margin: { top: '0px', right: '0px', bottom: '0px', left: '0px' },
                },
              },
            },
          ],
        })),
      },
    ],
  });

  // 8. CALL TO ACTION & COMPREHENSIVE CONTACT FORM SECTION
  elements.push({
    id: sectionIds.cta,
    name: 'Contact & Inquiry Section',
    type: 'section',
    tag: 'section',
    styles: {
      desktop: {
        backgroundColor: bgMain,
        padding: { top: '100px', right: '48px', bottom: '100px', left: '48px' },
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        textAlign: 'center',
        border: { width: '1px', style: 'solid', color: borderCol, radius: '0px' },
      },
      mobile: {
        padding: { top: '60px', right: '20px', bottom: '60px', left: '20px' },
      },
    },
    children: [
      {
        id: `${bp.id}-cta-badge`,
        name: 'Contact Badge',
        type: 'badge',
        tag: 'span',
        content: `✦ CONNECT WITH OUR TEAM`,
        styles: {
          desktop: {
            display: 'inline-block',
            fontSize: '11px',
            fontWeight: '700',
            letterSpacing: '0.08em',
            textTransform: 'uppercase',
            color: accent,
            backgroundColor: `${accent}18`,
            padding: { top: '5px', right: '14px', bottom: '5px', left: '14px' },
            border: { width: '1px', style: 'solid', color: `${accent}35`, radius: '9999px' },
            margin: { top: '0px', right: '0px', bottom: '16px', left: '0px' },
          },
        },
      },
      {
        id: `${bp.id}-cta-h2`,
        name: 'Contact Heading',
        type: 'h2',
        tag: 'h2',
        content: bp.cta.headline || `Let's Build Something Exceptional`,
        styles: {
          desktop: {
            fontSize: '34px',
            fontWeight: '800',
            color: textMain,
            maxWidth: '750px',
            margin: { top: '0px', right: '0px', bottom: '16px', left: '0px' },
          },
          tablet: { fontSize: '28px' },
          mobile: { fontSize: '24px' },
        },
      },
      {
        id: `${bp.id}-cta-sub`,
        name: 'Contact Subtitle',
        type: 'paragraph',
        tag: 'p',
        content: bp.cta.subheadline || `Send us an inquiry or schedule a consultation. We answer all incoming requests within 2 hours.`,
        styles: {
          desktop: {
            fontSize: '15px',
            color: textSub,
            maxWidth: '580px',
            margin: { top: '0px', right: '0px', bottom: '40px', left: '0px' },
          },
          mobile: { fontSize: '14px', margin: { top: '0px', right: '0px', bottom: '24px', left: '0px' } },
        },
      },
      {
        id: `${bp.id}-contact-card`,
        name: 'Contact Form Container',
        type: 'container',
        tag: 'form',
        styles: {
          desktop: {
            backgroundColor: bgCard,
            padding: { top: '36px', right: '36px', bottom: '36px', left: '36px' },
            border: { width: '1px', style: 'solid', color: borderCol, radius: '20px' },
            width: '100%',
            maxWidth: '560px',
            display: 'flex',
            flexDirection: 'column',
            gap: '16px',
            textAlign: 'left',
          },
          mobile: {
            padding: { top: '24px', right: '18px', bottom: '24px', left: '18px' },
          },
        },
        children: [
          {
            id: `${bp.id}-input-name`,
            name: 'Name Input',
            type: 'input',
            tag: 'input',
            attributes: {
              type: 'text',
              placeholder: 'Your Full Name (e.g. Alex Morgan)',
            },
            styles: {
              desktop: {
                width: '100%',
                padding: { top: '12px', right: '16px', bottom: '12px', left: '16px' },
                backgroundColor: bgMain,
                border: { width: '1px', style: 'solid', color: borderCol, radius: '10px' },
                color: textMain,
                fontSize: '13px',
              },
            },
          },
          {
            id: `${bp.id}-input-email`,
            name: 'Email Input',
            type: 'input',
            tag: 'input',
            attributes: {
              type: 'email',
              placeholder: 'Work Email (e.g. alex@company.com)',
            },
            styles: {
              desktop: {
                width: '100%',
                padding: { top: '12px', right: '16px', bottom: '12px', left: '16px' },
                backgroundColor: bgMain,
                border: { width: '1px', style: 'solid', color: borderCol, radius: '10px' },
                color: textMain,
                fontSize: '13px',
              },
            },
          },
          {
            id: `${bp.id}-input-msg`,
            name: 'Message Textarea',
            type: 'textarea',
            tag: 'textarea',
            attributes: {
              placeholder: 'Tell us about your project, timeline, or requirements...',
            },
            styles: {
              desktop: {
                width: '100%',
                minHeight: '100px',
                padding: { top: '12px', right: '16px', bottom: '12px', left: '16px' },
                backgroundColor: bgMain,
                border: { width: '1px', style: 'solid', color: borderCol, radius: '10px' },
                color: textMain,
                fontSize: '13px',
              },
            },
          },
          {
            id: `${bp.id}-contact-submit-btn`,
            name: 'Submit Button',
            type: 'button',
            tag: 'button',
            content: bp.cta.buttonText || 'Send Message',
            styles: {
              desktop: {
                width: '100%',
                backgroundColor: accent,
                color: '#ffffff',
                padding: { top: '14px', right: '24px', bottom: '14px', left: '24px' },
                border: { radius: '12px' },
                fontSize: '14px',
                fontWeight: '700',
                cursor: 'pointer',
                textAlign: 'center',
              },
            },
          },
          {
            id: `${bp.id}-contact-notice`,
            name: 'Privacy Notice',
            type: 'paragraph',
            tag: 'p',
            content: '✓ 100% Confidential • 2-Hour Response Time • No Credit Card Required',
            styles: {
              desktop: {
                fontSize: '11px',
                color: textSub,
                textAlign: 'center',
                margin: { top: '4px', right: '0px', bottom: '0px', left: '0px' },
              },
            },
          },
        ],
      },
    ],
  });

  // 9. FOOTER
  elements.push({
    id: `${bp.id}-footer`,
    name: 'Footer',
    type: 'footer',
    tag: 'footer',
    styles: {
      desktop: {
        backgroundColor: bgCard,
        color: textSub,
        padding: { top: '50px', right: '48px', bottom: '50px', left: '48px' },
        border: { width: '1px', style: 'solid', color: borderCol, radius: '0px' },
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        flexWrap: 'wrap',
        gap: '20px',
      },
      mobile: {
        flexDirection: 'column',
        textAlign: 'center',
        padding: { top: '40px', right: '20px', bottom: '40px', left: '20px' },
      },
    },
    children: [
      {
        id: `${bp.id}-footer-brand`,
        name: 'Footer Copyright',
        type: 'paragraph',
        tag: 'p',
        content: `© ${new Date().getFullYear()} ${bp.name}. All rights reserved.`,
        styles: {
          desktop: {
            fontSize: '13px',
            margin: { top: '0px', right: '0px', bottom: '0px', left: '0px' },
          },
        },
      },
      {
        id: `${bp.id}-footer-links`,
        name: 'Footer Links',
        type: 'container',
        tag: 'div',
        styles: {
          desktop: {
            display: 'flex',
            alignItems: 'center',
            gap: '24px',
          },
          mobile: {
            flexWrap: 'wrap',
            justifyContent: 'center',
          },
        },
        children: ['Privacy Policy', 'Terms of Service', 'Security', 'Contact Us'].map((term, tIdx) => ({
          id: `${bp.id}-foot-link-${tIdx}`,
          name: `Footer Link ${term}`,
          type: 'link',
          tag: 'a',
          content: term,
          linkSettings: {
            type: 'section',
            sectionId: sectionIds.cta,
          },
          styles: {
            desktop: {
              color: textSub,
              fontSize: '12px',
              textDecoration: 'none',
              cursor: 'pointer',
            },
          },
        })),
      },
    ],
  });

  return {
    id: bp.id,
    name: bp.name,
    category: bp.category,
    badge: bp.badge,
    tagline: bp.tagline,
    description: bp.description,
    heroImage: bp.heroImage,
    previewThumbnail: bp.previewThumbnail,
    accentColor: bp.accentColor,
    darkTheme: bp.darkTheme,
    sectionsCount: elements.length,
    features: bp.features.map((f) => f.title),
    elements,
  };
}
