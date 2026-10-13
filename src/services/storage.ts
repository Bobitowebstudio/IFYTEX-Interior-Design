import {
  CompanySettings,
  HeroSlide,
  ServiceItem,
  CollectionItem,
  GalleryProject,
  Testimonial,
  EnquiryRecord,
  AutomatedRepliesConfig,
  SeoConfig,
  VideoSectionConfig,
  ProductItem,
  ProductCategory,
} from '../types';

// Default generated image assets (crisp, high-definition luxury photography)
const HERO_CURTAINS_IMG = '/src/assets/images/hero_luxury_curtains_hd_1791792231098.jpg';
const HERO_BLINDS_IMG = '/src/assets/images/hero_blinds_interior_hd_1791792246697.jpg';
const SHOWCASE_CURTAINS_IMG = '/src/assets/images/showcase_curtains_detail_1791785758487.jpg';
const SHOWCASE_BLINDS_IMG = '/src/assets/images/showcase_modern_blinds_1791785768916.jpg';
const SHOWCASE_INTERIOR_IMG = '/src/assets/images/showcase_interior_project_1791785780028.jpg';
const ACCESSORIES_IMG = '/src/assets/images/curtain_accessories_hardware_1791789886437.jpg';
const PELMETS_IMG = '/src/assets/images/pelmets_and_tracks_179179900318.jpg';
const INSPIRATION_IMG = '/src/assets/images/editorial_interior_inspiration_1791789912607.jpg';

// Dedicated product catalogue high-resolution photography
const PROD_FABRIC_IMG = '/src/assets/images/curtain_fabric_materials_1791798808365.jpg';
const PROD_TURKISH_IMG = '/src/assets/images/turkish_curtains_fabric_1791798843465.jpg';
const PROD_RODS_TRACKS_IMG = '/src/assets/images/curtain_rods_tracks_1791798867948.jpg';
const PROD_TIEBACKS_IMG = '/src/assets/images/tiebacks_tassels_1791798886315.jpg';
const PROD_ROLLER_BLINDS_IMG = '/src/assets/images/luxury_roller_blinds_1791798905436.jpg';
const PROD_VELVET_IMG = '/src/assets/images/velvet_curtains_swatch_1791798931512.jpg';
const PROD_RINGS_HOOKS_IMG = '/src/assets/images/curtain_rings_hooks_1791798960159.jpg';
const PROD_MOTORISED_IMG = '/src/assets/images/motorised_curtains_1791798993310.jpg';

export const DEFAULT_SETTINGS: CompanySettings = {
  name: 'IFYTEX Interior Design',
  tagline: 'Premium Curtains, Blinds & Interior Solutions',
  location: 'Abuja, Nigeria',
  addressNote: 'Consultations & installations across Abuja (Maitama, Asokoro, Guzape, Wuse 2, Jabi, Gwarinpa, Airport Road & surrounding areas)',
  whatsappNumber: '09061302309',
  internationalWhatsApp: '+2349061302309',
  email: 'IFYTEXINTERIOR7@gmail.com',
  experienceYears: '12+',
  experienceHeadline: 'Over 12 Years of Experience',
  experienceDescription:
    'With more than 12 years of experience in Abuja, we help clients choose and install window treatments and interior solutions that combine style, comfort and practical functionality.',
  workingHours: 'Monday – Saturday: 8:00 AM – 6:30 PM',
  facebookUrl: 'https://facebook.com',
  instagramUrl: 'https://instagram.com',
  logoUrl: '/main_ify_logo-removebg-preview.png',
  copyrightText: '© 2026 IFYTEX Interior Design. All rights reserved. Abuja, Nigeria.',
};

export const DEFAULT_HERO_SLIDES: HeroSlide[] = [
  {
    id: 'slide-1',
    subtitle: 'PREMIUM CURTAINS & WINDOW TREATMENTS IN ABUJA',
    title: 'Transform Your Windows. Elevate Your Space.',
    description:
      'Discover beautifully crafted curtains, premium fabrics, elegant blinds and bespoke window treatments tailored to your space.',
    primaryBtnText: 'Explore Our Collection',
    primaryBtnLink: 'curtains-blinds',
    secondaryBtnText: 'Request a Consultation',
    secondaryBtnLink: 'contact',
    imageUrl: HERO_CURTAINS_IMG,
    mobileImageUrl: HERO_CURTAINS_IMG,
    enabled: true,
    sortOrder: 1,
  },
  {
    id: 'slide-2',
    subtitle: 'DESIGNED AROUND YOUR SPACE',
    title: 'Beautiful Details. Exceptional Interiors.',
    description:
      'From careful measurements and fabric selection to professional installation, we bring your interior vision to life.',
    primaryBtnText: 'Discover Our Services',
    primaryBtnLink: 'services',
    secondaryBtnText: 'Chat on WhatsApp',
    secondaryBtnLink: 'whatsapp',
    imageUrl: HERO_BLINDS_IMG,
    mobileImageUrl: HERO_BLINDS_IMG,
    enabled: true,
    sortOrder: 2,
  },
];

