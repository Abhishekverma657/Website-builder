import { BuilderElement, ElementType, ElementStyles } from '../types/builder';

export const getDefaultStyles = (type: ElementType): ElementStyles => {
  const base: ElementStyles = {
    fontFamily: 'Inter',
    color: '#111827',
    fontSize: '16px',
    lineHeight: '1.5',
    margin: { top: '0px', right: '0px', bottom: '0px', left: '0px' },
    padding: { top: '0px', right: '0px', bottom: '0px', left: '0px' },
  };

  switch (type) {
    case 'section':
      return {
        ...base,
        width: '100%',
        padding: { top: '60px', right: '24px', bottom: '60px', left: '24px' },
        backgroundColor: '#ffffff',
        display: 'block',
      };
    case 'container':
      return {
        ...base,
        width: '100%',
        maxWidth: '1200px',
        margin: { top: '0px', right: 'auto', bottom: '0px', left: 'auto' },
        padding: { top: '0px', right: '20px', bottom: '0px', left: '20px' },
        display: 'block',
      };
    case 'div':
      return {
        ...base,
        display: 'block',
        width: '100%',
      };
    case 'grid':
      return {
        ...base,
        display: 'grid',
        gridTemplateColumns: 'repeat(3, 1fr)',
        gap: '24px',
        width: '100%',
      };
    case 'columns':
      return {
        ...base,
        display: 'flex',
        flexDirection: 'row',
        gap: '20px',
        width: '100%',
      };
    case 'h1':
      return {
        ...base,
        fontSize: '48px',
        fontWeight: '700',
        lineHeight: '1.15',
        margin: { top: '0px', right: '0px', bottom: '16px', left: '0px' },
        color: '#0f172a',
      };
    case 'h2':
      return {
        ...base,
        fontSize: '36px',
        fontWeight: '700',
        lineHeight: '1.2',
        margin: { top: '0px', right: '0px', bottom: '16px', left: '0px' },
        color: '#0f172a',
      };
    case 'h3':
      return {
        ...base,
        fontSize: '24px',
        fontWeight: '600',
        lineHeight: '1.3',
        margin: { top: '0px', right: '0px', bottom: '12px', left: '0px' },
        color: '#1e293b',
      };
    case 'h4':
      return {
        ...base,
        fontSize: '20px',
        fontWeight: '600',
        lineHeight: '1.4',
        margin: { top: '0px', right: '0px', bottom: '8px', left: '0px' },
        color: '#1e293b',
      };
    case 'paragraph':
      return {
        ...base,
        fontSize: '16px',
        lineHeight: '1.6',
        margin: { top: '0px', right: '0px', bottom: '16px', left: '0px' },
        color: '#475569',
      };
    case 'link':
      return {
        ...base,
        color: '#10b981',
        textDecoration: 'underline',
        cursor: 'pointer',
      };
    case 'blockquote':
      return {
        ...base,
        fontFamily: 'Inter',
        padding: { top: '12px', right: '20px', bottom: '12px', left: '20px' },
        margin: { top: '0px', right: '0px', bottom: '20px', left: '0px' },
        backgroundColor: '#0d1414',
        border: {
          width: '4px',
          style: 'solid',
          color: '#10b981',
          radius: '4px',
        },
        color: '#d1fae5',
      };
    case 'button':
      return {
        ...base,
        display: 'inline-block',
        padding: { top: '12px', right: '24px', bottom: '12px', left: '24px' },
        backgroundColor: '#10b981',
        color: '#ffffff',
        fontWeight: '600',
        fontSize: '15px',
        border: {
          width: '1px',
          style: 'solid',
          color: '#059669',
          radius: '8px',
        },
        cursor: 'pointer',
        boxShadow: '0 1px 3px rgba(0,0,0,0.1)',
      };
    case 'badge':
      return {
        ...base,
        display: 'inline-block',
        padding: { top: '4px', right: '12px', bottom: '4px', left: '12px' },
        backgroundColor: 'rgba(16, 185, 129, 0.15)',
        color: '#10b981',
        fontWeight: '500',
        fontSize: '13px',
        border: {
          width: '1px',
          style: 'solid',
          color: 'rgba(16, 185, 129, 0.3)',
          radius: '9999px',
        },
        margin: { top: '0px', right: '0px', bottom: '12px', left: '0px' },
      };
    case 'image':
      return {
        ...base,
        width: '100%',
        maxWidth: '100%',
        height: 'auto',
        display: 'block',
        border: {
          width: '0px',
          style: 'none',
          color: 'transparent',
          radius: '8px',
        },
      };
    case 'card':
      return {
        ...base,
        padding: { top: '32px', right: '32px', bottom: '32px', left: '32px' },
        backgroundColor: '#ffffff',
        border: {
          width: '1px',
          style: 'solid',
          color: '#e2e8f0',
          radius: '16px',
        },
        boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.05)',
      };
    case 'navbar':
      return {
        ...base,
        width: '100%',
        padding: { top: '16px', right: '32px', bottom: '16px', left: '32px' },
        backgroundColor: '#ffffff',
        border: {
          width: '1px',
          style: 'solid',
          color: '#f1f5f9',
          radius: '0px',
        },
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
      };
    case 'footer':
      return {
        ...base,
        width: '100%',
        padding: { top: '64px', right: '32px', bottom: '48px', left: '32px' },
        backgroundColor: '#0f172a',
        color: '#94a3b8',
        border: {
          width: '1px',
          style: 'solid',
          color: '#1e293b',
          radius: '0px',
        },
      };
    case 'form':
      return {
        ...base,
        display: 'flex',
        flexDirection: 'column',
        gap: '16px',
        width: '100%',
        maxWidth: '480px',
      };
    case 'input':
      return {
        ...base,
        width: '100%',
        padding: { top: '10px', right: '14px', bottom: '10px', left: '14px' },
        backgroundColor: '#ffffff',
        color: '#0f172a',
        border: {
          width: '1px',
          style: 'solid',
          color: '#cbd5e1',
          radius: '6px',
        },
      };
    case 'textarea':
      return {
        ...base,
        width: '100%',
        minHeight: '100px',
        padding: { top: '10px', right: '14px', bottom: '10px', left: '14px' },
        backgroundColor: '#ffffff',
        color: '#0f172a',
        border: {
          width: '1px',
          style: 'solid',
          color: '#cbd5e1',
          radius: '6px',
        },
      };
    default:
      return base;
  }
};

