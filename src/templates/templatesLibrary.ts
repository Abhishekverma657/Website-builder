import { BuilderElement, Project } from '../types/builder';
import { initialProject } from './initialProject';

export interface WebsiteTemplate {
  id: string;
  name: string;
  category: 'Agency' | 'SaaS & Tech' | 'Restaurant & Food' | 'Portfolio & Creator' | 'Health & Fitness' | 'Business & Real Estate';
  badge: string;
  description: string;
  elements: BuilderElement[];
}

// 1. Nexus AI & Modern SaaS Template
const saasElements: BuilderElement[] = [
  // Navbar
  {
    id: 'saas-nav',
    name: 'SaaS Navbar',
    type: 'navbar',
    tag: 'nav',
    styles: {
      desktop: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: { top: '20px', right: '48px', bottom: '20px', left: '48px' },
        backgroundColor: '#090d16',
        color: '#ffffff',
        border: { width: '1px', style: 'solid', color: '#1e293b', radius: '0px' },
        position: 'sticky',
        top: '0px',
        zIndex: '20',
      },
      mobile: { padding: { top: '14px', right: '16px', bottom: '14px', left: '16px' } },
    },
    children: [
      {
        id: 'saas-logo',
        name: 'SaaS Logo',
        type: 'h3',
        tag: 'h3',
        content: '⚡ NEXUS AI',
        styles: {
          desktop: {
            fontSize: '18px',
            fontWeight: '800',
            letterSpacing: '0.05em',
            color: '#10b981',
            margin: { top: '0px', right: '0px', bottom: '0px', left: '0px' },
            cursor: 'pointer',
          },
        },
      },
      {
        id: 'saas-nav-links',
        name: 'Nav Links',
        type: 'div',
        tag: 'div',
        styles: {
          desktop: { display: 'flex', alignItems: 'center', gap: '28px' },
          mobile: { display: 'none' },
        },
        children: [
          { id: 's-l1', name: 'Link Features', type: 'link', tag: 'a', content: 'Features', styles: { desktop: { color: '#94a3b8', fontSize: '14px', textDecoration: 'none' } } },
          { id: 's-l2', name: 'Link Pricing', type: 'link', tag: 'a', content: 'Pricing', styles: { desktop: { color: '#94a3b8', fontSize: '14px', textDecoration: 'none' } } },
          { id: 's-l3', name: 'Link Integrations', type: 'link', tag: 'a', content: 'Integrations', styles: { desktop: { color: '#94a3b8', fontSize: '14px', textDecoration: 'none' } } },
          { id: 's-cta', name: 'Nav CTA', type: 'button', tag: 'button', content: 'Get Started Free →', styles: { desktop: { backgroundColor: '#10b981', color: '#090d16', padding: { top: '8px', right: '18px', bottom: '8px', left: '18px' }, border: { width: '1px', style: 'solid', color: '#10b981', radius: '8px' }, fontSize: '13px', fontWeight: '700', cursor: 'pointer' } } },
        ],
      },
    ],
  },
  // Hero Section
  {
    id: 'saas-hero',
    name: 'SaaS Hero',
    type: 'section',
    tag: 'section',
    styles: {
      desktop: {
        backgroundColor: '#090d16',
        color: '#ffffff',
        padding: { top: '90px', right: '32px', bottom: '90px', left: '32px' },
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        textAlign: 'center',
      },
      mobile: { padding: { top: '50px', right: '16px', bottom: '50px', left: '16px' } },
    },
    children: [
      {
        id: 'saas-badge',
        name: 'AI Pill Badge',
        type: 'badge',
        tag: 'span',
        content: '✨ POWERED BY GPT-4O & REALTIME AI AGENTS',
        styles: {
          desktop: {
            backgroundColor: 'rgba(16, 185, 129, 0.15)',
            color: '#10b981',
            fontSize: '11px',
            fontWeight: '700',
            letterSpacing: '0.1em',
            padding: { top: '6px', right: '16px', bottom: '6px', left: '16px' },
            border: { width: '1px', style: 'solid', color: 'rgba(16, 185, 129, 0.3)', radius: '9999px' },
            margin: { top: '0px', right: '0px', bottom: '24px', left: '0px' },
          },
        },
      },
      {
        id: 'saas-h1',
        name: 'Headline',
        type: 'h1',
        tag: 'h1',
        content: 'Automate your entire engineering workflow with intelligent agents.',
        styles: {
          desktop: {
            fontSize: '54px',
            fontWeight: '800',
            lineHeight: '1.15',
            maxWidth: '920px',
            color: '#ffffff',
            margin: { top: '0px', right: 'auto', bottom: '20px', left: 'auto' },
          },
          mobile: { fontSize: '28px' },
        },
      },
      {
        id: 'saas-p',
        name: 'Subtitle',
        type: 'paragraph',
        tag: 'p',
        content: 'Nexus AI analyzes your repository, writes clean pull requests, catches regressions, and scales cloud infrastructure automatically.',
        styles: {
          desktop: {
            fontSize: '17px',
            color: '#94a3b8',
            maxWidth: '680px',
            lineHeight: '1.6',
            margin: { top: '0px', right: 'auto', bottom: '36px', left: 'auto' },
          },
        },
      },
      {
        id: 'saas-hero-cta',
        name: 'Hero Action Buttons',
        type: 'div',
        tag: 'div',
        styles: {
          desktop: { display: 'flex', gap: '16px', margin: { top: '0px', right: '0px', bottom: '48px', left: '0px' } },
          mobile: { flexDirection: 'column', width: '100%' },
        },
        children: [
          { id: 's-btn-p', name: 'Start Trial', type: 'button', tag: 'button', content: 'Start 14-Day Free Trial', styles: { desktop: { backgroundColor: '#10b981', color: '#090d16', padding: { top: '14px', right: '28px', bottom: '14px', left: '28px' }, border: { width: '1px', style: 'solid', color: '#10b981', radius: '10px' }, fontSize: '15px', fontWeight: '700', cursor: 'pointer' }, mobile: { width: '100%' } } },
          { id: 's-btn-s', name: 'Book Demo', type: 'button', tag: 'button', content: 'Watch 2-Min Demo ▷', styles: { desktop: { backgroundColor: 'rgba(255, 255, 255, 0.08)', color: '#ffffff', padding: { top: '14px', right: '28px', bottom: '14px', left: '28px' }, border: { width: '1px', style: 'solid', color: 'rgba(255, 255, 255, 0.2)', radius: '10px' }, fontSize: '15px', fontWeight: '600', cursor: 'pointer' }, mobile: { width: '100%' } } },
        ],
      },
      {
        id: 'saas-banner-img',
        name: 'Dashboard Preview Image',
        type: 'image',
        tag: 'img',
        attributes: {
          src: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=1400&q=80',
          alt: 'SaaS Metrics Dashboard',
        },
        styles: {
          desktop: {
            width: '100%',
            maxWidth: '1050px',
            border: { width: '1px', style: 'solid', color: '#334155', radius: '16px' },
            boxShadow: '0 25px 60px -15px rgba(0, 0, 0, 0.7)',
          },
        },
      },
    ],
  },
  // Features Grid
  {
    id: 'saas-features',
    name: 'SaaS Features Section',
    type: 'section',
    tag: 'section',
    styles: {
      desktop: { backgroundColor: '#0f172a', padding: { top: '80px', right: '32px', bottom: '80px', left: '32px' } },
      mobile: { padding: { top: '48px', right: '16px', bottom: '48px', left: '16px' } },
    },
    children: [
      {
        id: 's-feat-grid',
        name: 'Features 3-Col Grid',
        type: 'grid',
        tag: 'div',
        styles: {
          desktop: { display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '24px', maxWidth: '1100px', margin: { top: '0px', right: 'auto', bottom: '0px', left: 'auto' } },
          tablet: { gridTemplateColumns: 'repeat(2, 1fr)' },
          mobile: { gridTemplateColumns: 'repeat(1, 1fr)' },
        },
        children: [
          {
            id: 'sf-card-1',
            name: 'Feature Card 1',
            type: 'card',
            tag: 'div',
            styles: { desktop: { backgroundColor: '#1e293b', padding: { top: '32px', right: '28px', bottom: '32px', left: '28px' }, border: { width: '1px', style: 'solid', color: '#334155', radius: '14px' } } },
            children: [
              { id: 'sfc-1-t', name: 'Card Title 1', type: 'h3', tag: 'h3', content: '01. Instant PR Synthesis', styles: { desktop: { fontSize: '20px', fontWeight: '700', color: '#34d399', margin: { top: '0px', right: '0px', bottom: '12px', left: '0px' } } } },
              { id: 'sfc-1-p', name: 'Card Text 1', type: 'paragraph', tag: 'p', content: 'Review and merge code with contextual multi-file intelligence.', styles: { desktop: { fontSize: '14px', color: '#94a3b8', lineHeight: '1.6' } } },
            ],
          },
          {
            id: 'sf-card-2',
            name: 'Feature Card 2',
            type: 'card',
            tag: 'div',
            styles: { desktop: { backgroundColor: '#1e293b', padding: { top: '32px', right: '28px', bottom: '32px', left: '28px' }, border: { width: '1px', style: 'solid', color: '#334155', radius: '14px' } } },
            children: [
              { id: 'sfc-2-t', name: 'Card Title 2', type: 'h3', tag: 'h3', content: '02. Zero-Latency Cloud', styles: { desktop: { fontSize: '20px', fontWeight: '700', color: '#14b8a6', margin: { top: '0px', right: '0px', bottom: '12px', left: '0px' } } } },
              { id: 'sfc-2-p', name: 'Card Text 2', type: 'paragraph', tag: 'p', content: 'Distributed edge runtime ensures your queries execute in under 40ms worldwide.', styles: { desktop: { fontSize: '14px', color: '#94a3b8', lineHeight: '1.6' } } },
            ],
          },
          {
            id: 'sf-card-3',
            name: 'Feature Card 3',
            type: 'card',
            tag: 'div',
            styles: { desktop: { backgroundColor: '#1e293b', padding: { top: '32px', right: '28px', bottom: '32px', left: '28px' }, border: { width: '1px', style: 'solid', color: '#334155', radius: '14px' } } },
            children: [
              { id: 'sfc-3-t', name: 'Card Title 3', type: 'h3', tag: 'h3', content: '03. Enterprise Compliance', styles: { desktop: { fontSize: '20px', fontWeight: '700', color: '#a78bfa', margin: { top: '0px', right: '0px', bottom: '12px', left: '0px' } } } },
              { id: 'sfc-3-p', name: 'Card Text 3', type: 'paragraph', tag: 'p', content: 'SOC2 Type II verified, HIPAA compliant, with self-hosted private tenant options.', styles: { desktop: { fontSize: '14px', color: '#94a3b8', lineHeight: '1.6' } } },
            ],
          },
        ],
      },
    ],
  },
  // Footer
  {
    id: 'saas-footer',
    name: 'SaaS Footer',
    type: 'footer',
    tag: 'footer',
    styles: {
      desktop: {
        backgroundColor: '#090d16',
        padding: { top: '40px', right: '48px', bottom: '40px', left: '48px' },
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        color: '#64748b',
        border: { width: '1px', style: 'solid', color: '#1e293b', radius: '0px' },
      },
      mobile: { flexDirection: 'column', gap: '12px', textAlign: 'center' },
    },
    children: [
      { id: 'sf-copy', name: 'Copyright', type: 'paragraph', tag: 'p', content: '© 2026 Nexus AI Systems Inc. All rights reserved.', styles: { desktop: { fontSize: '13px' } } },
      { id: 'sf-terms', name: 'Privacy Link', type: 'link', tag: 'a', content: 'Privacy Policy & Terms of Service', styles: { desktop: { fontSize: '13px', color: '#94a3b8' } } },
    ],
  },
];