export const DEFAULT_SERVICES: ServiceItem[] = [
  {
    id: 'srv-1',
    title: 'Curtains & Window Treatments',
    shortDescription:
      'Custom floor-to-ceiling drapery, pinch pleats, ripple folds, and sheer-blackout dual track solutions.',
    fullDescription:
      'Our bespoke curtain service combines imported luxury fabrics, precision tailoring, elegant pleat styles (pinch pleat, eyelet, ripple fold, goblet pleat), and custom drapery drops. Designed specifically for your ceiling height and window architecture in Abuja homes and offices.',
    imageUrl: HERO_CURTAINS_IMG,
    features: [
      'Bespoke hand & machine finished drapery',
      'Imported luxury jacquard, velvet & linen fabrics',
      'Sheer & blackout dual-track configurations',
      'Double-height ceiling drop specialists',
    ],
    sortOrder: 1,
    published: true,
  },
  {
    id: 'srv-2',
    title: 'Blinds & Window Coverings',
    shortDescription:
      'Vertical blinds, roller blinds, zebra shades, and venetian blinds for refined residential and executive spaces.',
    fullDescription:
      'From executive boardrooms and corporate headquarters to modern apartments, our blinds offer precise light filtering, durability, and contemporary lines. Options include vertical blinds, venetian blinds, roller blinds, zebra day-and-night blinds, and wooden slat coverings.',
    imageUrl: SHOWCASE_BLINDS_IMG,
    features: [
      'Vertical & Venetian blinds for offices and homes',
      'Zebra dual-shade & roller blind options',
      'Motorized & remote-controlled systems',
      'Easy-to-clean moisture-resistant materials',
    ],
    sortOrder: 2,
    published: true,
  },
  {
    id: 'srv-3',
    title: 'Curtain Accessories & Finishing',
    shortDescription:
      'Designer brass & iron curtain rods, carved finials, architectural brackets, motorized tracks, and luxury tiebacks.',
    fullDescription:
      'Complete your window treatment with heavy-duty architectural hardware. We supply and fit solid brass curtain poles, carved decorative finials, motorized smart glide tracks, magnetic and tassel tiebacks, wand gliders, and silent-gliss systems.',
    imageUrl: ACCESSORIES_IMG,
    features: [
      'Decorative brass, chrome & matte black curtain rods',
      'Carved artistic finials & tieback holdbacks',
      'Motorized electric smart tracks with remote control',
      'Heavy-duty ceiling and wall brackets',
    ],
    sortOrder: 3,
    published: true,
  },
  {
    id: 'srv-4',
    title: 'Imported Curtains & Premium Fabrics',
    shortDescription:
      'Directly imported European and Turkish jacquards, rich velvets, textured damasks, and translucent sheer voiles.',
    fullDescription:
      'Experience the tactile richness of authentic imported fabrics sourced internationally. We maintain a curated library of fabric rolls and swatches with varying opacity, weight, drape fall, and textured finishes for bespoke tailoring in Abuja.',
    imageUrl: SHOWCASE_CURTAINS_IMG,
    features: [
      'Authentic imported Turkish and European textiles',
      'Heavyweight blackout thermal linings',
      'Airy linen-blend & voile sheers',
      'Tactile fabric swatch selection brought to your home',
    ],
    sortOrder: 4,
    published: true,
  },
  {
    id: 'srv-5',
    title: 'Pelmets, Tracks & Curtain Fittings',
    shortDescription:
      'Custom upholstered wooden pelmets with gold trim accents, recessed ceiling track concealment, and valances.',
    fullDescription:
      'Pelmets provide an opulent crown for your window styling while concealing track fixings and preventing top light leakage. We fabricate custom padded and carved pelmets wrapped in coordinated fabrics with gold leaf and contrast trims.',
    imageUrl: PELMETS_IMG,
    features: [
      'Bespoke padded & wooden pelmet fabrication',
      'Metallic gold trim & decorative edging options',
      'Concealed track channels and LED light troughs',
      'Acoustic insulation and complete top light blockage',
    ],
    sortOrder: 5,
    published: true,
  },
  {
    id: 'srv-6',
    title: 'Interior Decoration & Contracting',
    shortDescription:
      'Turnkey interior styling, accent walls, acoustic partitions, and coordinated decorative finishing.',
    fullDescription:
      'Achieve harmony throughout your living or commercial space. We coordinate window treatments with accent walls, lighting ambience, bespoke furniture placement, and architectural trim for a cohesive luxury ambiance.',
    imageUrl: INSPIRATION_IMG,
    features: [
      'Comprehensive interior room styling',
      'Accent wall, molding & trim coordination',
      'Lighting and drape synergy',
      'Turnkey commercial & residential finishing',
    ],
    sortOrder: 6,
    published: true,
  },
  {
    id: 'srv-7',
    title: 'Consultation & Measurement',
    shortDescription:
      'Laser-accurate on-site window measurement and in-person fabric consultations throughout Abuja.',
    fullDescription:
      'Avoid costly guesswork with our on-site measurement service in Abuja. We inspect your window depths, check wall structural anchor points, assess natural daylight orientation, and present tactile fabric swatches right inside your space.',
    imageUrl: SHOWCASE_INTERIOR_IMG,
    features: [
      'Laser-accurate on-site window measurement',
      'Fabric swatch presentation at your location',
      'Aesthetic & functional recommendations',
      'Detailed itemized quotation with zero hidden fees',
    ],
    sortOrder: 7,
    published: true,
  },
  {
    id: 'srv-8',
    title: 'Professional Installation',
    shortDescription:
      'Expert bracket anchoring, laser leveling, track testing, and on-site drapery steaming and dressing.',
    fullDescription:
      'Our in-house installation team uses heavy-duty brackets, secure wall fixings, and laser leveling to hang heavy luxury drapes and track systems securely. Every installation includes professional steaming and drape dressing so your space looks pristine from day one.',
    imageUrl: HERO_BLINDS_IMG,
    features: [
      'Reinforced track and rod wall mounting',
      'Laser alignment for seamless ceiling-to-floor drops',
      'Professional on-site fabric steaming & dressing',
      'Full post-installation clean-up & operation walk-through',
    ],
    sortOrder: 8,
    published: true,
  },
  {
    id: 'srv-9',
    title: 'Custom Interior Solutions',
    shortDescription:
      'Bespoke architectural solutions for double-volume windows, bay angles, curved tracks, and hotel projects.',
    fullDescription:
      'Specialized architectural window treatments for double-height living rooms, arched windows, bay windows, acoustic partitions, and commercial hotel projects across the Federal Capital Territory and nationwide.',
    imageUrl: INSPIRATION_IMG,
    features: [
      'Double-volume high ceiling drape solutions',
      'Bay window and curved arch custom tracks',
      'Commercial hospitality & embassy projects',
      'Bespoke cushion & fabric accessory matching',
    ],
    sortOrder: 9,
    published: true,
  },
];

