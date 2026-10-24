import { WebsiteTemplate } from './types';
import { buildTemplateFromBlueprint } from './templateEngine';
import { TEMPLATES_BLUEPRINTS } from './catalogPart1';
import { TEMPLATES_BLUEPRINTS_PART2 } from './catalogPart2';
import { TEMPLATES_BLUEPRINTS_PART3 } from './catalogPart3';
import { TEMPLATES_BLUEPRINTS_PART4 } from './catalogPart4';
import { TEMPLATES_BLUEPRINTS_PART5 } from './catalogPart5';

// All 52 blueprints across 12 distinct industries
const ALL_BLUEPRINTS = [
  ...TEMPLATES_BLUEPRINTS,
  ...TEMPLATES_BLUEPRINTS_PART2,
  ...TEMPLATES_BLUEPRINTS_PART3,
  ...TEMPLATES_BLUEPRINTS_PART4,
  ...TEMPLATES_BLUEPRINTS_PART5,
];

// Compile to full WebsiteTemplate objects with interactive BuilderElement trees
export const FULL_TEMPLATES_CATALOG: WebsiteTemplate[] = ALL_BLUEPRINTS.map(buildTemplateFromBlueprint);

// Export categories list for filter tabs
export const TEMPLATE_CATEGORIES = [
  'All',
  'E-Commerce & Retail',
  'SaaS & AI Technology',
  'Agency & Studio',
  'Portfolio & Personal',
  'Restaurant & Hospitality',
  'Fitness & Health',
  'Real Estate & Architecture',
  'Medical & Healthcare',
  'Education & Learning',
  'Events & Entertainment',
  'Fashion & Beauty',
  'Finance & Consulting',
] as const;

export * from './types';
export * from './templateEngine';
