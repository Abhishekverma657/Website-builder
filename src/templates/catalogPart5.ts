import { TemplateBlueprint } from './templateEngine';

export const TEMPLATES_BLUEPRINTS_PART5: TemplateBlueprint[] = [
  // =======================================================
  // CATEGORY 1: E-COMMERCE & RETAIL (+2 templates -> total 7)
  // ==========================================
  {
    id: 'ecom-botanical-tea',
    name: 'Komorebi Tea Atelier',
    category: 'E-Commerce & Retail',
    badge: 'CEREMONIAL MATCHA',
    tagline: 'Single-estate ceremonial Uji matcha & hand-carved bamboo chasen whisks',
    description: 'Serene luxury tea e-commerce storefront with harvesting provenance, preparation temperature guides, and gift sets.',
    heroImage: 'https://images.unsplash.com/photo-1576092768241-dec231879fc3?auto=format&fit=crop&w=1200&q=80',
    previewThumbnail: 'https://images.unsplash.com/photo-1576092768241-dec231879fc3?auto=format&fit=crop&w=600&q=80',
    accentColor: '#10b981',
    darkTheme: false,
    navLinks: ['Ceremonial Matcha', 'Loose Leaf', 'Teaware', 'Ritual Guide'],
    hero: {
      badgeText: 'First Spring Flush 2026',
      headline: 'Vibrant Green Ceremonial Matcha Sourced Directly from Uji, Kyoto',
      highlightWord: 'Ceremonial',
      subheadline: 'Stoneground slowly in dark granite mills from shade-grown tencha leaves. Incomparable sweetness, deep umami, and zero bitterness.',
      ctaPrimary: 'Shop Spring Harvest Tin ($44)',
      ctaSecondary: 'Read Preparation Guide',
    },
    features: [
      { title: 'Granite Stone Ground', description: 'Milled at a deliberate 40 grams per hour to avoid heat degradation and retain rich chlorophyll.', tag: '🍵' },
      { title: 'Single-Cultivar Asahi', description: 'Prized Japanese cultivar celebrated for bright emerald color and velvet finish on the palate.', tag: '🌿' },
      { title: 'Handmade Bamboo Whisk', description: 'Traditional 100-prong chasen whisks split and carved from natural aged bamboo stalks.', tag: '🎋' },
    ],
    cta: {
      headline: 'Begin Your Morning Mindful Matcha Ceremony',
      subheadline: 'Free shipping on orders over $50. Shipped cold-packed in nitrogen-sealed vacuum tins.',
      buttonText: 'Order Ceremonial Starter Kit',
    },
  },
  {
    id: 'ecom-leather',
    name: 'Atelier Tanner Goods',
    category: 'E-Commerce & Retail',
    badge: 'HERITAGE LEATHER',
    tagline: 'Vegetable-tanned full-grain leather weekenders & brass hardware goods',
    description: 'Heritage leather luggage and everyday carry store with patina aging timeline, saddle stitch demonstrations, and lifetime guarantee.',
    heroImage: 'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?auto=format&fit=crop&w=1200&q=80',
    previewThumbnail: 'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?auto=format&fit=crop&w=600&q=80',
    accentColor: '#14b8a6',
    darkTheme: true,
    navLinks: ['Duffels', 'Bifold Wallets', 'Field Bags', 'Lifetime Guarantee'],
    hero: {
      badgeText: 'Hand-Cut & Saddle Stitched',
      headline: 'Heirloom Leather Goods Built to Journey With You for Decades',
      highlightWord: 'Heirloom',
      subheadline: 'Crafted from 6oz full-grain Tuscan vegetable-tanned steer hide that develops a rich, singular honey patina with every mile traveled.',
      ctaPrimary: 'Shop Voyager Weekender — $480',
      ctaSecondary: 'Discover Our Provenance',
    },
    features: [
      { title: 'Full-Grain Tuscan Steer', description: 'Tanned slowly using tree bark tannins in pit drums. Natural grain with zero artificial synthetic coatings.', tag: '🐂' },
      { title: 'Solid Cast Brass Hardware', description: 'Heavyweight brass buckles, rivets, and YKK Excella zippers that never snap or rust.', tag: '⚙️' },
      { title: 'Waxed Thread Saddle Stitch', description: 'Hand-sewn with double needles so that even if one thread should break, the seam never unspools.', tag: '🧵' },
    ],
    cta: {
      headline: 'Carry an Heirloom You Will Proudly Pass Down',
      subheadline: 'Complimentary heat-stamped monogramming on all weekender orders this week.',
      buttonText: 'Personalize Your Weekender',
    },
  },

  // =======================================================
  // CATEGORY 2: SAAS & AI TECHNOLOGY (+2 templates -> total 7)
  // ==========================================
  {
    id: 'saas-cloudpulse',
    name: 'CloudPulse Observability',
    category: 'SaaS & AI Technology',
    badge: 'DISTRIBUTED TRACING',
    tagline: 'High-cardinality OpenTelemetry metrics, logs, and microservice tracing',
    description: 'DevOps observability suite landing page with instant Flame graph previews, p99 latency alerts, and Kubernetes auto-discovery.',
    heroImage: 'https://images.unsplash.com/photo-1504384308090-c894fdcc538d?auto=format&fit=crop&w=1200&q=80',
    previewThumbnail: 'https://images.unsplash.com/photo-1504384308090-c894fdcc538d?auto=format&fit=crop&w=600&q=80',
    accentColor: '#10b981',
    darkTheme: true,
    navLinks: ['Tracing', 'Log Streams', 'Integrations', 'Pricing', 'Docs'],
    hero: {
      badgeText: 'Native OpenTelemetry Backend',
      headline: 'Pinpoint Production Anomalies in Milliseconds Across 1,000 Microservices',
      highlightWord: 'Milliseconds',
      subheadline: 'Stop debugging fragmented logs. CloudPulse correlates traces, memory profiles, and serverless exceptions into unified Flame graphs.',
      ctaPrimary: 'Start Ingesting Free (50GB)',
      ctaSecondary: 'Explore Live Interactive Sandbox',
    },
    features: [
      { title: 'Sub-Second Flame Graphs', description: 'Trace every async promise and slow database lock across multi-region Kubernetes nodes.', tag: '🔥' },
      { title: 'Zero-Indexing Log Storage', description: 'Slash your Datadog or Splunk bill by 70% with high-throughput S3 Parquet object storage.', tag: '💾' },
      { title: 'AI Root-Cause Summary', description: 'Automatically group 10,000 cascading alerts into one clear Slack summary pointing to the culprit git commit.', tag: '🧠' },
    ],
    pricingOrServices: {
      heading: 'Usage-Based Ingestion Pricing',
      subheading: 'No host limits or synthetic query taxes. Pay only for what you ingest.',
      tiers: [
        { name: 'Developer', price: '$0', frequency: '/ month', description: 'Free tier for small clusters', features: ['50GB Monthly Ingestion', '7-Day Log Retention', 'Up to 5 Team Members', 'Slack Webhook Alerts'], buttonText: 'Deploy Free Agent' },
        { name: 'Pro Scale', price: '$149', frequency: '/ month', description: 'For fast-scaling engineering teams', highlight: true, features: ['1TB Monthly Ingestion included', '30-Day Full Trace Retention', 'Unlimited Team Seats', 'Automated Root-Cause AI', 'PagerDuty & OpsGenie Sync'], buttonText: 'Start Pro Trial' },
        { name: 'Enterprise', price: '$699', frequency: '/ month', description: 'For high-frequency multi-cloud workloads', features: ['Custom Multi-TB Volume Discounts', '90-Day Audit Log Retention', 'Dedicated Customer Engineer', 'Private VPC Ingestion Gateway'], buttonText: 'Contact Cloud Architect' },
      ],
    },
    cta: {
      headline: 'Know Exactly What’s Happening in Production Before Customers Tweet',
      subheadline: 'One-line Helm install. Compatible with all existing OpenTelemetry SDKs.',
      buttonText: 'Install OpenTelemetry Collector',
    },
  },
  {
    id: 'saas-agentic',
    name: 'Agentic Workflows',
    category: 'SaaS & AI Technology',
    badge: 'AUTONOMOUS AGENTS',
    tagline: 'Multi-agent orchestration platform for enterprise browser automation',
    description: 'AI automation builder landing page showing multi-agent swarm workflows, human-in-the-loop approvals, and secure credential sandboxing.',
    heroImage: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=1200&q=80',
    previewThumbnail: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=600&q=80',
    accentColor: '#14b8a6',
    darkTheme: true,
    navLinks: ['Platform', 'Use Cases', 'Agent Swarms', 'Security', 'Pricing'],
    hero: {
      badgeText: 'Autonomous Business Operations',
      headline: 'Deploy Autonomous AI Agents That Navigate Complex Web Apps Like Humans',
      highlightWord: 'Autonomous',
      subheadline: 'Connect AI agents to your CRM, ERP, and internal web portals. Let them handle invoice reconciliations, customer onboarding, and data entry.',
      ctaPrimary: 'Build Your First Agent in 3 Mins',
      ctaSecondary: 'Watch Agent Video Demo',
    },
    features: [
      { title: 'Computer Vision Navigation', description: 'Agents read web UI layouts, click buttons, solve two-factor authentication, and type with precision.', tag: '👁️' },
      { title: 'Human-in-the-Loop Safeguards', description: 'Critical transactions require 1-click Slack approvals before final submission to safeguard compliance.', tag: '🛡️' },
      { title: 'Encrypted Credential Vault', description: 'Zero plaintext exposure. Passwords and API tokens execute in isolated micro-VM sandboxes.', tag: '🔐' },
    ],
    cta: {
      headline: 'Automate 80% of Repetitive Operations This Month',
      subheadline: 'Trusted by operations teams at fintechs, logistics giants, and insurance firms.',
      buttonText: 'Start Free Sandbox Trial',
    },
  },

  // =======================================================
  // CATEGORY 3: AGENCY & STUDIO (+2 templates -> total 7)
  // ==========================================
  {
    id: 'agency-chroma',
    name: 'Chroma Type Foundry',
    category: 'Agency & Studio',
    badge: 'BESPOKE TYPOGRAPHY',
    tagline: 'Custom type design, variable fonts, and brand wordmarks',
    description: 'Type foundry and lettering agency website with interactive variable font weight/slant sliders, glyph specimen tables, and license checkout.',
    heroImage: 'https://images.unsplash.com/photo-1541701494587-cb58502866ab?auto=format&fit=crop&w=1200&q=80',
    previewThumbnail: 'https://images.unsplash.com/photo-1541701494587-cb58502866ab?auto=format&fit=crop&w=600&q=80',
    accentColor: '#10b981',
    darkTheme: true,
    navLinks: ['Typefaces', 'Variable Fonts', 'Custom Projects', 'Licensing'],
    hero: {
      badgeText: 'Independent Type Studio',
      headline: 'Distinctive Variable Typefaces That Give Brands an Unmistakable Voice',
      highlightWord: 'Distinctive',
      subheadline: 'Crafting expressive display serifs, technical sans-serifs, and bespoke corporate type families tested across 120 global languages.',
      ctaPrimary: 'Explore Font Specimen Catalog',
      ctaSecondary: 'Commission Custom Font Family',
    },
    features: [
      { title: 'Infinite Variable Axes', description: 'Smooth real-time adjustments from hairline thin to ultra black weight, optical sizing, and slant.', tag: '🔤' },
      { title: 'Extensive Pan-European Latin', description: 'Full support for Cyrillic, Greek, Vietnamese, and extended Latin diacritics.', tag: '🌐' },
      { title: 'OpenType Contextual Alternates', description: 'Intelligent ligatures, stylistic sets, and tabular figures that render flawlessly in web CSS.', tag: '✨' },
    ],
    showcaseSection: {
      heading: 'Flagship Type Specimens',
      subheading: 'Used in publications and brand systems worldwide',
      items: [
        { title: 'Solaria Display Variable', subtitle: 'Sculptural high-contrast serif with 9 weights and optical italics', image: 'https://images.unsplash.com/photo-1507238691740-187a5b1d37b8?auto=format&fit=crop&w=600&q=80', priceOrMetric: 'From $80' },
        { title: 'Kinetik Mono Grotesk', subtitle: 'Technical monospace typeface engineered for coding and financial UI', image: 'https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?auto=format&fit=crop&w=600&q=80', priceOrMetric: 'From $65' },
        { title: 'Verve Sans Pro', subtitle: 'Humanist geometric sans-serif family with 18 weights and alternates', image: 'https://images.unsplash.com/photo-1490481651871-ab68de25d43d?auto=format&fit=crop&w=600&q=80', priceOrMetric: 'From $95' },
      ],
    },
    cta: {
      headline: 'Need a Proprietary Typeface for Your Global Brand?',
      subheadline: 'We partner with creative directors and branding agencies to sculpt unforgettable letters.',
      buttonText: 'Inquire About Custom Typeface',
    },
  },
  {
    id: 'agency-voxel',
    name: 'Voxel Immersive Games',
    category: 'Agency & Studio',
    badge: 'INDIE GAME LAB',
    tagline: 'Atmospheric narrative adventures, stylized visuals & original soundtracks',
    description: 'Indie video game studio landing page with Steam wishlist buttons, cinematic trailer modals, developer diary blog, and press kit.',
    heroImage: 'https://images.unsplash.com/photo-1538481199705-c710c4e965fc?auto=format&fit=crop&w=1200&q=80',
    previewThumbnail: 'https://images.unsplash.com/photo-1538481199705-c710c4e965fc?auto=format&fit=crop&w=600&q=80',
    accentColor: '#10b981',
    darkTheme: true,
    navLinks: ['Games', 'Dev Diary', 'Soundtrack', 'Press Kit', 'Community'],
    hero: {
      badgeText: 'Coming to Steam & PlayStation 5',
      headline: 'Hand-Crafted Atmospheric Worlds That Leave an Indelible Emotional Mark',
      highlightWord: 'Emotional',
      subheadline: 'We craft story-driven indie games featuring hand-painted environments, dynamic weather systems, and evocative orchestral scores.',
      ctaPrimary: 'Wishlist on Steam Now',
      ctaSecondary: 'Watch Official Announcement Trailer',
    },
    features: [
      { title: 'Hand-Painted 3D Aesthetics', description: 'Unique cel-shaded artistic direction that feels like a living Studio Ghibli watercolor painting.', tag: '🎨' },
      { title: 'Dynamic Weather & Day/Night', description: 'Volumetric mist, thunderstorms, and solar angles that influence puzzles and NPC behaviors.', tag: '⛈️' },
      { title: 'Live Orchestral Scoring', description: 'Original compositions recorded with the Prague Philharmonic Orchestra available on vinyl.', tag: '🎻' },
    ],
    cta: {
      headline: 'Join 140,000 Adventurers on Our Steam Community',
      subheadline: 'Wishlisting helps our independent studio directly. Beta playtests starting next month.',
      buttonText: 'Wishlist on Steam Today',
    },
  },

  // =======================================================
  // CATEGORY 4: PORTFOLIO & PERSONAL (+1 template -> total 5)
  // ==========================================
  {
    id: 'port-director',
    name: 'Julian Sterling Filmmaker',
    category: 'Portfolio & Personal',
    badge: 'CINEMATOGRAPHER & DIRECTOR',
    tagline: 'Documentary features, commercial narrative, and 35mm film craft',
    description: 'Cinematographer and commercial film director portfolio featuring 2.39:1 widescreen video stills, gear list, and film festival laurels.',
    heroImage: 'https://images.unsplash.com/photo-1536440136628-849c177e76a1?auto=format&fit=crop&w=1200&q=80',
    previewThumbnail: 'https://images.unsplash.com/photo-1536440136628-849c177e76a1?auto=format&fit=crop&w=600&q=80',
    accentColor: '#10b981',
    darkTheme: true,
    navLinks: ['Narrative', 'Commercial', 'Documentary', 'Gear', 'Contact'],
    hero: {
      badgeText: 'Sundance Official Selection 2025',
      headline: 'Translating Human Vulnerability onto Celluloid & Anamorphic Lenses',
      highlightWord: 'Celluloid',
      subheadline: 'London & Berlin-based Director of Photography shooting for A24, BBC Films, and international commercial brands on Arri Alexa 35 & 35mm Kodak film.',
      ctaPrimary: 'Watch 2026 Narrative Reel (2:10)',
      ctaSecondary: 'Review Commercial Portfolio',
    },
    features: [
      { title: 'Anamorphic Glass Heritage', description: 'Vintage Kowa and Hawk anamorphic lenses delivering organic flares and cinematic bokeh.', tag: '🎥' },
      { title: 'Global Remote Production', description: 'Extensive on-location experience across 24 countries, remote deserts, and high Arctic environments.', tag: '🌍' },
      { title: 'Color Grade & Look-Dev', description: 'Custom in-camera LUTs developed in DaVinci Resolve replicating classic 1970s film stocks.', tag: '🎞️' },
    ],
    cta: {
      headline: 'Now Reading Scripts for 2027 Feature & Commercial Production',
      subheadline: 'Represented by Independent Talent Group London & UTA Los Angeles.',
      buttonText: 'Get in Touch with Agency',
    },
  },

  // =======================================================
  // CATEGORY 5: RESTAURANT & HOSPITALITY (+1 template -> total 5)
  // ==========================================
  {
    id: 'rest-sourdough',
    name: 'Wildflour Sourdough Bakery',
    category: 'Restaurant & Hospitality',
    badge: 'NATURAL FERMENTATION',
    tagline: '100-year mother sourdough culture, stoneground heritage flour & laminated pastries',
    description: 'Charming neighborhood bakery website with daily bread schedule, pastry preorder drawer, bread baking masterclasses, and wholesale portal.',
    heroImage: 'https://images.unsplash.com/photo-1509440159596-0249088772ff?auto=format&fit=crop&w=1200&q=80',
    previewThumbnail: 'https://images.unsplash.com/photo-1509440159596-0249088772ff?auto=format&fit=crop&w=600&q=80',
    accentColor: '#10b981',
    darkTheme: false,
    navLinks: ['Bake Schedule', 'Preorder Pastries', 'Flour Mill', 'Baking Classes'],
    hero: {
      badgeText: 'Baked Fresh at 05:00 Daily',
      headline: 'Crusty, Long-Fermented Artisan Breads Made with Heirloom Organic Grains',
      highlightWord: 'Artisan',
      subheadline: 'Slow 36-hour cold fermentation gives our sourdough loaves deep flavor, open custardy crumb, and easy gut digestibility.',
      ctaPrimary: 'Preorder Weekend Pastry Box',
      ctaSecondary: 'View Daily Bread Schedule',
    },
    features: [
      { title: '36-Hour Wild Fermentation', description: 'Naturally leavened using our century-old starter. Zero commercial baker’s yeast, zero additives.', tag: '🥖' },
      { title: 'Stoneground In-House Flour', description: 'Whole heritage rye, spelt, and Red Fife wheat ground daily between Austrian granite stones.', tag: '🌾' },
      { title: 'Hand-Laminated Croissants', description: 'Normandy cultured butter layered 27 times for crisp, honeycomb layers that shatter delicately.', tag: '🥐' },
    ],
    cta: {
      headline: 'Pick Up Warm Loaves Fresh from the Brick Hearth',
      subheadline: 'Preorders close at 20:00 for next morning bakery counter collection.',
      buttonText: 'Reserve Your Loaf Online',
    },
  },

  // =======================================================
  // CATEGORY 6: FITNESS & HEALTH (+1 template -> total 5)
  // ==========================================
  {
    id: 'fit-swim',
    name: 'AquaFlow Performance Aquatics',
    category: 'Fitness & Health',
    badge: 'OLYMPIC SWIM ACADEMY',
    tagline: 'Hydrodynamic stroke mechanics, high-speed underwater video analysis & master squads',
    description: 'High-performance aquatics center website with lane booking calendar, swim squad schedules, underwater stroke cameras, and private lessons.',
    heroImage: 'https://images.unsplash.com/photo-1519315901367-f34ff9154487?auto=format&fit=crop&w=1200&q=80',
    previewThumbnail: 'https://images.unsplash.com/photo-1519315901367-f34ff9154487?auto=format&fit=crop&w=600&q=80',
    accentColor: '#14b8a6',
    darkTheme: true,
    navLinks: ['Squads', 'Video Stroke Lab', 'Coaches', 'Lane Booking', 'Membership'],
    hero: {
      badgeText: '50m Olympic Heated Facility',
      headline: 'Refine Your Stroke Efficiency and Dominate Open-Water & Triathlon Swims',
      highlightWord: 'Efficiency',
      subheadline: 'Multi-angle high-speed underwater 4K video stroke capture, lactate threshold testing, and squads led by Olympic national coaches.',
      ctaPrimary: 'Book Underwater Stroke Analysis',
      ctaSecondary: 'View Master Squad Schedule',
    },
    features: [
      { title: 'Underwater 4K Motion Capture', description: 'Subsurface cameras tracking catch angle, pull phase, and hip rotation in real-time.', tag: '🏊' },
      { title: 'UV-Ozone Purified Water', description: 'Gentle on skin and lungs. 99% chemical-free water treatment at constant 27.5°C competition temp.', tag: '💧' },
      { title: 'Periodized Triathlon Programs', description: 'Pacing protocols and endurance interval training designed to shave minutes off your 70.3 or Ironman leg.', tag: '⏱️' },
    ],
    cta: {
      headline: 'Swim Faster, Smoother, and with Effortless Power',
      subheadline: 'Free initial 30-minute stroke evaluation for new adult squad members.',
      buttonText: 'Schedule Free Stroke Assessment',
    },
  },

  // =======================================================
  // CATEGORY 7: REAL ESTATE & ARCHITECTURE (+1 template -> total 5)
  // ==========================================
  {
    id: 'real-mountain',
    name: 'AlpenHaus Chalet Collective',
    category: 'Real Estate & Architecture',
    badge: 'ALPINE SKI CHALETS',
    tagline: 'Ski-in ski-out timber chalets, private saunas & helicopter powder transfers',
    description: 'Swiss and French alpine chalet sales and luxury winter rentals with piste maps, private chef menus, and heated ski room amenities.',
    heroImage: 'https://images.unsplash.com/photo-1517581177682-a085bb7ffb15?auto=format&fit=crop&w=1200&q=80',
    previewThumbnail: 'https://images.unsplash.com/photo-1517581177682-a085bb7ffb15?auto=format&fit=crop&w=600&q=80',
    accentColor: '#10b981',
    darkTheme: true,
    navLinks: ['Chalets', 'Ski-In Ski-Out', 'Private Chef', 'Winter Availability'],
    hero: {
      badgeText: 'Zermatt • Verbier • Chamonix',
      headline: 'Monumental Larch Timber Chalets Framed by Snow-Capped Alpine Peaks',
      highlightWord: 'Larch',
      subheadline: 'Direct private ski slope access, wood-burning stone hearths, outdoor cedar hot tubs gazing at the Matterhorn, and full-time chalet staff.',
      ctaPrimary: 'Explore Winter Chalet Portfolio',
      ctaSecondary: 'Download Ski Resort Dossier',
    },
    features: [
      { title: 'Direct Ski-In / Ski-Out Access', description: 'Step straight from your heated boot room onto world-class groomed powder runs.', tag: '⛷️' },
      { title: 'Dedicated Michelin Trained Chef', description: 'Six-course bespoke evening dinners paired with grand cru Swiss and French regional vintages.', tag: '🍷' },
      { title: 'Private Wellness & Hot Tub', description: 'Finnish dry sauna, cold bucket showers, and hot tubs heated to 39°C overlooking pine forests.', tag: '🧖' },
    ],
    cta: {
      headline: 'Experience Winter in Its Most Magical, Unhurried Form',
      subheadline: 'Peak Christmas and February half-term weeks booking rapidly.',
      buttonText: 'Check Chalet Availability',
    },
  },

  // =======================================================
  // CATEGORY 8: MEDICAL & HEALTHCARE (+1 template -> total 5)
  // ==========================================
  {
    id: 'med-physio',
    name: 'Kinetic Movement Physiotherapy',
    category: 'Medical & Healthcare',
    badge: 'SPORTS PHYSIOTHERAPY',
    tagline: 'Biomechanical gait analysis, dry needling & post-op orthopedic rehab',
    description: 'Evidence-based sports physiotherapy and rehabilitation clinic with exercise prescription videos, therapist credentials, and instant booking.',
    heroImage: 'https://images.unsplash.com/photo-1576091160550-2173dba999ef?auto=format&fit=crop&w=1200&q=80',
    previewThumbnail: 'https://images.unsplash.com/photo-1576091160550-2173dba999ef?auto=format&fit=crop&w=600&q=80',
    accentColor: '#10b981',
    darkTheme: false,
    navLinks: ['Treatments', 'Running Gait Lab', 'Our Physios', 'Book Initial Assessment'],
    hero: {
      badgeText: 'Trusted by Elite Marathoners & Pro Athletes',
      headline: 'Overcome Chronic Pain and Return to Peak Athletic Form with Precision Rehab',
      highlightWord: 'Precision',
      subheadline: 'We don’t just treat symptoms with temporary heat packs. We uncover the root biomechanical imbalances through objective strength testing.',
      ctaPrimary: 'Book Initial 60-Min Assessment',
      ctaSecondary: 'Explore Running Gait Lab',
    },
    features: [
      { title: 'Force Plate Biomechanics', description: 'Measure left-to-right asymmetries and eccentric landing forces down to the single Newton.', tag: '📊' },
      { title: 'Dry Needling & Manual Therapy', description: 'Release stubborn neuromuscular trigger points and restore restricted joint mobility safely.', tag: '📍' },
      { title: 'Custom App Exercise Programs', description: 'HD video rehab exercises prescribed directly to your phone with tracked repetition progressions.', tag: '📱' },
    ],
    cta: {
      headline: 'Don’t Let Injury Keep You on the Sidelines Any Longer',
      subheadline: 'Covered by private health insurance and workers’ compensation claims.',
      buttonText: 'Claim Your Physio Appointment',
    },
  },

  // =======================================================
  // CATEGORY 9: EDUCATION & LEARNING (+1 template -> total 5)
  // ==========================================
  {
    id: 'edu-ceramics',
    name: 'Clay & Flame Ceramic School',
    category: 'Education & Learning',
    badge: 'POTTERY & SCULPTURE',
    tagline: 'Wheel-throwing, raku firing & glaze formulation workshops',
    description: 'Pottery studio and community art center website with weekend workshop bookings, studio membership hours, and glaze chemistry courses.',
    heroImage: 'https://images.unsplash.com/photo-1565193566173-7a0ee3dbe261?auto=format&fit=crop&w=1200&q=80',
    previewThumbnail: 'https://images.unsplash.com/photo-1565193566173-7a0ee3dbe261?auto=format&fit=crop&w=600&q=80',
    accentColor: '#10b981',
    darkTheme: false,
    navLinks: ['Workshops', '6-Week Courses', 'Studio Access', 'Gallery'],
    hero: {
      badgeText: 'Beginners Welcome • No Experience Needed',
      headline: 'Discover the Meditative Joy of Shaping Earth on the Potter’s Wheel',
      highlightWord: 'Meditative',
      subheadline: 'Sunlit industrial studios equipped with 24 Shimpo whisper-drive wheels, electric kilns, and master potters guiding you from clay centering to finished glaze.',
      ctaPrimary: 'Book Weekend Intro Workshop ($85)',
      ctaSecondary: 'Explore 6-Week Master Courses',
    },
    features: [
      { title: 'Individual Shimpo Wheel', description: 'Every student receives their own dedicated wheel, clay, and sculpting tools for the entire session.', tag: '🏺' },
      { title: 'High-Fire Stoneware Glazes', description: 'Over 30 custom in-house food-safe glazes formulated with non-toxic earth minerals and oxides.', tag: '🎨' },
      { title: 'All Materials & Firings Included', description: 'No hidden kiln fees. We trim, bisque-fire, glaze, and finish fire all of your creations.', tag: '🔥' },
    ],
    cta: {
      headline: 'Unplug from Screens and Reconnect with Tactile Hands-On Creation',
      subheadline: 'Weekend workshop spaces are limited to 12 participants per session.',
      buttonText: 'Reserve Your Pottery Wheel',
    },
  },

  // =======================================================
  // CATEGORY 10: EVENTS & ENTERTAINMENT (+1 template -> total 5)
  // ==========================================
  {
    id: 'event-orchestra',
    name: 'Sinfonia Neo Classical Symphony',
    category: 'Events & Entertainment',
    badge: 'CONTEMPORARY CONCERT HALL',
    tagline: 'Modern film scores, ambient minimalism & orchestral crossover concerts',
    description: 'Contemporary symphony orchestra website with interactive hall seating chart, season ticket subscriptions, and audio previews.',
    heroImage: 'https://images.unsplash.com/photo-1465847899084-d164df4dedc6?auto=format&fit=crop&w=1200&q=80',
    previewThumbnail: 'https://images.unsplash.com/photo-1465847899084-d164df4dedc6?auto=format&fit=crop&w=600&q=80',
    accentColor: '#10b981',
    darkTheme: true,
    navLinks: ['Season 26', 'Concerts', 'Seating Chart', 'Recordings', 'Subscribe'],
    hero: {
      badgeText: 'Acoustic Architectural Hall',
      headline: 'The Grandeur of a 70-Piece Symphony Performing Modern Cinematic Masterpieces',
      highlightWord: 'Symphony',
      subheadline: 'Performing the works of Hans Zimmer, Max Richter, Philip Glass, and Jóhann Jóhannsson with spatial acoustic acoustic purity.',
      ctaPrimary: 'Choose Concert & Seats',
      ctaSecondary: 'Listen to Season Highlights',
    },
    features: [
      { title: '70-Piece Resident Orchestra', description: 'Virtuoso musicians led by renowned guest conductors from the Berlin and London philharmonics.', tag: '🎻' },
      { title: 'Nagata Acoustic Engineering', description: 'World-renowned vineyard-style concert hall with zero dead acoustic spots and warm cedar resonance.', tag: '🏛️' },
      { title: 'Curated Intermission Wines', description: 'Enjoy sommelier-selected champagne and local artisan cheeses in our soaring glass atrium.', tag: '🥂' },
    ],
    cta: {
      headline: 'Immerse Yourself in an Evening of Towering Sonic Splendor',
      subheadline: 'Season subscriber packages save 25% across all 8 premier concerts.',
      buttonText: 'Reserve Concert Tickets',
    },
  },

  // =======================================================
  // CATEGORY 11: FASHION & BEAUTY (+1 template -> total 5)
  // ==========================================
  {
    id: 'fash-fragrance',
    name: 'Norden Parfums Maison',
    category: 'Fashion & Beauty',
    badge: 'NICHE ARTISANAL PARFUM',
    tagline: 'Wild birch bark, sub-arctic moss, and smoky vetiver extrait de parfum',
    description: 'Niche luxury perfumery storefront with fragrance pyramid breakdowns (top, heart, base notes), discovery sample sets, and perfume quiz.',
    heroImage: 'https://images.unsplash.com/photo-1592945403244-b3fbafd7f539?auto=format&fit=crop&w=1200&q=80',
    previewThumbnail: 'https://images.unsplash.com/photo-1592945403244-b3fbafd7f539?auto=format&fit=crop&w=600&q=80',
    accentColor: '#10b981',
    darkTheme: true,
    navLinks: ['Extraits', 'Discovery Set', 'Scent Finder', 'Maison Story'],
    hero: {
      badgeText: 'High Concentration Extrait (30% Oils)',
      headline: 'Evocative Olfactory Landscapes Inspired by the Untamed Scandinavian Wilderness',
      highlightWord: 'Olfactory',
      subheadline: 'Formulated in Grasse, France using rare natural resins, wild juniper berries, and aged orris root for extraordinary all-day projection.',
      ctaPrimary: 'Order 5-Scent Discovery Set ($35)',
      ctaSecondary: 'Take Fragrance Finder Quiz',
    },
    features: [
      { title: '30% Extrait Concentration', description: 'The highest concentration in perfumery, lasting 14+ hours on skin with evolving complexity.', tag: '✨' },
      { title: 'Ethically Sourced Botanicals', description: 'Wild harvested lichen and pine needle absolutes blended with sustainable sandalwood.', tag: '🌲' },
      { title: 'Discovery Box Credit Voucher', description: 'The full cost of your discovery sample kit is credited towards any 50ml or 100ml flacon.', tag: '🎁' },
    ],
    cta: {
      headline: 'Find Your Signature Scent Without Guesswork',
      subheadline: 'Includes five 2ml glass spray vials and personal blotter cards delivered to your door.',
      buttonText: 'Order Discovery Set Today',
    },
  },

  // =======================================================
  // CATEGORY 12: FINANCE & CONSULTING (+1 template -> total 5)
  // ==========================================
  {
    id: 'fin-angel',
    name: 'VentureCraft Syndicate',
    category: 'Finance & Consulting',
    badge: 'ANGEL SYNDICATE & SEED FUND',
    tagline: 'Backing contrarian technical founders at pre-seed and seed stage',
    description: 'Venture capital syndicate platform with active deals pipeline, portfolio companies, founder testimonials, and LP investor onboarding.',
    heroImage: 'https://images.unsplash.com/photo-1559526324-4b87b5e36e44?auto=format&fit=crop&w=1200&q=80',
    previewThumbnail: 'https://images.unsplash.com/photo-1559526324-4b87b5e36e44?auto=format&fit=crop&w=600&q=80',
    accentColor: '#14b8a6',
    darkTheme: true,
    navLinks: ['Portfolio', 'Thesis', 'Apply for Funding', 'LP Syndicate'],
    hero: {
      badgeText: '$65M Deployed Across 80+ Startups',
      headline: 'First Capital in the Corner of Ambitious Founders Building Frontier Tech',
      highlightWord: 'Founders',
      subheadline: 'We write $250k to $1.5M first checks in robotics, applied AI, space tech, and biotech. Decisions made in days with founder-friendly clean SAFEs.',
      ctaPrimary: 'Pitch Your Startup',
      ctaSecondary: 'Join LP Angel Syndicate',
    },
    features: [
      { title: '48-Hour Decision Cadence', description: 'Zero endless partner meetings. You speak directly with decision-makers who respect your time.', tag: '⚡' },
      { title: 'Operator First Network', description: 'Immediate hands-on help with your first 5 engineering hires, SOC2 audits, and Series A leads.', tag: '🤝' },
      { title: 'Follow-On Reserves', description: 'We reserve capital to lead or participate in your subsequent Series A and Series B rounds.', tag: '📈' },
    ],
    cta: {
      headline: 'Building Something Crazy That Traditional VCs Deem Too Risky?',
      subheadline: 'We love contrarian ideas that look like toys until they conquer the world.',
      buttonText: 'Submit Your Pitch Deck',
    },
  },
];