export const DEFAULT_COLLECTIONS: CollectionItem[] = [
  {
    id: 'col-1',
    name: 'Royal Champagne Ripple Fold Curtains',
    category: 'Custom Curtains',
    description:
      'Floor-to-ceiling flowing drape tailored with champagne silk-blend fabric, featuring smooth ripple-fold glide tracks.',
    imageUrl: HERO_CURTAINS_IMG,
    materialStyle: 'Imported Silk-Blend / Ripple Fold',
    indicativePrice: 'Custom quote based on window dimensions',
    availability: 'Custom Made to Measure',
    sortOrder: 1,
    published: true,
    featured: true,
  },
  {
    id: 'col-2',
    name: 'Bespoke Brass Rods & Sculpted Finials',
    category: 'Curtain Accessories',
    description:
      'Solid architectural brass rods, hand-carved filigree finials, heavy-duty mounting brackets, and matching rope tiebacks.',
    imageUrl: ACCESSORIES_IMG,
    materialStyle: 'Solid Brushed Brass / Architectural Hardware',
    indicativePrice: 'Available in diverse rod lengths & finial styles',
    availability: 'In Stock Fabrics',
    sortOrder: 2,
    published: true,
    featured: true,
  },
  {
    id: 'col-3',
    name: 'Architectural Dual Day & Night Blinds',
    category: 'Vertical & Roller Blinds',
    description:
      'Contemporary striped day-and-night zebra blinds providing effortless privacy regulation and crisp modern lines.',
    imageUrl: SHOWCASE_BLINDS_IMG,
    materialStyle: 'Textured Polymer & Polyester / Dual Roller',
    indicativePrice: 'Available per square meter',
    availability: 'In Stock Fabrics',
    sortOrder: 3,
    published: true,
    featured: true,
  },
  {
    id: 'col-4',
    name: 'Upholstered Gold Trim Pelmet & Velvet Drapes',
    category: 'Pelmets & Fittings',
    description:
      'Custom wooden upholstered pelmet with metallic gold trim edging, framing sheer panels and deep acoustic blackout drapes.',
    imageUrl: PELMETS_IMG,
    materialStyle: 'Padded Velvet & Gold Finish Trim',
    indicativePrice: 'Bespoke custom order',
    availability: 'Custom Made to Measure',
    sortOrder: 4,
    published: true,
    featured: true,
  },
  {
    id: 'col-5',
    name: 'Imported Textured Damask & Jacquard Fabrics',
    category: 'Imported Curtain Fabrics',
    description:
      'Exquisite heavyweight woven jacquard fabrics sourced internationally for distinguished living rooms and master suites.',
    imageUrl: SHOWCASE_CURTAINS_IMG,
    materialStyle: 'Heavyweight Jacquard & Damask',
    indicativePrice: 'Available in diverse rolls and swatches',
    availability: 'In Stock Fabrics',
    sortOrder: 5,
    published: true,
    featured: true,
  },
  {
    id: 'col-6',
    name: 'Smart Motorized Glide Tracks & Wireless Remotes',
    category: 'Curtain Accessories',
    description:
      'Ultra-quiet motorized curtain tracks with wireless remote control, wall switch integration, and timer capabilities.',
    imageUrl: ACCESSORIES_IMG,
    materialStyle: 'Aluminum Heavy-Duty Electric Motor Track',
    indicativePrice: 'Configured to window width',
    availability: 'Available on Order',
    sortOrder: 6,
    published: true,
    featured: true,
  },
  {
    id: 'col-7',
    name: 'Voile & Linen Sheer Elegance Collection',
    category: 'Sheer Curtains',
    description:
      'Ultra-fine, airy translucent sheers that soften intense Abuja sunlight while maintaining external garden views.',
    imageUrl: SHOWCASE_CURTAINS_IMG,
    materialStyle: 'Premium European Linen Voile',
    indicativePrice: 'Cut to order with custom hem weights',
    availability: 'In Stock Fabrics',
    sortOrder: 7,
    published: true,
    featured: false,
  },
  {
    id: 'col-8',
    name: 'Executive Charcoal Venetian & Office Blinds',
    category: 'Office & Venetian Blinds',
    description:
      'Precision aluminum and faux-wood slat blinds designed for corporate offices, embassies, and study suites.',
    imageUrl: SHOWCASE_BLINDS_IMG,
    materialStyle: 'Precision Aluminum / Timber Slat',
    indicativePrice: 'Calculated per window opening',
    availability: 'In Stock Fabrics',
    sortOrder: 8,
    published: true,
    featured: false,
  },
];

export const DEFAULT_GALLERY: GalleryProject[] = [
  {
    id: 'proj-1',
    title: 'Penthouse Salon Drapes — Maitama, Abuja',
    category: 'Luxury Curtains',
    location: 'Maitama, Abuja',
    description:
      'Complete window styling featuring 6-meter champagne curtains with motorized dual blackout and sheer tracks.',
    coverImageUrl: HERO_CURTAINS_IMG,
    isPlaceholder: true,
    sortOrder: 1,
    published: true,
    featured: true,
  },
  {
    id: 'proj-2',
    title: 'Executive Conference Room Blinds — Central Area',
    category: 'Blinds & Window Coverings',
    location: 'Central Business District, Abuja',
    description:
      'Precision motorized venetian and blackout roller blinds installed across a 12-meter corporate glass frontage.',
    coverImageUrl: SHOWCASE_BLINDS_IMG,
    isPlaceholder: true,
    sortOrder: 2,
    published: true,
    featured: true,
  },
  {
    id: 'proj-3',
    title: 'Private Villa Master Bedroom Pelmet — Asokoro',
    category: 'Pelmets & Layered Drapes',
    location: 'Asokoro, Abuja',
    description:
      'Handcrafted architectural pelmet with brushed gold accents, matched with acoustic interlined blackout drapes.',
    coverImageUrl: SHOWCASE_CURTAINS_IMG,
    isPlaceholder: true,
    sortOrder: 3,
    published: true,
    featured: true,
  },
  {
    id: 'proj-4',
    title: 'Modern Residence Living Space — Guzape Hills',
    category: 'Interior Decoration & Finishing',
    location: 'Guzape, Abuja',
    description:
      'Coordinated window treatments, architectural molding, and warm bronze lighting accents.',
    coverImageUrl: SHOWCASE_INTERIOR_IMG,
    isPlaceholder: true,
    sortOrder: 4,
    published: true,
    featured: true,
  },
];