// 2. Artisan Cafe & Restaurant Template
const restaurantElements: BuilderElement[] = [
  // Navbar
  {
    id: 'rest-nav',
    name: 'Restaurant Navbar',
    type: 'navbar',
    tag: 'nav',
    styles: {
      desktop: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: { top: '24px', right: '48px', bottom: '24px', left: '48px' },
        backgroundColor: '#261b17',
        color: '#ffffff',
        border: { width: '1px', style: 'solid', color: '#3d2b25', radius: '0px' },
      },
      mobile: { padding: { top: '16px', right: '16px', bottom: '16px', left: '16px' } },
    },
    children: [
      { id: 'rest-logo', name: 'Brand Name', type: 'h3', tag: 'h3', content: 'L’OSTERIA DEL SOL', styles: { desktop: { fontSize: '20px', fontWeight: '800', letterSpacing: '0.15em', color: '#f59e0b', margin: { top: '0px', right: '0px', bottom: '0px', left: '0px' } } } },
      {
        id: 'rest-links',
        name: 'Nav Links',
        type: 'div',
        tag: 'div',
        styles: { desktop: { display: 'flex', gap: '32px', alignItems: 'center' }, mobile: { display: 'none' } },
        children: [
          { id: 'rl-1', name: 'Menu Link', type: 'link', tag: 'a', content: 'Seasonal Menu', styles: { desktop: { color: '#fef3c7', fontSize: '14px', textDecoration: 'none' } } },
          { id: 'rl-2', name: 'Wine Link', type: 'link', tag: 'a', content: 'Cellar & Wines', styles: { desktop: { color: '#fef3c7', fontSize: '14px', textDecoration: 'none' } } },
          { id: 'rl-btn', name: 'Reserve CTA', type: 'button', tag: 'button', content: 'Book a Table', styles: { desktop: { backgroundColor: '#f59e0b', color: '#1c1917', padding: { top: '10px', right: '22px', bottom: '10px', left: '22px' }, border: { width: '1px', style: 'solid', color: '#f59e0b', radius: '9999px' }, fontWeight: '700', fontSize: '13px' } } },
        ],
      },
    ],
  },
  // Hero
  {
    id: 'rest-hero',
    name: 'Restaurant Hero',
    type: 'section',
    tag: 'section',
    styles: {
      desktop: {
        backgroundColor: '#1c1917',
        color: '#ffffff',
        padding: { top: '90px', right: '32px', bottom: '90px', left: '32px' },
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        textAlign: 'center',
      },
      mobile: { padding: { top: '50px', right: '16px', bottom: '50px', left: '16px' } },
    },
    children: [
      { id: 'rest-pill', name: 'Hero Badge', type: 'badge', tag: 'span', content: 'MICHELIN STARRED • WOOD-FIRED ITALIAN CUISINE', styles: { desktop: { backgroundColor: 'rgba(245, 158, 11, 0.15)', color: '#fbbf24', fontSize: '11px', fontWeight: '700', letterSpacing: '0.15em', padding: { top: '6px', right: '16px', bottom: '6px', left: '16px' }, border: { width: '1px', style: 'solid', color: 'rgba(245, 158, 11, 0.3)', radius: '9999px' }, margin: { top: '0px', right: '0px', bottom: '24px', left: '0px' } } } },
      { id: 'rest-h1', name: 'Hero Title', type: 'h1', tag: 'h1', content: 'Authentic Mediterranean flavors crafted with timeless passion.', styles: { desktop: { fontSize: '50px', fontWeight: '800', maxWidth: '880px', color: '#fffbeb', lineHeight: '1.2', margin: { top: '0px', right: 'auto', bottom: '20px', left: 'auto' } }, mobile: { fontSize: '28px' } } },
      { id: 'rest-p', name: 'Hero Desc', type: 'paragraph', tag: 'p', content: 'Farm-to-table organic ingredients sourced directly from Tuscan farmers, curated wine pairings, and wood-fired artisanal pasta.', styles: { desktop: { fontSize: '16px', color: '#d6d3d1', maxWidth: '640px', lineHeight: '1.6', margin: { top: '0px', right: 'auto', bottom: '36px', left: 'auto' } } } },
      {
        id: 'rest-hero-img',
        name: 'Dining Photo',
        type: 'image',
        tag: 'img',
        attributes: { src: 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=1200&q=80', alt: 'Artisan Dining Hall' },
        styles: { desktop: { width: '100%', maxWidth: '980px', border: { width: '1px', style: 'solid', color: '#44403c', radius: '16px' }, boxShadow: '0 25px 50px rgba(0,0,0,0.5)' } },
      },
    ],
  },
  // Reservation Form
  {
    id: 'rest-res-sec',
    name: 'Reservation Section',
    type: 'section',
    tag: 'section',
    styles: {
      desktop: { backgroundColor: '#292524', padding: { top: '70px', right: '32px', bottom: '70px', left: '32px' } },
      mobile: { padding: { top: '40px', right: '16px', bottom: '40px', left: '16px' } },
    },
    children: [
      { id: 'r-res-h2', name: 'Reserve Title', type: 'h2', tag: 'h2', content: 'Reserve Your Evening Table', styles: { desktop: { fontSize: '32px', fontWeight: '700', color: '#fef3c7', textAlign: 'center', margin: { top: '0px', right: '0px', bottom: '28px', left: '0px' } } } },
      {
        id: 'r-form',
        name: 'Reservation Form',
        type: 'form',
        tag: 'form',
        styles: { desktop: { maxWidth: '520px', margin: { top: '0px', right: 'auto', bottom: '0px', left: 'auto' }, display: 'flex', flexDirection: 'column', gap: '14px' } },
        children: [
          { id: 'rf-name', name: 'Name', type: 'input', tag: 'input', attributes: { placeholder: 'Full Name' }, styles: { desktop: { width: '100%', padding: { top: '12px', right: '16px', bottom: '12px', left: '16px' }, border: { width: '1px', style: 'solid', color: '#57534e', radius: '8px' }, backgroundColor: '#1c1917', color: '#fff' } } },
          { id: 'rf-guests', name: 'Guests', type: 'input', tag: 'input', attributes: { placeholder: 'Number of Guests (e.g. 2 Persons)' }, styles: { desktop: { width: '100%', padding: { top: '12px', right: '16px', bottom: '12px', left: '16px' }, border: { width: '1px', style: 'solid', color: '#57534e', radius: '8px' }, backgroundColor: '#1c1917', color: '#fff' } } },
          { id: 'rf-date', name: 'Date Time', type: 'input', tag: 'input', attributes: { placeholder: 'Preferred Date & Time (e.g. Oct 28 at 7:30 PM)' }, styles: { desktop: { width: '100%', padding: { top: '12px', right: '16px', bottom: '12px', left: '16px' }, border: { width: '1px', style: 'solid', color: '#57534e', radius: '8px' }, backgroundColor: '#1c1917', color: '#fff' } } },
          { id: 'rf-submit', name: 'Submit Button', type: 'button', tag: 'button', content: 'Confirm Reservation 🍽️', styles: { desktop: { width: '100%', backgroundColor: '#f59e0b', color: '#1c1917', padding: { top: '14px', right: '20px', bottom: '14px', left: '20px' }, border: { width: '1px', style: 'solid', color: '#f59e0b', radius: '8px' }, fontWeight: '700', fontSize: '15px', cursor: 'pointer' } } },
        ],
      },
    ],
  },
  // Footer
  {
    id: 'rest-footer',
    name: 'Restaurant Footer',
    type: 'footer',
    tag: 'footer',
    styles: { desktop: { backgroundColor: '#1c1917', padding: { top: '36px', right: '32px', bottom: '36px', left: '32px' }, textAlign: 'center', color: '#a8a29e' } },
    children: [
      { id: 'rf-txt', name: 'Footer Text', type: 'paragraph', tag: 'p', content: '© 2026 L’Osteria Del Sol • 42 Via Romana, Florence & Manhattan NY', styles: { desktop: { fontSize: '13px' } } },
    ],
  },
];

