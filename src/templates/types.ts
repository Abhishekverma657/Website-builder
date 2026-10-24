import { BuilderElement } from '../types/builder';

export type TemplateCategory =
  | 'E-Commerce & Retail'
  | 'SaaS & AI Technology'
  | 'Agency & Studio'
  | 'Portfolio & Personal'
  | 'Restaurant & Hospitality'
  | 'Fitness & Health'
  | 'Real Estate & Architecture'
  | 'Medical & Healthcare'
  | 'Education & Learning'
  | 'Events & Entertainment'
  | 'Fashion & Beauty'
  | 'Finance & Consulting';

export interface TemplateMetadata {
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
  sectionsCount: number;
  features: string[];
}

export interface WebsiteTemplate extends TemplateMetadata {
  elements: BuilderElement[];
}