export const DEFAULT_TESTIMONIALS: Testimonial[] = [
  {
    id: 'test-1',
    clientName: 'Alhaji M. Bello',
    clientRoleOrLocation: 'Maitama Residence, Abuja',
    quote:
      'IFYTEX Interior Design handled our entire home window treatments. The curtain fabrics are exceptionally durable and the measurement was spot-on. They finished the installation right on schedule.',
    rating: 5,
    isPlaceholder: true,
    published: true,
  },
  {
    id: 'test-2',
    clientName: 'Dr. (Mrs.) E. Okon',
    clientRoleOrLocation: 'Guzape Villa, Abuja',
    quote:
      'We wanted floor-to-ceiling sheer curtains that softened the Abuja sunlight without making the room dark. Their team advised us on the best fabric options and installed everything cleanly.',
    rating: 5,
    isPlaceholder: true,
    published: true,
  },
  {
    id: 'test-3',
    clientName: 'Engr. K. Danjuma',
    clientRoleOrLocation: 'Corporate Office, Central Area',
    quote:
      'Professional blinds installation for our 3-floor office facility. Smooth mechanisms, neat wiring, and prompt follow-up. Highly recommended for commercial projects.',
    rating: 5,
    isPlaceholder: true,
    published: true,
  },
];

export const DEFAULT_AUTOMATED_REPLIES: AutomatedRepliesConfig = {
  websiteSuccessMessage:
    'Thank you for contacting IFYTEX Interior Design! We have received your enquiry and appreciate your interest in our curtains, blinds and interior solutions. Our team will review your request and get back to you as soon as possible. If your enquiry is urgent, you can contact us directly on WhatsApp.',
  emailAckTemplate:
    'Dear {{name}},\n\nThank you for reaching out to IFYTEX Interior Design! We have safely received your enquiry regarding {{service}} in {{location}}.\n\nOur team in Abuja has over 12 years of craftsmanship and will review your specifications promptly. One of our consultants will contact you shortly.\n\nBest regards,\nIFYTEX Interior Design Team\nAbuja, Nigeria\nWhatsApp: 09061302309',
  whatsappPrefilledMessage:
    'Hello IFYTEX Interior Design, I would like to enquire about your curtains, blinds and interior consultation services in Abuja.',
  enquiryNotificationEmail: 'IFYTEXINTERIOR7@gmail.com',
  emailProviderStatus: 'unconfigured',
  whatsappApiStatus: 'unconfigured',
};

export const DEFAULT_SEO: SeoConfig = {
  metaTitle: 'IFYTEX Interior Design | Premium Curtains, Blinds & Window Treatments Abuja',
  metaDescription:
    'IFYTEX Interior Design specialises in bespoke luxury curtains, imported fabrics, modern window blinds, and complete interior solutions in Abuja, Nigeria with over 12 years of experience.',
  ogTitle: 'IFYTEX Interior Design — Transform Your Space with Timeless Elegance',
  ogDescription:
    'Bespoke curtains, blinds, measurement and professional installation in Abuja, Nigeria by IFYTEX Interior Design. Discover our luxury collections.',
  canonicalUrl: 'https://ifytexinterior.com',
};

export const DEFAULT_VIDEO_SECTION: VideoSectionConfig = {
  enabled: true,
  badge: 'CRAFTSMANSHIP IN MOTION',
  title: 'Experience the Movement, Texture & Elegance of IFYTEX',
  subtitle: 'Bespoke Curtains, Motorized Tracks & Tailored Blinds in Abuja',
  description:
    'Step inside our bespoke craftsmanship. From heavy floor-to-ceiling silk drapes and whisper-quiet motorized tracks to custom blackout solutions for Abuja residences, discover the refined details that make our work exceptional.',
  videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4',
  posterImageUrl: '/src/assets/images/hero_luxury_curtains_hd_1791792231098.jpg',
  durationNote: '01:30 Showcase & Installation Tour',
  ctaButtonText: 'Book a Consultation',
  ctaButtonLink: 'contact',
  secondaryCtaText: 'Chat on WhatsApp',
  highlights: [
    'Hand-finished pleats & reinforced custom drapery drops',
    'Whisper-quiet motorized tracks and automated blinds',
    'Precision on-site laser measurements in Abuja',
    'Acoustic warmth, blackout insulation & imported luxury fabrics',
  ],
};

export const DEFAULT_PRODUCT_CATEGORIES: ProductCategory[] = [
  { id: 'cat-1', name: 'Curtain Materials & Fabrics', slug: 'curtain-materials-fabrics', sortOrder: 1 },
  { id: 'cat-2', name: 'Turkish Curtains & Fabrics', slug: 'turkish-curtains-fabrics', sortOrder: 2 },
  { id: 'cat-3', name: 'Sheer Curtains', slug: 'sheer-curtains', sortOrder: 3 },
  { id: 'cat-4', name: 'Blackout Curtains', slug: 'blackout-curtains', sortOrder: 4 },
  { id: 'cat-5', name: 'Velvet Curtains', slug: 'velvet-curtains', sortOrder: 5 },
  { id: 'cat-6', name: 'Modern Curtain Designs', slug: 'modern-curtain-designs', sortOrder: 6 },
  { id: 'cat-7', name: 'Pelmets & Valances', slug: 'pelmets-valances', sortOrder: 7 },
  { id: 'cat-8', name: 'Roller Blinds', slug: 'roller-blinds', sortOrder: 8 },
  { id: 'cat-9', name: 'Roman Blinds', slug: 'roman-blinds', sortOrder: 9 },
  { id: 'cat-10', name: 'Venetian Blinds', slug: 'venetian-blinds', sortOrder: 10 },
  { id: 'cat-11', name: 'Vertical Blinds', slug: 'vertical-blinds', sortOrder: 11 },
  { id: 'cat-12', name: 'Office Blinds', slug: 'office-blinds', sortOrder: 12 },
  { id: 'cat-13', name: 'Motorised Curtains & Blinds', slug: 'motorised-curtains-blinds', sortOrder: 13 },
  { id: 'cat-14', name: 'Curtain Rods & Tracks', slug: 'curtain-rods-tracks', sortOrder: 14 },
  { id: 'cat-15', name: 'Curtain Rings, Hooks & Brackets', slug: 'curtain-rings-hooks-brackets', sortOrder: 15 },
  { id: 'cat-16', name: 'Tiebacks, Tassels & Decorative Accessories', slug: 'tiebacks-tassels-decorative-accessories', sortOrder: 16 },
  { id: 'cat-17', name: 'Curtain Finials and Other Accessories', slug: 'curtain-finials-accessories', sortOrder: 17 },
  { id: 'cat-18', name: 'Other Products', slug: 'other-products', sortOrder: 18 },
];

