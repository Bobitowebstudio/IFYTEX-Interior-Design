export interface CompanySettings {
  name: string;
  tagline: string;
  location: string;
  addressNote: string;
  whatsappNumber: string; // e.g. "09061302309"
  internationalWhatsApp: string; // e.g. "+2349061302309"
  email: string;
  experienceYears: string;
  experienceHeadline: string;
  experienceDescription: string;
  workingHours: string;
  facebookUrl: string;
  instagramUrl: string;
  logoUrl?: string;
  copyrightText: string;
}

export interface HeroSlide {
  id: string;
  title: string;
  subtitle: string;
  description: string;
  primaryBtnText: string;
  primaryBtnLink: string;
  secondaryBtnText: string;
  secondaryBtnLink: string;
  imageUrl: string;
  mobileImageUrl?: string;
  enabled: boolean;
  sortOrder: number;
}

export interface ServiceItem {
  id: string;
  title: string;
  shortDescription: string;
  fullDescription: string;
  imageUrl: string;
  features: string[];
  sortOrder: number;
  published: boolean;
}

export interface CollectionItem {
  id: string;
  name: string;
  category: string;
  description: string;
  imageUrl: string;
  materialStyle?: string;
  indicativePrice?: string;
  availability: 'Custom Made to Measure' | 'In Stock Fabrics' | 'Available on Order';
  sortOrder: number;
  published: boolean;
  featured: boolean;
}

export interface GalleryProject {
  id: string;
  title: string;
  category: string;
  location?: string;
  description?: string;
  coverImageUrl: string;
  beforeImageUrl?: string;
  isPlaceholder: boolean;
  sortOrder: number;
  published: boolean;
  featured: boolean;
}

export interface Testimonial {
  id: string;
  clientName: string;
  clientRoleOrLocation: string;
  quote: string;
  rating: number;
  isPlaceholder: boolean;
  published: boolean;
}

export interface EnquiryRecord {
  id: string;
  type: 'contact' | 'quote';
  fullName: string;
  phone: string;
  email?: string;
  locationArea?: string;
  serviceRequired: string;
  preferredDate?: string;
  budgetRange?: string;
  description: string;
  attachedImageName?: string;
  status: 'new' | 'contacted' | 'in_progress' | 'completed' | 'archived';
  internalNotes?: string;
  createdAt: string;
}

export interface AutomatedRepliesConfig {
  websiteSuccessMessage: string;
  emailAckTemplate: string;
  whatsappPrefilledMessage: string;
  enquiryNotificationEmail: string;
  emailProviderStatus: 'unconfigured' | 'active';
  whatsappApiStatus: 'unconfigured' | 'active';
}

export interface SeoConfig {
  metaTitle: string;
  metaDescription: string;
  ogTitle: string;
  ogDescription: string;
  canonicalUrl: string;
}

export interface VideoSectionConfig {
  enabled: boolean;
  badge: string;
  title: string;
  subtitle: string;
  description: string;
  videoUrl: string;
  posterImageUrl: string;
  durationNote?: string;
  ctaButtonText: string;
  ctaButtonLink: 'contact' | 'whatsapp' | 'curtains-blinds' | 'services';
  secondaryCtaText?: string;
  highlights: string[];
}

export interface ProductItem {
  id: string;
  name: string;
  category: string; // matches ProductCategory.name or custom category
  images: string[]; // array of image paths/URLs
  mainImage: string; // chosen primary display image
  sortOrder: number;
  published: boolean;
  featured?: boolean;
  createdAt?: string;
  updatedAt?: string;
}

export interface ProductCategory {
  id: string;
  name: string;
  slug: string;
  sortOrder: number;
}

export type PageRoute =
  | 'home'
  | 'about'
  | 'services'
  | 'products'
  | 'curtains-blinds'
  | 'gallery'
  | 'contact'
  | 'privacy'
  | 'admin-login'
  | 'admin';