export const createNewElement = (type: ElementType, customName?: string): BuilderElement => {
  const id = `el-${Date.now()}-${Math.floor(Math.random() * 1000)}`;

  const tagMap: Record<ElementType, string> = {
    section: 'section',
    container: 'div',
    div: 'div',
    grid: 'div',
    columns: 'div',
    h1: 'h1',
    h2: 'h2',
    h3: 'h3',
    h4: 'h4',
    paragraph: 'p',
    link: 'a',
    blockquote: 'blockquote',
    image: 'img',
    video: 'video',
    icon: 'span',
    form: 'form',
    input: 'input',
    textarea: 'textarea',
    button: 'button',
    navbar: 'nav',
    card: 'div',
    badge: 'span',
    footer: 'footer',
  };

  const defaultContentMap: Partial<Record<ElementType, string>> = {
    h1: 'Build websites visually with full control',
    h2: 'Empower your team with precision design',
    h3: 'High-performance component system',
    h4: 'Responsive by default',
    paragraph: 'Design, build, and launch production-grade responsive websites visually without writing code manually.',
    link: 'Learn more →',
    blockquote: '“This is the most intuitive visual canvas I have ever worked with.”',
    button: 'Get Started Free',
    badge: 'NEW: Visual CSS Grid & Flexbox',
  };

  const defaultAttributes: Partial<Record<ElementType, Record<string, string>>> = {
    image: {
      src: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=1200&q=80',
      alt: 'Modern SaaS visual dashboard preview',
    },
    input: {
      placeholder: 'Enter your work email...',
      type: 'email',
    },
    textarea: {
      placeholder: 'Tell us about your project...',
      rows: '4',
    },
    link: {
      href: '#',
    },
  };

  return {
    id,
    name: customName || type.charAt(0).toUpperCase() + type.slice(1),
    type,
    tag: tagMap[type] || 'div',
    content: defaultContentMap[type],
    attributes: defaultAttributes[type],
    styles: {
      desktop: getDefaultStyles(type),
    },
    children: [],
  };
};

