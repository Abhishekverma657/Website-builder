export type Breakpoint = 'desktop' | 'tablet' | 'mobile';

export type DisplayType = 'block' | 'flex' | 'grid' | 'inline-block' | 'inline' | 'none';
export type FlexDirection = 'row' | 'column' | 'row-reverse' | 'column-reverse';
export type FlexAlign = 'flex-start' | 'center' | 'flex-end' | 'stretch' | 'baseline';
export type FlexJustify = 'flex-start' | 'center' | 'flex-end' | 'space-between' | 'space-around' | 'space-evenly';
export type PositionType = 'static' | 'relative' | 'absolute' | 'fixed' | 'sticky';
export type TextAlign = 'left' | 'center' | 'right' | 'justify';

export interface SpacingValues {
  top: string;
  right: string;
  bottom: string;
  left: string;
}

export interface BorderValues {
  width?: string;
  style?: 'none' | 'solid' | 'dashed' | 'dotted';
  color?: string;
  radius?: string;
  radiusTopLeft?: string;
  radiusTopRight?: string;
  radiusBottomRight?: string;
  radiusBottomLeft?: string;
}

export interface ElementStyles {
  // Layout
  display?: DisplayType;
  flexDirection?: FlexDirection;
  alignItems?: FlexAlign;
  justifyContent?: FlexJustify;
  flexWrap?: 'nowrap' | 'wrap' | 'wrap-reverse';
  gap?: string;
  gridTemplateColumns?: string;

  // Spacing
  margin?: SpacingValues;
  padding?: SpacingValues;

  // Size
  width?: string;
  height?: string;
  minWidth?: string;
  maxWidth?: string;
  minHeight?: string;
  maxHeight?: string;
  overflow?: 'visible' | 'hidden' | 'scroll' | 'auto';
  objectFit?: 'fill' | 'contain' | 'cover' | 'none' | 'scale-down';

  // Position
  position?: PositionType;
  top?: string;
  right?: string;
  bottom?: string;
  left?: string;
  zIndex?: string;

  // Typography
  fontFamily?: string;
  fontSize?: string;
  fontWeight?: string;
  lineHeight?: string;
  color?: string;
  textAlign?: TextAlign;
  textTransform?: 'none' | 'uppercase' | 'lowercase' | 'capitalize';
  textDecoration?: 'none' | 'underline' | 'line-through';
  letterSpacing?: string;
  fontStyle?: 'normal' | 'italic' | 'oblique';

  // Background
  backgroundColor?: string;
  backgroundImage?: string;
  backgroundSize?: 'auto' | 'cover' | 'contain';
  backgroundPosition?: string;

  // Border
  border?: BorderValues;

  // Effects & Micro-animations
  opacity?: string;
  boxShadow?: string;
  cursor?: string;
  transition?: string;
  animation?: string;
  transform?: string;
  transformStyle?: 'flat' | 'preserve-3d';
  perspective?: string;
  filter?: string;
  backdropFilter?: string;
}

export type ElementType =
  // Structure
  | 'section'
  | 'container'
  | 'div'
  | 'grid'
  | 'columns'
  // Typography
  | 'h1'
  | 'h2'
  | 'h3'
  | 'h4'
  | 'paragraph'
  | 'link'
  | 'blockquote'
  // Media
  | 'image'
  | 'video'
  | 'icon'
  // Forms
  | 'form'
  | 'input'
  | 'textarea'
  | 'button'
  // Components
  | 'navbar'
  | 'card'
  | 'badge'
  | 'footer';

export interface BuilderElement {
  id: string;
  name: string;
  type: ElementType;
  tag: string;
  content?: string;
  attributes?: Record<string, string>;
  styles: {
    desktop: ElementStyles;
    tablet?: Partial<ElementStyles>;
    mobile?: Partial<ElementStyles>;
  };
  children?: BuilderElement[];
  isLocked?: boolean;
  isHidden?: boolean;
  linkSettings?: LinkSettings;
}

export type LinkType = 'url' | 'page' | 'section' | 'email' | 'phone';

export interface LinkSettings {
  type: LinkType;
  url?: string;
  pageId?: string;
  sectionId?: string;
  email?: string;
  phone?: string;
  openInNewTab?: boolean;
}

export interface Asset {
  id: string;
  name: string;
  type: 'image' | 'video';
  url: string;
  size?: string;
  createdAt: string;
}

export interface Page {
  id: string;
  name: string;
  slug: string;
  title: string;
  elements: BuilderElement[];
}

export interface Project {
  id: string;
  name: string;
  pages: Page[];
  activePageId: string;
  assets?: Asset[];
  updatedAt?: string;
}
