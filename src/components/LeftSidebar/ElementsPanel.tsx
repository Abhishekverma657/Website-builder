import React from 'react';
import {
  Layout,
  Columns,
  Grid,
  Heading1,
  Heading2,
  Heading3,
  AlignLeft,
  Link as LinkIcon,
  Quote,
  Image,
  Video,
  CheckSquare,
  FormInput,
  MousePointerClick,
  Navigation,
  CreditCard,
  Tag,
  Square,
  Compass,
  Sparkles,
  HelpCircle,
  DollarSign,
  Mail,
  Rotate3d,
  Layers,
} from 'lucide-react';
import { ElementType } from '../../types/builder';
import { useBuilder } from '../../context/BuilderContext';

interface ElementItem {
  type: ElementType;
  label: string;
  icon: React.ComponentType<{ className?: string }>;
  description: string;
}

interface ElementCategory {
  category: string;
  items: ElementItem[];
}

const CATEGORIES: ElementCategory[] = [
  {
    category: 'Structure',
    items: [
      { type: 'section', label: 'Section', icon: Layout, description: 'Full-width top-level layout block' },
      { type: 'container', label: 'Container', icon: Square, description: 'Centered content wrapper' },
      { type: 'grid', label: 'Grid', icon: Grid, description: 'CSS 3-column auto grid' },
      { type: 'columns', label: 'Columns', icon: Columns, description: 'Flexbox multi-column layout' },
      { type: 'div', label: 'Div Block', icon: Square, description: 'Generic container element' },
    ],
  },
  {
    category: 'Typography',
    items: [
      { type: 'h1', label: 'Heading 1', icon: Heading1, description: 'Primary page hero title' },
      { type: 'h2', label: 'Heading 2', icon: Heading2, description: 'Section title' },
      { type: 'h3', label: 'Heading 3', icon: Heading3, description: 'Card / subsection heading' },
      { type: 'paragraph', label: 'Paragraph', icon: AlignLeft, description: 'Body copy paragraph' },
      { type: 'link', label: 'Text Link', icon: LinkIcon, description: 'Hyperlink to page or URL' },
      { type: 'blockquote', label: 'Quote', icon: Quote, description: 'Testimonial / callout quote' },
    ],
  },
  {
    category: 'Media',
    items: [
      { type: 'image', label: 'Image', icon: Image, description: 'Responsive image asset' },
      { type: 'video', label: 'Video', icon: Video, description: 'HTML5 responsive video' },
    ],
  },
  {
    category: 'Interactive & Forms',
    items: [
      { type: 'button', label: 'Button', icon: MousePointerClick, description: 'Clickable call-to-action' },
      { type: 'badge', label: 'Badge', icon: Tag, description: 'Status pill badge' },
      { type: 'form', label: 'Form Wrapper', icon: CheckSquare, description: 'HTML input collection' },
      { type: 'input', label: 'Input Field', icon: FormInput, description: 'Text / email input' },
    ],
  },
  {
    category: 'Components',
    items: [
      { type: 'navbar', label: 'Navbar', icon: Navigation, description: 'Header with logo and menu' },
      { type: 'card', label: 'Card', icon: CreditCard, description: 'Boxed feature or product card' },
      { type: 'footer', label: 'Footer', icon: Compass, description: 'Bottom navigation and copyright' },
    ],
  },
];

export const ElementsPanel: React.FC = () => {
  const { addElement, addPrebuiltSection, selectedElementId } = useBuilder();

  const handleAdd = (type: ElementType) => {
    addElement(type, selectedElementId);
  };

  return (
    <div className="h-full flex flex-col bg-[#171c26] select-none overflow-y-auto custom-scrollbar">
      <div className="p-3 border-b border-[#242c38]">
        <h3 className="text-xs font-bold text-gray-200 uppercase tracking-wider">Add Elements</h3>
        <p className="text-[11px] text-gray-400 mt-0.5">Click to insert into canvas or selected block</p>
      </div>

      <div className="p-3 space-y-4">
        {/* Prebuilt Sections */}
        <div>
          <div className="text-[10px] font-bold text-emerald-400 uppercase tracking-wider mb-2 flex items-center gap-1">
            <Sparkles className="w-3 h-3" />
            <span>Prebuilt Sections (1-Click)</span>
          </div>
          <div className="space-y-1.5">
            {[
              {
                key: 'pricing' as const,
                label: 'Pricing Table (3 Tiers)',
                desc: '3-tier pricing cards with features & CTA',
                icon: DollarSign,
              },
              {
                key: '3d-hero' as const,
                label: '3D Spatial Animated Hero',
                desc: 'Floating 3D glass card & pulse glow heading',
                icon: Rotate3d,
              },
              {
                key: '3d-cards' as const,
                label: '3D Interactive Tilt Cards',
                desc: '3-column cards with spatial depth & tilt',
                icon: Layers,
              },
              {
                key: 'faq' as const,
                label: 'FAQ Accordion',
                desc: 'Collapsible questions & answers',
                icon: HelpCircle,
              },
              {
                key: 'contact' as const,
                label: 'Contact Form Section',
                desc: 'Form with name, email, message & submit',
                icon: Mail,
              },
            ].map((s) => {
              const Icon = s.icon;
              return (
                <button
                  key={s.key}
                  onClick={() => addPrebuiltSection(s.key)}
                  className="w-full flex items-center gap-2.5 p-2 rounded-lg bg-[#141a24] hover:bg-[#1e2736] border border-[#263242] hover:border-emerald-500 text-left transition group"
                >
                  <div className="p-1.5 rounded-md bg-emerald-600/10 text-emerald-400 group-hover:bg-emerald-600 group-hover:text-white transition">
                    <Icon className="w-4 h-4" />
                  </div>
                  <div>
                    <div className="text-xs font-semibold text-gray-200 group-hover:text-white">
                      {s.label}
                    </div>
                    <div className="text-[10px] text-gray-400">{s.desc}</div>
                  </div>
                </button>
              );
            })}
          </div>
        </div>

        {/* Categories */}
        {CATEGORIES.map((cat) => (
          <div key={cat.category}>
            <div className="text-[10px] font-semibold text-gray-400 uppercase tracking-wider mb-2">
              {cat.category}
            </div>
            <div className="grid grid-cols-2 gap-1.5">
              {cat.items.map((item) => {
                const Icon = item.icon;
                return (
                  <button
                    key={item.type}
                    onClick={() => handleAdd(item.type)}
                    className="flex flex-col items-center justify-center p-2.5 rounded-lg bg-[#1f2633] hover:bg-[#283243] hover:border-emerald-500/50 border border-[#2b3546] text-gray-300 hover:text-white transition group text-center"
                    title={item.description}
                  >
                    <Icon className="w-5 h-5 text-gray-400 group-hover:text-emerald-400 transition mb-1.5" />
                    <span className="text-[11px] font-medium leading-tight">{item.label}</span>
                  </button>
                );
              })}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