export type PrebuiltSectionKey = 'pricing' | 'faq' | 'contact' | 'newsletter' | '3d-hero' | '3d-cards';

export const createPrebuiltSection = (key: PrebuiltSectionKey): BuilderElement => {
  const ts = Date.now();

  if (key === 'pricing') {
    return {
      id: `section-pricing-${ts}`,
      name: 'Pricing Section',
      type: 'section',
      tag: 'section',
      styles: {
        desktop: {
          backgroundColor: '#ffffff',
          padding: { top: '80px', right: '32px', bottom: '80px', left: '32px' },
          display: 'block',
        },
      },
      children: [
        {
          id: `pricing-title-${ts}`,
          name: 'Pricing Heading',
          type: 'h2',
          tag: 'h2',
          content: 'Simple, Transparent Investment Plans',
          styles: {
            desktop: {
              fontSize: '36px',
              fontWeight: '800',
              textAlign: 'center',
              color: '#111827',
              margin: { top: '0px', right: '0px', bottom: '12px', left: '0px' },
            },
          },
        },
        {
          id: `pricing-sub-${ts}`,
          name: 'Pricing Subtitle',
          type: 'paragraph',
          tag: 'p',
          content: 'Select the ideal engagement model for your brand stage.',
          styles: {
            desktop: {
              fontSize: '16px',
              textAlign: 'center',
              color: '#6b7280',
              margin: { top: '0px', right: 'auto', bottom: '48px', left: 'auto' },
              maxWidth: '540px',
            },
          },
        },
        {
          id: `pricing-grid-${ts}`,
          name: 'Pricing 3-Col Grid',
          type: 'grid',
          tag: 'div',
          styles: {
            desktop: {
              display: 'grid',
              gridTemplateColumns: 'repeat(3, 1fr)',
              gap: '24px',
              maxWidth: '1100px',
              margin: { top: '0px', right: 'auto', bottom: '0px', left: 'auto' },
            },
            tablet: {
              gridTemplateColumns: 'repeat(1, 1fr)',
            },
          },
          children: [
            {
              id: `plan-starter-${ts}`,
              name: 'Starter Tier Card',
              type: 'card',
              tag: 'div',
              styles: {
                desktop: {
                  backgroundColor: '#f9fafb',
                  padding: { top: '36px', right: '28px', bottom: '36px', left: '28px' },
                  border: { width: '1px', style: 'solid', color: '#e5e7eb', radius: '14px' },
                },
              },
              children: [
                { id: `tier-1-name-${ts}`, name: 'Tier Name', type: 'h3', tag: 'h3', content: 'Design Sprint', styles: { desktop: { fontSize: '20px', fontWeight: '700', color: '#111827', margin: { top: '0px', right: '0px', bottom: '8px', left: '0px' } } } },
                { id: `tier-1-price-${ts}`, name: 'Price', type: 'h2', tag: 'h2', content: '$4,800', styles: { desktop: { fontSize: '32px', fontWeight: '800', color: '#111827', margin: { top: '0px', right: '0px', bottom: '16px', left: '0px' } } } },
                { id: `tier-1-desc-${ts}`, name: 'Desc', type: 'paragraph', tag: 'p', content: '2-week rapid UX audit, visual direction, and responsive prototypes.', styles: { desktop: { fontSize: '14px', color: '#6b7280', margin: { top: '0px', right: '0px', bottom: '24px', left: '0px' } } } },
                { id: `tier-1-btn-${ts}`, name: 'Button', type: 'button', tag: 'button', content: 'Select Plan', styles: { desktop: { width: '100%', backgroundColor: '#ffffff', color: '#111827', padding: { top: '12px', right: '20px', bottom: '12px', left: '20px' }, border: { width: '1px', style: 'solid', color: '#d1d5db', radius: '8px' }, fontWeight: '600', cursor: 'pointer' } } },
              ],
            },
            {
              id: `plan-pro-${ts}`,
              name: 'Pro Tier Card',
              type: 'card',
              tag: 'div',
              styles: {
                desktop: {
                  backgroundColor: '#111827',
                  color: '#ffffff',
                  padding: { top: '36px', right: '28px', bottom: '36px', left: '28px' },
                  border: { width: '1px', style: 'solid', color: '#1f2937', radius: '14px' },
                  boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.2)',
                },
              },
              children: [
                { id: `tier-2-name-${ts}`, name: 'Tier Name', type: 'h3', tag: 'h3', content: 'Full Platform Build', styles: { desktop: { fontSize: '20px', fontWeight: '700', color: '#ffffff', margin: { top: '0px', right: '0px', bottom: '8px', left: '0px' } } } },
                { id: `tier-2-price-${ts}`, name: 'Price', type: 'h2', tag: 'h2', content: '$12,500', styles: { desktop: { fontSize: '32px', fontWeight: '800', color: '#ffffff', margin: { top: '0px', right: '0px', bottom: '16px', left: '0px' } } } },
                { id: `tier-2-desc-${ts}`, name: 'Desc', type: 'paragraph', tag: 'p', content: 'Complete custom website design, CMS architecture, and interactive animation.', styles: { desktop: { fontSize: '14px', color: '#9ca3af', margin: { top: '0px', right: '0px', bottom: '24px', left: '0px' } } } },
                { id: `tier-2-btn-${ts}`, name: 'Button', type: 'button', tag: 'button', content: 'Get Started', styles: { desktop: { width: '100%', backgroundColor: '#10b981', color: '#ffffff', padding: { top: '12px', right: '20px', bottom: '12px', left: '20px' }, border: { width: '1px', style: 'solid', color: '#34d399', radius: '8px' }, fontWeight: '600', cursor: 'pointer' } } },
              ],
            },
            {
              id: `plan-custom-${ts}`,
              name: 'Enterprise Tier Card',
              type: 'card',
              tag: 'div',
              styles: {
                desktop: {
                  backgroundColor: '#f9fafb',
                  padding: { top: '36px', right: '28px', bottom: '36px', left: '28px' },
                  border: { width: '1px', style: 'solid', color: '#e5e7eb', radius: '14px' },
                },
              },
              children: [
                { id: `tier-3-name-${ts}`, name: 'Tier Name', type: 'h3', tag: 'h3', content: 'Studio Retainer', styles: { desktop: { fontSize: '20px', fontWeight: '700', color: '#111827', margin: { top: '0px', right: '0px', bottom: '8px', left: '0px' } } } },
                { id: `tier-3-price-${ts}`, name: 'Price', type: 'h2', tag: 'h2', content: 'Custom', styles: { desktop: { fontSize: '32px', fontWeight: '800', color: '#111827', margin: { top: '0px', right: '0px', bottom: '16px', left: '0px' } } } },
                { id: `tier-3-desc-${ts}`, name: 'Desc', type: 'paragraph', tag: 'p', content: 'Dedicated monthly architectural design and full-stack engineering support.', styles: { desktop: { fontSize: '14px', color: '#6b7280', margin: { top: '0px', right: '0px', bottom: '24px', left: '0px' } } } },
                { id: `tier-3-btn-${ts}`, name: 'Button', type: 'button', tag: 'button', content: 'Contact Partners', styles: { desktop: { width: '100%', backgroundColor: '#ffffff', color: '#111827', padding: { top: '12px', right: '20px', bottom: '12px', left: '20px' }, border: { width: '1px', style: 'solid', color: '#d1d5db', radius: '8px' }, fontWeight: '600', cursor: 'pointer' } } },
              ],
            },
          ],
        },
      ],
    };
  }

  if (key === 'faq') {
    return {
      id: `section-faq-${ts}`,
      name: 'FAQ Section',
      type: 'section',
      tag: 'section',
      styles: {
        desktop: {
          backgroundColor: '#fafafa',
          padding: { top: '80px', right: '32px', bottom: '80px', left: '32px' },
          display: 'block',
        },
      },
      children: [
        {
          id: `faq-title-${ts}`,
          name: 'FAQ Heading',
          type: 'h2',
          tag: 'h2',
          content: 'Frequently Asked Questions',
          styles: {
            desktop: {
              fontSize: '34px',
              fontWeight: '800',
              textAlign: 'center',
              color: '#111827',
              margin: { top: '0px', right: '0px', bottom: '40px', left: '0px' },
            },
          },
        },
        {
          id: `faq-list-${ts}`,
          name: 'FAQ Container',
          type: 'div',
          tag: 'div',
          styles: {
            desktop: {
              maxWidth: '800px',
              margin: { top: '0px', right: 'auto', bottom: '0px', left: 'auto' },
              display: 'flex',
              flexDirection: 'column',
              gap: '16px',
            },
          },
          children: [
            {
              id: `faq-item-1-${ts}`,
              name: 'FAQ Item 1',
              type: 'card',
              tag: 'div',
              styles: {
                desktop: {
                  backgroundColor: '#ffffff',
                  padding: { top: '24px', right: '24px', bottom: '24px', left: '24px' },
                  border: { width: '1px', style: 'solid', color: '#e5e7eb', radius: '10px' },
                },
              },
              children: [
                { id: `faq-q-1-${ts}`, name: 'Question', type: 'h3', tag: 'h3', content: 'How long does a typical website engagement take?', styles: { desktop: { fontSize: '18px', fontWeight: '700', color: '#111827', margin: { top: '0px', right: '0px', bottom: '8px', left: '0px' } } } },
                { id: `faq-a-1-${ts}`, name: 'Answer', type: 'paragraph', tag: 'p', content: 'Most architectural website projects are designed, engineered, and launched within 4 to 8 weeks depending on scope.', styles: { desktop: { fontSize: '14px', color: '#6b7280', margin: { top: '0px', right: '0px', bottom: '0px', left: '0px' } } } },
              ],
            },
            {
              id: `faq-item-2-${ts}`,
              name: 'FAQ Item 2',
              type: 'card',
              tag: 'div',
              styles: {
                desktop: {
                  backgroundColor: '#ffffff',
                  padding: { top: '24px', right: '24px', bottom: '24px', left: '24px' },
                  border: { width: '1px', style: 'solid', color: '#e5e7eb', radius: '10px' },
                },
              },
              children: [
                { id: `faq-q-2-${ts}`, name: 'Question', type: 'h3', tag: 'h3', content: 'Do you provide full code export and custom CMS integration?', styles: { desktop: { fontSize: '18px', fontWeight: '700', color: '#111827', margin: { top: '0px', right: '0px', bottom: '8px', left: '0px' } } } },
                { id: `faq-a-2-${ts}`, name: 'Answer', type: 'paragraph', tag: 'p', content: 'Yes, all code is 100% production-ready HTML5, CSS3, and React with zero proprietary lock-in.', styles: { desktop: { fontSize: '14px', color: '#6b7280', margin: { top: '0px', right: '0px', bottom: '0px', left: '0px' } } } },
              ],
            },
          ],
        },
      ],
    };
  }

  // Fallback: Contact section
  return {
    id: `section-contact-${ts}`,
    name: 'Contact Section',
    type: 'section',
    tag: 'section',
    styles: {
      desktop: {
        backgroundColor: '#ffffff',
        padding: { top: '80px', right: '32px', bottom: '80px', left: '32px' },
        display: 'block',
      },
    },
    children: [
      {
        id: `contact-title-${ts}`,
        name: 'Contact Heading',
        type: 'h2',
        tag: 'h2',
        content: 'Get in Touch with our Studio',
        styles: {
          desktop: {
            fontSize: '36px',
            fontWeight: '800',
            textAlign: 'center',
            color: '#111827',
            margin: { top: '0px', right: '0px', bottom: '12px', left: '0px' },
          },
        },
      },
      {
        id: `contact-form-${ts}`,
        name: 'Contact Form Block',
        type: 'form',
        tag: 'form',
        styles: {
          desktop: {
            maxWidth: '520px',
            margin: { top: '0px', right: 'auto', bottom: '0px', left: 'auto' },
            display: 'flex',
            flexDirection: 'column',
            gap: '16px',
          },
        },
        children: [
          { id: `inp-name-${ts}`, name: 'Name Field', type: 'input', tag: 'input', attributes: { placeholder: 'Your Full Name' }, styles: { desktop: { width: '100%', padding: { top: '12px', right: '16px', bottom: '12px', left: '16px' }, border: { width: '1px', style: 'solid', color: '#d1d5db', radius: '8px' } } } },
          { id: `inp-email-${ts}`, name: 'Email Field', type: 'input', tag: 'input', attributes: { placeholder: 'Work Email Address', type: 'email' }, styles: { desktop: { width: '100%', padding: { top: '12px', right: '16px', bottom: '12px', left: '16px' }, border: { width: '1px', style: 'solid', color: '#d1d5db', radius: '8px' } } } },
          { id: `inp-msg-${ts}`, name: 'Message Field', type: 'textarea', tag: 'textarea', attributes: { placeholder: 'Tell us about your brand vision...' }, styles: { desktop: { width: '100%', minHeight: '120px', padding: { top: '12px', right: '16px', bottom: '12px', left: '16px' }, border: { width: '1px', style: 'solid', color: '#d1d5db', radius: '8px' } } } },
          { id: `btn-submit-${ts}`, name: 'Submit Button', type: 'button', tag: 'button', content: 'Send Inquiry →', styles: { desktop: { width: '100%', backgroundColor: '#111827', color: '#ffffff', padding: { top: '14px', right: '24px', bottom: '14px', left: '24px' }, border: { width: '1px', style: 'solid', color: '#111827', radius: '8px' }, fontWeight: '600', cursor: 'pointer' } } },
        ],
      },
    ],
  };

  // 3D Animated Spatial Hero Section
  if (key === '3d-hero') {
    return {
      id: `section-3d-hero-${ts}`,
      name: '3D Spatial Hero Section',
      type: 'section',
      tag: 'section',
      styles: {
        desktop: {
          backgroundColor: '#0a0d14',
          color: '#ffffff',
          padding: { top: '100px', right: '32px', bottom: '100px', left: '32px' },
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          textAlign: 'center',
          overflow: 'hidden',
          perspective: '1200px',
        },
        mobile: {
          padding: { top: '60px', right: '16px', bottom: '60px', left: '16px' },
        },
      },
      children: [
        {
          id: `badge-3d-${ts}`,
          name: '3D Glowing Badge',
          type: 'badge',
          tag: 'span',
          content: '★ NEXT-GEN 3D WEB ARCHITECTURE',
          styles: {
            desktop: {
              backgroundColor: 'rgba(16, 185, 129, 0.15)',
              color: '#10b981',
              fontSize: '11px',
              fontWeight: '700',
              letterSpacing: '0.15em',
              padding: { top: '6px', right: '16px', bottom: '6px', left: '16px' },
              border: { width: '1px', style: 'solid', color: 'rgba(16, 185, 129, 0.3)', radius: '9999px' },
              margin: { top: '0px', right: '0px', bottom: '24px', left: '0px' },
              animation: 'pulseGlow 2.5s ease-in-out infinite',
            },
          },
        },
        {
          id: `title-3d-${ts}`,
          name: '3D Spatial Heading',
          type: 'h1',
          tag: 'h1',
          content: 'Immersive Spatial Websites with Physics-Driven Animations',
          styles: {
            desktop: {
              fontSize: '52px',
              fontWeight: '800',
              lineHeight: '1.15',
              maxWidth: '880px',
              color: '#ffffff',
              margin: { top: '0px', right: 'auto', bottom: '24px', left: 'auto' },
            },
            mobile: {
              fontSize: '28px',
              lineHeight: '1.25',
            },
          },
        },
        {
          id: `sub-3d-${ts}`,
          name: '3D Spatial Subtitle',
          type: 'paragraph',
          tag: 'p',
          content: 'Crafting spatial depth, floating glassmorphism layers, and 3D interactive physics directly in your visual builder without writing code.',
          styles: {
            desktop: {
              fontSize: '17px',
              color: '#94a3b8',
              maxWidth: '680px',
              margin: { top: '0px', right: 'auto', bottom: '40px', left: 'auto' },
              lineHeight: '1.6',
            },
          },
        },
        {
          id: `card-3d-showcase-${ts}`,
          name: '3D Floating Showcase Card',
          type: 'card',
          tag: 'div',
          styles: {
            desktop: {
              maxWidth: '680px',
              width: '100%',
              backgroundColor: 'rgba(30, 41, 59, 0.7)',
              backdropFilter: 'blur(20px)',
              padding: { top: '32px', right: '32px', bottom: '32px', left: '32px' },
              border: { width: '1px', style: 'solid', color: 'rgba(255, 255, 255, 0.15)', radius: '20px' },
              boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.65)',
              transform: 'perspective(1000px) rotateX(6deg) rotateY(-4deg)',
              animation: 'floatSlow 5s ease-in-out infinite',
            },
            mobile: {
              padding: { top: '20px', right: '16px', bottom: '20px', left: '16px' },
              transform: 'none',
            },
          },
          children: [
            {
              id: `card-3d-h3-${ts}`,
              name: 'Showcase Headline',
              type: 'h3',
              tag: 'h3',
              content: 'Interactive 3D Glass Layer',
              styles: {
                desktop: {
                  fontSize: '22px',
                  fontWeight: '700',
                  color: '#f8fafc',
                  margin: { top: '0px', right: '0px', bottom: '10px', left: '0px' },
                },
              },
            },
            {
              id: `card-3d-p-${ts}`,
              name: 'Showcase Text',
              type: 'paragraph',
              tag: 'p',
              content: 'Hover over this card or enter Preview mode to experience real-time 3D parallax tilt, depth layers, and smooth cinematic transitions.',
              styles: {
                desktop: {
                  fontSize: '14px',
                  color: '#94a3b8',
                  lineHeight: '1.6',
                },
              },
            },
          ],
        },
      ],
    };
  }

  // 3D Interactive Feature Cards Section
  return {
    id: `section-3d-cards-${ts}`,
    name: '3D Interactive Cards Section',
    type: 'section',
    tag: 'section',
    styles: {
      desktop: {
        backgroundColor: '#030712',
        padding: { top: '80px', right: '32px', bottom: '80px', left: '32px' },
        display: 'block',
      },
      mobile: {
        padding: { top: '48px', right: '16px', bottom: '48px', left: '16px' },
      },
    },
    children: [
      {
        id: `h2-3d-cards-${ts}`,
        name: '3D Section Title',
        type: 'h2',
        tag: 'h2',
        content: '3D Spatial Interactive Capabilities',
        styles: {
          desktop: {
            fontSize: '36px',
            fontWeight: '800',
            textAlign: 'center',
            color: '#f8fafc',
            margin: { top: '0px', right: '0px', bottom: '48px', left: '0px' },
          },
          mobile: {
            fontSize: '24px',
            margin: { top: '0px', right: '0px', bottom: '28px', left: '0px' },
          },
        },
      },
      {
        id: `grid-3d-${ts}`,
        name: '3D Cards Grid',
        type: 'grid',
        tag: 'div',
        styles: {
          desktop: {
            display: 'grid',
            gridTemplateColumns: 'repeat(3, 1fr)',
            gap: '24px',
            maxWidth: '1100px',
            margin: { top: '0px', right: 'auto', bottom: '0px', left: 'auto' },
            perspective: '1000px',
          },
          tablet: {
            gridTemplateColumns: 'repeat(2, 1fr)',
          },
          mobile: {
            gridTemplateColumns: 'repeat(1, 1fr)',
          },
        },
        children: [
          {
            id: `card-tilt-1-${ts}`,
            name: '3D Tilt Card 1',
            type: 'card',
            tag: 'div',
            styles: {
              desktop: {
                backgroundColor: 'rgba(17, 24, 39, 0.85)',
                backdropFilter: 'blur(16px)',
                padding: { top: '32px', right: '28px', bottom: '32px', left: '28px' },
                border: { width: '1px', style: 'solid', color: 'rgba(16, 185, 129, 0.3)', radius: '16px' },
                boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.5)',
                transform: 'perspective(1000px) rotateY(8deg)',
                transition: 'all 0.4s ease',
              },
            },
            children: [
              { id: `c1-t-${ts}`, name: 'Card Title 1', type: 'h3', tag: 'h3', content: '01. Spatial Depth', styles: { desktop: { fontSize: '20px', fontWeight: '700', color: '#10b981', margin: { top: '0px', right: '0px', bottom: '12px', left: '0px' } } } },
              { id: `c1-p-${ts}`, name: 'Card Text 1', type: 'paragraph', tag: 'p', content: 'Layer elements across the Z-axis for a multi-dimensional perspective feel.', styles: { desktop: { fontSize: '14px', color: '#9ca3af', lineHeight: '1.6' } } },
            ],
          },
          {
            id: `card-tilt-2-${ts}`,
            name: '3D Tilt Card 2',
            type: 'card',
            tag: 'div',
            styles: {
              desktop: {
                backgroundColor: 'rgba(17, 24, 39, 0.85)',
                backdropFilter: 'blur(16px)',
                padding: { top: '32px', right: '28px', bottom: '32px', left: '28px' },
                border: { width: '1px', style: 'solid', color: 'rgba(168, 85, 247, 0.3)', radius: '16px' },
                boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.5)',
                transform: 'perspective(1000px) translateY(-8px)',
                transition: 'all 0.4s ease',
              },
            },
            children: [
              { id: `c2-t-${ts}`, name: 'Card Title 2', type: 'h3', tag: 'h3', content: '02. Dynamic Glass', styles: { desktop: { fontSize: '20px', fontWeight: '700', color: '#c084fc', margin: { top: '0px', right: '0px', bottom: '12px', left: '0px' } } } },
              { id: `c2-p-${ts}`, name: 'Card Text 2', type: 'paragraph', tag: 'p', content: 'Ultra-clear frosted glass backdrops that reflect background ambient glow.', styles: { desktop: { fontSize: '14px', color: '#9ca3af', lineHeight: '1.6' } } },
            ],
          },
          {
            id: `card-tilt-3-${ts}`,
            name: '3D Tilt Card 3',
            type: 'card',
            tag: 'div',
            styles: {
              desktop: {
                backgroundColor: 'rgba(17, 24, 39, 0.85)',
                backdropFilter: 'blur(16px)',
                padding: { top: '32px', right: '28px', bottom: '32px', left: '28px' },
                border: { width: '1px', style: 'solid', color: 'rgba(34, 197, 94, 0.3)', radius: '16px' },
                boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.5)',
                transform: 'perspective(1000px) rotateY(-8deg)',
                transition: 'all 0.4s ease',
              },
            },
            children: [
              { id: `c3-t-${ts}`, name: 'Card Title 3', type: 'h3', tag: 'h3', content: '03. Physics Micro-motion', styles: { desktop: { fontSize: '20px', fontWeight: '700', color: '#4ade80', margin: { top: '0px', right: '0px', bottom: '12px', left: '0px' } } } },
              { id: `c3-p-${ts}`, name: 'Card Text 3', type: 'paragraph', tag: 'p', content: 'Spring-loaded hover physics and ambient continuous sine wave levitation.', styles: { desktop: { fontSize: '14px', color: '#9ca3af', lineHeight: '1.6' } } },
            ],
          },
        ],
      },
    ],
  };
};

