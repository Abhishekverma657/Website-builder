import { BuilderElement, Project } from '../types/builder';

export const initialElements: BuilderElement[] = [
  // 1. Navigation Bar
  {
    id: 'nav-main',
    name: 'Navbar',
    type: 'navbar',
    tag: 'nav',
    styles: {
      desktop: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: { top: '22px', right: '48px', bottom: '22px', left: '48px' },
        backgroundColor: '#ffffff',
        border: {
          width: '1px',
          style: 'solid',
          color: '#e5e7eb',
          radius: '0px',
        },
        position: 'sticky',
        top: '0px',
        zIndex: '20',
      },
      tablet: {
        padding: { top: '16px', right: '24px', bottom: '16px', left: '24px' },
      },
      mobile: {
        padding: { top: '14px', right: '16px', bottom: '14px', left: '16px' },
      },
    },
    children: [
      {
        id: 'brand-logo',
        name: 'Brand Logo',
        type: 'h3',
        tag: 'h3',
        content: 'AURA STUDIO',
        styles: {
          desktop: {
            fontSize: '18px',
            fontWeight: '800',
            letterSpacing: '0.1em',
            color: '#111827',
            margin: { top: '0px', right: '0px', bottom: '0px', left: '0px' },
            cursor: 'pointer',
          },
          mobile: {
            fontSize: '15px',
          },
        },
      },
      {
        id: 'nav-links',
        name: 'Nav Links',
        type: 'div',
        tag: 'div',
        styles: {
          desktop: {
            display: 'flex',
            alignItems: 'center',
            gap: '32px',
          },
          tablet: {
            gap: '16px',
          },
          mobile: {
            gap: '8px',
          },
        },
        children: [
          {
            id: 'link-work',
            name: 'Nav Link Works',
            type: 'link',
            tag: 'a',
            content: 'Selected Works',
            styles: {
              desktop: {
                color: '#4b5563',
                fontSize: '14px',
                fontWeight: '500',
                textDecoration: 'none',
                cursor: 'pointer',
              },
              mobile: {
                display: 'none',
              },
            },
          },
          {
            id: 'link-services',
            name: 'Nav Link Services',
            type: 'link',
            tag: 'a',
            content: 'Services',
            styles: {
              desktop: {
                color: '#4b5563',
                fontSize: '14px',
                fontWeight: '500',
                textDecoration: 'none',
                cursor: 'pointer',
              },
              mobile: {
                display: 'none',
              },
            },
          },
          {
            id: 'link-about',
            name: 'Nav Link About',
            type: 'link',
            tag: 'a',
            content: 'About Studio',
            styles: {
              desktop: {
                color: '#4b5563',
                fontSize: '14px',
                fontWeight: '500',
                textDecoration: 'none',
                cursor: 'pointer',
              },
              mobile: {
                display: 'none',
              },
            },
          },
          {
            id: 'nav-cta-btn',
            name: 'Nav Contact Button',
            type: 'button',
            tag: 'button',
            content: 'Start a Project',
            styles: {
              desktop: {
                backgroundColor: '#111827',
                color: '#ffffff',
                padding: { top: '10px', right: '22px', bottom: '10px', left: '22px' },
                fontSize: '13px',
                fontWeight: '600',
                border: {
                  width: '1px',
                  style: 'solid',
                  color: '#111827',
                  radius: '9999px',
                },
                cursor: 'pointer',
              },
              mobile: {
                padding: { top: '8px', right: '14px', bottom: '8px', left: '14px' },
                fontSize: '12px',
              },
            },
          },
        ],
      },
    ],
  },

  // 2. Hero Section
  {
    id: 'hero-section',
    name: 'Hero Section',
    type: 'section',
    tag: 'section',
    styles: {
      desktop: {
        backgroundColor: '#fafafa',
        padding: { top: '90px', right: '32px', bottom: '90px', left: '32px' },
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        textAlign: 'center',
      },
      tablet: {
        padding: { top: '60px', right: '24px', bottom: '60px', left: '24px' },
      },
      mobile: {
        padding: { top: '40px', right: '16px', bottom: '40px', left: '16px' },
      },
    },
    children: [
      {
        id: 'hero-badge',
        name: 'Studio Badge',
        type: 'badge',
        tag: 'span',
        content: 'ARCHITECTURE • DIGITAL DESIGN • BRAND IDENTITY',
        styles: {
          desktop: {
            backgroundColor: '#f3f4f6',
            color: '#4b5563',
            fontSize: '11px',
            fontWeight: '700',
            letterSpacing: '0.15em',
            padding: { top: '6px', right: '16px', bottom: '6px', left: '16px' },
            border: {
              width: '1px',
              style: 'solid',
              color: '#e5e7eb',
              radius: '9999px',
            },
            margin: { top: '0px', right: '0px', bottom: '28px', left: '0px' },
          },
          mobile: {
            fontSize: '10px',
            letterSpacing: '0.08em',
            padding: { top: '4px', right: '12px', bottom: '4px', left: '12px' },
            margin: { top: '0px', right: '0px', bottom: '18px', left: '0px' },
          },
        },
      },
      {
        id: 'hero-headline',
        name: 'Hero Headline',
        type: 'h1',
        tag: 'h1',
        content: 'We craft timeless digital experiences for visionary brands.',
        styles: {
          desktop: {
            fontSize: '56px',
            fontWeight: '800',
            color: '#111827',
            lineHeight: '1.15',
            maxWidth: '920px',
            margin: { top: '0px', right: 'auto', bottom: '24px', left: 'auto' },
            fontFamily: 'Inter',
          },
          tablet: {
            fontSize: '40px',
            lineHeight: '1.2',
          },
          mobile: {
            fontSize: '26px',
            lineHeight: '1.25',
            margin: { top: '0px', right: 'auto', bottom: '16px', left: 'auto' },
          },
        },
      },
      {
        id: 'hero-subtitle',
        name: 'Hero Subtitle',
        type: 'paragraph',
        tag: 'p',
        content: 'A boutique design and technology studio based in London and Tokyo. We merge architectural precision with cutting-edge web craftsmanship to build websites that elevate brand value.',
        styles: {
          desktop: {
            fontSize: '18px',
            lineHeight: '1.6',
            color: '#6b7280',
            maxWidth: '720px',
            margin: { top: '0px', right: 'auto', bottom: '36px', left: 'auto' },
          },
          tablet: {
            fontSize: '16px',
            lineHeight: '1.5',
            margin: { top: '0px', right: 'auto', bottom: '28px', left: 'auto' },
          },
          mobile: {
            fontSize: '14px',
            lineHeight: '1.5',
            margin: { top: '0px', right: 'auto', bottom: '24px', left: 'auto' },
          },
        },
      },
      {
        id: 'hero-actions',
        name: 'Hero CTA Group',
        type: 'div',
        tag: 'div',
        styles: {
          desktop: {
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '16px',
            margin: { top: '0px', right: '0px', bottom: '64px', left: '0px' },
          },
          mobile: {
            flexDirection: 'column',
            width: '100%',
            gap: '12px',
            margin: { top: '0px', right: '0px', bottom: '36px', left: '0px' },
          },
        },
        children: [
          {
            id: 'hero-btn-primary',
            name: 'Primary Button',
            type: 'button',
            tag: 'button',
            content: 'Explore Portfolio',
            styles: {
              desktop: {
                backgroundColor: '#111827',
                color: '#ffffff',
                padding: { top: '14px', right: '32px', bottom: '14px', left: '32px' },
                fontSize: '15px',
                fontWeight: '600',
                border: {
                  width: '1px',
                  style: 'solid',
                  color: '#111827',
                  radius: '8px',
                },
                cursor: 'pointer',
              },
              mobile: {
                width: '100%',
                padding: { top: '12px', right: '20px', bottom: '12px', left: '20px' },
                fontSize: '14px',
                textAlign: 'center',
              },
            },
          },
          {
            id: 'hero-btn-secondary',
            name: 'Secondary Button',
            type: 'button',
            tag: 'button',
            content: 'Our Design Philosophy →',
            styles: {
              desktop: {
                backgroundColor: '#ffffff',
                color: '#111827',
                padding: { top: '14px', right: '28px', bottom: '14px', left: '28px' },
                fontSize: '15px',
                fontWeight: '600',
                border: {
                  width: '1px',
                  style: 'solid',
                  color: '#d1d5db',
                  radius: '8px',
                },
                cursor: 'pointer',
              },
              mobile: {
                width: '100%',
                padding: { top: '12px', right: '20px', bottom: '12px', left: '20px' },
                fontSize: '14px',
                textAlign: 'center',
              },
            },
          },
        ],
      },
      {
        id: 'hero-image-banner',
        name: 'Hero Studio Image',
        type: 'image',
        tag: 'img',
        attributes: {
          src: 'https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=1400&q=80',
          alt: 'Modern Architectural Studio Space',
        },
        styles: {
          desktop: {
            width: '100%',
            maxWidth: '1100px',
            height: 'auto',
            border: {
              width: '1px',
              style: 'solid',
              color: '#e5e7eb',
              radius: '16px',
            },
            boxShadow: '0 20px 40px -15px rgba(0, 0, 0, 0.1)',
          },
          mobile: {
            border: {
              radius: '10px',
            },
          },
        },
      },
    ],
  },

  // 3. Metrics / Stats Bar
  {
    id: 'stats-section',
    name: 'Stats Section',
    type: 'section',
    tag: 'section',
    styles: {
      desktop: {
        backgroundColor: '#ffffff',
        padding: { top: '60px', right: '32px', bottom: '60px', left: '32px' },
        border: {
          width: '1px',
          style: 'solid',
          color: '#f3f4f6',
          radius: '0px',
        },
      },
      tablet: {
        padding: { top: '48px', right: '24px', bottom: '48px', left: '24px' },
      },
      mobile: {
        padding: { top: '36px', right: '16px', bottom: '36px', left: '16px' },
      },
    },
    children: [
      {
        id: 'stats-grid',
        name: 'Stats 4-Col Grid',
        type: 'grid',
        tag: 'div',
        styles: {
          desktop: {
            display: 'grid',
            gridTemplateColumns: 'repeat(4, 1fr)',
            gap: '32px',
            maxWidth: '1100px',
            margin: { top: '0px', right: 'auto', bottom: '0px', left: 'auto' },
            textAlign: 'center',
          },
          tablet: {
            gridTemplateColumns: 'repeat(2, 1fr)',
            gap: '24px',
          },
          mobile: {
            gridTemplateColumns: 'repeat(1, 1fr)',
            gap: '24px',
          },
        },
        children: [
          {
            id: 'stat-item-1',
            name: 'Stat 1',
            type: 'div',
            tag: 'div',
            styles: {
              desktop: {},
            },
            children: [
              {
                id: 'stat-num-1',
                name: 'Stat Number 1',
                type: 'h2',
                tag: 'h2',
                content: '180+',
                styles: {
                  desktop: {
                    fontSize: '40px',
                    fontWeight: '800',
                    color: '#111827',
                    margin: { top: '0px', right: '0px', bottom: '6px', left: '0px' },
                  },
                  mobile: {
                    fontSize: '32px',
                  },
                },
              },
              {
                id: 'stat-label-1',
                name: 'Stat Label 1',
                type: 'paragraph',
                tag: 'p',
                content: 'Projects Delivered',
                styles: {
                  desktop: {
                    fontSize: '14px',
                    color: '#6b7280',
                    fontWeight: '500',
                  },
                },
              },
            ],
          },
          {
            id: 'stat-item-2',
            name: 'Stat 2',
            type: 'div',
            tag: 'div',
            styles: {
              desktop: {},
            },
            children: [
              {
                id: 'stat-num-2',
                name: 'Stat Number 2',
                type: 'h2',
                tag: 'h2',
                content: '24',
                styles: {
                  desktop: {
                    fontSize: '40px',
                    fontWeight: '800',
                    color: '#111827',
                    margin: { top: '0px', right: '0px', bottom: '6px', left: '0px' },
                  },
                  mobile: {
                    fontSize: '32px',
                  },
                },
              },
              {
                id: 'stat-label-2',
                name: 'Stat Label 2',
                type: 'paragraph',
                tag: 'p',
                content: 'Design Excellence Awards',
                styles: {
                  desktop: {
                    fontSize: '14px',
                    color: '#6b7280',
                    fontWeight: '500',
                  },
                },
              },
            ],
          },
          {
            id: 'stat-item-3',
            name: 'Stat 3',
            type: 'div',
            tag: 'div',
            styles: {
              desktop: {},
            },
            children: [
              {
                id: 'stat-num-3',
                name: 'Stat Number 3',
                type: 'h2',
                tag: 'h2',
                content: '99%',
                styles: {
                  desktop: {
                    fontSize: '40px',
                    fontWeight: '800',
                    color: '#111827',
                    margin: { top: '0px', right: '0px', bottom: '6px', left: '0px' },
                  },
                  mobile: {
                    fontSize: '32px',
                  },
                },
              },
              {
                id: 'stat-label-3',
                name: 'Stat Label 3',
                type: 'paragraph',
                tag: 'p',
                content: 'Client Satisfaction Rate',
                styles: {
                  desktop: {
                    fontSize: '14px',
                    color: '#6b7280',
                    fontWeight: '500',
                  },
                },
              },
            ],
          },
          {
            id: 'stat-item-4',
            name: 'Stat 4',
            type: 'div',
            tag: 'div',
            styles: {
              desktop: {},
            },
            children: [
              {
                id: 'stat-num-4',
                name: 'Stat Number 4',
                type: 'h2',
                tag: 'h2',
                content: '12 Yrs',
                styles: {
                  desktop: {
                    fontSize: '40px',
                    fontWeight: '800',
                    color: '#111827',
                    margin: { top: '0px', right: '0px', bottom: '6px', left: '0px' },
                  },
                  mobile: {
                    fontSize: '32px',
                  },
                },
              },
              {
                id: 'stat-label-4',
                name: 'Stat Label 4',
                type: 'paragraph',
                tag: 'p',
                content: 'Industry Experience',
                styles: {
                  desktop: {
                    fontSize: '14px',
                    color: '#6b7280',
                    fontWeight: '500',
                  },
                },
              },
            ],
          },
        ],
      },
    ],
  },

  // 4. Services Grid Section
  {
    id: 'services-section',
    name: 'Services Section',
    type: 'section',
    tag: 'section',
    styles: {
      desktop: {
        backgroundColor: '#f9fafb',
        padding: { top: '96px', right: '32px', bottom: '96px', left: '32px' },
      },
      tablet: {
        padding: { top: '64px', right: '24px', bottom: '64px', left: '24px' },
      },
      mobile: {
        padding: { top: '48px', right: '16px', bottom: '48px', left: '16px' },
      },
    },
    children: [
      {
        id: 'services-heading-wrap',
        name: 'Services Header',
        type: 'div',
        tag: 'div',
        styles: {
          desktop: {
            textAlign: 'center',
            maxWidth: '680px',
            margin: { top: '0px', right: 'auto', bottom: '56px', left: 'auto' },
          },
          mobile: {
            margin: { top: '0px', right: 'auto', bottom: '32px', left: 'auto' },
          },
        },
        children: [
          {
            id: 'services-title',
            name: 'Services Title',
            type: 'h2',
            tag: 'h2',
            content: 'Our Core Capabilities',
            styles: {
              desktop: {
                fontSize: '36px',
                fontWeight: '800',
                color: '#111827',
                margin: { top: '0px', right: '0px', bottom: '12px', left: '0px' },
              },
              mobile: {
                fontSize: '24px',
              },
            },
          },
          {
            id: 'services-subtitle',
            name: 'Services Subtitle',
            type: 'paragraph',
            tag: 'p',
            content: 'We combine aesthetic distinction with technical precision to deliver memorable brand identities and interactive web systems.',
            styles: {
              desktop: {
                fontSize: '16px',
                color: '#6b7280',
                lineHeight: '1.6',
              },
              mobile: {
                fontSize: '14px',
              },
            },
          },
        ],
      },
      {
        id: 'services-grid',
        name: 'Services 3-Col Grid',
        type: 'grid',
        tag: 'div',
        styles: {
          desktop: {
            display: 'grid',
            gridTemplateColumns: 'repeat(3, 1fr)',
            gap: '28px',
            maxWidth: '1100px',
            margin: { top: '0px', right: 'auto', bottom: '0px', left: 'auto' },
          },
          tablet: {
            gridTemplateColumns: 'repeat(2, 1fr)',
            gap: '20px',
          },
          mobile: {
            gridTemplateColumns: 'repeat(1, 1fr)',
            gap: '16px',
          },
        },
        children: [
          {
            id: 'srv-card-1',
            name: 'Brand Strategy Card',
            type: 'card',
            tag: 'div',
            styles: {
              desktop: {
                backgroundColor: '#ffffff',
                padding: { top: '36px', right: '32px', bottom: '36px', left: '32px' },
                border: {
                  width: '1px',
                  style: 'solid',
                  color: '#e5e7eb',
                  radius: '12px',
                },
                boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.03)',
              },
              mobile: {
                padding: { top: '24px', right: '20px', bottom: '24px', left: '20px' },
              },
            },
            children: [
              {
                id: 'srv-card-1-title',
                name: 'Brand Identity Title',
                type: 'h3',
                tag: 'h3',
                content: '01. Brand Identity',
                styles: {
                  desktop: {
                    fontSize: '20px',
                    fontWeight: '700',
                    color: '#111827',
                    margin: { top: '0px', right: '0px', bottom: '14px', left: '0px' },
                  },
                  mobile: {
                    fontSize: '18px',
                    margin: { top: '0px', right: '0px', bottom: '8px', left: '0px' },
                  },
                },
              },
              {
                id: 'srv-card-1-desc',
                name: 'Brand Identity Desc',
                type: 'paragraph',
                tag: 'p',
                content: 'Visual identity systems, typography guidelines, art direction, and comprehensive brand books that establish enduring prestige.',
                styles: {
                  desktop: {
                    fontSize: '14px',
                    color: '#6b7280',
                    lineHeight: '1.6',
                  },
                },
              },
            ],
          },
          {
            id: 'srv-card-2',
            name: 'Digital Platforms Card',
            type: 'card',
            tag: 'div',
            styles: {
              desktop: {
                backgroundColor: '#ffffff',
                padding: { top: '36px', right: '32px', bottom: '36px', left: '32px' },
                border: {
                  width: '1px',
                  style: 'solid',
                  color: '#e5e7eb',
                  radius: '12px',
                },
                boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.03)',
              },
              mobile: {
                padding: { top: '24px', right: '20px', bottom: '24px', left: '20px' },
              },
            },
            children: [
              {
                id: 'srv-card-2-title',
                name: 'Digital Platforms Title',
                type: 'h3',
                tag: 'h3',
                content: '02. Web Architecture',
                styles: {
                  desktop: {
                    fontSize: '20px',
                    fontWeight: '700',
                    color: '#111827',
                    margin: { top: '0px', right: '0px', bottom: '14px', left: '0px' },
                  },
                  mobile: {
                    fontSize: '18px',
                    margin: { top: '0px', right: '0px', bottom: '8px', left: '0px' },
                  },
                },
              },
              {
                id: 'srv-card-2-desc',
                name: 'Digital Platforms Desc',
                type: 'paragraph',
                tag: 'p',
                content: 'Pixel-perfect website engineering, headless CMS integrations, fluid responsiveness, and high conversion landing pages.',
                styles: {
                  desktop: {
                    fontSize: '14px',
                    color: '#6b7280',
                    lineHeight: '1.6',
                  },
                },
              },
            ],
          },
          {
            id: 'srv-card-3',
            name: 'Motion & Experience Card',
            type: 'card',
            tag: 'div',
            styles: {
              desktop: {
                backgroundColor: '#ffffff',
                padding: { top: '36px', right: '32px', bottom: '36px', left: '32px' },
                border: {
                  width: '1px',
                  style: 'solid',
                  color: '#e5e7eb',
                  radius: '12px',
                },
                boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.03)',
              },
              mobile: {
                padding: { top: '24px', right: '20px', bottom: '24px', left: '20px' },
              },
            },
            children: [
              {
                id: 'srv-card-3-title',
                name: 'Motion Experience Title',
                type: 'h3',
                tag: 'h3',
                content: '03. Motion & Interaction',
                styles: {
                  desktop: {
                    fontSize: '20px',
                    fontWeight: '700',
                    color: '#111827',
                    margin: { top: '0px', right: '0px', bottom: '14px', left: '0px' },
                  },
                  mobile: {
                    fontSize: '18px',
                    margin: { top: '0px', right: '0px', bottom: '8px', left: '0px' },
                  },
                },
              },
              {
                id: 'srv-card-3-desc',
                name: 'Motion Experience Desc',
                type: 'paragraph',
                tag: 'p',
                content: 'Custom physics-based animations, 3D web graphics, scroll experiences, and micro-interactions that captivate audiences.',
                styles: {
                  desktop: {
                    fontSize: '14px',
                    color: '#6b7280',
                    lineHeight: '1.6',
                  },
                },
              },
            ],
          },
        ],
      },
    ],
  },

  // 5. Testimonial Quote Section
  {
    id: 'quote-section',
    name: 'Testimonial Section',
    type: 'section',
    tag: 'section',
    styles: {
      desktop: {
        backgroundColor: '#111827',
        color: '#ffffff',
        padding: { top: '80px', right: '32px', bottom: '80px', left: '32px' },
        textAlign: 'center',
      },
      tablet: {
        padding: { top: '60px', right: '24px', bottom: '60px', left: '24px' },
      },
      mobile: {
        padding: { top: '40px', right: '16px', bottom: '40px', left: '16px' },
      },
    },
    children: [
      {
        id: 'quote-text',
        name: 'Quote Text',
        type: 'h2',
        tag: 'h2',
        content: '“Aura Studio transformed our digital identity. Their architectural approach to design and attention to every interaction doubled our conversion rate.”',
        styles: {
          desktop: {
            fontSize: '28px',
            fontWeight: '500',
            lineHeight: '1.5',
            color: '#f9fafb',
            maxWidth: '840px',
            margin: { top: '0px', right: 'auto', bottom: '24px', left: 'auto' },
          },
          tablet: {
            fontSize: '22px',
          },
          mobile: {
            fontSize: '17px',
            lineHeight: '1.45',
            margin: { top: '0px', right: 'auto', bottom: '16px', left: 'auto' },
          },
        },
      },
      {
        id: 'quote-author',
        name: 'Quote Author',
        type: 'paragraph',
        tag: 'p',
        content: '— Marcus Vance, Design Director at Vanguard Global Architecture',
        styles: {
          desktop: {
            fontSize: '15px',
            color: '#9ca3af',
            fontWeight: '600',
            letterSpacing: '0.05em',
            margin: { top: '0px', right: '0px', bottom: '0px', left: '0px' },
          },
          mobile: {
            fontSize: '13px',
          },
        },
      },
    ],
  },

  // 6. Call To Action Section
  {
    id: 'cta-section',
    name: 'CTA Banner Section',
    type: 'section',
    tag: 'section',
    styles: {
      desktop: {
        backgroundColor: '#ffffff',
        padding: { top: '80px', right: '32px', bottom: '80px', left: '32px' },
        textAlign: 'center',
      },
      tablet: {
        padding: { top: '60px', right: '24px', bottom: '60px', left: '24px' },
      },
      mobile: {
        padding: { top: '40px', right: '16px', bottom: '40px', left: '16px' },
      },
    },
    children: [
      {
        id: 'cta-title',
        name: 'CTA Title',
        type: 'h2',
        tag: 'h2',
        content: 'Ready to elevate your brand presence?',
        styles: {
          desktop: {
            fontSize: '36px',
            fontWeight: '800',
            color: '#111827',
            margin: { top: '0px', right: '0px', bottom: '16px', left: '0px' },
          },
          mobile: {
            fontSize: '24px',
            margin: { top: '0px', right: '0px', bottom: '12px', left: '0px' },
          },
        },
      },
      {
        id: 'cta-sub',
        name: 'CTA Subtitle',
        type: 'paragraph',
        tag: 'p',
        content: 'Let us build a bespoke digital solution tailored to your company goals.',
        styles: {
          desktop: {
            fontSize: '16px',
            color: '#6b7280',
            margin: { top: '0px', right: 'auto', bottom: '32px', left: 'auto' },
            maxWidth: '560px',
          },
          mobile: {
            fontSize: '14px',
            margin: { top: '0px', right: 'auto', bottom: '24px', left: 'auto' },
          },
        },
      },
      {
        id: 'cta-btn',
        name: 'CTA Button',
        type: 'button',
        tag: 'button',
        content: 'Schedule a Consultation →',
        styles: {
          desktop: {
            backgroundColor: '#111827',
            color: '#ffffff',
            padding: { top: '14px', right: '32px', bottom: '14px', left: '32px' },
            fontSize: '15px',
            fontWeight: '600',
            border: {
              width: '1px',
              style: 'solid',
              color: '#111827',
              radius: '8px',
            },
            cursor: 'pointer',
          },
          mobile: {
            width: '100%',
            padding: { top: '12px', right: '20px', bottom: '12px', left: '20px' },
            fontSize: '14px',
          },
        },
      },
    ],
  },

  // 7. Footer Section
  {
    id: 'footer-main',
    name: 'Footer',
    type: 'footer',
    tag: 'footer',
    styles: {
      desktop: {
        backgroundColor: '#030712',
        padding: { top: '48px', right: '48px', bottom: '48px', left: '48px' },
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        border: {
          width: '1px',
          style: 'solid',
          color: '#1f2937',
          radius: '0px',
        },
      },
      mobile: {
        flexDirection: 'column',
        alignItems: 'center',
        gap: '16px',
        padding: { top: '28px', right: '16px', bottom: '28px', left: '16px' },
        textAlign: 'center',
      },
    },
    children: [
      {
        id: 'footer-brand',
        name: 'Footer Brand',
        type: 'paragraph',
        tag: 'p',
        content: '© 2026 AURA STUDIO • London • Tokyo • New York',
        styles: {
          desktop: {
            fontSize: '13px',
            color: '#9ca3af',
            margin: { top: '0px', right: '0px', bottom: '0px', left: '0px' },
          },
          mobile: {
            fontSize: '12px',
          },
        },
      },
      {
        id: 'footer-back-top',
        name: 'Footer Privacy Link',
        type: 'link',
        tag: 'a',
        content: 'Privacy Policy & Terms',
        styles: {
          desktop: {
            fontSize: '13px',
            color: '#6b7280',
            textDecoration: 'none',
            cursor: 'pointer',
          },
          mobile: {
            fontSize: '12px',
          },
        },
      },
    ],
  },
];