export const DEFAULT_PRODUCTS: ProductItem[] = [
  {
    id: 'prod-1',
    name: 'Champagne Silk & Jacquard Curtain Material Rolls',
    category: 'Curtain Materials & Fabrics',
    images: [PROD_FABRIC_IMG],
    mainImage: PROD_FABRIC_IMG,
    sortOrder: 1,
    published: true,
    featured: true,
  },
  {
    id: 'prod-2',
    name: 'Turkish Royal Damask Gold Thread Embroidered Drapery',
    category: 'Turkish Curtains & Fabrics',
    images: [PROD_TURKISH_IMG],
    mainImage: PROD_TURKISH_IMG,
    sortOrder: 2,
    published: true,
    featured: true,
  },
  {
    id: 'prod-3',
    name: 'Whisper-Quiet Smart Motorised Track & Ripple Sheers',
    category: 'Motorised Curtains & Blinds',
    images: [PROD_MOTORISED_IMG],
    mainImage: PROD_MOTORISED_IMG,
    sortOrder: 3,
    published: true,
    featured: true,
  },
  {
    id: 'prod-4',
    name: 'Luxury Velvet Drapery Swatches with Soft Sheen',
    category: 'Velvet Curtains',
    images: [PROD_VELVET_IMG],
    mainImage: PROD_VELVET_IMG,
    sortOrder: 4,
    published: true,
    featured: true,
  },
  {
    id: 'prod-5',
    name: 'Architectural Bronze Cassette Motorized Roller Blind',
    category: 'Roller Blinds',
    images: [PROD_ROLLER_BLINDS_IMG],
    mainImage: PROD_ROLLER_BLINDS_IMG,
    sortOrder: 5,
    published: true,
    featured: true,
  },
  {
    id: 'prod-6',
    name: 'Antique Brass & Champagne Gold Curtain Rod with Royal Finial',
    category: 'Curtain Rods & Tracks',
    images: [PROD_RODS_TRACKS_IMG],
    mainImage: PROD_RODS_TRACKS_IMG,
    sortOrder: 6,
    published: true,
    featured: true,
  },
  {
    id: 'prod-7',
    name: 'Braided Silk Cord Tiebacks with Ornate Crystal Tassels',
    category: 'Tiebacks, Tassels & Decorative Accessories',
    images: [PROD_TIEBACKS_IMG],
    mainImage: PROD_TIEBACKS_IMG,
    sortOrder: 7,
    published: true,
    featured: true,
  },
  {
    id: 'prod-8',
    name: 'Solid Brass Architectural Curtain Rings, Clips & Wall Brackets',
    category: 'Curtain Rings, Hooks & Brackets',
    images: [PROD_RINGS_HOOKS_IMG],
    mainImage: PROD_RINGS_HOOKS_IMG,
    sortOrder: 8,
    published: true,
    featured: true,
  },
  {
    id: 'prod-9',
    name: 'Tailored Upholstered Box Pelmet with Gold Piping Trim',
    category: 'Pelmets & Valances',
    images: [PELMETS_IMG, INSPIRATION_IMG],
    mainImage: PELMETS_IMG,
    sortOrder: 9,
    published: true,
    featured: true,
  },
  {
    id: 'prod-10',
    name: 'Commercial Executive Sunscreen Roller Blinds for Boardrooms',
    category: 'Office Blinds',
    images: [SHOWCASE_BLINDS_IMG],
    mainImage: SHOWCASE_BLINDS_IMG,
    sortOrder: 10,
    published: true,
  },
  {
    id: 'prod-11',
    name: 'Double-Layer Translucent Belgian Sheer Curtains',
    category: 'Sheer Curtains',
    images: [HERO_CURTAINS_IMG],
    mainImage: HERO_CURTAINS_IMG,
    sortOrder: 11,
    published: true,
  },
  {
    id: 'prod-12',
    name: 'Triple-Weave Acoustic Total Blackout Drapery',
    category: 'Blackout Curtains',
    images: [SHOWCASE_CURTAINS_IMG],
    mainImage: SHOWCASE_CURTAINS_IMG,
    sortOrder: 12,
    published: true,
  },
];

// Storage keys
const KEYS = {
  SETTINGS: 'ifytex_company_settings',
  SLIDES: 'ifytex_hero_slides',
  SERVICES: 'ifytex_services',
  COLLECTIONS: 'ifytex_collections',
  PRODUCTS: 'ifytex_products',
  PRODUCT_CATEGORIES: 'ifytex_product_categories',
  GALLERY: 'ifytex_gallery',
  TESTIMONIALS: 'ifytex_testimonials',
  ENQUIRIES: 'ifytex_enquiries',
  AUTOMATED: 'ifytex_automated_replies',
  SEO: 'ifytex_seo',
  VIDEO: 'ifytex_video_section',
  ADMIN_AUTH: 'ifytex_admin_authenticated',
};