// 3. Apex Fitness & Gym Club Template
const fitnessElements: BuilderElement[] = [
  // Navbar
  {
    id: 'fit-nav',
    name: 'Fitness Navbar',
    type: 'navbar',
    tag: 'nav',
    styles: {
      desktop: { display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: { top: '20px', right: '48px', bottom: '20px', left: '48px' }, backgroundColor: '#000000', color: '#ffffff', border: { width: '1px', style: 'solid', color: '#27272a', radius: '0px' } },
      mobile: { padding: { top: '14px', right: '16px', bottom: '14px', left: '16px' } },
    },
    children: [
      { id: 'fit-logo', name: 'Brand Logo', type: 'h3', tag: 'h3', content: 'APEX // ATHLETICS', styles: { desktop: { fontSize: '20px', fontWeight: '900', letterSpacing: '0.1em', color: '#22c55e', margin: { top: '0px', right: '0px', bottom: '0px', left: '0px' } } } },
      {
        id: 'fit-links',
        name: 'Nav Links',
        type: 'div',
        tag: 'div',
        styles: { desktop: { display: 'flex', gap: '28px', alignItems: 'center' }, mobile: { display: 'none' } },
        children: [
          { id: 'fl-1', name: 'Programs', type: 'link', tag: 'a', content: 'Programs', styles: { desktop: { color: '#d4d4d8', fontSize: '14px' } } },
          { id: 'fl-2', name: 'Trainers', type: 'link', tag: 'a', content: 'Trainers', styles: { desktop: { color: '#d4d4d8', fontSize: '14px' } } },
          { id: 'fl-btn', name: 'Join CTA', type: 'button', tag: 'button', content: 'Claim Free Pass', styles: { desktop: { backgroundColor: '#22c55e', color: '#000000', padding: { top: '8px', right: '18px', bottom: '8px', left: '18px' }, border: { width: '1px', style: 'solid', color: '#22c55e', radius: '4px' }, fontWeight: '800', fontSize: '13px' } } },
        ],
      },
    ],
  },
  // Hero Section
  {
    id: 'fit-hero',
    name: 'Fitness Hero',
    type: 'section',
    tag: 'section',
    styles: {
      desktop: { backgroundColor: '#09090b', color: '#ffffff', padding: { top: '100px', right: '32px', bottom: '100px', left: '32px' }, textAlign: 'center', display: 'flex', flexDirection: 'column', alignItems: 'center' },
      mobile: { padding: { top: '60px', right: '16px', bottom: '60px', left: '16px' } },
    },
    children: [
      { id: 'fit-badge', name: 'Badge', type: 'badge', tag: 'span', content: 'UNLEASH PEAK HUMAN PERFORMANCE', styles: { desktop: { backgroundColor: 'rgba(34, 197, 94, 0.15)', color: '#4ade80', fontSize: '11px', fontWeight: '800', letterSpacing: '0.2em', padding: { top: '6px', right: '16px', bottom: '6px', left: '16px' }, border: { width: '1px', style: 'solid', color: 'rgba(34, 197, 94, 0.3)', radius: '4px' }, margin: { top: '0px', right: '0px', bottom: '24px', left: '0px' } } } },
      { id: 'fit-h1', name: 'Hero Title', type: 'h1', tag: 'h1', content: 'BUILD STRENGTH. SHRED LIMITS. DOMINATE.', styles: { desktop: { fontSize: '60px', fontWeight: '900', color: '#ffffff', lineHeight: '1.1', maxWidth: '900px', margin: { top: '0px', right: 'auto', bottom: '24px', left: 'auto' } }, mobile: { fontSize: '32px' } } },
      { id: 'fit-p', name: 'Hero Sub', type: 'paragraph', tag: 'p', content: 'State-of-the-art olympic lifting zones, cold plunges, biometric conditioning, and elite coaches dedicated to your physical evolution.', styles: { desktop: { fontSize: '17px', color: '#a1a1aa', maxWidth: '640px', lineHeight: '1.6', margin: { top: '0px', right: 'auto', bottom: '36px', left: 'auto' } } } },
      {
        id: 'fit-actions',
        name: 'Action Buttons',
        type: 'div',
        tag: 'div',
        styles: { desktop: { display: 'flex', gap: '16px', margin: { top: '0px', right: '0px', bottom: '50px', left: '0px' } }, mobile: { flexDirection: 'column', width: '100%' } },
        children: [
          { id: 'f-btn-1', name: 'Join Button', type: 'button', tag: 'button', content: 'Start 7-Day Free Trial', styles: { desktop: { backgroundColor: '#22c55e', color: '#000000', padding: { top: '14px', right: '32px', bottom: '14px', left: '32px' }, border: { width: '1px', style: 'solid', color: '#22c55e', radius: '6px' }, fontWeight: '800', fontSize: '15px' }, mobile: { width: '100%' } } },
          { id: 'f-btn-2', name: 'View Plans', type: 'button', tag: 'button', content: 'Explore Memberships', styles: { desktop: { backgroundColor: 'transparent', color: '#ffffff', padding: { top: '14px', right: '28px', bottom: '14px', left: '28px' }, border: { width: '1px', style: 'solid', color: '#3f3f46', radius: '6px' }, fontWeight: '700', fontSize: '15px' }, mobile: { width: '100%' } } },
        ],
      },
      {
        id: 'fit-img',
        name: 'Gym Photo',
        type: 'image',
        tag: 'img',
        attributes: { src: 'https://images.unsplash.com/photo-1534438327276-14e5300c3a48?auto=format&fit=crop&w=1200&q=80', alt: 'Apex Gym' },
        styles: { desktop: { width: '100%', maxWidth: '1000px', border: { width: '1px', style: 'solid', color: '#27272a', radius: '12px' } } },
      },
    ],
  },
  // Pricing Tiers
  {
    id: 'fit-pricing',
    name: 'Membership Section',
    type: 'section',
    tag: 'section',
    styles: { desktop: { backgroundColor: '#18181b', padding: { top: '80px', right: '32px', bottom: '80px', left: '32px' } } },
    children: [
      { id: 'fp-h2', name: 'Section Title', type: 'h2', tag: 'h2', content: 'Membership Tiers', styles: { desktop: { fontSize: '36px', fontWeight: '900', color: '#ffffff', textAlign: 'center', margin: { top: '0px', right: '0px', bottom: '40px', left: '0px' } } } },
      {
        id: 'fp-grid',
        name: 'Pricing Grid',
        type: 'grid',
        tag: 'div',
        styles: { desktop: { display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '24px', maxWidth: '1050px', margin: { top: '0px', right: 'auto', bottom: '0px', left: 'auto' } }, mobile: { gridTemplateColumns: 'repeat(1, 1fr)' } },
        children: [
          {
            id: 'f-card-1',
            name: 'Basic Plan',
            type: 'card',
            tag: 'div',
            styles: { desktop: { backgroundColor: '#09090b', padding: { top: '32px', right: '28px', bottom: '32px', left: '28px' }, border: { width: '1px', style: 'solid', color: '#27272a', radius: '10px' } } },
            children: [
              { id: 'fc1-t', name: 'Plan Name', type: 'h3', tag: 'h3', content: 'Standard Pass', styles: { desktop: { color: '#a1a1aa', fontSize: '18px', fontWeight: '700' } } },
              { id: 'fc1-p', name: 'Price', type: 'h2', tag: 'h2', content: '$49/mo', styles: { desktop: { color: '#ffffff', fontSize: '36px', fontWeight: '900', margin: { top: '8px', right: '0px', bottom: '16px', left: '0px' } } } },
              { id: 'fc1-d', name: 'Details', type: 'paragraph', tag: 'p', content: 'Full open gym access 24/7, locker rooms, and sauna privileges.', styles: { desktop: { color: '#71717a', fontSize: '13px' } } },
            ],
          },
          {
            id: 'f-card-2',
            name: 'Pro Plan',
            type: 'card',
            tag: 'div',
            styles: { desktop: { backgroundColor: '#09090b', padding: { top: '32px', right: '28px', bottom: '32px', left: '28px' }, border: { width: '2px', style: 'solid', color: '#22c55e', radius: '10px' }, boxShadow: '0 0 25px rgba(34, 197, 94, 0.2)' } },
            children: [
              { id: 'fc2-t', name: 'Plan Name', type: 'h3', tag: 'h3', content: 'Pro Performance 🔥', styles: { desktop: { color: '#4ade80', fontSize: '18px', fontWeight: '800' } } },
              { id: 'fc2-p', name: 'Price', type: 'h2', tag: 'h2', content: '$89/mo', styles: { desktop: { color: '#ffffff', fontSize: '36px', fontWeight: '900', margin: { top: '8px', right: '0px', bottom: '16px', left: '0px' } } } },
              { id: 'fc2-d', name: 'Details', type: 'paragraph', tag: 'p', content: 'Includes all classes (HIIT, Boxing, Yoga), cold plunge & monthly 1-on-1 PT.', styles: { desktop: { color: '#d4d4d8', fontSize: '13px' } } },
            ],
          },
          {
            id: 'f-card-3',
            name: 'Elite Plan',
            type: 'card',
            tag: 'div',
            styles: { desktop: { backgroundColor: '#09090b', padding: { top: '32px', right: '28px', bottom: '32px', left: '28px' }, border: { width: '1px', style: 'solid', color: '#27272a', radius: '10px' } } },
            children: [
              { id: 'fc3-t', name: 'Plan Name', type: 'h3', tag: 'h3', content: 'VIP Athlete', styles: { desktop: { color: '#a1a1aa', fontSize: '18px', fontWeight: '700' } } },
              { id: 'fc3-p', name: 'Price', type: 'h2', tag: 'h2', content: '$149/mo', styles: { desktop: { color: '#ffffff', fontSize: '36px', fontWeight: '900', margin: { top: '8px', right: '0px', bottom: '16px', left: '0px' } } } },
              { id: 'fc3-d', name: 'Details', type: 'paragraph', tag: 'p', content: 'Unlimited private personal training, nutrition coaching & recovery lounge.', styles: { desktop: { color: '#71717a', fontSize: '13px' } } },
            ],
          },
        ],
      },
    ],
  },
  // Footer
  {
    id: 'fit-footer',
    name: 'Fitness Footer',
    type: 'footer',
    tag: 'footer',
    styles: { desktop: { backgroundColor: '#000000', padding: { top: '36px', right: '32px', bottom: '36px', left: '32px' }, textAlign: 'center', color: '#71717a' } },
    children: [
      { id: 'fit-copy', name: 'Copyright', type: 'paragraph', tag: 'p', content: '© 2026 APEX Athletics LLC • Los Angeles • London • Tokyo', styles: { desktop: { fontSize: '13px' } } },
    ],
  },
];