export const initialProject: Project = {
  id: 'proj-aura',
  name: 'Aura Studio Site',
  pages: [
    {
      id: 'page-home',
      name: 'Home',
      slug: '/',
      title: 'Aura Studio — Architectural & Digital Design',
      elements: initialElements,
    },
    {
      id: 'page-services',
      name: 'Services',
      slug: '/services',
      title: 'Services — Aura Studio',
      elements: [
        {
          id: 'srv-page-hero',
          name: 'Services Hero Section',
          type: 'section',
          tag: 'section',
          styles: {
            desktop: {
              backgroundColor: '#fafafa',
              padding: { top: '90px', right: '32px', bottom: '90px', left: '32px' },
              textAlign: 'center',
            },
          },
          children: [
            {
              id: 'srv-page-title',
              name: 'Services Page Title',
              type: 'h1',
              tag: 'h1',
              content: 'Our Architectural Services',
              styles: {
                desktop: {
                  fontSize: '44px',
                  fontWeight: '800',
                  color: '#111827',
                  margin: { top: '0px', right: '0px', bottom: '16px', left: '0px' },
                },
              },
            },
            {
              id: 'srv-page-desc',
              name: 'Services Page Description',
              type: 'paragraph',
              tag: 'p',
              content: 'Comprehensive architectural, branding, and digital design solutions.',
              styles: {
                desktop: {
                  fontSize: '18px',
                  color: '#6b7280',
                  maxWidth: '650px',
                  margin: { top: '0px', right: 'auto', bottom: '0px', left: 'auto' },
                },
              },
            },
          ],
        },
      ],
    },
  ],
  activePageId: 'page-home',
};