const DEFAULT_ENQUIRIES: EnquiryRecord[] = [
  {
    id: 'enq-sample-quote-1',
    type: 'quote',
    fullName: 'Alhaji Aminu Bello',
    phone: '09061302309',
    email: 'aminu.bello@abuja-estates.ng',
    locationArea: 'Maitama, Abuja',
    serviceRequired: 'Curtains & Window Treatments',
    description: 'We need luxury pleated velvet curtains and sheer drapes for a 5-bedroom duplex in Maitama. Please schedule an on-site window measurement.',
    status: 'new',
    createdAt: new Date(Date.now() - 3600000 * 14).toISOString(),
  },
  {
    id: 'enq-sample-contact-1',
    type: 'contact',
    fullName: 'Dr. Ngozi Okonkwo',
    phone: '+234 803 456 7890',
    email: 'ngozi.okonkwo@gmail.com',
    locationArea: 'Asokoro, Abuja',
    serviceRequired: 'General Consultation',
    description: 'Inquiring about imported blackout fabric swatches and consultation availability for our clinic reception.',
    status: 'new',
    createdAt: new Date(Date.now() - 3600000 * 28).toISOString(),
  },
  {
    id: 'enq-sample-quote-2',
    type: 'quote',
    fullName: 'Engr. Farouk Danladi',
    phone: '2348123456789',
    email: 'farouk@danladigroup.com',
    locationArea: 'Guzape, Abuja',
    serviceRequired: 'Blinds & Window Coverings',
    description: 'Require automated motorized roller blinds for living room and executive dining hall.',
    status: 'contacted',
    createdAt: new Date(Date.now() - 3600000 * 52).toISOString(),
  },
  {
    id: 'enq-sample-contact-2',
    type: 'contact',
    fullName: 'Mrs. Halima Yusuf',
    phone: 'None provided',
    email: 'halima.yusuf@outlook.com',
    locationArea: 'Wuse 2, Abuja',
    serviceRequired: 'Fabric Swatch Selection & Inquiry',
    description: 'Please email me your latest catalogue for luxury sheer fabrics and curtain accessories.',
    status: 'new',
    createdAt: new Date(Date.now() - 3600000 * 76).toISOString(),
  },
];