// 4. Nova Freelance Portfolio Template
const portfolioElements: BuilderElement[] = [
  // Navbar
  {
    id: 'port-nav',
    name: 'Portfolio Navbar',
    type: 'navbar',
    tag: 'nav',
    styles: {
      desktop: { display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: { top: '22px', right: '48px', bottom: '22px', left: '48px' }, backgroundColor: '#ffffff', border: { width: '1px', style: 'solid', color: '#e2e8f0', radius: '0px' } },
      mobile: { padding: { top: '14px', right: '16px', bottom: '14px', left: '16px' } },
    },
    children: [
      { id: 'port-logo', name: 'Logo / Name', type: 'h3', tag: 'h3', content: 'ALEX RIVERA / DESIGNER', styles: { desktop: { fontSize: '16px', fontWeight: '800', color: '#0f172a', margin: { top: '0px', right: '0px', bottom: '0px', left: '0px' } } } },
      {
        id: 'port-links',
        name: 'Nav Links',
        type: 'div',
        tag: 'div',
        styles: { desktop: { display: 'flex', gap: '24px', alignItems: 'center' }, mobile: { display: 'none' } },
        children: [
          { id: 'pl-1', name: 'Works', type: 'link', tag: 'a', content: 'Selected Projects', styles: { desktop: { color: '#475569', fontSize: '14px' } } },
          { id: 'pl-2', name: 'About', type: 'link', tag: 'a', content: 'About Me', styles: { desktop: { color: '#475569', fontSize: '14px' } } },
          { id: 'pl-cta', name: 'Hire CTA', type: 'button', tag: 'button', content: 'Let’s Talk 💬', styles: { desktop: { backgroundColor: '#0f172a', color: '#ffffff', padding: { top: '8px', right: '18px', bottom: '8px', left: '18px' }, border: { width: '1px', style: 'solid', color: '#0f172a', radius: '9999px' }, fontSize: '13px', fontWeight: '600' } } },
        ],
      },
    ],
  },
  // Hero
  {
    id: 'port-hero',
    name: 'Portfolio Hero',
    type: 'section',
    tag: 'section',
    styles: {
      desktop: { backgroundColor: '#f8fafc', padding: { top: '80px', right: '32px', bottom: '80px', left: '32px' }, display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center' },
      mobile: { padding: { top: '48px', right: '16px', bottom: '48px', left: '16px' } },
    },
    children: [
      { id: 'port-badge', name: 'Status Badge', type: 'badge', tag: 'span', content: '🟢 AVAILABLE FOR SELECTIVE FREELANCE IN Q4', styles: { desktop: { backgroundColor: '#ecfdf5', color: '#059669', fontSize: '11px', fontWeight: '700', letterSpacing: '0.1em', padding: { top: '6px', right: '16px', bottom: '6px', left: '16px' }, border: { width: '1px', style: 'solid', color: '#a7f3d0', radius: '9999px' }, margin: { top: '0px', right: '0px', bottom: '24px', left: '0px' } } } },
      { id: 'port-h1', name: 'Bio Heading', type: 'h1', tag: 'h1', content: 'Senior Product Designer crafting high-impact digital tools for tech startups.', styles: { desktop: { fontSize: '48px', fontWeight: '800', color: '#0f172a', maxWidth: '840px', lineHeight: '1.2', margin: { top: '0px', right: 'auto', bottom: '20px', left: 'auto' } }, mobile: { fontSize: '26px' } } },
      { id: 'port-p', name: 'Bio Paragraph', type: 'paragraph', tag: 'p', content: 'Over 8 years helping founders transform complex product ideas into intuitive, conversion-focused web experiences with Framer, React & Webflow.', styles: { desktop: { fontSize: '16px', color: '#64748b', maxWidth: '640px', lineHeight: '1.6', margin: { top: '0px', right: 'auto', bottom: '32px', left: 'auto' } } } },
    ],
  },
  // Portfolio Work Cards
  {
    id: 'port-grid-sec',
    name: 'Works Grid Section',
    type: 'section',
    tag: 'section',
    styles: { desktop: { backgroundColor: '#ffffff', padding: { top: '70px', right: '32px', bottom: '70px', left: '32px' } } },
    children: [
      {
        id: 'port-cards-grid',
        name: 'Projects 2-Col Grid',
        type: 'grid',
        tag: 'div',
        styles: { desktop: { display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '32px', maxWidth: '1050px', margin: { top: '0px', right: 'auto', bottom: '0px', left: 'auto' } }, mobile: { gridTemplateColumns: 'repeat(1, 1fr)' } },
        children: [
          {
            id: 'p-card-1',
            name: 'Project 1',
            type: 'card',
            tag: 'div',
            styles: { desktop: { backgroundColor: '#f8fafc', padding: { top: '24px', right: '24px', bottom: '24px', left: '24px' }, border: { width: '1px', style: 'solid', color: '#e2e8f0', radius: '16px' } } },
            children: [
              { id: 'pc1-img', name: 'Work Thumbnail 1', type: 'image', tag: 'img', attributes: { src: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=800&q=80', alt: 'Analytics Tool' }, styles: { desktop: { width: '100%', border: { radius: '10px' }, margin: { top: '0px', right: '0px', bottom: '16px', left: '0px' } } } },
              { id: 'pc1-t', name: 'Work Title 1', type: 'h3', tag: 'h3', content: 'Veloce — AI Analytics Suite', styles: { desktop: { fontSize: '20px', fontWeight: '700', color: '#0f172a' } } },
              { id: 'pc1-p', name: 'Work Desc 1', type: 'paragraph', tag: 'p', content: 'Brand identity, design system, and full dashboard UX resulting in $4M Seed round.', styles: { desktop: { fontSize: '13px', color: '#64748b', margin: { top: '6px', right: '0px', bottom: '0px', left: '0px' } } } },
            ],
          },
          {
            id: 'p-card-2',
            name: 'Project 2',
            type: 'card',
            tag: 'div',
            styles: { desktop: { backgroundColor: '#f8fafc', padding: { top: '24px', right: '24px', bottom: '24px', left: '24px' }, border: { width: '1px', style: 'solid', color: '#e2e8f0', radius: '16px' } } },
            children: [
              { id: 'pc2-img', name: 'Work Thumbnail 2', type: 'image', tag: 'img', attributes: { src: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=800&q=80', alt: 'Fintech App' }, styles: { desktop: { width: '100%', border: { radius: '10px' }, margin: { top: '0px', right: '0px', bottom: '16px', left: '0px' } } } },
              { id: 'pc2-t', name: 'Work Title 2', type: 'h3', tag: 'h3', content: 'Krona — Global Payments App', styles: { desktop: { fontSize: '20px', fontWeight: '700', color: '#0f172a' } } },
              { id: 'pc2-p', name: 'Work Desc 2', type: 'paragraph', tag: 'p', content: 'End-to-end mobile app architecture and marketing site with 250k+ active accounts.', styles: { desktop: { fontSize: '13px', color: '#64748b', margin: { top: '6px', right: '0px', bottom: '0px', left: '0px' } } } },
            ],
          },
        ],
      },
    ],
  },
  // Footer
  {
    id: 'port-footer',
    name: 'Portfolio Footer',
    type: 'footer',
    tag: 'footer',
    styles: { desktop: { backgroundColor: '#0f172a', color: '#94a3b8', padding: { top: '36px', right: '32px', bottom: '36px', left: '32px' }, textAlign: 'center' } },
    children: [
      { id: 'pf-copy', name: 'Footer Text', type: 'paragraph', tag: 'p', content: 'Designed with precision by Alex Rivera • Based in San Francisco, CA', styles: { desktop: { fontSize: '13px' } } },
    ],
  },
];

export const TEMPLATES_CATALOG: WebsiteTemplate[] = [
  {
    id: 'template-aura',
    name: 'Aura Studio',
    category: 'Agency',
    badge: 'LUXURY AGENCY',
    description: 'High-end architecture, luxury design studio with editorial typography & capabilities grid.',
    elements: initialProject.pages[0].elements,
  },
  {
    id: 'template-saas',
    name: 'Nexus AI SaaS',
    category: 'SaaS & Tech',
    badge: 'DARK TECH',
    description: 'Modern developer & AI software landing with glowing badges, metrics, and feature cards.',
    elements: saasElements,
  },
  {
    id: 'template-restaurant',
    name: 'L’Osteria Del Sol',
    category: 'Restaurant & Food',
    badge: 'FINE DINING',
    description: 'Italian fine dining & artisanal cafe with rich photography and table reservation form.',
    elements: restaurantElements,
  },
  {
    id: 'template-fitness',
    name: 'Apex Athletics Gym',
    category: 'Health & Fitness',
    badge: 'BOLD FITNESS',
    description: 'High-octane gym club with bold typography, 3-tier membership pricing, and workout zones.',
    elements: fitnessElements,
  },
  {
    id: 'template-portfolio',
    name: 'Nova Product Designer',
    category: 'Portfolio & Creator',
    badge: 'CREATIVE PORTFOLIO',
    description: 'Clean personal showcase with work case studies, live status badge, and inquiry trigger.',
    elements: portfolioElements,
  },
];