// Storage helper functions
export const storage = {
  getSettings(): CompanySettings {
    try {
      const data = localStorage.getItem(KEYS.SETTINGS);
      return data ? { ...DEFAULT_SETTINGS, ...JSON.parse(data) } : DEFAULT_SETTINGS;
    } catch {
      return DEFAULT_SETTINGS;
    }
  },
  saveSettings(settings: CompanySettings): void {
    localStorage.setItem(KEYS.SETTINGS, JSON.stringify(settings));
  },

  getHeroSlides(): HeroSlide[] {
    try {
      const data = localStorage.getItem(KEYS.SLIDES);
      if (!data) return DEFAULT_HERO_SLIDES;
      const parsed = JSON.parse(data);
      if (!Array.isArray(parsed) || parsed.length < 2) return DEFAULT_HERO_SLIDES;
      if (!parsed[0]?.title || !parsed[1]?.title) return DEFAULT_HERO_SLIDES;
      return parsed.map((slide, idx) => {
        if (!slide.imageUrl || slide.imageUrl.includes('hero_luxury_curtains_1791785736600')) {
          return { ...slide, imageUrl: idx === 0 ? HERO_CURTAINS_IMG : HERO_BLINDS_IMG };
        }
        if (slide.imageUrl && slide.imageUrl.includes('hero_blinds_interior_1791785747669')) {
          return { ...slide, imageUrl: HERO_BLINDS_IMG };
        }
        return slide;
      });
    } catch {
      return DEFAULT_HERO_SLIDES;
    }
  },
  saveHeroSlides(slides: HeroSlide[]): void {
    localStorage.setItem(KEYS.SLIDES, JSON.stringify(slides));
  },

  getServices(): ServiceItem[] {
    try {
      const data = localStorage.getItem(KEYS.SERVICES);
      return data ? JSON.parse(data) : DEFAULT_SERVICES;
    } catch {
      return DEFAULT_SERVICES;
    }
  },
  saveServices(services: ServiceItem[]): void {
    localStorage.setItem(KEYS.SERVICES, JSON.stringify(services));
  },

  getCollections(): CollectionItem[] {
    try {
      const data = localStorage.getItem(KEYS.COLLECTIONS);
      return data ? JSON.parse(data) : DEFAULT_COLLECTIONS;
    } catch {
      return DEFAULT_COLLECTIONS;
    }
  },
  saveCollections(collections: CollectionItem[]): void {
    localStorage.setItem(KEYS.COLLECTIONS, JSON.stringify(collections));
  },

  getGallery(): GalleryProject[] {
    try {
      const data = localStorage.getItem(KEYS.GALLERY);
      return data ? JSON.parse(data) : DEFAULT_GALLERY;
    } catch {
      return DEFAULT_GALLERY;
    }
  },
  saveGallery(gallery: GalleryProject[]): void {
    localStorage.setItem(KEYS.GALLERY, JSON.stringify(gallery));
  },

  getTestimonials(): Testimonial[] {
    try {
      const data = localStorage.getItem(KEYS.TESTIMONIALS);
      return data ? JSON.parse(data) : DEFAULT_TESTIMONIALS;
    } catch {
      return DEFAULT_TESTIMONIALS;
    }
  },
  saveTestimonials(testimonials: Testimonial[]): void {
    localStorage.setItem(KEYS.TESTIMONIALS, JSON.stringify(testimonials));
  },

  getEnquiries(): EnquiryRecord[] {
    try {
      const data = localStorage.getItem(KEYS.ENQUIRIES);
      return data ? JSON.parse(data) : DEFAULT_ENQUIRIES;
    } catch {
      return DEFAULT_ENQUIRIES;
    }
  },
  addEnquiry(enquiry: Omit<EnquiryRecord, 'id' | 'createdAt' | 'status'>): EnquiryRecord {
    const records = this.getEnquiries();
    const newRecord: EnquiryRecord = {
      ...enquiry,
      id: 'enq-' + Date.now() + '-' + Math.random().toString(36).substring(2, 6),
      status: 'new',
      createdAt: new Date().toISOString(),
    };
    records.unshift(newRecord);
    localStorage.setItem(KEYS.ENQUIRIES, JSON.stringify(records));
    return newRecord;
  },
  updateEnquiry(id: string, updates: Partial<EnquiryRecord>): void {
    const records = this.getEnquiries().map((r) => (r.id === id ? { ...r, ...updates } : r));
    localStorage.setItem(KEYS.ENQUIRIES, JSON.stringify(records));
  },
  deleteEnquiry(id: string): void {
    const records = this.getEnquiries().filter((r) => r.id !== id);
    localStorage.setItem(KEYS.ENQUIRIES, JSON.stringify(records));
  },

  getAutomatedReplies(): AutomatedRepliesConfig {
    try {
      const data = localStorage.getItem(KEYS.AUTOMATED);
      return data ? { ...DEFAULT_AUTOMATED_REPLIES, ...JSON.parse(data) } : DEFAULT_AUTOMATED_REPLIES;
    } catch {
      return DEFAULT_AUTOMATED_REPLIES;
    }
  },
  saveAutomatedReplies(config: AutomatedRepliesConfig): void {
    localStorage.setItem(KEYS.AUTOMATED, JSON.stringify(config));
  },

  getSeo(): SeoConfig {
    try {
      const data = localStorage.getItem(KEYS.SEO);
      return data ? { ...DEFAULT_SEO, ...JSON.parse(data) } : DEFAULT_SEO;
    } catch {
      return DEFAULT_SEO;
    }
  },
  saveSeo(seo: SeoConfig): void {
    localStorage.setItem(KEYS.SEO, JSON.stringify(seo));
  },

  getVideoSection(): VideoSectionConfig {
    try {
      const data = localStorage.getItem(KEYS.VIDEO);
      return data ? { ...DEFAULT_VIDEO_SECTION, ...JSON.parse(data) } : DEFAULT_VIDEO_SECTION;
    } catch {
      return DEFAULT_VIDEO_SECTION;
    }
  },
  saveVideoSection(video: VideoSectionConfig): void {
    localStorage.setItem(KEYS.VIDEO, JSON.stringify(video));
  },

  getProducts(): ProductItem[] {
    try {
      const data = localStorage.getItem(KEYS.PRODUCTS);
      return data ? JSON.parse(data) : DEFAULT_PRODUCTS;
    } catch {
      return DEFAULT_PRODUCTS;
    }
  },
  saveProducts(products: ProductItem[]): void {
    localStorage.setItem(KEYS.PRODUCTS, JSON.stringify(products));
  },

  getProductCategories(): ProductCategory[] {
    try {
      const data = localStorage.getItem(KEYS.PRODUCT_CATEGORIES);
      return data ? JSON.parse(data) : DEFAULT_PRODUCT_CATEGORIES;
    } catch {
      return DEFAULT_PRODUCT_CATEGORIES;
    }
  },
  saveProductCategories(categories: ProductCategory[]): void {
    localStorage.setItem(KEYS.PRODUCT_CATEGORIES, JSON.stringify(categories));
  },

  isAdminAuthenticated(): boolean {
    return localStorage.getItem(KEYS.ADMIN_AUTH) === 'true';
  },
  setAdminAuthenticated(auth: boolean): void {
    if (auth) {
      localStorage.setItem(KEYS.ADMIN_AUTH, 'true');
    } else {
      localStorage.removeItem(KEYS.ADMIN_AUTH);
    }
  },

  /**
   * Generates Supabase PostgreSQL DDL migration script for production database setup
   */
  generateSupabaseSqlMigration(): string {
    return `-- ============================================================
-- IFYTEX Interior Design — Supabase PostgreSQL Production Schema & RLS
-- Abuja, Nigeria | Curtains, Blinds & Interior Solutions
-- ============================================================

-- 1. COMPANY SETTINGS TABLE
CREATE TABLE IF NOT EXISTS public.company_settings (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL DEFAULT 'IFYTEX Interior Design',
  tagline TEXT NOT NULL,
  location TEXT NOT NULL DEFAULT 'Abuja, Nigeria',
  address_note TEXT,
  whatsapp_number TEXT NOT NULL DEFAULT '09061302309',
  international_whatsapp TEXT NOT NULL DEFAULT '+2349061302309',
  email TEXT NOT NULL DEFAULT 'IFYTEXINTERIOR7@gmail.com',
  experience_years TEXT NOT NULL DEFAULT '12+',
  experience_headline TEXT NOT NULL DEFAULT 'Over 12 Years of Experience',
  experience_description TEXT NOT NULL,
  working_hours TEXT NOT NULL,
  facebook_url TEXT,
  instagram_url TEXT,
  logo_url TEXT,
  copyright_text TEXT NOT NULL,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now())
);

-- 2. HOMEPAGE HERO SLIDES TABLE
CREATE TABLE IF NOT EXISTS public.hero_slides (
  id TEXT PRIMARY KEY,
  title TEXT NOT NULL,
  subtitle TEXT NOT NULL,
  description TEXT NOT NULL,
  primary_btn_text TEXT NOT NULL,
  primary_btn_link TEXT NOT NULL,
  secondary_btn_text TEXT NOT NULL,
  secondary_btn_link TEXT NOT NULL,
  image_url TEXT NOT NULL,
  mobile_image_url TEXT,
  enabled BOOLEAN DEFAULT true,
  sort_order INT NOT NULL DEFAULT 1,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now())
);

-- 3. SERVICES TABLE
CREATE TABLE IF NOT EXISTS public.services (
  id TEXT PRIMARY KEY,
  title TEXT NOT NULL,
  short_description TEXT NOT NULL,
  full_description TEXT NOT NULL,
  image_url TEXT NOT NULL,
  features TEXT[] DEFAULT '{}',
  sort_order INT NOT NULL DEFAULT 1,
  published BOOLEAN DEFAULT true,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now())
);

-- 4. CURTAINS & BLINDS COLLECTIONS TABLE
CREATE TABLE IF NOT EXISTS public.collections (
  id TEXT PRIMARY KEY,
  name TEXT NOT NULL,
  category TEXT NOT NULL,
  description TEXT NOT NULL,
  image_url TEXT NOT NULL,
  material_style TEXT,
  indicative_price TEXT,
  availability TEXT DEFAULT 'Custom Made to Measure',
  sort_order INT NOT NULL DEFAULT 1,
  published BOOLEAN DEFAULT true,
  featured BOOLEAN DEFAULT false,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now())
);

-- 5. GALLERY PROJECTS TABLE
CREATE TABLE IF NOT EXISTS public.gallery_projects (
  id TEXT PRIMARY KEY,
  title TEXT NOT NULL,
  category TEXT NOT NULL,
  location TEXT,
  description TEXT,
  cover_image_url TEXT NOT NULL,
  before_image_url TEXT,
  is_placeholder BOOLEAN DEFAULT false,
  sort_order INT NOT NULL DEFAULT 1,
  published BOOLEAN DEFAULT true,
  featured BOOLEAN DEFAULT false,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now())
);

-- 6. TESTIMONIALS TABLE
CREATE TABLE IF NOT EXISTS public.testimonials (
  id TEXT PRIMARY KEY,
  client_name TEXT NOT NULL,
  client_role_or_location TEXT NOT NULL,
  quote TEXT NOT NULL,
  rating INT DEFAULT 5,
  is_placeholder BOOLEAN DEFAULT false,
  published BOOLEAN DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now())
);

-- 7. CUSTOMER ENQUIRIES & QUOTE REQUESTS (PRIVATE)
CREATE TABLE IF NOT EXISTS public.enquiries (
  id TEXT PRIMARY KEY,
  type TEXT NOT NULL CHECK (type IN ('contact', 'quote')),
  full_name TEXT NOT NULL,
  phone TEXT NOT NULL,
  email TEXT,
  location_area TEXT,
  service_required TEXT NOT NULL,
  preferred_date TEXT,
  budget_range TEXT,
  description TEXT NOT NULL,
  attached_image_name TEXT,
  status TEXT NOT NULL DEFAULT 'new' CHECK (status IN ('new', 'contacted', 'in_progress', 'completed', 'archived')),
  internal_notes TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now())
);

-- 8. PRODUCT CATEGORIES TABLE
CREATE TABLE IF NOT EXISTS public.product_categories (
  id TEXT PRIMARY KEY,
  name TEXT NOT NULL UNIQUE,
  slug TEXT NOT NULL UNIQUE,
  sort_order INT NOT NULL DEFAULT 1,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now())
);

-- 9. DEDICATED PRODUCTS CATALOGUE TABLE (NO PRICES — DESIGN & SHOWCASE FOCUSED)
CREATE TABLE IF NOT EXISTS public.products (
  id TEXT PRIMARY KEY,
  name TEXT NOT NULL,
  category TEXT NOT NULL,
  images TEXT[] NOT NULL DEFAULT '{}',
  main_image TEXT NOT NULL,
  sort_order INT NOT NULL DEFAULT 1,
  published BOOLEAN DEFAULT true,
  featured BOOLEAN DEFAULT false,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now())
);

-- 10. AUTOMATED REPLIES & INTEGRATIONS
CREATE TABLE IF NOT EXISTS public.automated_replies (
  id TEXT PRIMARY KEY DEFAULT 'primary',
  website_success_message TEXT NOT NULL,
  email_ack_template TEXT NOT NULL,
  whatsapp_prefilled_message TEXT NOT NULL,
  enquiry_notification_email TEXT NOT NULL,
  email_provider_status TEXT DEFAULT 'unconfigured',
  whatsapp_api_status TEXT DEFAULT 'unconfigured',
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now())
);

-- ROW LEVEL SECURITY (RLS) POLICIES
ALTER TABLE public.company_settings ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.hero_slides ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.services ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.collections ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.product_categories ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.products ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.gallery_projects ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.testimonials ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.enquiries ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.automated_replies ENABLE ROW LEVEL SECURITY;

-- Public can READ published public content
CREATE POLICY "Public can read company settings" ON public.company_settings FOR SELECT USING (true);
CREATE POLICY "Public can read published slides" ON public.hero_slides FOR SELECT USING (enabled = true);
CREATE POLICY "Public can read published services" ON public.services FOR SELECT USING (published = true);
CREATE POLICY "Public can read published collections" ON public.collections FOR SELECT USING (published = true);
CREATE POLICY "Public can read product categories" ON public.product_categories FOR SELECT USING (true);
CREATE POLICY "Public can read published products" ON public.products FOR SELECT USING (published = true);
CREATE POLICY "Public can read published gallery" ON public.gallery_projects FOR SELECT USING (published = true);
CREATE POLICY "Public can read published testimonials" ON public.testimonials FOR SELECT USING (published = true);

-- Public can INSERT enquiries (submitting quote/contact)
CREATE POLICY "Public can insert enquiries" ON public.enquiries FOR INSERT WITH CHECK (true);

-- Authenticated admins can perform ALL operations
CREATE POLICY "Admins full access on settings" ON public.company_settings FOR ALL TO authenticated USING (true);
CREATE POLICY "Admins full access on slides" ON public.hero_slides FOR ALL TO authenticated USING (true);
CREATE POLICY "Admins full access on services" ON public.services FOR ALL TO authenticated USING (true);
CREATE POLICY "Admins full access on collections" ON public.collections FOR ALL TO authenticated USING (true);
CREATE POLICY "Admins full access on product categories" ON public.product_categories FOR ALL TO authenticated USING (true);
CREATE POLICY "Admins full access on products" ON public.products FOR ALL TO authenticated USING (true);
CREATE POLICY "Admins full access on gallery" ON public.gallery_projects FOR ALL TO authenticated USING (true);
CREATE POLICY "Admins full access on testimonials" ON public.testimonials FOR ALL TO authenticated USING (true);
CREATE POLICY "Admins full access on enquiries" ON public.enquiries FOR ALL TO authenticated USING (true);
CREATE POLICY "Admins full access on automated_replies" ON public.automated_replies FOR ALL TO authenticated USING (true);
`;
  },
};
