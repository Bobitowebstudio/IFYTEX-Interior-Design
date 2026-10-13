import React, { useState } from 'react';
import {
  PageRoute,
  CompanySettings,
  HeroSlide,
  ServiceItem,
  CollectionItem,
  ProductItem,
  ProductCategory,
  GalleryProject,
  Testimonial,
  EnquiryRecord,
  AutomatedRepliesConfig,
  SeoConfig,
  VideoSectionConfig,
} from '../../types';
import { storage } from '../../services/storage';
import { BrandLogo } from '../../components/common/BrandLogo';
import {
  validateAndNormalizeNigerianPhone,
  generateEnquiryWhatsAppReplyMessage,
  createWhatsAppChatUrl,
  IFYTEX_BUSINESS_WHATSAPP_RAW,
  IFYTEX_BUSINESS_WHATSAPP_INTL,
} from '../../services/whatsapp';

const WhatsAppIcon: React.FC<{ className?: string }> = ({ className = 'w-4 h-4' }) => (
  <svg className={className} viewBox="0 0 24 24" fill="currentColor">
    <path d="M17.507 14.307l-.009.075c-.239.987-1.18 1.802-2.193 1.902-.656.065-1.503-.024-3.072-.676-2.008-.834-3.513-2.613-4.468-4.108-.946-1.482-1.04-2.457-.962-2.923.109-.643.529-1.229 1.053-1.492.315-.158.64-.202.909-.202.261 0 .493.011.666.027.202.019.417.061.593.473.197.461.674 1.638.733 1.758.059.12.099.261.02.418-.079.157-.118.256-.236.395-.118.139-.249.311-.355.417-.119.119-.243.249-.105.486.138.237.615 1.014 1.32 1.642.908.809 1.674 1.06 1.912 1.178.238.118.377.099.516-.06.139-.158.594-.693.752-.931.158-.238.317-.198.535-.118.218.079 1.385.653 1.623.772.238.119.396.178.455.277.059.099.059.574-.18 1.561zM12.04 2C6.518 2 2.03 6.476 2.03 11.986c0 1.954.567 3.779 1.554 5.327L2 22l4.832-1.557c1.482.88 3.208 1.388 5.208 1.388 5.522 0 10.01-4.476 10.01-9.986C22.05 6.476 17.562 2 12.04 2z" />
  </svg>
);

import {
  LayoutDashboard,
  Building,
  Sliders,
  FileText,
  Briefcase,
  Layers,
  ShoppingBag,
  Image as ImageIcon,
  MessageSquare,
  Mail,
  FileCheck,
  Share2,
  Bell,
  Search,
  Compass,
  Upload,
  Lock,
  LogOut,
  ExternalLink,
  Save,
  Trash2,
  Edit2,
  Plus,
  CheckCircle2,
  Copy,
  Clock,
  Eye,
  X,
  Video,
  Play,
  ArrowUp,
  ArrowDown,
  Sparkles,
} from 'lucide-react';

interface AdminDashboardProps {
  onNavigate: (page: PageRoute) => void;
  onLogout: () => void;
  settings: CompanySettings;
  onUpdateSettings: (s: CompanySettings) => void;
  slides: HeroSlide[];
  onUpdateSlides: (sl: HeroSlide[]) => void;
  services: ServiceItem[];
  onUpdateServices: (srv: ServiceItem[]) => void;
  collections: CollectionItem[];
  onUpdateCollections: (col: CollectionItem[]) => void;
  products?: ProductItem[];
  onUpdateProducts?: (p: ProductItem[]) => void;
  categories?: ProductCategory[];
  onUpdateCategories?: (c: ProductCategory[]) => void;
  gallery: GalleryProject[];
  onUpdateGallery: (gal: GalleryProject[]) => void;
  testimonials: Testimonial[];
  onUpdateTestimonials: (t: Testimonial[]) => void;
  automatedReplies: AutomatedRepliesConfig;
  onUpdateAutomatedReplies: (ar: AutomatedRepliesConfig) => void;
  seo: SeoConfig;
  onUpdateSeo: (seo: SeoConfig) => void;
  videoSection?: VideoSectionConfig;
  onUpdateVideoSection?: (v: VideoSectionConfig) => void;
  onShowToast: (title: string, description?: string, type?: 'success' | 'error' | 'info') => void;
}

type AdminTab =
  | 'overview'
  | 'company'
  | 'slides'
  | 'about'
  | 'services'
  | 'products'
  | 'collections'
  | 'gallery'
  | 'testimonials'
  | 'enquiries'
  | 'quotes'
  | 'social'
  | 'automated'
  | 'seo'
  | 'nav-footer'
  | 'video'
  | 'media'
  | 'security';

export const AdminDashboard: React.FC<AdminDashboardProps> = ({
  onNavigate,
  onLogout,
  settings,
  onUpdateSettings,
  slides,
  onUpdateSlides,
  services,
  onUpdateServices,
  collections,
  onUpdateCollections,
  products = [],
  onUpdateProducts,
  categories = [],
  onUpdateCategories,
  gallery,
  onUpdateGallery,
  testimonials,
  onUpdateTestimonials,
  automatedReplies,
  onUpdateAutomatedReplies,
  seo,
  onUpdateSeo,
  videoSection,
  onUpdateVideoSection,
  onShowToast,
}) => {
  const [activeTab, setActiveTab] = useState<AdminTab>('overview');

  // Local editable copies of states
  const [localSettings, setLocalSettings] = useState<CompanySettings>({ ...settings });
  const [localSlides, setLocalSlides] = useState<HeroSlide[]>([...slides]);
  const [localServices, setLocalServices] = useState<ServiceItem[]>([...services]);
  const [localCollections, setLocalCollections] = useState<CollectionItem[]>([...collections]);
  const [localProducts, setLocalProducts] = useState<ProductItem[]>(() =>
    products && products.length > 0 ? [...products] : storage.getProducts()
  );
  const [localCategories, setLocalCategories] = useState<ProductCategory[]>(() =>
    categories && categories.length > 0 ? [...categories] : storage.getProductCategories()
  );
  const [localGallery, setLocalGallery] = useState<GalleryProject[]>([...gallery]);
  const [localTestimonials, setLocalTestimonials] = useState<Testimonial[]>([...testimonials]);
  const [localAutomated, setLocalAutomated] = useState<AutomatedRepliesConfig>({ ...automatedReplies });
  const [localSeo, setLocalSeo] = useState<SeoConfig>({ ...seo });
  const [localVideo, setLocalVideo] = useState<VideoSectionConfig>(() => videoSection || storage.getVideoSection());

  // Enquiries list & WhatsApp Reply State
  const [enquiries, setEnquiries] = useState<EnquiryRecord[]>(() => storage.getEnquiries());
  const [selectedEnquiry, setSelectedEnquiry] = useState<EnquiryRecord | null>(null);
  const [whatsAppReplyEnquiry, setWhatsAppReplyEnquiry] = useState<EnquiryRecord | null>(null);
  const [whatsAppReplyText, setWhatsAppReplyText] = useState<string>('');
  const [markAsContactedOnReply, setMarkAsContactedOnReply] = useState<boolean>(true);
  const [enquiryFilterType, setEnquiryFilterType] = useState<'all' | 'quotes' | 'contact'>('all');

  // New item modal states
  const [editingService, setEditingService] = useState<ServiceItem | null>(null);
  const [editingCollection, setEditingCollection] = useState<CollectionItem | null>(null);
  const [editingProduct, setEditingProduct] = useState<ProductItem | null>(null);
  const [editingProject, setEditingProject] = useState<GalleryProject | null>(null);
  const [editingTestimonial, setEditingTestimonial] = useState<Testimonial | null>(null);
  const [previewingProduct, setPreviewingProduct] = useState<ProductItem | null>(null);
  const [newCategoryName, setNewCategoryName] = useState<string>('');
  const [newImageInput, setNewImageInput] = useState<string>('');

  // Password change state
  const [newAdminPassword, setNewAdminPassword] = useState('');
  const [newAdminEmail, setNewAdminEmail] = useState('admin@ifytex.com');

  // Supabase migration copy state
  const [copiedSql, setCopiedSql] = useState(false);

  // Save Handlers
  const handleSaveCompanySettings = () => {
    storage.saveSettings(localSettings);
    onUpdateSettings(localSettings);
    onShowToast('Company settings saved successfully');
  };

  const handleSaveSlides = () => {
    storage.saveHeroSlides(localSlides);
    onUpdateSlides(localSlides);
    onShowToast('Hero carousel slides saved successfully');
  };

  const handleSaveServices = () => {
    storage.saveServices(localServices);
    onUpdateServices(localServices);
    onShowToast('Services list updated successfully');
  };

  const handleSaveCollections = () => {
    storage.saveCollections(localCollections);
    onUpdateCollections(localCollections);
    onShowToast('Curtains & blinds collection catalogue saved');
  };

  const handleSaveProducts = () => {
    storage.saveProducts(localProducts);
    storage.saveProductCategories(localCategories);
    if (onUpdateProducts) onUpdateProducts(localProducts);
    if (onUpdateCategories) onUpdateCategories(localCategories);
    onShowToast('Products catalogue & categories saved successfully');
  };

  const handleSaveGallery = () => {
    storage.saveGallery(localGallery);
    onUpdateGallery(localGallery);
    onShowToast('Project gallery updated successfully');
  };

  const handleSaveTestimonials = () => {
    storage.saveTestimonials(localTestimonials);
    onUpdateTestimonials(localTestimonials);
    onShowToast('Testimonials saved successfully');
  };

  const handleSaveAutomated = () => {
    storage.saveAutomatedReplies(localAutomated);
    onUpdateAutomatedReplies(localAutomated);
    onShowToast('Automated replies & notification templates saved');
  };

  const handleSaveSeo = () => {
    storage.saveSeo(localSeo);
    onUpdateSeo(localSeo);
    onShowToast('SEO & social metadata saved');
  };

  const handleSaveVideoSection = () => {
    storage.saveVideoSection(localVideo);
    if (onUpdateVideoSection) {
      onUpdateVideoSection(localVideo);
    }
    onShowToast('Brand video showcase settings saved successfully');
  };

  const handleUpdateEnquiryStatus = (
    id: string,
    status: EnquiryRecord['status'],
    internalNotes?: string
  ) => {
    storage.updateEnquiry(id, { status, ...(internalNotes !== undefined ? { internalNotes } : {}) });
    const refreshed = storage.getEnquiries();
    setEnquiries(refreshed);
    if (selectedEnquiry && selectedEnquiry.id === id) {
      setSelectedEnquiry({ ...selectedEnquiry, status, ...(internalNotes !== undefined ? { internalNotes } : {}) });
    }
    onShowToast('Enquiry record updated');
  };

  const handleDeleteEnquiry = (id: string) => {
    if (window.confirm('Are you sure you want to delete this enquiry record?')) {
      storage.deleteEnquiry(id);
      setEnquiries(storage.getEnquiries());
      if (selectedEnquiry && selectedEnquiry.id === id) setSelectedEnquiry(null);
      onShowToast('Enquiry record deleted', undefined, 'info');
    }
  };

  const handleOpenWhatsAppReply = (enq: EnquiryRecord) => {
    const defaultMsg = generateEnquiryWhatsAppReplyMessage({
      fullName: enq.fullName,
      type: enq.type,
      serviceRequired: enq.serviceRequired,
    });
    setWhatsAppReplyText(defaultMsg);
    setWhatsAppReplyEnquiry(enq);
  };

  const handleLaunchWhatsAppChat = (enq: EnquiryRecord, message: string) => {
    const validation = validateAndNormalizeNigerianPhone(enq.phone);
    if (!validation.isValid) {
      onShowToast(validation.errorMessage || 'Invalid phone number for WhatsApp', undefined, 'error');
      return;
    }
    const chatUrl = createWhatsAppChatUrl(validation.normalized, message);
    if (markAsContactedOnReply && enq.status === 'new') {
      handleUpdateEnquiryStatus(enq.id, 'contacted');
    }
    window.open(chatUrl, '_blank');
    setWhatsAppReplyEnquiry(null);
    onShowToast(`WhatsApp conversation launched for ${enq.fullName}`);
  };

  const handleSavePassword = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newAdminPassword.trim()) {
      onShowToast('Password cannot be empty', undefined, 'error');
      return;
    }
    localStorage.setItem(
      'ifytex_admin_creds',
      JSON.stringify({ email: newAdminEmail.trim(), password: newAdminPassword.trim() })
    );
    setNewAdminPassword('');
    onShowToast('Admin credentials updated successfully');
  };

  const copySqlMigration = () => {
    const sql = storage.generateSupabaseSqlMigration();
    navigator.clipboard.writeText(sql);
    setCopiedSql(true);
    setTimeout(() => setCopiedSql(false), 3000);
    onShowToast('Supabase PostgreSQL SQL script copied to clipboard!');
  };

  // Nav menu items (18 sections)
  const navTabs: { id: AdminTab; label: string; icon: React.ComponentType<{ className?: string }> }[] = [
    { id: 'overview', label: '1. Dashboard Overview', icon: LayoutDashboard },
    { id: 'company', label: '2. Company Settings', icon: Building },
    { id: 'slides', label: '3. Homepage & 2 Slides', icon: Sliders },
    { id: 'about', label: '4. About Page Content', icon: FileText },
    { id: 'services', label: '5. Services Management', icon: Briefcase },
    { id: 'products', label: '6. Products Management', icon: ShoppingBag },
    { id: 'collections', label: '7. Curtains & Blinds Items', icon: Layers },
    { id: 'gallery', label: '8. Gallery & Projects', icon: ImageIcon },
    { id: 'testimonials', label: '9. Testimonials', icon: MessageSquare },
    { id: 'enquiries', label: '10. Contact Enquiries', icon: Mail },
    { id: 'quotes', label: '11. Quote Requests', icon: FileCheck },
    { id: 'social', label: '12. Social Media Links', icon: Share2 },
    { id: 'automated', label: '13. Automated Replies', icon: Bell },
    { id: 'seo', label: '14. SEO Settings', icon: Search },
    { id: 'nav-footer', label: '15. Navigation & Footer', icon: Compass },
    { id: 'video', label: '16. Brand Video Showcase', icon: Video },
    { id: 'media', label: '17. Image & Media Assets', icon: Upload },
    { id: 'security', label: '18. Security & Database', icon: Lock },
  ];

  return (
    <div className="min-h-screen bg-[#F7F1E5]/40 flex flex-col">
      {/* Top Admin Bar */}
      <header className="sticky top-0 z-30 bg-[#2F211B] text-white border-b border-[#C49A43]/40 px-6 py-4 flex items-center justify-between shadow-md">
        <div className="flex items-center gap-4">
          <div className="shrink-0 flex items-center">
            <BrandLogo customLogoUrl={localSettings.logoUrl} size="admin" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h1 className="font-serif text-lg font-bold text-white tracking-wide">
                {localSettings.name} — Control Center
              </h1>
              <span className="hidden sm:inline-block px-2 py-0.5 rounded text-[10px] font-semibold bg-amber-900/80 text-amber-200 border border-amber-700/60">
                Development mode — Supabase not connected
              </span>
            </div>
            <span className="text-xs text-[#E6D1A0]/80">
              Bespoke Interior & Window Treatments Management (Abuja)
            </span>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={() => onNavigate('home')}
            className="px-3.5 py-1.5 text-xs rounded-lg border border-[#E6D1A0]/40 text-[#E6D1A0] hover:bg-white/10 transition-colors flex items-center gap-1.5 cursor-pointer"
          >
            <ExternalLink className="w-3.5 h-3.5" /> View Live Website
          </button>
          <button
            onClick={onLogout}
            className="px-3.5 py-1.5 text-xs rounded-lg bg-red-950/80 hover:bg-red-900 text-red-200 border border-red-800 transition-colors flex items-center gap-1.5 cursor-pointer"
          >
            <LogOut className="w-3.5 h-3.5" /> Exit
          </button>
        </div>
      </header>

      {/* Main Admin Body */}
      <div className="flex-1 flex flex-col md:flex-row max-w-7xl w-full mx-auto p-4 sm:p-6 lg:p-8 gap-6">
        {/* Left Navigation Sidebar */}
        <aside className="w-full md:w-64 bg-white rounded-2xl border border-[#E6D1A0]/60 p-4 shadow-xs shrink-0 self-start">
          <div className="text-[11px] font-semibold uppercase tracking-widest text-[#C49A43] px-3 mb-3">
            Administration Menu
          </div>
          <nav className="space-y-1">
            {navTabs.map((tab) => {
              const Icon = tab.icon;
              const isActive = activeTab === tab.id;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`w-full flex items-center gap-3 px-3 py-2 text-xs rounded-xl font-medium transition-colors text-left cursor-pointer ${
                    isActive
                      ? 'bg-[#4A3023] text-white font-semibold shadow-xs'
                      : 'text-[#5C4537] hover:bg-[#FAF7F2]'
                  }`}
                >
                  <Icon className={`w-4 h-4 shrink-0 ${isActive ? 'text-[#E6D1A0]' : 'text-[#C49A43]'}`} />
                  <span className="truncate">{tab.label}</span>
                </button>
              );
            })}
          </nav>
        </aside>

        {/* Right Content Area */}
        <main className="flex-1 bg-white rounded-2xl border border-[#E6D1A0]/60 p-6 sm:p-8 shadow-xs min-w-0">
          {/* ========================================================= */}
          {/* 1. OVERVIEW */}
          {/* ========================================================= */}
          {activeTab === 'overview' && (
            <div className="space-y-8 animate-in fade-in duration-200">
              <div className="flex items-center justify-between pb-4 border-b border-[#FAF7F2]">
                <div>
                  <h2 className="font-serif text-2xl font-bold text-[#2F211B]">
                    Executive Overview
                  </h2>
                  <p className="text-xs text-[#7C6556]">
                    Key performance metrics and quick status for IFYTEX Interior Design.
                  </p>
                </div>
                <button
                  onClick={() => onNavigate('contact')}
                  className="px-4 py-2 text-xs font-semibold uppercase tracking-wider text-white bg-[#4A3023] rounded-lg"
                >
                  Test Quote Flow
                </button>
              </div>

              {/* KPI Cards */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                <div className="p-5 rounded-xl bg-[#FAF7F2] border border-[#E6D1A0]/50 space-y-1">
                  <span className="text-xs text-[#7C6556] font-medium">Total Enquiries</span>
                  <div className="font-mono text-3xl font-bold text-[#4A3023]">{enquiries.length}</div>
                  <span className="text-[11px] text-[#C49A43]">
                    {enquiries.filter((e) => e.status === 'new').length} New Pending
                  </span>
                </div>
                <div className="p-5 rounded-xl bg-[#FAF7F2] border border-[#E6D1A0]/50 space-y-1">
                  <span className="text-xs text-[#7C6556] font-medium">Active Hero Slides</span>
                  <div className="font-mono text-3xl font-bold text-[#4A3023]">
                    {localSlides.filter((s) => s.enabled).length} / 2
                  </div>
                  <span className="text-[11px] text-[#C49A43]">Curtains & Blinds</span>
                </div>
                <div className="p-5 rounded-xl bg-[#FAF7F2] border border-[#E6D1A0]/50 space-y-1">
                  <span className="text-xs text-[#7C6556] font-medium">Catalogue Items</span>
                  <div className="font-mono text-3xl font-bold text-[#4A3023]">{localCollections.length}</div>
                  <span className="text-[11px] text-[#C49A43]">{localServices.length} Core Services</span>
                </div>
                <div className="p-5 rounded-xl bg-[#FAF7F2] border border-[#E6D1A0]/50 space-y-1">
                  <span className="text-xs text-[#7C6556] font-medium">Abuja Experience</span>
                  <div className="font-mono text-3xl font-bold text-[#4A3023]">12+ Yrs</div>
                  <span className="text-[11px] text-[#C49A43]">Verified Business Statement</span>
                </div>
              </div>

              {/* Recent Enquiries Preview */}
              <div className="space-y-4 pt-4">
                <div className="flex items-center justify-between">
                  <h3 className="font-serif text-lg font-bold text-[#2F211B]">
                    Recent Inbound Enquiries
                  </h3>
                  <button
                    onClick={() => setActiveTab('enquiries')}
                    className="text-xs text-[#4A3023] font-semibold hover:text-[#C49A43]"
                  >
                    View All Enquiries &rarr;
                  </button>
                </div>

                {enquiries.length === 0 ? (
                  <div className="p-8 text-center rounded-xl bg-[#FAF7F2] border border-dashed border-[#E6D1A0] text-xs text-[#7C6556]">
                    No enquiries submitted yet. Use the Request a Quote page to submit a test enquiry.
                  </div>
                ) : (
                  <div className="overflow-x-auto">
                    <table className="w-full text-xs text-left">
                      <thead className="bg-[#FAF7F2] text-[#4A3023] font-semibold border-b border-[#E6D1A0]/40">
                        <tr>
                          <th className="p-3">Client Name</th>
                          <th className="p-3">Phone</th>
                          <th className="p-3">Area (Abuja)</th>
                          <th className="p-3">Service</th>
                          <th className="p-3">Status</th>
                          <th className="p-3 text-right">Action</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-[#FAF7F2]">
                        {enquiries.slice(0, 5).map((enq) => (
                          <tr key={enq.id} className="hover:bg-[#FAF7F2]/50">
                            <td className="p-3 font-semibold text-[#2F211B]">{enq.fullName}</td>
                            <td className="p-3">{enq.phone}</td>
                            <td className="p-3">{enq.locationArea || '—'}</td>
                            <td className="p-3">{enq.serviceRequired}</td>
                            <td className="p-3">
                              <span
                                className={`px-2 py-0.5 rounded-full text-[10px] font-semibold uppercase ${
                                  enq.status === 'new'
                                    ? 'bg-amber-100 text-amber-800'
                                    : enq.status === 'completed'
                                    ? 'bg-green-100 text-green-800'
                                    : 'bg-blue-100 text-blue-800'
                                }`}
                              >
                                {enq.status}
                              </span>
                            </td>
                            <td className="p-3 text-right">
                              <button
                                onClick={() => {
                                  setSelectedEnquiry(enq);
                                  setActiveTab('enquiries');
                                }}
                                className="text-xs text-[#C49A43] hover:underline"
                              >
                                View Details
                              </button>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                )}
              </div>
            </div>
          )}

          {/* ========================================================= */}
          {/* 2. COMPANY SETTINGS */}
          {/* ========================================================= */}
          {activeTab === 'company' && (
            <div className="space-y-6 animate-in fade-in duration-200">
              <div className="flex items-center justify-between pb-4 border-b border-[#FAF7F2]">
                <div>
                  <h2 className="font-serif text-2xl font-bold text-[#2F211B]">
                    Company Information & Contact Details
                  </h2>
                  <p className="text-xs text-[#7C6556]">
                    All public business headings, phone numbers, and location details update from here.
                  </p>
                </div>
                <button
                  onClick={handleSaveCompanySettings}
                  className="px-5 py-2.5 text-xs font-semibold uppercase tracking-wider text-white bg-[#4A3023] hover:bg-[#2F211B] rounded-lg flex items-center gap-1.5 cursor-pointer shadow-xs"
                >
                  <Save className="w-4 h-4" /> Save Settings
                </button>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <div>
                  <label className="block text-xs font-semibold text-[#4A3023] uppercase mb-1">
                    Official Business Name
                  </label>
                  <input
                    type="text"
                    value={localSettings.name}
                    onChange={(e) => setLocalSettings({ ...localSettings, name: e.target.value })}
                    className="w-full px-4 py-2.5 text-xs rounded-lg bg-[#FAF7F2] border border-[#E6D1A0]/60 text-[#2F211B]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-[#4A3023] uppercase mb-1">
                    Tagline
                  </label>
                  <input
                    type="text"
                    value={localSettings.tagline}
                    onChange={(e) => setLocalSettings({ ...localSettings, tagline: e.target.value })}
                    className="w-full px-4 py-2.5 text-xs rounded-lg bg-[#FAF7F2] border border-[#E6D1A0]/60 text-[#2F211B]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-[#4A3023] uppercase mb-1">
                    WhatsApp Number (Nigeria Local Format)
                  </label>
                  <input
                    type="text"
                    value={localSettings.whatsappNumber}
                    onChange={(e) =>
                      setLocalSettings({ ...localSettings, whatsappNumber: e.target.value })
                    }
                    className="w-full px-4 py-2.5 text-xs rounded-lg bg-[#FAF7F2] border border-[#E6D1A0]/60 text-[#2F211B]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-[#4A3023] uppercase mb-1">
                    Official Email Address
                  </label>
                  <input
                    type="email"
                    value={localSettings.email}
                    onChange={(e) => setLocalSettings({ ...localSettings, email: e.target.value })}
                    className="w-full px-4 py-2.5 text-xs rounded-lg bg-[#FAF7F2] border border-[#E6D1A0]/60 text-[#2F211B]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-[#4A3023] uppercase mb-1">
                    City & Country
                  </label>
                  <input
                    type="text"
                    value={localSettings.location}
                    onChange={(e) => setLocalSettings({ ...localSettings, location: e.target.value })}
                    className="w-full px-4 py-2.5 text-xs rounded-lg bg-[#FAF7F2] border border-[#E6D1A0]/60 text-[#2F211B]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-[#4A3023] uppercase mb-1">
                    Experience Statement Headline
                  </label>
                  <input
                    type="text"
                    value={localSettings.experienceHeadline}
                    onChange={(e) =>
                      setLocalSettings({ ...localSettings, experienceHeadline: e.target.value })
                    }
                    className="w-full px-4 py-2.5 text-xs rounded-lg bg-[#FAF7F2] border border-[#E6D1A0]/60 text-[#2F211B]"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-[#4A3023] uppercase mb-1">
                  Experience Description
                </label>
                <textarea
                  rows={3}
                  value={localSettings.experienceDescription}
                  onChange={(e) =>
                    setLocalSettings({ ...localSettings, experienceDescription: e.target.value })
                  }
                  className="w-full px-4 py-2.5 text-xs rounded-lg bg-[#FAF7F2] border border-[#E6D1A0]/60 text-[#2F211B]"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-[#4A3023] uppercase mb-1">
                  Location & Area Details Note
                </label>
                <input
                  type="text"
                  value={localSettings.addressNote}
                  onChange={(e) => setLocalSettings({ ...localSettings, addressNote: e.target.value })}
                  className="w-full px-4 py-2.5 text-xs rounded-lg bg-[#FAF7F2] border border-[#E6D1A0]/60 text-[#2F211B]"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-[#4A3023] uppercase mb-1">
                  Business Working Hours
                </label>
                <input
                  type="text"
                  value={localSettings.workingHours}
                  onChange={(e) => setLocalSettings({ ...localSettings, workingHours: e.target.value })}
                  className="w-full px-4 py-2.5 text-xs rounded-lg bg-[#FAF7F2] border border-[#E6D1A0]/60 text-[#2F211B]"
                />
              </div>
            </div>
          )}

          {/* ========================================================= */}
          {/* 3. HOMEPAGE & HERO SLIDES (EXACTLY TWO SLIDES) */}
          {/* ========================================================= */}
          {activeTab === 'slides' && (
            <div className="space-y-6 animate-in fade-in duration-200">
              <div className="flex items-center justify-between pb-4 border-b border-[#FAF7F2]">
                <div>
                  <h2 className="font-serif text-2xl font-bold text-[#2F211B]">
                    Homepage Hero Carousel (2 Luxury Slides)
                  </h2>
                  <p className="text-xs text-[#7C6556]">
                    Configure headings, descriptions, buttons and images for both homepage slides.
                  </p>
                </div>
                <button
                  onClick={handleSaveSlides}
                  className="px-5 py-2.5 text-xs font-semibold uppercase tracking-wider text-white bg-[#4A3023] hover:bg-[#2F211B] rounded-lg flex items-center gap-1.5 cursor-pointer shadow-xs"
                >
                  <Save className="w-4 h-4" /> Save Slides
                </button>
              </div>

              <div className="space-y-8">
                {localSlides.slice(0, 2).map((slide, sIdx) => (
                  <div
                    key={slide.id}
                    className="p-6 rounded-2xl bg-[#FAF7F2] border border-[#E6D1A0]/60 space-y-5"
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <span className="font-mono text-sm font-bold text-[#C49A43]">
                          Slide 0{sIdx + 1}:
                        </span>
                        <h3 className="font-serif text-lg font-semibold text-[#2F211B]">
                          {sIdx === 0 ? 'Luxury Curtains Slide' : 'Blinds & Interior Solutions Slide'}
                        </h3>
                      </div>
                      <label className="flex items-center gap-2 text-xs font-medium cursor-pointer">
                        <input
                          type="checkbox"
                          checked={slide.enabled}
                          onChange={(e) => {
                            const updated = [...localSlides];
                            updated[sIdx].enabled = e.target.checked;
                            setLocalSlides(updated);
                          }}
                          className="w-4 h-4 text-[#4A3023] rounded"
                        />
                        <span>Enabled</span>
                      </label>
                    </div>

                    {/* Preview thumbnail */}
                    <div className="h-40 rounded-xl overflow-hidden relative border border-[#E6D1A0]">
                      <img
                        src={slide.imageUrl}
                        alt={slide.title}
                        className="w-full h-full object-cover"
                        referrerPolicy="no-referrer"
                      />
                      <div className="absolute inset-0 bg-black/40 flex items-center p-6 text-white">
                        <div>
                          <span className="text-[10px] uppercase tracking-wider text-[#E6D1A0]">
                            {slide.subtitle}
                          </span>
                          <h4 className="font-serif text-lg font-semibold leading-tight mt-1">
                            {slide.title}
                          </h4>
                        </div>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-xs font-semibold text-[#4A3023] uppercase mb-1">
                          Slide Subtitle / Kicker
                        </label>
                        <input
                          type="text"
                          value={slide.subtitle}
                          onChange={(e) => {
                            const updated = [...localSlides];
                            updated[sIdx].subtitle = e.target.value;
                            setLocalSlides(updated);
                          }}
                          className="w-full px-3 py-2 text-xs rounded-lg bg-white border border-[#E6D1A0]/60 text-[#2F211B]"
                        />
                      </div>

                      <div>
                        <label className="block text-xs font-semibold text-[#4A3023] uppercase mb-1">
                          Slide Main Headline
                        </label>
                        <input
                          type="text"
                          value={slide.title}
                          onChange={(e) => {
                            const updated = [...localSlides];
                            updated[sIdx].title = e.target.value;
                            setLocalSlides(updated);
                          }}
                          className="w-full px-3 py-2 text-xs rounded-lg bg-white border border-[#E6D1A0]/60 text-[#2F211B]"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-[#4A3023] uppercase mb-1">
                        Slide Description
                      </label>
                      <textarea
                        rows={2}
                        value={slide.description}
                        onChange={(e) => {
                          const updated = [...localSlides];
                          updated[sIdx].description = e.target.value;
                          setLocalSlides(updated);
                        }}
                        className="w-full px-3 py-2 text-xs rounded-lg bg-white border border-[#E6D1A0]/60 text-[#2F211B]"
                      />
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-xs font-semibold text-[#4A3023] uppercase mb-1">
                          Primary Button Label
                        </label>
                        <input
                          type="text"
                          value={slide.primaryBtnText}
                          onChange={(e) => {
                            const updated = [...localSlides];
                            updated[sIdx].primaryBtnText = e.target.value;
                            setLocalSlides(updated);
                          }}
                          className="w-full px-3 py-2 text-xs rounded-lg bg-white border border-[#E6D1A0]/60 text-[#2F211B]"
                        />
                      </div>
                      <div>
                        <label className="block text-xs font-semibold text-[#4A3023] uppercase mb-1">
                          Secondary Button Label
                        </label>
                        <input
                          type="text"
                          value={slide.secondaryBtnText}
                          onChange={(e) => {
                            const updated = [...localSlides];
                            updated[sIdx].secondaryBtnText = e.target.value;
                            setLocalSlides(updated);
                          }}
                          className="w-full px-3 py-2 text-xs rounded-lg bg-white border border-[#E6D1A0]/60 text-[#2F211B]"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-[#4A3023] uppercase mb-1">
                        Slide Image URL / Path
                      </label>
                      <input
                        type="text"
                        value={slide.imageUrl}
                        onChange={(e) => {
                          const updated = [...localSlides];
                          updated[sIdx].imageUrl = e.target.value;
                          setLocalSlides(updated);
                        }}
                        className="w-full px-3 py-2 text-xs rounded-lg bg-white border border-[#E6D1A0]/60 text-[#2F211B] font-mono"
                      />
                      <div className="flex flex-wrap gap-2 mt-2">
                        <span className="text-[11px] text-[#7C6556] self-center">Presets:</span>
                        <button
                          type="button"
                          onClick={() => {
                            const updated = [...localSlides];
                            updated[sIdx].imageUrl =
                              '/src/assets/images/hero_luxury_curtains_hd_1791792231098.jpg';
                            setLocalSlides(updated);
                          }}
                          className="px-2 py-0.5 text-[11px] rounded bg-white border border-[#E6D1A0]/60 text-[#4A3023] hover:bg-[#FAF7F2]"
                        >
                          HD Curtains Photo
                        </button>
                        <button
                          type="button"
                          onClick={() => {
                            const updated = [...localSlides];
                            updated[sIdx].imageUrl =
                              '/src/assets/images/hero_blinds_interior_hd_1791792246697.jpg';
                            setLocalSlides(updated);
                          }}
                          className="px-2 py-0.5 text-[11px] rounded bg-white border border-[#E6D1A0]/60 text-[#4A3023] hover:bg-[#FAF7F2]"
                        >
                          HD Blinds & Lounge Photo
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* ========================================================= */}
          {/* 4. ABOUT PAGE CONTENT */}
          {/* ========================================================= */}
          {activeTab === 'about' && (
            <div className="space-y-6 animate-in fade-in duration-200">
              <div className="flex items-center justify-between pb-4 border-b border-[#FAF7F2]">
                <div>
                  <h2 className="font-serif text-2xl font-bold text-[#2F211B]">
                    About Page Editorial Content
                  </h2>
                  <p className="text-xs text-[#7C6556]">
                    Manage brand story, business philosophy, and craftsmanship statements.
                  </p>
                </div>
                <button
                  onClick={handleSaveCompanySettings}
                  className="px-5 py-2.5 text-xs font-semibold uppercase tracking-wider text-white bg-[#4A3023] hover:bg-[#2F211B] rounded-lg flex items-center gap-1.5 cursor-pointer shadow-xs"
                >
                  <Save className="w-4 h-4" /> Save Content
                </button>
              </div>

              <div className="p-5 rounded-xl bg-[#FAF7F2] border border-[#E6D1A0]/60 space-y-4">
                <h3 className="text-xs font-semibold uppercase tracking-wider text-[#4A3023]">
                  12+ Years Craftsmanship Statement
                </h3>
                <div>
                  <label className="block text-xs font-medium text-[#5C4537] mb-1">
                    Headline
                  </label>
                  <input
                    type="text"
                    value={localSettings.experienceHeadline}
                    onChange={(e) =>
                      setLocalSettings({ ...localSettings, experienceHeadline: e.target.value })
                    }
                    className="w-full px-3 py-2 text-xs rounded-lg bg-white border border-[#E6D1A0]/60 text-[#2F211B]"
                  />
                </div>
                <div>
                  <label className="block text-xs font-medium text-[#5C4537] mb-1">
                    Full Description
                  </label>
                  <textarea
                    rows={4}
                    value={localSettings.experienceDescription}
                    onChange={(e) =>
                      setLocalSettings({ ...localSettings, experienceDescription: e.target.value })
                    }
                    className="w-full px-3 py-2 text-xs rounded-lg bg-white border border-[#E6D1A0]/60 text-[#2F211B]"
                  />
                </div>
              </div>
            </div>
          )}

          {/* ========================================================= */}
          {/* 5. SERVICES MANAGEMENT */}
          {/* ========================================================= */}
          {activeTab === 'services' && (
            <div className="space-y-6 animate-in fade-in duration-200">
              <div className="flex items-center justify-between pb-4 border-b border-[#FAF7F2]">
                <div>
                  <h2 className="font-serif text-2xl font-bold text-[#2F211B]">
                    Services Management
                  </h2>
                  <p className="text-xs text-[#7C6556]">
                    Manage the 6 core window and interior service offerings.
                  </p>
                </div>
                <div className="flex items-center gap-3">
                  <button
                    onClick={() => {
                      const newSrv: ServiceItem = {
                        id: 'srv-' + Date.now(),
                        title: 'New Interior Solution',
                        shortDescription: 'Custom interior service description',
                        fullDescription: 'Comprehensive details about this service...',
                        imageUrl: '/src/assets/images/hero_luxury_curtains_1791785736600.jpg',
                        features: ['Feature 1', 'Feature 2'],
                        sortOrder: localServices.length + 1,
                        published: true,
                      };
                      setLocalServices([...localServices, newSrv]);
                      setEditingService(newSrv);
                    }}
                    className="px-4 py-2 text-xs font-semibold uppercase tracking-wider text-[#4A3023] border border-[#C49A43] hover:bg-[#FAF7F2] rounded-lg flex items-center gap-1.5 cursor-pointer"
                  >
                    <Plus className="w-4 h-4" /> Add Service
                  </button>
                  <button
                    onClick={handleSaveServices}
                    className="px-5 py-2 text-xs font-semibold uppercase tracking-wider text-white bg-[#4A3023] hover:bg-[#2F211B] rounded-lg flex items-center gap-1.5 cursor-pointer shadow-xs"
                  >
                    <Save className="w-4 h-4" /> Save Services
                  </button>
                </div>
              </div>

              <div className="space-y-4">
                {localServices.map((service, idx) => (
                  <div
                    key={service.id}
                    className="p-5 rounded-xl bg-[#FAF7F2] border border-[#E6D1A0]/60 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4"
                  >
                    <div className="flex items-center gap-4">
                      <img
                        src={service.imageUrl}
                        alt={service.title}
                        className="w-16 h-16 rounded-lg object-cover border border-[#E6D1A0]"
                        referrerPolicy="no-referrer"
                      />
                      <div>
                        <div className="flex items-center gap-2">
                          <h4 className="font-serif text-base font-semibold text-[#2F211B]">
                            {service.title}
                          </h4>
                          {!service.published && (
                            <span className="text-[10px] bg-gray-200 text-gray-700 px-2 py-0.5 rounded-sm">
                              Unpublished
                            </span>
                          )}
                        </div>
                        <p className="text-xs text-[#7C6556] line-clamp-1 mt-0.5">
                          {service.shortDescription}
                        </p>
                      </div>
                    </div>

                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => setEditingService(service)}
                        className="px-3 py-1.5 text-xs rounded-lg border border-[#E6D1A0] text-[#4A3023] hover:bg-white flex items-center gap-1"
                      >
                        <Edit2 className="w-3.5 h-3.5" /> Edit
                      </button>
                      <button
                        onClick={() => {
                          const updated = localServices.filter((s) => s.id !== service.id);
                          setLocalServices(updated);
                        }}
                        className="p-1.5 text-red-600 hover:bg-red-50 rounded-lg"
                        title="Delete Service"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>

              {/* Edit Service Modal */}
              {editingService && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs">
                  <div className="bg-white rounded-2xl max-w-xl w-full p-6 space-y-4 border border-[#C49A43] shadow-2xl max-h-[90vh] overflow-y-auto">
                    <div className="flex items-center justify-between pb-3 border-b border-[#FAF7F2]">
                      <h3 className="font-serif text-lg font-bold text-[#2F211B]">
                        Edit Service Details
                      </h3>
                      <button
                        onClick={() => setEditingService(null)}
                        className="p-1 text-gray-500 hover:text-black"
                      >
                        <X className="w-5 h-5" />
                      </button>
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-[#4A3023] uppercase mb-1">
                        Service Title
                      </label>
                      <input
                        type="text"
                        value={editingService.title}
                        onChange={(e) =>
                          setEditingService({ ...editingService, title: e.target.value })
                        }
                        className="w-full px-3 py-2 text-xs rounded-lg bg-[#FAF7F2] border border-[#E6D1A0]/60"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-[#4A3023] uppercase mb-1">
                        Short Summary Description
                      </label>
                      <input
                        type="text"
                        value={editingService.shortDescription}
                        onChange={(e) =>
                          setEditingService({ ...editingService, shortDescription: e.target.value })
                        }
                        className="w-full px-3 py-2 text-xs rounded-lg bg-[#FAF7F2] border border-[#E6D1A0]/60"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-[#4A3023] uppercase mb-1">
                        Full In-Depth Description
                      </label>
                      <textarea
                        rows={4}
                        value={editingService.fullDescription}
                        onChange={(e) =>
                          setEditingService({ ...editingService, fullDescription: e.target.value })
                        }
                        className="w-full px-3 py-2 text-xs rounded-lg bg-[#FAF7F2] border border-[#E6D1A0]/60"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-[#4A3023] uppercase mb-1">
                        Image URL / Asset Path
                      </label>
                      <input
                        type="text"
                        value={editingService.imageUrl}
                        onChange={(e) =>
                          setEditingService({ ...editingService, imageUrl: e.target.value })
                        }
                        className="w-full px-3 py-2 text-xs rounded-lg bg-[#FAF7F2] border border-[#E6D1A0]/60 font-mono"
                      />
                    </div>

                    <div className="flex items-center gap-2">
                      <input
                        type="checkbox"
                        checked={editingService.published}
                        onChange={(e) =>
                          setEditingService({ ...editingService, published: e.target.checked })
                        }
                        className="w-4 h-4 text-[#4A3023] rounded"
                      />
                      <label className="text-xs text-[#4A3023] font-medium">
                        Publish this service on public website
                      </label>
                    </div>

                    <div className="pt-3 flex justify-end gap-3 border-t border-[#FAF7F2]">
                      <button
                        onClick={() => setEditingService(null)}
                        className="px-4 py-2 text-xs rounded-lg border border-gray-300"
                      >
                        Cancel
                      </button>
                      <button
                        onClick={() => {
                          const updated = localServices.map((s) =>
                            s.id === editingService.id ? editingService : s
                          );
                          setLocalServices(updated);
                          setEditingService(null);
                        }}
                        className="px-5 py-2 text-xs font-semibold text-white bg-[#4A3023] rounded-lg"
                      >
                        Apply Changes
                      </button>
                    </div>
                  </div>
                </div>
              )}
            </div>
          )}

          {/* ========================================================= */}
          {/* 6. PRODUCTS MANAGEMENT (IMAGES FIRST, NO PRICES) */}
          {/* ========================================================= */}
          {activeTab === 'products' && (
            <div className="space-y-6 animate-in fade-in duration-200">
              {/* Header and Controls */}
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pb-4 border-b border-[#FAF7F2]">
                <div>
                  <h2 className="font-serif text-2xl font-bold text-[#2F211B] flex items-center gap-2">
                    <ShoppingBag className="w-6 h-6 text-[#C49A43]" /> Products Management
                  </h2>
                  <p className="text-xs text-[#7C6556] mt-0.5">
                    Curate your showroom catalogue: add products, assign categories, manage multi-image galleries, and reorder. (No prices displayed).
                  </p>
                </div>
                <div className="flex flex-wrap items-center gap-2.5">
                  <button
                    onClick={() => {
                      const newProd: ProductItem = {
                        id: 'prod-' + Date.now(),
                        name: 'New Luxury Product',
                        category: localCategories[0]?.name || 'Curtain Materials & Fabrics',
                        images: ['/src/assets/images/curtain_fabric_materials_1791798808365.jpg'],
                        mainImage: '/src/assets/images/curtain_fabric_materials_1791798808365.jpg',
                        sortOrder: 1,
                        published: true,
                        featured: true,
                      };
                      setLocalProducts([newProd, ...localProducts]);
                      setEditingProduct(newProd);
                      setNewImageInput('');
                    }}
                    className="px-4 py-2 text-xs font-semibold uppercase tracking-wider text-[#4A3023] border border-[#C49A43] hover:bg-[#FAF7F2] rounded-lg flex items-center gap-1.5 cursor-pointer"
                  >
                    <Plus className="w-4 h-4" /> Add Product
                  </button>
                  <button
                    onClick={() => onNavigate('products')}
                    className="px-4 py-2 text-xs font-semibold uppercase tracking-wider text-[#4A3023] bg-[#FAF7F2] hover:bg-[#E6D1A0]/40 rounded-lg flex items-center gap-1.5 cursor-pointer border border-[#E6D1A0]/60"
                  >
                    <Eye className="w-4 h-4 text-[#C49A43]" /> View Public Page
                  </button>
                  <button
                    onClick={handleSaveProducts}
                    className="px-5 py-2 text-xs font-semibold uppercase tracking-wider text-white bg-[#4A3023] hover:bg-[#2F211B] rounded-lg flex items-center gap-1.5 cursor-pointer shadow-xs"
                  >
                    <Save className="w-4 h-4" /> Save Products
                  </button>
                </div>
              </div>

              {/* Category Quick Management Bar */}
              <div className="p-4 rounded-xl bg-[#FAF7F2] border border-[#E6D1A0]/60 space-y-3">
                <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2">
                  <span className="text-xs font-bold uppercase tracking-wider text-[#4A3023]">
                    Manage Product Categories ({localCategories.length})
                  </span>
                  <div className="flex items-center gap-2 w-full sm:w-auto">
                    <input
                      type="text"
                      placeholder="Add custom category name..."
                      value={newCategoryName}
                      onChange={(e) => setNewCategoryName(e.target.value)}
                      onKeyDown={(e) => {
                        if (e.key === 'Enter' && newCategoryName.trim()) {
                          const name = newCategoryName.trim();
                          if (!localCategories.some((c) => c.name.toLowerCase() === name.toLowerCase())) {
                            const newCat: ProductCategory = {
                              id: 'cat-' + Date.now(),
                              name,
                              slug: name.toLowerCase().replace(/[^a-z0-9]+/g, '-'),
                              sortOrder: localCategories.length + 1,
                            };
                            setLocalCategories([...localCategories, newCat]);
                            setNewCategoryName('');
                            onShowToast(`Category "${name}" added`);
                          }
                        }
                      }}
                      className="px-3 py-1.5 text-xs rounded-lg bg-white border border-[#E6D1A0]/60 text-[#2F211B] w-full sm:w-64"
                    />
                    <button
                      onClick={() => {
                        const name = newCategoryName.trim();
                        if (!name) return;
                        if (!localCategories.some((c) => c.name.toLowerCase() === name.toLowerCase())) {
                          const newCat: ProductCategory = {
                            id: 'cat-' + Date.now(),
                            name,
                            slug: name.toLowerCase().replace(/[^a-z0-9]+/g, '-'),
                            sortOrder: localCategories.length + 1,
                          };
                          setLocalCategories([...localCategories, newCat]);
                          setNewCategoryName('');
                          onShowToast(`Category "${name}" added`);
                        } else {
                          onShowToast('Category already exists', undefined, 'error');
                        }
                      }}
                      className="px-3 py-1.5 text-xs font-semibold text-white bg-[#4A3023] hover:bg-[#2F211B] rounded-lg shrink-0 cursor-pointer"
                    >
                      Add Category
                    </button>
                  </div>
                </div>

                {/* Categories tags list with delete capability */}
                <div className="flex flex-wrap items-center gap-1.5 pt-1">
                  {localCategories.map((cat) => (
                    <span
                      key={cat.id}
                      className="inline-flex items-center gap-1.5 px-2.5 py-1 text-[11px] rounded-lg bg-white border border-[#E6D1A0]/80 text-[#3B261D]"
                    >
                      <span>{cat.name}</span>
                      {localCategories.length > 1 && (
                        <button
                          onClick={() => {
                            if (window.confirm(`Delete category "${cat.name}"? Products in this category will keep their label until edited.`)) {
                              setLocalCategories(localCategories.filter((c) => c.id !== cat.id));
                              onShowToast(`Category "${cat.name}" removed`, undefined, 'info');
                            }
                          }}
                          className="text-gray-400 hover:text-red-600 transition-colors cursor-pointer"
                          title="Remove category"
                        >
                          <X className="w-3 h-3" />
                        </button>
                      )}
                    </span>
                  ))}
                </div>
              </div>

              {/* Products List & Table */}
              <div className="space-y-3">
                <div className="flex items-center justify-between text-xs text-[#7C6556] px-1">
                  <span>
                    Showing {localProducts.length} total products ({localProducts.filter((p) => p.published).length} published on public catalogue)
                  </span>
                  <span className="text-[11px] italic">
                    Use Up / Down arrows to reorder which products appear first.
                  </span>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {localProducts.map((prod, index) => {
                    const displayImg = prod.mainImage || (prod.images && prod.images[0]) || '';
                    return (
                      <div
                        key={prod.id}
                        className={`p-4 rounded-xl border transition-all flex flex-col justify-between ${
                          prod.published
                            ? 'bg-[#FAF7F2] border-[#E6D1A0]/70 shadow-xs'
                            : 'bg-gray-50 border-gray-200 opacity-60'
                        }`}
                      >
                        <div className="flex gap-3.5">
                          <div className="relative w-20 h-20 rounded-lg overflow-hidden border border-[#E6D1A0]/60 shrink-0 bg-white">
                            <img
                              src={displayImg}
                              alt={prod.name}
                              className="w-full h-full object-cover"
                              referrerPolicy="no-referrer"
                            />
                            {prod.images && prod.images.length > 1 && (
                              <span className="absolute bottom-1 right-1 px-1 py-0.2 text-[9px] font-bold rounded bg-black/70 text-white">
                                {prod.images.length} imgs
                              </span>
                            )}
                          </div>

                          <div className="flex-1 min-w-0">
                            <span className="text-[10px] uppercase font-bold text-[#C49A43] truncate block">
                              {prod.category || 'Uncategorized'}
                            </span>
                            <h4 className="font-serif text-sm font-semibold text-[#2F211B] line-clamp-2 mt-0.5 leading-snug">
                              {prod.name}
                            </h4>
                            <div className="flex items-center gap-2 mt-2">
                              <span
                                className={`text-[10px] font-semibold px-2 py-0.5 rounded ${
                                  prod.published
                                    ? 'bg-emerald-100 text-emerald-800'
                                    : 'bg-gray-200 text-gray-700'
                                }`}
                              >
                                {prod.published ? 'Published' : 'Hidden'}
                              </span>
                              <span className="text-[10px] text-gray-500 font-mono">
                                #{index + 1}
                              </span>
                            </div>
                          </div>
                        </div>

                        {/* Action buttons */}
                        <div className="pt-3 mt-3 border-t border-[#E6D1A0]/40 flex items-center justify-between">
                          <div className="flex items-center gap-1">
                            {/* Reorder Buttons */}
                            <button
                              disabled={index === 0}
                              onClick={() => {
                                if (index === 0) return;
                                const updated = [...localProducts];
                                const temp = updated[index];
                                updated[index] = updated[index - 1];
                                updated[index - 1] = temp;
                                // update sortOrder
                                updated.forEach((p, idx) => (p.sortOrder = idx + 1));
                                setLocalProducts(updated);
                              }}
                              className="p-1 rounded hover:bg-white text-gray-600 disabled:opacity-30 disabled:cursor-not-allowed"
                              title="Move Earlier (Higher on page)"
                            >
                              <ArrowUp className="w-3.5 h-3.5" />
                            </button>
                            <button
                              disabled={index === localProducts.length - 1}
                              onClick={() => {
                                if (index === localProducts.length - 1) return;
                                const updated = [...localProducts];
                                const temp = updated[index];
                                updated[index] = updated[index + 1];
                                updated[index + 1] = temp;
                                // update sortOrder
                                updated.forEach((p, idx) => (p.sortOrder = idx + 1));
                                setLocalProducts(updated);
                              }}
                              className="p-1 rounded hover:bg-white text-gray-600 disabled:opacity-30 disabled:cursor-not-allowed"
                              title="Move Later (Lower on page)"
                            >
                              <ArrowDown className="w-3.5 h-3.5" />
                            </button>
                          </div>

                          <div className="flex items-center gap-1.5">
                            {/* Toggle Published */}
                            <button
                              onClick={() => {
                                const updated = localProducts.map((p) =>
                                  p.id === prod.id ? { ...p, published: !p.published } : p
                                );
                                setLocalProducts(updated);
                                onShowToast(
                                  prod.published
                                    ? `Product "${prod.name}" hidden`
                                    : `Product "${prod.name}" published`
                                );
                              }}
                              className="px-2 py-1 text-[11px] rounded border border-[#E6D1A0] text-[#4A3023] hover:bg-white cursor-pointer"
                            >
                              {prod.published ? 'Unpublish' : 'Publish'}
                            </button>

                            {/* Preview */}
                            <button
                              onClick={() => setPreviewingProduct(prod)}
                              className="p-1 text-[#4A3023] hover:bg-white rounded cursor-pointer"
                              title="Preview Public Card"
                            >
                              <Eye className="w-3.5 h-3.5 text-[#C49A43]" />
                            </button>

                            {/* Edit */}
                            <button
                              onClick={() => {
                                setEditingProduct({ ...prod });
                                setNewImageInput('');
                              }}
                              className="px-2.5 py-1 text-[11px] font-semibold rounded bg-[#4A3023] text-white hover:bg-[#2F211B] cursor-pointer"
                            >
                              Edit
                            </button>

                            {/* Delete with confirmation step */}
                            <button
                              onClick={() => {
                                if (window.confirm(`Are you sure you want to delete "${prod.name}"? This action cannot be undone.`)) {
                                  const updated = localProducts.filter((p) => p.id !== prod.id);
                                  setLocalProducts(updated);
                                  onShowToast(`Deleted "${prod.name}"`, undefined, 'info');
                                }
                              }}
                              className="p-1 text-red-600 hover:bg-red-50 rounded cursor-pointer"
                              title="Delete Product"
                            >
                              <Trash2 className="w-3.5 h-3.5" />
                            </button>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* ======================================================= */}
              {/* EDIT / ADD PRODUCT MODAL (STRICTLY NO PRICE FIELD) */}
              {/* ======================================================= */}
              {editingProduct && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs">
                  <div className="bg-white rounded-2xl max-w-2xl w-full p-6 sm:p-7 space-y-4 border border-[#C49A43] shadow-2xl max-h-[90vh] overflow-y-auto">
                    <div className="flex items-center justify-between pb-3 border-b border-[#FAF7F2]">
                      <h3 className="font-serif text-lg font-bold text-[#2F211B]">
                        {editingProduct.id.startsWith('prod-') && !localProducts.some((p) => p.id === editingProduct.id)
                          ? 'Add New Product'
                          : 'Edit Product Details'}
                      </h3>
                      <button
                        onClick={() => setEditingProduct(null)}
                        className="p-1 text-gray-500 hover:text-black cursor-pointer"
                      >
                        <X className="w-5 h-5" />
                      </button>
                    </div>

                    {/* Product Name */}
                    <div>
                      <label className="block text-xs font-semibold text-[#4A3023] uppercase mb-1">
                        Product Name *
                      </label>
                      <input
                        type="text"
                        required
                        value={editingProduct.name}
                        onChange={(e) =>
                          setEditingProduct({ ...editingProduct, name: e.target.value })
                        }
                        placeholder="e.g. Champagne Silk & Jacquard Curtain Material Rolls"
                        className="w-full px-3 py-2 text-xs rounded-lg bg-[#FAF7F2] border border-[#E6D1A0]/60 text-[#2F211B] font-medium"
                      />
                    </div>

                    {/* Category Selection */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      <div>
                        <label className="block text-xs font-semibold text-[#4A3023] uppercase mb-1">
                          Select Category
                        </label>
                        <select
                          value={editingProduct.category}
                          onChange={(e) =>
                            setEditingProduct({ ...editingProduct, category: e.target.value })
                          }
                          className="w-full px-3 py-2 text-xs rounded-lg bg-[#FAF7F2] border border-[#E6D1A0]/60 text-[#2F211B]"
                        >
                          {localCategories.map((cat) => (
                            <option key={cat.id} value={cat.name}>
                              {cat.name}
                            </option>
                          ))}
                          <option value="Other Products">Other Products</option>
                        </select>
                      </div>

                      <div>
                        <label className="block text-xs font-semibold text-[#4A3023] uppercase mb-1">
                          Or Type Custom Category
                        </label>
                        <input
                          type="text"
                          placeholder="Custom category name..."
                          value={editingProduct.category}
                          onChange={(e) =>
                            setEditingProduct({ ...editingProduct, category: e.target.value })
                          }
                          className="w-full px-3 py-2 text-xs rounded-lg bg-[#FAF7F2] border border-[#E6D1A0]/60"
                        />
                      </div>
                    </div>

                    {/* Image Management */}
                    <div className="space-y-3 pt-2 border-t border-[#FAF7F2]">
                      <div className="flex items-center justify-between">
                        <label className="block text-xs font-semibold text-[#4A3023] uppercase">
                          Product Images ({editingProduct.images?.length || 0})
                        </label>
                        <span className="text-[11px] text-[#7C6556]">
                          Click a thumbnail to set as main display image
                        </span>
                      </div>

                      {/* Thumbnails of current images */}
                      <div className="grid grid-cols-3 sm:grid-cols-4 gap-3">
                        {editingProduct.images?.map((img, idx) => {
                          const isMain = editingProduct.mainImage === img;
                          return (
                            <div
                              key={idx}
                              className={`relative group rounded-xl overflow-hidden border-2 p-1 bg-[#FAF7F2] transition-all cursor-pointer ${
                                isMain ? 'border-[#C49A43] shadow-xs' : 'border-gray-200 hover:border-gray-400'
                              }`}
                              onClick={() => setEditingProduct({ ...editingProduct, mainImage: img })}
                            >
                              <img
                                src={img}
                                alt={`Product thumbnail ${idx + 1}`}
                                className="w-full h-20 object-cover rounded-lg"
                              />
                              {isMain && (
                                <span className="absolute top-2 left-2 px-1.5 py-0.5 rounded text-[9px] font-bold bg-[#C49A43] text-[#2F211B]">
                                  Main
                                </span>
                              )}
                              <button
                                type="button"
                                onClick={(e) => {
                                  e.stopPropagation();
                                  const updatedImgs = editingProduct.images.filter((_, i) => i !== idx);
                                  const newMain = isMain ? updatedImgs[0] || '' : editingProduct.mainImage;
                                  setEditingProduct({
                                    ...editingProduct,
                                    images: updatedImgs,
                                    mainImage: newMain,
                                  });
                                }}
                                className="absolute top-2 right-2 w-6 h-6 rounded-full bg-red-600 text-white flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer shadow-sm"
                                title="Remove image"
                              >
                                <X className="w-3.5 h-3.5" />
                              </button>
                            </div>
                          );
                        })}
                      </div>

                      {/* Add Image by URL or Asset Path */}
                      <div className="flex items-center gap-2 pt-1">
                        <input
                          type="text"
                          placeholder="Enter image URL or asset path (/src/assets/images/...)"
                          value={newImageInput}
                          onChange={(e) => setNewImageInput(e.target.value)}
                          onKeyDown={(e) => {
                            if (e.key === 'Enter' && newImageInput.trim()) {
                              e.preventDefault();
                              const trimmed = newImageInput.trim();
                              const current = editingProduct.images || [];
                              setEditingProduct({
                                ...editingProduct,
                                images: [...current, trimmed],
                                mainImage: editingProduct.mainImage || trimmed,
                              });
                              setNewImageInput('');
                            }
                          }}
                          className="flex-1 px-3 py-2 text-xs rounded-lg bg-[#FAF7F2] border border-[#E6D1A0]/60 font-mono"
                        />
                        <button
                          type="button"
                          onClick={() => {
                            const trimmed = newImageInput.trim();
                            if (!trimmed) return;
                            const current = editingProduct.images || [];
                            setEditingProduct({
                              ...editingProduct,
                              images: [...current, trimmed],
                              mainImage: editingProduct.mainImage || trimmed,
                            });
                            setNewImageInput('');
                          }}
                          className="px-3.5 py-2 text-xs font-semibold text-white bg-[#4A3023] hover:bg-[#2F211B] rounded-lg shrink-0 cursor-pointer"
                        >
                          Add Image
                        </button>
                      </div>

                      {/* File upload from device */}
                      <div className="flex items-center gap-3 pt-1">
                        <label className="px-3 py-1.5 text-xs font-semibold text-[#4A3023] border border-[#C49A43] hover:bg-[#FAF7F2] rounded-lg flex items-center gap-1.5 cursor-pointer">
                          <Upload className="w-3.5 h-3.5 text-[#C49A43]" /> Upload from Device
                          <input
                            type="file"
                            accept="image/*"
                            multiple
                            className="hidden"
                            onChange={(e) => {
                              const files = e.target.files;
                              if (!files || files.length === 0) return;
                              Array.from(files).forEach((file) => {
                                const reader = new FileReader();
                                reader.onload = (uploadEvent) => {
                                  const base64 = uploadEvent.target?.result as string;
                                  if (base64) {
                                    setEditingProduct((prev) => {
                                      if (!prev) return prev;
                                      const current = prev.images || [];
                                      return {
                                        ...prev,
                                        images: [...current, base64],
                                        mainImage: prev.mainImage || base64,
                                      };
                                    });
                                  }
                                };
                                reader.readAsDataURL(file);
                              });
                              onShowToast('Image(s) uploaded successfully');
                            }}
                          />
                        </label>
                        <span className="text-[11px] text-[#7C6556]">
                          Supports JPEG, PNG, WebP
                        </span>
                      </div>
                    </div>

                    {/* Published checkbox */}
                    <div className="flex items-center gap-2 pt-2 border-t border-[#FAF7F2]">
                      <input
                        type="checkbox"
                        id="prodPublished"
                        checked={editingProduct.published}
                        onChange={(e) =>
                          setEditingProduct({ ...editingProduct, published: e.target.checked })
                        }
                        className="w-4 h-4 text-[#4A3023] rounded"
                      />
                      <label htmlFor="prodPublished" className="text-xs text-[#4A3023] font-medium cursor-pointer">
                        Publish this product on public website catalogue
                      </label>
                    </div>

                    {/* Modal Buttons */}
                    <div className="pt-4 flex justify-end gap-3 border-t border-[#FAF7F2]">
                      <button
                        onClick={() => setEditingProduct(null)}
                        className="px-4 py-2 text-xs rounded-lg border border-gray-300 hover:bg-gray-50 cursor-pointer"
                      >
                        Cancel
                      </button>
                      <button
                        onClick={() => {
                          if (!editingProduct.name.trim()) {
                            onShowToast('Product name is required', undefined, 'error');
                            return;
                          }
                          const exists = localProducts.some((p) => p.id === editingProduct.id);
                          const updated = exists
                            ? localProducts.map((p) => (p.id === editingProduct.id ? editingProduct : p))
                            : [editingProduct, ...localProducts];
                          setLocalProducts(updated);
                          setEditingProduct(null);
                          onShowToast(`Product "${editingProduct.name}" updated in local state. Remember to click "Save Products"!`);
                        }}
                        className="px-5 py-2 text-xs font-semibold text-white bg-[#4A3023] hover:bg-[#2F211B] rounded-lg cursor-pointer shadow-xs"
                      >
                        Apply Changes
                      </button>
                    </div>
                  </div>
                </div>
              )}

              {/* ======================================================= */}
              {/* PREVIEW PUBLIC CARD MODAL */}
              {/* ======================================================= */}
              {previewingProduct && (
                <div
                  className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs"
                  onClick={() => setPreviewingProduct(null)}
                >
                  <div
                    className="bg-white rounded-2xl max-w-sm w-full p-6 space-y-4 border border-[#C49A43] shadow-2xl"
                    onClick={(e) => e.stopPropagation()}
                  >
                    <div className="flex items-center justify-between pb-2 border-b border-[#FAF7F2]">
                      <span className="text-xs font-bold uppercase tracking-wider text-[#C49A43]">
                        Public Card Preview
                      </span>
                      <button
                        onClick={() => setPreviewingProduct(null)}
                        className="p-1 text-gray-500 hover:text-black cursor-pointer"
                      >
                        <X className="w-4 h-4" />
                      </button>
                    </div>

                    {/* Exact replica of public card */}
                    <div className="bg-white rounded-2xl overflow-hidden border border-[#C9A45C]/35 shadow-sm">
                      <div className="relative aspect-square w-full overflow-hidden bg-[#F5F0E7]">
                        <img
                          src={previewingProduct.mainImage || (previewingProduct.images && previewingProduct.images[0]) || ''}
                          alt={previewingProduct.name}
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <div className="p-5">
                        <h3 className="font-serif text-base font-medium text-[#3B261D] leading-snug">
                          {previewingProduct.name}
                        </h3>
                        {previewingProduct.category && (
                          <span className="text-[11px] uppercase tracking-wider text-[#8C7667] mt-2 block font-medium">
                            {previewingProduct.category}
                          </span>
                        )}
                      </div>
                    </div>

                    <div className="text-center pt-2">
                      <button
                        onClick={() => setPreviewingProduct(null)}
                        className="px-4 py-1.5 text-xs text-[#4A3023] border border-gray-300 rounded-lg hover:bg-gray-50 cursor-pointer"
                      >
                        Close Preview
                      </button>
                    </div>
                  </div>
                </div>
              )}
            </div>
          )}

          {/* ========================================================= */}
          {/* 7. CURTAINS & BLINDS COLLECTIONS */}
          {/* ========================================================= */}
          {activeTab === 'collections' && (
            <div className="space-y-6 animate-in fade-in duration-200">
              <div className="flex items-center justify-between pb-4 border-b border-[#FAF7F2]">
                <div>
                  <h2 className="font-serif text-2xl font-bold text-[#2F211B]">
                    Curtains, Fabrics & Blinds Catalogue
                  </h2>
                  <p className="text-xs text-[#7C6556]">
                    Manage categories, bespoke items, availability and pricing notes.
                  </p>
                </div>
                <div className="flex items-center gap-3">
                  <button
                    onClick={() => {
                      const newCol: CollectionItem = {
                        id: 'col-' + Date.now(),
                        name: 'New Fabric / Window Treatment',
                        category: 'Custom Curtains',
                        description: 'Detailed description of fabric or blinds...',
                        imageUrl: '/src/assets/images/hero_luxury_curtains_1791785736600.jpg',
                        availability: 'Custom Made to Measure',
                        indicativePrice: 'Custom quote per dimension',
                        sortOrder: localCollections.length + 1,
                        published: true,
                        featured: true,
                      };
                      setLocalCollections([...localCollections, newCol]);
                      setEditingCollection(newCol);
                    }}
                    className="px-4 py-2 text-xs font-semibold uppercase tracking-wider text-[#4A3023] border border-[#C49A43] hover:bg-[#FAF7F2] rounded-lg flex items-center gap-1.5 cursor-pointer"
                  >
                    <Plus className="w-4 h-4" /> Add Item
                  </button>
                  <button
                    onClick={handleSaveCollections}
                    className="px-5 py-2 text-xs font-semibold uppercase tracking-wider text-white bg-[#4A3023] hover:bg-[#2F211B] rounded-lg flex items-center gap-1.5 cursor-pointer shadow-xs"
                  >
                    <Save className="w-4 h-4" /> Save Catalogue
                  </button>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {localCollections.map((col) => (
                  <div
                    key={col.id}
                    className="p-4 rounded-xl bg-[#FAF7F2] border border-[#E6D1A0]/60 flex gap-4"
                  >
                    <img
                      src={col.imageUrl}
                      alt={col.name}
                      className="w-24 h-24 rounded-lg object-cover border border-[#E6D1A0] shrink-0"
                      referrerPolicy="no-referrer"
                    />
                    <div className="flex-1 min-w-0 flex flex-col justify-between">
                      <div>
                        <span className="text-[10px] uppercase font-bold text-[#C49A43]">
                          {col.category}
                        </span>
                        <h4 className="font-serif text-sm font-semibold text-[#2F211B] truncate">
                          {col.name}
                        </h4>
                        <p className="text-[11px] text-[#7C6556] line-clamp-1 mt-0.5">
                          {col.description}
                        </p>
                        <span className="text-[10px] text-[#A8988B] mt-1 block">
                          {col.availability}
                        </span>
                      </div>
                      <div className="flex items-center gap-2 pt-2">
                        <button
                          onClick={() => setEditingCollection(col)}
                          className="px-2.5 py-1 text-[11px] rounded border border-[#E6D1A0] text-[#4A3023] hover:bg-white"
                        >
                          Edit
                        </button>
                        <button
                          onClick={() => {
                            setLocalCollections(localCollections.filter((c) => c.id !== col.id));
                          }}
                          className="p-1 text-red-600 hover:bg-red-50 rounded"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Edit Collection Modal */}
              {editingCollection && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs">
                  <div className="bg-white rounded-2xl max-w-xl w-full p-6 space-y-4 border border-[#C49A43] shadow-2xl max-h-[90vh] overflow-y-auto">
                    <div className="flex items-center justify-between pb-3 border-b border-[#FAF7F2]">
                      <h3 className="font-serif text-lg font-bold text-[#2F211B]">
                        Edit Collection Item
                      </h3>
                      <button
                        onClick={() => setEditingCollection(null)}
                        className="p-1 text-gray-500 hover:text-black"
                      >
                        <X className="w-5 h-5" />
                      </button>
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-[#4A3023] uppercase mb-1">
                        Item Name
                      </label>
                      <input
                        type="text"
                        value={editingCollection.name}
                        onChange={(e) =>
                          setEditingCollection({ ...editingCollection, name: e.target.value })
                        }
                        className="w-full px-3 py-2 text-xs rounded-lg bg-[#FAF7F2] border border-[#E6D1A0]/60"
                      />
                    </div>

                    <div className="grid grid-cols-2 gap-3">
                      <div>
                        <label className="block text-xs font-semibold text-[#4A3023] uppercase mb-1">
                          Category
                        </label>
                        <input
                          type="text"
                          value={editingCollection.category}
                          onChange={(e) =>
                            setEditingCollection({ ...editingCollection, category: e.target.value })
                          }
                          className="w-full px-3 py-2 text-xs rounded-lg bg-[#FAF7F2] border border-[#E6D1A0]/60"
                        />
                      </div>
                      <div>
                        <label className="block text-xs font-semibold text-[#4A3023] uppercase mb-1">
                          Availability Status
                        </label>
                        <select
                          value={editingCollection.availability}
                          onChange={(e) =>
                            setEditingCollection({
                              ...editingCollection,
                              availability: e.target.value as any,
                            })
                          }
                          className="w-full px-3 py-2 text-xs rounded-lg bg-[#FAF7F2] border border-[#E6D1A0]/60"
                        >
                          <option value="Custom Made to Measure">Custom Made to Measure</option>
                          <option value="In Stock Fabrics">In Stock Fabrics</option>
                          <option value="Available on Order">Available on Order</option>
                        </select>
                      </div>
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-[#4A3023] uppercase mb-1">
                        Description
                      </label>
                      <textarea
                        rows={3}
                        value={editingCollection.description}
                        onChange={(e) =>
                          setEditingCollection({ ...editingCollection, description: e.target.value })
                        }
                        className="w-full px-3 py-2 text-xs rounded-lg bg-[#FAF7F2] border border-[#E6D1A0]/60"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-[#4A3023] uppercase mb-1">
                        Image URL / Asset Path
                      </label>
                      <input
                        type="text"
                        value={editingCollection.imageUrl}
                        onChange={(e) =>
                          setEditingCollection({ ...editingCollection, imageUrl: e.target.value })
                        }
                        className="w-full px-3 py-2 text-xs rounded-lg bg-[#FAF7F2] border border-[#E6D1A0]/60 font-mono"
                      />
                    </div>

                    <div className="pt-3 flex justify-end gap-3 border-t border-[#FAF7F2]">
                      <button
                        onClick={() => setEditingCollection(null)}
                        className="px-4 py-2 text-xs rounded-lg border border-gray-300"
                      >
                        Cancel
                      </button>
                      <button
                        onClick={() => {
                          const updated = localCollections.map((c) =>
                            c.id === editingCollection.id ? editingCollection : c
                          );
                          setLocalCollections(updated);
                          setEditingCollection(null);
                        }}
                        className="px-5 py-2 text-xs font-semibold text-white bg-[#4A3023] rounded-lg"
                      >
                        Apply Changes
                      </button>
                    </div>
                  </div>
                </div>
              )}
            </div>
          )}

          {/* ========================================================= */}
          {/* 7. GALLERY & PROJECTS */}
          {/* ========================================================= */}
          {activeTab === 'gallery' && (
            <div className="space-y-6 animate-in fade-in duration-200">
              <div className="flex items-center justify-between pb-4 border-b border-[#FAF7F2]">
                <div>
                  <h2 className="font-serif text-2xl font-bold text-[#2F211B]">
                    Project Gallery Management
                  </h2>
                  <p className="text-xs text-[#7C6556]">
                    Upload, replace, and edit project showcases across Abuja.
                  </p>
                </div>
                <div className="flex items-center gap-3">
                  <button
                    onClick={() => {
                      const newProj: GalleryProject = {
                        id: 'proj-' + Date.now(),
                        title: 'New Abuja Project Showcase',
                        category: 'Luxury Curtains',
                        location: 'Maitama, Abuja',
                        description: 'Custom draperies and pelmets...',
                        coverImageUrl: '/src/assets/images/hero_luxury_curtains_1791785736600.jpg',
                        isPlaceholder: false,
                        sortOrder: localGallery.length + 1,
                        published: true,
                        featured: true,
                      };
                      setLocalGallery([...localGallery, newProj]);
                      setEditingProject(newProj);
                    }}
                    className="px-4 py-2 text-xs font-semibold uppercase tracking-wider text-[#4A3023] border border-[#C49A43] hover:bg-[#FAF7F2] rounded-lg flex items-center gap-1.5 cursor-pointer"
                  >
                    <Plus className="w-4 h-4" /> Add Project
                  </button>
                  <button
                    onClick={handleSaveGallery}
                    className="px-5 py-2 text-xs font-semibold uppercase tracking-wider text-white bg-[#4A3023] hover:bg-[#2F211B] rounded-lg flex items-center gap-1.5 cursor-pointer shadow-xs"
                  >
                    <Save className="w-4 h-4" /> Save Gallery
                  </button>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {localGallery.map((proj) => (
                  <div
                    key={proj.id}
                    className="p-4 rounded-xl bg-[#FAF7F2] border border-[#E6D1A0]/60 flex gap-4"
                  >
                    <img
                      src={proj.coverImageUrl}
                      alt={proj.title}
                      className="w-24 h-24 rounded-lg object-cover border border-[#E6D1A0] shrink-0"
                      referrerPolicy="no-referrer"
                    />
                    <div className="flex-1 min-w-0 flex flex-col justify-between">
                      <div>
                        <span className="text-[10px] uppercase font-bold text-[#C49A43]">
                          {proj.category}
                        </span>
                        <h4 className="font-serif text-sm font-semibold text-[#2F211B] truncate">
                          {proj.title}
                        </h4>
                        <span className="text-[11px] text-[#7C6556] block">
                          {proj.location}
                        </span>
                      </div>
                      <div className="flex items-center gap-2 pt-2">
                        <button
                          onClick={() => setEditingProject(proj)}
                          className="px-2.5 py-1 text-[11px] rounded border border-[#E6D1A0] text-[#4A3023] hover:bg-white"
                        >
                          Edit
                        </button>
                        <button
                          onClick={() => {
                            setLocalGallery(localGallery.filter((g) => g.id !== proj.id));
                          }}
                          className="p-1 text-red-600 hover:bg-red-50 rounded"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Edit Project Modal */}
              {editingProject && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs">
                  <div className="bg-white rounded-2xl max-w-xl w-full p-6 space-y-4 border border-[#C49A43] shadow-2xl max-h-[90vh] overflow-y-auto">
                    <div className="flex items-center justify-between pb-3 border-b border-[#FAF7F2]">
                      <h3 className="font-serif text-lg font-bold text-[#2F211B]">
                        Edit Project Details
                      </h3>
                      <button
                        onClick={() => setEditingProject(null)}
                        className="p-1 text-gray-500 hover:text-black"
                      >
                        <X className="w-5 h-5" />
                      </button>
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-[#4A3023] uppercase mb-1">
                        Project Title
                      </label>
                      <input
                        type="text"
                        value={editingProject.title}
                        onChange={(e) =>
                          setEditingProject({ ...editingProject, title: e.target.value })
                        }
                        className="w-full px-3 py-2 text-xs rounded-lg bg-[#FAF7F2] border border-[#E6D1A0]/60"
                      />
                    </div>

                    <div className="grid grid-cols-2 gap-3">
                      <div>
                        <label className="block text-xs font-semibold text-[#4A3023] uppercase mb-1">
                          Category
                        </label>
                        <input
                          type="text"
                          value={editingProject.category}
                          onChange={(e) =>
                            setEditingProject({ ...editingProject, category: e.target.value })
                          }
                          className="w-full px-3 py-2 text-xs rounded-lg bg-[#FAF7F2] border border-[#E6D1A0]/60"
                        />
                      </div>
                      <div>
                        <label className="block text-xs font-semibold text-[#4A3023] uppercase mb-1">
                          Location (Abuja)
                        </label>
                        <input
                          type="text"
                          value={editingProject.location || ''}
                          onChange={(e) =>
                            setEditingProject({ ...editingProject, location: e.target.value })
                          }
                          className="w-full px-3 py-2 text-xs rounded-lg bg-[#FAF7F2] border border-[#E6D1A0]/60"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-[#4A3023] uppercase mb-1">
                        Description
                      </label>
                      <textarea
                        rows={3}
                        value={editingProject.description || ''}
                        onChange={(e) =>
                          setEditingProject({ ...editingProject, description: e.target.value })
                        }
                        className="w-full px-3 py-2 text-xs rounded-lg bg-[#FAF7F2] border border-[#E6D1A0]/60"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-[#4A3023] uppercase mb-1">
                        Cover Image URL
                      </label>
                      <input
                        type="text"
                        value={editingProject.coverImageUrl}
                        onChange={(e) =>
                          setEditingProject({ ...editingProject, coverImageUrl: e.target.value })
                        }
                        className="w-full px-3 py-2 text-xs rounded-lg bg-[#FAF7F2] border border-[#E6D1A0]/60 font-mono"
                      />
                    </div>

                    <div className="pt-3 flex justify-end gap-3 border-t border-[#FAF7F2]">
                      <button
                        onClick={() => setEditingProject(null)}
                        className="px-4 py-2 text-xs rounded-lg border border-gray-300"
                      >
                        Cancel
                      </button>
                      <button
                        onClick={() => {
                          const updated = localGallery.map((g) =>
                            g.id === editingProject.id ? editingProject : g
                          );
                          setLocalGallery(updated);
                          setEditingProject(null);
                        }}
                        className="px-5 py-2 text-xs font-semibold text-white bg-[#4A3023] rounded-lg"
                      >
                        Apply Changes
                      </button>
                    </div>
                  </div>
                </div>
              )}
            </div>
          )}

          {/* ========================================================= */}
          {/* 8. TESTIMONIALS */}
          {/* ========================================================= */}
          {activeTab === 'testimonials' && (
            <div className="space-y-6 animate-in fade-in duration-200">
              <div className="flex items-center justify-between pb-4 border-b border-[#FAF7F2]">
                <div>
                  <h2 className="font-serif text-2xl font-bold text-[#2F211B]">
                    Client Testimonials Management
                  </h2>
                  <p className="text-xs text-[#7C6556]">
                    Add, edit and manage customer feedback. Sample placeholders can be replaced with genuine reviews anytime.
                  </p>
                </div>
                <div className="flex items-center gap-3">
                  <button
                    onClick={() => {
                      const newTest: Testimonial = {
                        id: 'test-' + Date.now(),
                        clientName: 'New Client Name',
                        clientRoleOrLocation: 'Abuja Residence',
                        quote: 'The curtains were finished with immaculate pleating and prompt installation.',
                        rating: 5,
                        isPlaceholder: false,
                        published: true,
                      };
                      setLocalTestimonials([...localTestimonials, newTest]);
                      setEditingTestimonial(newTest);
                    }}
                    className="px-4 py-2 text-xs font-semibold uppercase tracking-wider text-[#4A3023] border border-[#C49A43] hover:bg-[#FAF7F2] rounded-lg flex items-center gap-1.5 cursor-pointer"
                  >
                    <Plus className="w-4 h-4" /> Add Review
                  </button>
                  <button
                    onClick={handleSaveTestimonials}
                    className="px-5 py-2 text-xs font-semibold uppercase tracking-wider text-white bg-[#4A3023] hover:bg-[#2F211B] rounded-lg flex items-center gap-1.5 cursor-pointer shadow-xs"
                  >
                    <Save className="w-4 h-4" /> Save Reviews
                  </button>
                </div>
              </div>

              <div className="space-y-4">
                {localTestimonials.map((t) => (
                  <div
                    key={t.id}
                    className="p-5 rounded-xl bg-[#FAF7F2] border border-[#E6D1A0]/60 flex items-start justify-between gap-4"
                  >
                    <div>
                      <div className="flex items-center gap-2">
                        <h4 className="font-serif text-base font-semibold text-[#2F211B]">
                          {t.clientName}
                        </h4>
                        <span className="text-xs text-[#7C6556]">({t.clientRoleOrLocation})</span>
                        {t.isPlaceholder && (
                          <span className="text-[10px] bg-amber-100 text-amber-800 px-2 py-0.5 rounded-sm">
                            Sample Placeholder
                          </span>
                        )}
                      </div>
                      <p className="text-xs text-[#5C4537] italic mt-2">
                        &ldquo;{t.quote}&rdquo;
                      </p>
                    </div>

                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => setEditingTestimonial(t)}
                        className="px-3 py-1.5 text-xs rounded border border-[#E6D1A0] text-[#4A3023] hover:bg-white"
                      >
                        Edit
                      </button>
                      <button
                        onClick={() =>
                          setLocalTestimonials(localTestimonials.filter((item) => item.id !== t.id))
                        }
                        className="p-1.5 text-red-600 hover:bg-red-50 rounded"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>

              {/* Edit Testimonial Modal */}
              {editingTestimonial && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs">
                  <div className="bg-white rounded-2xl max-w-md w-full p-6 space-y-4 border border-[#C49A43] shadow-2xl">
                    <div className="flex items-center justify-between pb-3 border-b border-[#FAF7F2]">
                      <h3 className="font-serif text-lg font-bold text-[#2F211B]">
                        Edit Testimonial
                      </h3>
                      <button
                        onClick={() => setEditingTestimonial(null)}
                        className="p-1 text-gray-500 hover:text-black"
                      >
                        <X className="w-5 h-5" />
                      </button>
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-[#4A3023] uppercase mb-1">
                        Client Name
                      </label>
                      <input
                        type="text"
                        value={editingTestimonial.clientName}
                        onChange={(e) =>
                          setEditingTestimonial({ ...editingTestimonial, clientName: e.target.value })
                        }
                        className="w-full px-3 py-2 text-xs rounded-lg bg-[#FAF7F2] border border-[#E6D1A0]/60"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-[#4A3023] uppercase mb-1">
                        Role / Abuja Residence
                      </label>
                      <input
                        type="text"
                        value={editingTestimonial.clientRoleOrLocation}
                        onChange={(e) =>
                          setEditingTestimonial({
                            ...editingTestimonial,
                            clientRoleOrLocation: e.target.value,
                          })
                        }
                        className="w-full px-3 py-2 text-xs rounded-lg bg-[#FAF7F2] border border-[#E6D1A0]/60"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-[#4A3023] uppercase mb-1">
                        Review Quote
                      </label>
                      <textarea
                        rows={3}
                        value={editingTestimonial.quote}
                        onChange={(e) =>
                          setEditingTestimonial({ ...editingTestimonial, quote: e.target.value })
                        }
                        className="w-full px-3 py-2 text-xs rounded-lg bg-[#FAF7F2] border border-[#E6D1A0]/60"
                      />
                    </div>

                    <div className="pt-3 flex justify-end gap-3 border-t border-[#FAF7F2]">
                      <button
                        onClick={() => setEditingTestimonial(null)}
                        className="px-4 py-2 text-xs rounded-lg border border-gray-300"
                      >
                        Cancel
                      </button>
                      <button
                        onClick={() => {
                          const updated = localTestimonials.map((t) =>
                            t.id === editingTestimonial.id ? editingTestimonial : t
                          );
                          setLocalTestimonials(updated);
                          setEditingTestimonial(null);
                        }}
                        className="px-5 py-2 text-xs font-semibold text-white bg-[#4A3023] rounded-lg"
                      >
                        Apply Changes
                      </button>
                    </div>
                  </div>
                </div>
              )}
            </div>
          )}

          {/* ========================================================= */}
          {/* 10. CONTACT ENQUIRIES & 11. QUOTE REQUESTS */}
          {/* ========================================================= */}
          {(activeTab === 'enquiries' || activeTab === 'quotes') && (() => {
            const isQuotesTab = activeTab === 'quotes';
            const quotesCount = enquiries.filter((e) => e.type === 'quote' || !e.type).length;
            const contactCount = enquiries.filter((e) => e.type === 'contact').length;
            
            // Filter enquiries based on selected pill, defaulting to active tab category
            const displayedEnquiries = enquiries.filter((e) => {
              if (enquiryFilterType === 'quotes') return e.type === 'quote' || !e.type;
              if (enquiryFilterType === 'contact') return e.type === 'contact';
              if (enquiryFilterType === 'all') return true;
              // If 'all' was not explicitly set, default to the current tab
              return isQuotesTab ? e.type === 'quote' || !e.type : e.type === 'contact';
            });

            return (
              <div className="space-y-6 animate-in fade-in duration-200">
                {/* Section Header */}
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-[#FAF7F2]">
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="text-[11px] font-bold uppercase tracking-wider text-[#C49A43] bg-amber-50 px-2 py-0.5 rounded border border-amber-200">
                        {isQuotesTab ? 'Section 11' : 'Section 10'}
                      </span>
                      <span className="text-xs text-[#7C6556] flex items-center gap-1">
                        <WhatsAppIcon className="w-3.5 h-3.5 fill-[#25D366]" />
                        WhatsApp Reply Enabled (09061302309)
                      </span>
                    </div>
                    <h2 className="font-serif text-2xl font-bold text-[#2F211B] mt-1">
                      {isQuotesTab ? 'Customer Quote Requests' : 'Inbound Contact Enquiries'}
                    </h2>
                    <p className="text-xs text-[#7C6556] mt-0.5">
                      {isQuotesTab
                        ? 'Customer requests for custom curtains, blinds, fabrics, and measurement consultations with direct WhatsApp reply capability.'
                        : 'General customer inquiries, fabric questions, and consultations with direct WhatsApp reply capability.'}
                    </p>
                  </div>

                  {/* Filter Pills */}
                  <div className="flex flex-wrap items-center gap-2">
                    <button
                      type="button"
                      onClick={() => setEnquiryFilterType(isQuotesTab ? 'quotes' : 'contact')}
                      className={`px-3 py-1.5 text-xs font-semibold rounded-lg border transition-colors cursor-pointer ${
                        enquiryFilterType === (isQuotesTab ? 'quotes' : 'contact') || (enquiryFilterType === 'all' && false)
                          ? 'bg-[#4A3023] text-white border-[#4A3023]'
                          : 'bg-white text-[#5C4537] border-gray-200 hover:bg-gray-50'
                      }`}
                    >
                      {isQuotesTab ? `Quotes Only (${quotesCount})` : `Contacts Only (${contactCount})`}
                    </button>
                    <button
                      type="button"
                      onClick={() => setEnquiryFilterType(isQuotesTab ? 'contact' : 'quotes')}
                      className={`px-3 py-1.5 text-xs font-semibold rounded-lg border transition-colors cursor-pointer ${
                        enquiryFilterType === (isQuotesTab ? 'contact' : 'quotes')
                          ? 'bg-[#4A3023] text-white border-[#4A3023]'
                          : 'bg-white text-[#5C4537] border-gray-200 hover:bg-gray-50'
                      }`}
                    >
                      {isQuotesTab ? `Contact Messages (${contactCount})` : `Quote Requests (${quotesCount})`}
                    </button>
                    <button
                      type="button"
                      onClick={() => setEnquiryFilterType('all')}
                      className={`px-3 py-1.5 text-xs font-semibold rounded-lg border transition-colors cursor-pointer ${
                        enquiryFilterType === 'all'
                          ? 'bg-[#4A3023] text-white border-[#4A3023]'
                          : 'bg-white text-[#5C4537] border-gray-200 hover:bg-gray-50'
                      }`}
                    >
                      Show All ({enquiries.length})
                    </button>
                  </div>
                </div>

                {/* Table or Empty State */}
                {displayedEnquiries.length === 0 ? (
                  <div className="p-12 text-center rounded-2xl bg-[#FAF7F2] border border-dashed border-[#E6D1A0] space-y-2">
                    <p className="text-sm font-semibold text-[#2F211B]">
                      No {isQuotesTab && enquiryFilterType !== 'contact' ? 'quote requests' : 'contact enquiries'} found in this view.
                    </p>
                    <p className="text-xs text-[#7C6556]">
                      Switch filters above or submit a test quote through the public Contact page.
                    </p>
                    {enquiryFilterType !== 'all' && (
                      <button
                        type="button"
                        onClick={() => setEnquiryFilterType('all')}
                        className="mt-2 px-3 py-1.5 text-xs font-semibold text-[#C49A43] bg-white rounded-lg border border-[#C49A43]/40 hover:bg-amber-50"
                      >
                        View All {enquiries.length} Enquiries
                      </button>
                    )}
                  </div>
                ) : (
                  <div className="overflow-x-auto rounded-xl border border-[#E6D1A0]/60 bg-white shadow-xs">
                    <table className="w-full text-xs text-left min-w-[760px]">
                      <thead className="bg-[#FAF7F2] text-[#4A3023] font-semibold border-b border-[#E6D1A0]/60">
                        <tr>
                          <th className="p-3">Date</th>
                          <th className="p-3">Customer Name</th>
                          <th className="p-3">Phone Number</th>
                          <th className="p-3">Service / Request</th>
                          <th className="p-3">Status</th>
                          <th className="p-3 text-center">Reply on WhatsApp</th>
                          <th className="p-3 text-right">Actions</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-[#FAF7F2]">
                        {displayedEnquiries.map((enq) => {
                          const phoneVal = validateAndNormalizeNigerianPhone(enq.phone);
                          return (
                            <tr key={enq.id} className="hover:bg-[#FAF7F2]/40 transition-colors">
                              <td className="p-3 text-[#7C6556] whitespace-nowrap">
                                <span className="block font-medium text-[#2F211B]">
                                  {new Date(enq.createdAt).toLocaleDateString(undefined, {
                                    month: 'short',
                                    day: 'numeric',
                                  })}
                                </span>
                                <span className="text-[10px] text-gray-400">
                                  {new Date(enq.createdAt).toLocaleTimeString([], {
                                    hour: '2-digit',
                                    minute: '2-digit',
                                  })}
                                </span>
                              </td>
                              <td className="p-3">
                                <span className="font-semibold text-[#2F211B] block">
                                  {enq.fullName}
                                </span>
                                {enq.email && (
                                  <span className="text-[10px] text-gray-500 block truncate max-w-[140px]">
                                    {enq.email}
                                  </span>
                                )}
                              </td>
                              <td className="p-3 whitespace-nowrap">
                                <span className="font-mono text-[#2F211B] block font-medium">
                                  {enq.phone}
                                </span>
                                {phoneVal.isValid ? (
                                  <span className="inline-flex items-center gap-1 text-[10px] text-emerald-700 font-semibold">
                                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-500"></span>
                                    {phoneVal.formattedDisplay}
                                  </span>
                                ) : (
                                  <span className="inline-flex items-center gap-1 text-[10px] text-amber-700 font-medium">
                                    <span className="w-1.5 h-1.5 rounded-full bg-amber-500"></span>
                                    Invalid Phone
                                  </span>
                                )}
                              </td>
                              <td className="p-3 max-w-[200px]">
                                <span className="font-medium text-[#2F211B] block truncate">
                                  {enq.serviceRequired}
                                </span>
                                <div className="flex items-center gap-1.5 mt-0.5">
                                  <span
                                    className={`px-1.5 py-0.2 rounded text-[9px] font-bold uppercase tracking-wider ${
                                      enq.type === 'quote'
                                        ? 'bg-amber-100 text-amber-900 border border-amber-200'
                                        : 'bg-blue-100 text-blue-900 border border-blue-200'
                                    }`}
                                  >
                                    {enq.type === 'quote' ? 'Quote' : 'Contact'}
                                  </span>
                                  {enq.locationArea && (
                                    <span className="text-[10px] text-gray-500 truncate">
                                      {enq.locationArea}
                                    </span>
                                  )}
                                </div>
                              </td>
                              <td className="p-3 whitespace-nowrap">
                                <select
                                  value={enq.status}
                                  onChange={(e) =>
                                    handleUpdateEnquiryStatus(enq.id, e.target.value as any)
                                  }
                                  className={`px-2 py-1 rounded-md text-[11px] font-semibold border cursor-pointer transition-colors ${
                                    enq.status === 'new'
                                      ? 'bg-amber-50 text-amber-900 border-amber-300'
                                      : enq.status === 'completed'
                                      ? 'bg-green-50 text-green-900 border-green-300'
                                      : enq.status === 'contacted'
                                      ? 'bg-emerald-50 text-emerald-900 border-emerald-300'
                                      : enq.status === 'in_progress'
                                      ? 'bg-blue-50 text-blue-900 border-blue-300'
                                      : 'bg-gray-100 text-gray-800 border-gray-300'
                                  }`}
                                >
                                  <option value="new">New</option>
                                  <option value="contacted">Contacted</option>
                                  <option value="in_progress">In Progress</option>
                                  <option value="completed">Completed</option>
                                  <option value="archived">Archived</option>
                                </select>
                              </td>

                              {/* WhatsApp Reply Column */}
                              <td className="p-3 text-center whitespace-nowrap">
                                {phoneVal.isValid ? (
                                  <button
                                    type="button"
                                    onClick={() => handleOpenWhatsAppReply(enq)}
                                    className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-white bg-[#25D366] hover:bg-[#1EBE5D] active:scale-95 transition-all rounded-lg shadow-xs cursor-pointer"
                                    title={`Prepare and review WhatsApp reply for ${enq.fullName} (${phoneVal.formattedDisplay})`}
                                  >
                                    <WhatsAppIcon className="w-3.5 h-3.5 fill-current shrink-0" />
                                    <span>Reply on WhatsApp</span>
                                  </button>
                                ) : (
                                  <div className="relative group inline-block">
                                    <button
                                      type="button"
                                      disabled
                                      className="inline-flex items-center gap-1.5 px-2.5 py-1.5 text-xs font-medium text-gray-400 bg-gray-100 border border-gray-200 rounded-lg cursor-not-allowed opacity-75"
                                    >
                                      <WhatsAppIcon className="w-3.5 h-3.5 fill-gray-400 shrink-0" />
                                      <span>Reply on WhatsApp</span>
                                    </button>
                                    {/* Tooltip explaining why disabled */}
                                    <div className="hidden group-hover:block absolute bottom-full mb-1.5 right-1/2 translate-x-1/2 z-50 w-56 p-2.5 bg-[#2F211B] text-white text-[11px] rounded-lg shadow-xl border border-[#C49A43]/40 pointer-events-none text-left">
                                      <p className="font-semibold text-amber-300 mb-0.5">WhatsApp Disabled</p>
                                      <p className="text-gray-200 leading-snug">
                                        {phoneVal.errorMessage || 'Customer did not provide a valid phone number.'}
                                      </p>
                                    </div>
                                  </div>
                                )}
                              </td>

                              {/* Actions Column */}
                              <td className="p-3 text-right space-x-2 whitespace-nowrap">
                                <button
                                  type="button"
                                  onClick={() => setSelectedEnquiry(enq)}
                                  className="text-[#C49A43] hover:underline font-semibold"
                                >
                                  View
                                </button>
                                <button
                                  type="button"
                                  onClick={() => handleDeleteEnquiry(enq.id)}
                                  className="text-red-600 hover:underline font-medium"
                                >
                                  Delete
                                </button>
                              </td>
                            </tr>
                          );
                        })}
                      </tbody>
                    </table>
                  </div>
                )}

                {/* ========================================================= */}
                {/* WHATSAPP REPLY REVIEW & COMPOSE MODAL */}
                {/* ========================================================= */}
                {whatsAppReplyEnquiry && (() => {
                  const val = validateAndNormalizeNigerianPhone(whatsAppReplyEnquiry.phone);
                  const isQuote = whatsAppReplyEnquiry.type === 'quote' || !whatsAppReplyEnquiry.type;

                  return (
                    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs">
                      <div className="bg-white rounded-2xl max-w-lg w-full p-6 sm:p-7 space-y-5 border border-[#25D366]/40 shadow-2xl animate-in zoom-in-95 duration-150">
                        {/* Modal Header */}
                        <div className="flex items-center justify-between pb-3 border-b border-[#FAF7F2]">
                          <div className="flex items-center gap-3">
                            <div className="w-10 h-10 rounded-xl bg-[#25D366]/15 border border-[#25D366]/30 flex items-center justify-center text-[#25D366]">
                              <WhatsAppIcon className="w-6 h-6 fill-current" />
                            </div>
                            <div>
                              <span className="text-[11px] uppercase tracking-wider font-bold text-[#1EBE5D]">
                                WhatsApp Direct Reply
                              </span>
                              <h3 className="font-serif text-xl font-bold text-[#2F211B]">
                                Reply to {whatsAppReplyEnquiry.fullName}
                              </h3>
                            </div>
                          </div>
                          <button
                            type="button"
                            onClick={() => setWhatsAppReplyEnquiry(null)}
                            className="p-1.5 text-gray-400 hover:text-black rounded-lg hover:bg-gray-100 transition-colors"
                            aria-label="Close"
                          >
                            <X className="w-5 h-5" />
                          </button>
                        </div>

                        {/* Customer & Phone Normalization Banner */}
                        <div className="p-3.5 rounded-xl bg-[#FAF7F2] border border-[#E6D1A0]/60 text-xs space-y-2">
                          <div className="flex justify-between items-center">
                            <span className="text-[#7C6556]">Customer Name:</span>
                            <span className="font-bold text-[#2F211B]">{whatsAppReplyEnquiry.fullName}</span>
                          </div>
                          <div className="flex justify-between items-center">
                            <span className="text-[#7C6556]">Entered Phone:</span>
                            <span className="font-mono text-[#2F211B]">{whatsAppReplyEnquiry.phone}</span>
                          </div>
                          <div className="flex justify-between items-center">
                            <span className="text-[#7C6556]">Normalized WhatsApp (E.164):</span>
                            <span className="font-mono font-bold text-[#1EBE5D] bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">
                              +{val.normalized} ({val.formattedDisplay})
                            </span>
                          </div>
                          <div className="flex justify-between items-center">
                            <span className="text-[#7C6556]">Enquiry Category:</span>
                            <span className="font-semibold text-[#4A3023]">
                              {isQuote ? 'Quote Request' : 'Contact Message'} &bull; {whatsAppReplyEnquiry.serviceRequired}
                            </span>
                          </div>
                          <div className="flex justify-between items-center pt-1 border-t border-[#E6D1A0]/30 text-[11px]">
                            <span className="text-[#7C6556]">IFYTEX Business Line:</span>
                            <span className="font-mono text-[#2F211B] font-medium">
                              {IFYTEX_BUSINESS_WHATSAPP_RAW} (+{IFYTEX_BUSINESS_WHATSAPP_INTL})
                            </span>
                          </div>
                        </div>

                        {/* Pre-filled Message Review & Editor */}
                        <div className="space-y-1.5">
                          <div className="flex items-center justify-between">
                            <label className="text-xs font-semibold text-[#4A3023] uppercase tracking-wider">
                              Personalised Message <span className="text-gray-400 font-normal lowercase">(edit before sending)</span>
                            </label>
                            <button
                              type="button"
                              onClick={() => {
                                const reset = generateEnquiryWhatsAppReplyMessage({
                                  fullName: whatsAppReplyEnquiry.fullName,
                                  type: whatsAppReplyEnquiry.type,
                                  serviceRequired: whatsAppReplyEnquiry.serviceRequired,
                                });
                                setWhatsAppReplyText(reset);
                              }}
                              className="text-[11px] text-[#C49A43] hover:underline font-semibold"
                            >
                              Reset Default Template
                            </button>
                          </div>
                          <textarea
                            rows={5}
                            value={whatsAppReplyText}
                            onChange={(e) => setWhatsAppReplyText(e.target.value)}
                            className="w-full p-3 text-xs rounded-xl bg-white border border-[#E6D1A0] text-[#2F211B] focus:border-[#25D366] focus:ring-1 focus:ring-[#25D366] outline-hidden leading-relaxed resize-y"
                            placeholder="Type reply message..."
                          />
                          <p className="text-[11px] text-[#7C6556] leading-snug">
                            This message will be pre-filled into WhatsApp Web or mobile app. You can make final edits in WhatsApp before clicking Send.
                          </p>
                        </div>

                        {/* Status Checkbox */}
                        <div className="flex items-center gap-2 pt-1">
                          <input
                            type="checkbox"
                            id="markContacted"
                            checked={markAsContactedOnReply}
                            onChange={(e) => setMarkAsContactedOnReply(e.target.checked)}
                            className="rounded border-[#E6D1A0] text-[#25D366] focus:ring-[#25D366]"
                          />
                          <label htmlFor="markContacted" className="text-xs text-[#5C4537] cursor-pointer select-none">
                            Update enquiry status to <strong>&ldquo;Contacted&rdquo;</strong> upon launching WhatsApp
                          </label>
                        </div>

                        {/* Modal Action Buttons */}
                        <div className="flex items-center justify-end gap-3 pt-3 border-t border-[#FAF7F2]">
                          <button
                            type="button"
                            onClick={() => setWhatsAppReplyEnquiry(null)}
                            className="px-4 py-2 text-xs font-semibold text-[#7C6556] hover:bg-gray-100 rounded-lg transition-colors cursor-pointer"
                          >
                            Cancel
                          </button>
                          <button
                            type="button"
                            onClick={() => handleLaunchWhatsAppChat(whatsAppReplyEnquiry, whatsAppReplyText)}
                            className="inline-flex items-center gap-2 px-5 py-2.5 text-xs font-bold text-white bg-[#25D366] hover:bg-[#1EBE5D] active:scale-95 transition-all rounded-lg shadow-md cursor-pointer"
                          >
                            <WhatsAppIcon className="w-4 h-4 fill-current shrink-0" />
                            <span>Launch WhatsApp Chat</span>
                          </button>
                        </div>
                      </div>
                    </div>
                  );
                })()}

                {/* ========================================================= */}
                {/* ENQUIRY DETAIL DRAWER / MODAL */}
                {/* ========================================================= */}
                {selectedEnquiry && (() => {
                  const selPhoneVal = validateAndNormalizeNigerianPhone(selectedEnquiry.phone);
                  return (
                    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs">
                      <div className="bg-white rounded-2xl max-w-lg w-full p-6 sm:p-8 space-y-4 border border-[#C49A43] shadow-2xl max-h-[90vh] overflow-y-auto">
                        <div className="flex items-center justify-between pb-3 border-b border-[#FAF7F2]">
                          <div>
                            <span className="text-[11px] uppercase font-bold text-[#C49A43]">
                              Enquiry Details &bull; {selectedEnquiry.type === 'quote' ? 'Quote Request' : 'Contact Message'}
                            </span>
                            <h3 className="font-serif text-xl font-bold text-[#2F211B]">
                              {selectedEnquiry.fullName}
                            </h3>
                          </div>
                          <button
                            type="button"
                            onClick={() => setSelectedEnquiry(null)}
                            className="p-1 text-gray-500 hover:text-black rounded-lg hover:bg-gray-100"
                          >
                            <X className="w-5 h-5" />
                          </button>
                        </div>

                        {/* WhatsApp Quick Reply Banner inside detail modal */}
                        <div className="p-3.5 rounded-xl border border-[#25D366]/40 bg-[#25D366]/5 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
                          <div>
                            <div className="flex items-center gap-1.5 text-[11px] font-bold uppercase tracking-wider text-[#1EBE5D]">
                              <WhatsAppIcon className="w-3.5 h-3.5 fill-current" />
                              <span>WhatsApp Reply</span>
                            </div>
                            <span className="text-xs text-[#2F211B] mt-0.5 block">
                              {selPhoneVal.isValid
                                ? `Ready to message: +${selPhoneVal.normalized} (${selPhoneVal.formattedDisplay})`
                                : selPhoneVal.errorMessage || 'No valid phone provided'}
                            </span>
                          </div>
                          {selPhoneVal.isValid ? (
                            <button
                              type="button"
                              onClick={() => {
                                setSelectedEnquiry(null);
                                handleOpenWhatsAppReply(selectedEnquiry);
                              }}
                              className="inline-flex items-center gap-1.5 px-3.5 py-2 text-xs font-bold text-white bg-[#25D366] hover:bg-[#1EBE5D] rounded-lg shadow-xs cursor-pointer shrink-0 transition-transform active:scale-95"
                            >
                              <WhatsAppIcon className="w-3.5 h-3.5 fill-current shrink-0" />
                              <span>Reply on WhatsApp</span>
                            </button>
                          ) : (
                            <span className="text-[11px] text-gray-500 italic bg-gray-100 px-2.5 py-1 rounded-md">
                              Phone invalid
                            </span>
                          )}
                        </div>

                        <div className="space-y-3 text-xs text-[#5C4537]">
                          <div className="grid grid-cols-2 gap-2 p-3 rounded-lg bg-[#FAF7F2]">
                            <div>
                              <strong className="block text-[#4A3023]">Phone Number:</strong>
                              <span className="font-mono">{selectedEnquiry.phone}</span>
                            </div>
                            <div>
                              <strong className="block text-[#4A3023]">Email:</strong>
                              <span>{selectedEnquiry.email || 'None provided'}</span>
                            </div>
                            {selectedEnquiry.locationArea && (
                              <div className="mt-2">
                                <strong className="block text-[#4A3023]">Location / Area:</strong>
                                <span>{selectedEnquiry.locationArea}</span>
                              </div>
                            )}
                            <div className="mt-2">
                              <strong className="block text-[#4A3023]">Service Requested:</strong>
                              <span>{selectedEnquiry.serviceRequired}</span>
                            </div>
                          </div>

                          <div>
                            <strong className="block text-[#4A3023] mb-1">
                              Room & Window Specifications:
                            </strong>
                            <div className="p-3 rounded-lg bg-[#FAF7F2] whitespace-pre-wrap leading-relaxed">
                              {selectedEnquiry.description}
                            </div>
                          </div>

                          {selectedEnquiry.attachedImageName && (
                            <div>
                              <strong className="block text-[#4A3023] mb-1">Attached Photo:</strong>
                              <span className="p-2 rounded bg-amber-50 text-amber-900 border border-amber-200 block">
                                File: {selectedEnquiry.attachedImageName}
                              </span>
                            </div>
                          )}

                          <div>
                            <strong className="block text-[#4A3023] mb-1">Internal Admin Notes:</strong>
                            <textarea
                              rows={3}
                              defaultValue={selectedEnquiry.internalNotes || ''}
                              onBlur={(e) =>
                                handleUpdateEnquiryStatus(
                                  selectedEnquiry.id,
                                  selectedEnquiry.status,
                                  e.target.value
                                )
                              }
                              placeholder="Record consultation notes, measurement appointments, or quotation amounts..."
                              className="w-full px-3 py-2 rounded-lg bg-[#FAF7F2] border border-[#E6D1A0]/60"
                            />
                          </div>
                        </div>

                        <div className="pt-3 border-t border-[#FAF7F2] flex justify-end">
                          <button
                            type="button"
                            onClick={() => setSelectedEnquiry(null)}
                            className="px-5 py-2 text-xs font-semibold text-white bg-[#4A3023] rounded-lg cursor-pointer"
                          >
                            Done
                          </button>
                        </div>
                      </div>
                    </div>
                  );
                })()}
              </div>
            );
          })()}

          {/* ========================================================= */}
          {/* 11. SOCIAL MEDIA SETTINGS */}
          {/* ========================================================= */}
          {activeTab === 'social' && (
            <div className="space-y-6 animate-in fade-in duration-200">
              <div className="flex items-center justify-between pb-4 border-b border-[#FAF7F2]">
                <div>
                  <h2 className="font-serif text-2xl font-bold text-[#2F211B]">
                    Social Media Integration
                  </h2>
                  <p className="text-xs text-[#7C6556]">
                    Configure Facebook, Instagram and WhatsApp links. Icons automatically hide if URLs are blank.
                  </p>
                </div>
                <button
                  onClick={handleSaveCompanySettings}
                  className="px-5 py-2.5 text-xs font-semibold uppercase tracking-wider text-white bg-[#4A3023] hover:bg-[#2F211B] rounded-lg flex items-center gap-1.5 cursor-pointer shadow-xs"
                >
                  <Save className="w-4 h-4" /> Save Social Links
                </button>
              </div>

              <div className="space-y-4">
                <div>
                  <label className="block text-xs font-semibold text-[#4A3023] uppercase mb-1">
                    WhatsApp Phone Number (for WhatsApp Click-to-Chat)
                  </label>
                  <input
                    type="text"
                    value={localSettings.whatsappNumber}
                    onChange={(e) =>
                      setLocalSettings({ ...localSettings, whatsappNumber: e.target.value })
                    }
                    className="w-full px-4 py-2.5 text-xs rounded-lg bg-[#FAF7F2] border border-[#E6D1A0]/60 text-[#2F211B]"
                  />
                  <span className="text-[11px] text-[#7C6556] mt-1 block">
                    Automatically generates formatted links with Nigerian country code +234.
                  </span>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-[#4A3023] uppercase mb-1">
                    Instagram Profile URL
                  </label>
                  <input
                    type="url"
                    value={localSettings.instagramUrl}
                    onChange={(e) =>
                      setLocalSettings({ ...localSettings, instagramUrl: e.target.value })
                    }
                    placeholder="https://instagram.com/yourhandle"
                    className="w-full px-4 py-2.5 text-xs rounded-lg bg-[#FAF7F2] border border-[#E6D1A0]/60 text-[#2F211B]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-[#4A3023] uppercase mb-1">
                    Facebook Profile / Page URL
                  </label>
                  <input
                    type="url"
                    value={localSettings.facebookUrl}
                    onChange={(e) =>
                      setLocalSettings({ ...localSettings, facebookUrl: e.target.value })
                    }
                    placeholder="https://facebook.com/yourpage"
                    className="w-full px-4 py-2.5 text-xs rounded-lg bg-[#FAF7F2] border border-[#E6D1A0]/60 text-[#2F211B]"
                  />
                </div>
              </div>
            </div>
          )}

          {/* ========================================================= */}
          {/* 12. AUTOMATED REPLIES & INTEGRATIONS */}
          {/* ========================================================= */}
          {activeTab === 'automated' && (
            <div className="space-y-6 animate-in fade-in duration-200">
              <div className="flex items-center justify-between pb-4 border-b border-[#FAF7F2]">
                <div>
                  <h2 className="font-serif text-2xl font-bold text-[#2F211B]">
                    Automated Replies & Integration Gateway
                  </h2>
                  <p className="text-xs text-[#7C6556]">
                    Configure on-screen confirmation text, email templates, and pre-filled WhatsApp copy.
                  </p>
                </div>
                <button
                  onClick={handleSaveAutomated}
                  className="px-5 py-2.5 text-xs font-semibold uppercase tracking-wider text-white bg-[#4A3023] hover:bg-[#2F211B] rounded-lg flex items-center gap-1.5 cursor-pointer shadow-xs"
                >
                  <Save className="w-4 h-4" /> Save Templates
                </button>
              </div>

              {/* Status transparency card as required by prompt */}
              <div className="p-5 rounded-xl bg-amber-50 border border-amber-200 text-xs text-amber-900 space-y-2">
                <div className="font-semibold text-sm flex items-center gap-1.5">
                  <span>Integration Gateway Status</span>
                </div>
                <p>
                  <strong>Website On-Screen Acknowledgement:</strong> Active & Immediate.
                </p>
                <p>
                  <strong>Direct WhatsApp Chat Link:</strong> Active via official wa.me protocols.
                </p>
                <p>
                  <strong>Server-Side Auto-Email & WhatsApp Business Cloud API:</strong> Pending third-party API credentials (e.g. Resend / Meta WhatsApp Cloud API credentials). Forms safely persist all customer submissions to persistent storage.
                </p>
              </div>

              <div className="space-y-4">
                <div>
                  <label className="block text-xs font-semibold text-[#4A3023] uppercase mb-1">
                    Website Form Success Acknowledgement Text
                  </label>
                  <textarea
                    rows={3}
                    value={localAutomated.websiteSuccessMessage}
                    onChange={(e) =>
                      setLocalAutomated({ ...localAutomated, websiteSuccessMessage: e.target.value })
                    }
                    className="w-full px-4 py-2.5 text-xs rounded-lg bg-[#FAF7F2] border border-[#E6D1A0]/60 text-[#2F211B]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-[#4A3023] uppercase mb-1">
                    WhatsApp Pre-Filled Message (when customer clicks WhatsApp button)
                  </label>
                  <input
                    type="text"
                    value={localAutomated.whatsappPrefilledMessage}
                    onChange={(e) =>
                      setLocalAutomated({
                        ...localAutomated,
                        whatsappPrefilledMessage: e.target.value,
                      })
                    }
                    className="w-full px-4 py-2.5 text-xs rounded-lg bg-[#FAF7F2] border border-[#E6D1A0]/60 text-[#2F211B]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-[#4A3023] uppercase mb-1">
                    Email Acknowledgement Template
                  </label>
                  <textarea
                    rows={5}
                    value={localAutomated.emailAckTemplate}
                    onChange={(e) =>
                      setLocalAutomated({ ...localAutomated, emailAckTemplate: e.target.value })
                    }
                    className="w-full px-4 py-2.5 text-xs rounded-lg bg-[#FAF7F2] border border-[#E6D1A0]/60 text-[#2F211B] font-mono text-[11px]"
                  />
                </div>
              </div>
            </div>
          )}

          {/* ========================================================= */}
          {/* 13. SEO SETTINGS */}
          {/* ========================================================= */}
          {activeTab === 'seo' && (
            <div className="space-y-6 animate-in fade-in duration-200">
              <div className="flex items-center justify-between pb-4 border-b border-[#FAF7F2]">
                <div>
                  <h2 className="font-serif text-2xl font-bold text-[#2F211B]">
                    Search Engine Optimization & Metadata
                  </h2>
                  <p className="text-xs text-[#7C6556]">
                    Configure titles, meta descriptions, and OpenGraph tags for search engines and social sharing.
                  </p>
                </div>
                <button
                  onClick={handleSaveSeo}
                  className="px-5 py-2.5 text-xs font-semibold uppercase tracking-wider text-white bg-[#4A3023] hover:bg-[#2F211B] rounded-lg flex items-center gap-1.5 cursor-pointer shadow-xs"
                >
                  <Save className="w-4 h-4" /> Save SEO
                </button>
              </div>

              <div className="space-y-4">
                <div>
                  <label className="block text-xs font-semibold text-[#4A3023] uppercase mb-1">
                    Page Meta Title
                  </label>
                  <input
                    type="text"
                    value={localSeo.metaTitle}
                    onChange={(e) => setLocalSeo({ ...localSeo, metaTitle: e.target.value })}
                    className="w-full px-4 py-2.5 text-xs rounded-lg bg-[#FAF7F2] border border-[#E6D1A0]/60 text-[#2F211B]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-[#4A3023] uppercase mb-1">
                    Meta Description
                  </label>
                  <textarea
                    rows={3}
                    value={localSeo.metaDescription}
                    onChange={(e) => setLocalSeo({ ...localSeo, metaDescription: e.target.value })}
                    className="w-full px-4 py-2.5 text-xs rounded-lg bg-[#FAF7F2] border border-[#E6D1A0]/60 text-[#2F211B]"
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-[#4A3023] uppercase mb-1">
                      OpenGraph Title
                    </label>
                    <input
                      type="text"
                      value={localSeo.ogTitle}
                      onChange={(e) => setLocalSeo({ ...localSeo, ogTitle: e.target.value })}
                      className="w-full px-4 py-2.5 text-xs rounded-lg bg-[#FAF7F2] border border-[#E6D1A0]/60 text-[#2F211B]"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-[#4A3023] uppercase mb-1">
                      Canonical Website URL
                    </label>
                    <input
                      type="url"
                      value={localSeo.canonicalUrl}
                      onChange={(e) => setLocalSeo({ ...localSeo, canonicalUrl: e.target.value })}
                      className="w-full px-4 py-2.5 text-xs rounded-lg bg-[#FAF7F2] border border-[#E6D1A0]/60 text-[#2F211B]"
                    />
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* ========================================================= */}
          {/* 14. NAVIGATION & FOOTER */}
          {/* ========================================================= */}
          {activeTab === 'nav-footer' && (
            <div className="space-y-6 animate-in fade-in duration-200">
              <div className="flex items-center justify-between pb-4 border-b border-[#FAF7F2]">
                <div>
                  <h2 className="font-serif text-2xl font-bold text-[#2F211B]">
                    Navigation & Footer Settings
                  </h2>
                  <p className="text-xs text-[#7C6556]">
                    Configure global copyright text, custom logo replacement, and legal notices.
                  </p>
                </div>
                <button
                  onClick={handleSaveCompanySettings}
                  className="px-5 py-2.5 text-xs font-semibold uppercase tracking-wider text-white bg-[#4A3023] hover:bg-[#2F211B] rounded-lg flex items-center gap-1.5 cursor-pointer shadow-xs"
                >
                  <Save className="w-4 h-4" /> Save Navigation
                </button>
              </div>

              <div className="space-y-4">
                <div>
                  <label className="block text-xs font-semibold text-[#4A3023] uppercase mb-1">
                    Custom Logo Image URL (leave blank to use official approved emblem)
                  </label>
                  <input
                    type="text"
                    value={localSettings.logoUrl || ''}
                    onChange={(e) => setLocalSettings({ ...localSettings, logoUrl: e.target.value })}
                    placeholder="e.g. /custom-logo.png"
                    className="w-full px-4 py-2.5 text-xs rounded-lg bg-[#FAF7F2] border border-[#E6D1A0]/60 text-[#2F211B] font-mono"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-[#4A3023] uppercase mb-1">
                    Footer Copyright Text
                  </label>
                  <input
                    type="text"
                    value={localSettings.copyrightText}
                    onChange={(e) =>
                      setLocalSettings({ ...localSettings, copyrightText: e.target.value })
                    }
                    className="w-full px-4 py-2.5 text-xs rounded-lg bg-[#FAF7F2] border border-[#E6D1A0]/60 text-[#2F211B]"
                  />
                </div>
              </div>
            </div>
          )}

          {/* ========================================================= */}
          {/* 15. BRAND VIDEO SHOWCASE */}
          {/* ========================================================= */}
          {activeTab === 'video' && (
            <div className="space-y-6 animate-in fade-in duration-200">
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pb-4 border-b border-[#FAF7F2]">
                <div>
                  <h2 className="font-serif text-2xl font-bold text-[#2F211B]">
                    Brand Video Showcase Management
                  </h2>
                  <p className="text-xs text-[#7C6556]">
                    Configure the craftsmanship video showcase featured on your homepage. Customise video sources, cover photography, text narrative, and direct WhatsApp consultations.
                  </p>
                </div>
                <button
                  onClick={handleSaveVideoSection}
                  className="px-6 py-2.5 text-xs font-semibold uppercase tracking-wider text-white bg-[#4A3023] hover:bg-[#2F211B] rounded-lg shadow-sm flex items-center gap-2 cursor-pointer shrink-0"
                >
                  <Save className="w-4 h-4" /> Save Video Section
                </button>
              </div>

              {/* Visibility Toggle Banner */}
              <div className="p-5 rounded-2xl bg-[#FAF7F2] border border-[#E6D1A0]/60 flex items-center justify-between">
                <div>
                  <div className="flex items-center gap-2">
                    <span className="font-serif text-base font-bold text-[#2F211B]">
                      Video Showcase Section Status
                    </span>
                    <span
                      className={`px-2.5 py-0.5 rounded-full text-[11px] font-semibold ${
                        localVideo.enabled
                          ? 'bg-emerald-100 text-emerald-800 border border-emerald-300'
                          : 'bg-zinc-200 text-zinc-700 border border-zinc-300'
                      }`}
                    >
                      {localVideo.enabled ? 'Active on Homepage' : 'Hidden from Public'}
                    </span>
                  </div>
                  <p className="text-xs text-[#7C6556] mt-1">
                    When enabled, the high-definition video showcase is rendered prominently between Featured Collections and Selected Projects.
                  </p>
                </div>
                <button
                  type="button"
                  onClick={() => setLocalVideo({ ...localVideo, enabled: !localVideo.enabled })}
                  className={`relative inline-flex h-6 w-11 shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-hidden ${
                    localVideo.enabled ? 'bg-[#C49A43]' : 'bg-gray-300'
                  }`}
                >
                  <span
                    className={`pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow-sm ring-0 transition duration-200 ease-in-out ${
                      localVideo.enabled ? 'translate-x-5' : 'translate-x-0'
                    }`}
                  />
                </button>
              </div>

              {/* Video Media Source & Preview Card */}
              <div className="p-6 rounded-2xl bg-white border border-[#E6D1A0]/60 space-y-5 shadow-xs">
                <div className="flex items-center justify-between">
                  <h3 className="font-serif text-lg font-bold text-[#2F211B] flex items-center gap-2">
                    <Video className="w-5 h-5 text-[#C49A43]" /> Video Source & Media Assets
                  </h3>
                  <span className="text-xs text-[#7C6556]">
                    Supports YouTube, Vimeo, and Direct MP4 files
                  </span>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  {/* Left Column: Media Settings */}
                  <div className="space-y-4">
                    <div>
                      <label className="block text-xs font-semibold text-[#4A3023] uppercase mb-1">
                        Video Stream URL (YouTube, Vimeo or MP4)
                      </label>
                      <input
                        type="text"
                        value={localVideo.videoUrl}
                        onChange={(e) => setLocalVideo({ ...localVideo, videoUrl: e.target.value })}
                        placeholder="https://www.youtube.com/watch?v=... or https://example.com/video.mp4"
                        className="w-full px-4 py-2.5 text-xs rounded-lg bg-[#FAF7F2] border border-[#E6D1A0]/60 text-[#2F211B] font-mono"
                      />
                      <div className="flex flex-wrap gap-2 mt-2">
                        <button
                          type="button"
                          onClick={() =>
                            setLocalVideo({
                              ...localVideo,
                              videoUrl:
                                'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4',
                            })
                          }
                          className="px-2.5 py-1 text-[11px] rounded bg-[#FAF7F2] border border-[#E6D1A0]/60 text-[#4A3023] hover:bg-white"
                        >
                          Use Sample Showcase MP4
                        </button>
                      </div>
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-[#4A3023] uppercase mb-1">
                        Poster Cover Image URL
                      </label>
                      <input
                        type="text"
                        value={localVideo.posterImageUrl}
                        onChange={(e) =>
                          setLocalVideo({ ...localVideo, posterImageUrl: e.target.value })
                        }
                        placeholder="/src/assets/images/hero_luxury_curtains_hd_1791792231098.jpg"
                        className="w-full px-4 py-2.5 text-xs rounded-lg bg-[#FAF7F2] border border-[#E6D1A0]/60 text-[#2F211B] font-mono"
                      />
                      <div className="flex flex-wrap gap-2 mt-2">
                        <span className="text-[11px] text-[#7C6556] self-center">Presets:</span>
                        <button
                          type="button"
                          onClick={() =>
                            setLocalVideo({
                              ...localVideo,
                              posterImageUrl:
                                '/src/assets/images/hero_luxury_curtains_hd_1791792231098.jpg',
                            })
                          }
                          className="px-2.5 py-1 text-[11px] rounded bg-[#FAF7F2] border border-[#E6D1A0]/60 text-[#4A3023] hover:bg-white"
                        >
                          HD Curtains
                        </button>
                        <button
                          type="button"
                          onClick={() =>
                            setLocalVideo({
                              ...localVideo,
                              posterImageUrl:
                                '/src/assets/images/hero_blinds_interior_hd_1791792246697.jpg',
                            })
                          }
                          className="px-2.5 py-1 text-[11px] rounded bg-[#FAF7F2] border border-[#E6D1A0]/60 text-[#4A3023] hover:bg-white"
                        >
                          HD Modern Blinds
                        </button>
                      </div>
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-[#4A3023] uppercase mb-1">
                        Duration / Badge Note
                      </label>
                      <input
                        type="text"
                        value={localVideo.durationNote || ''}
                        onChange={(e) =>
                          setLocalVideo({ ...localVideo, durationNote: e.target.value })
                        }
                        placeholder="01:30 Showcase & Installation Tour"
                        className="w-full px-4 py-2.5 text-xs rounded-lg bg-[#FAF7F2] border border-[#E6D1A0]/60 text-[#2F211B]"
                      />
                    </div>
                  </div>

                  {/* Right Column: Live Player Preview */}
                  <div className="space-y-2">
                    <span className="block text-xs font-semibold text-[#4A3023] uppercase">
                      Live Video / Poster Preview
                    </span>
                    <div className="relative aspect-video rounded-xl overflow-hidden bg-black border border-[#E6D1A0]/40 flex items-center justify-center">
                      {localVideo.videoUrl.endsWith('.mp4') ? (
                        <video
                          src={localVideo.videoUrl}
                          poster={localVideo.posterImageUrl}
                          controls
                          playsInline
                          className="w-full h-full object-cover"
                        />
                      ) : (
                        <div className="relative w-full h-full">
                          <img
                            src={localVideo.posterImageUrl}
                            alt="Preview poster"
                            className="w-full h-full object-cover"
                          />
                          <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
                            <div className="w-14 h-14 rounded-full bg-[#E6D1A0] text-[#2F211B] flex items-center justify-center shadow-lg">
                              <Play className="w-6 h-6 ml-1 fill-current" />
                            </div>
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </div>

              {/* Headings & Narrative Copy */}
              <div className="p-6 rounded-2xl bg-white border border-[#E6D1A0]/60 space-y-4 shadow-xs">
                <h3 className="font-serif text-lg font-bold text-[#2F211B]">
                  Section Copywriting & Brand Headlines
                </h3>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-[#4A3023] uppercase mb-1">
                      Eyebrow Badge
                    </label>
                    <input
                      type="text"
                      value={localVideo.badge}
                      onChange={(e) => setLocalVideo({ ...localVideo, badge: e.target.value })}
                      placeholder="CRAFTSMANSHIP IN MOTION"
                      className="w-full px-4 py-2.5 text-xs rounded-lg bg-[#FAF7F2] border border-[#E6D1A0]/60 text-[#2F211B]"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-[#4A3023] uppercase mb-1">
                      Subtitle / Location Focus
                    </label>
                    <input
                      type="text"
                      value={localVideo.subtitle}
                      onChange={(e) => setLocalVideo({ ...localVideo, subtitle: e.target.value })}
                      placeholder="Bespoke Curtains, Motorized Tracks & Tailored Blinds in Abuja"
                      className="w-full px-4 py-2.5 text-xs rounded-lg bg-[#FAF7F2] border border-[#E6D1A0]/60 text-[#2F211B]"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-[#4A3023] uppercase mb-1">
                    Main Headline
                  </label>
                  <input
                    type="text"
                    value={localVideo.title}
                    onChange={(e) => setLocalVideo({ ...localVideo, title: e.target.value })}
                    placeholder="Experience the Movement, Texture & Elegance of IFYTEX"
                    className="w-full px-4 py-2.5 text-xs rounded-lg bg-[#FAF7F2] border border-[#E6D1A0]/60 text-[#2F211B]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-[#4A3023] uppercase mb-1">
                    Narrative Description
                  </label>
                  <textarea
                    rows={3}
                    value={localVideo.description}
                    onChange={(e) => setLocalVideo({ ...localVideo, description: e.target.value })}
                    placeholder="Detailed explanation of the bespoke craftsmanship..."
                    className="w-full px-4 py-2.5 text-xs rounded-lg bg-[#FAF7F2] border border-[#E6D1A0]/60 text-[#2F211B]"
                  />
                </div>
              </div>

              {/* Call to Action Buttons */}
              <div className="p-6 rounded-2xl bg-white border border-[#E6D1A0]/60 space-y-4 shadow-xs">
                <h3 className="font-serif text-lg font-bold text-[#2F211B]">
                  Conversion Actions & Navigation
                </h3>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-[#4A3023] uppercase mb-1">
                      Primary Button Text
                    </label>
                    <input
                      type="text"
                      value={localVideo.ctaButtonText}
                      onChange={(e) =>
                        setLocalVideo({ ...localVideo, ctaButtonText: e.target.value })
                      }
                      placeholder="Book a Consultation"
                      className="w-full px-4 py-2.5 text-xs rounded-lg bg-[#FAF7F2] border border-[#E6D1A0]/60 text-[#2F211B]"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-[#4A3023] uppercase mb-1">
                      Primary Destination
                    </label>
                    <select
                      value={localVideo.ctaButtonLink}
                      onChange={(e) =>
                        setLocalVideo({
                          ...localVideo,
                          ctaButtonLink: e.target.value as VideoSectionConfig['ctaButtonLink'],
                        })
                      }
                      className="w-full px-4 py-2.5 text-xs rounded-lg bg-[#FAF7F2] border border-[#E6D1A0]/60 text-[#2F211B]"
                    >
                      <option value="contact">Contact & Measurement Request</option>
                      <option value="whatsapp">Direct WhatsApp Chat</option>
                      <option value="curtains-blinds">Curtains & Blinds Catalogue</option>
                      <option value="services">Services Overview</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-[#4A3023] uppercase mb-1">
                      Secondary WhatsApp Button Label
                    </label>
                    <input
                      type="text"
                      value={localVideo.secondaryCtaText || ''}
                      onChange={(e) =>
                        setLocalVideo({ ...localVideo, secondaryCtaText: e.target.value })
                      }
                      placeholder="Chat on WhatsApp"
                      className="w-full px-4 py-2.5 text-xs rounded-lg bg-[#FAF7F2] border border-[#E6D1A0]/60 text-[#2F211B]"
                    />
                  </div>
                </div>
              </div>

              {/* Craftsmanship Highlights */}
              <div className="p-6 rounded-2xl bg-white border border-[#E6D1A0]/60 space-y-4 shadow-xs">
                <div className="flex items-center justify-between">
                  <h3 className="font-serif text-lg font-bold text-[#2F211B]">
                    Craftsmanship Highlights (Key Bullet Cards)
                  </h3>
                  <button
                    type="button"
                    onClick={() =>
                      setLocalVideo({
                        ...localVideo,
                        highlights: [...(localVideo.highlights || []), 'New craftsmanship highlight'],
                      })
                    }
                    className="px-3 py-1.5 text-xs font-semibold uppercase tracking-wider text-[#4A3023] border border-[#C49A43] hover:bg-[#FAF7F2] rounded-lg flex items-center gap-1 cursor-pointer"
                  >
                    <Plus className="w-3.5 h-3.5" /> Add Highlight
                  </button>
                </div>

                <div className="space-y-3">
                  {(localVideo.highlights || []).map((highlight, idx) => (
                    <div key={idx} className="flex items-center gap-2">
                      <input
                        type="text"
                        value={highlight}
                        onChange={(e) => {
                          const updated = [...localVideo.highlights];
                          updated[idx] = e.target.value;
                          setLocalVideo({ ...localVideo, highlights: updated });
                        }}
                        className="flex-1 px-4 py-2 text-xs rounded-lg bg-[#FAF7F2] border border-[#E6D1A0]/60 text-[#2F211B]"
                      />
                      <button
                        type="button"
                        onClick={() => {
                          const updated = localVideo.highlights.filter((_, i) => i !== idx);
                          setLocalVideo({ ...localVideo, highlights: updated });
                        }}
                        className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors cursor-pointer"
                        title="Delete highlight"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  ))}
                </div>
              </div>

              {/* Bottom Save Action */}
              <div className="pt-2 flex justify-end">
                <button
                  type="button"
                  onClick={handleSaveVideoSection}
                  className="px-8 py-3.5 text-xs font-semibold uppercase tracking-wider text-white bg-[#4A3023] hover:bg-[#2F211B] rounded-lg shadow-md flex items-center gap-2 cursor-pointer"
                >
                  <Save className="w-4 h-4" /> Save Video Showcase Settings
                </button>
              </div>
            </div>
          )}

          {/* ========================================================= */}
          {/* 16. IMAGE & MEDIA ASSETS */}
          {/* ========================================================= */}
          {activeTab === 'media' && (
            <div className="space-y-6 animate-in fade-in duration-200">
              <div className="pb-4 border-b border-[#FAF7F2]">
                <h2 className="font-serif text-2xl font-bold text-[#2F211B]">
                  Image & Media Asset Library
                </h2>
                <p className="text-xs text-[#7C6556]">
                  High-fidelity photography assets created for IFYTEX Interior Design. Click any asset path to copy.
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {[
                  {
                    name: 'HD Luxury Curtains (Hero 1)',
                    path: '/src/assets/images/hero_luxury_curtains_hd_1791792231098.jpg',
                  },
                  {
                    name: 'HD Modern Blinds & Lounge (Hero 2)',
                    path: '/src/assets/images/hero_blinds_interior_hd_1791792246697.jpg',
                  },
                  {
                    name: 'Curtains & Pelmet Detail',
                    path: '/src/assets/images/showcase_curtains_detail_1791785758487.jpg',
                  },
                  {
                    name: 'Modern Vertical Blinds',
                    path: '/src/assets/images/showcase_modern_blinds_1791785768916.jpg',
                  },
                  {
                    name: 'Curtain Accessories & Hardware',
                    path: '/src/assets/images/curtain_accessories_hardware_1791789886437.jpg',
                  },
                  {
                    name: 'Pelmets and Tracks',
                    path: '/src/assets/images/pelmets_and_tracks_1791789900318.jpg',
                  },
                  {
                    name: 'Editorial Interior Inspiration',
                    path: '/src/assets/images/editorial_interior_inspiration_1791789912607.jpg',
                  },
                  {
                    name: 'Abuja Luxury Salon Project',
                    path: '/src/assets/images/showcase_interior_project_1791785780028.jpg',
                  },
                ].map((media, idx) => (
                  <div
                    key={idx}
                    className="p-3 rounded-xl bg-[#FAF7F2] border border-[#E6D1A0]/60 space-y-2 flex flex-col justify-between"
                  >
                    <div className="h-44 rounded-lg overflow-hidden bg-black">
                      <img
                        src={media.path}
                        alt={media.name}
                        className="w-full h-full object-cover"
                        referrerPolicy="no-referrer"
                      />
                    </div>
                    <div>
                      <span className="font-semibold text-xs text-[#2F211B] block">
                        {media.name}
                      </span>
                      <span className="text-[10px] font-mono text-[#7C6556] truncate block">
                        {media.path}
                      </span>
                    </div>
                    <button
                      onClick={() => {
                        navigator.clipboard.writeText(media.path);
                        onShowToast('Image path copied to clipboard');
                      }}
                      className="w-full py-1.5 text-[11px] font-medium border border-[#E6D1A0] text-[#4A3023] rounded hover:bg-white transition-colors"
                    >
                      Copy Path
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* ========================================================= */}
          {/* 16. SECURITY & DATABASE (SUPABASE) */}
          {/* ========================================================= */}
          {activeTab === 'security' && (
            <div className="space-y-6 animate-in fade-in duration-200">
              <div className="pb-4 border-b border-[#FAF7F2]">
                <h2 className="font-serif text-2xl font-bold text-[#2F211B]">
                  Admin Credentials & Supabase PostgreSQL Setup
                </h2>
                <p className="text-xs text-[#7C6556]">
                  Update your administrator login credentials and export production PostgreSQL migration scripts.
                </p>
              </div>

              {/* Update Password Form */}
              <div className="p-6 rounded-2xl bg-[#FAF7F2] border border-[#E6D1A0]/60 space-y-4">
                <h3 className="font-serif text-base font-bold text-[#2F211B]">
                  Update Administrator Credentials
                </h3>
                <form onSubmit={handleSavePassword} className="space-y-4">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-semibold text-[#4A3023] uppercase mb-1">
                        Admin Email
                      </label>
                      <input
                        type="email"
                        required
                        value={newAdminEmail}
                        onChange={(e) => setNewAdminEmail(e.target.value)}
                        className="w-full px-3 py-2 text-xs rounded-lg bg-white border border-[#E6D1A0]/60"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-semibold text-[#4A3023] uppercase mb-1">
                        New Password
                      </label>
                      <input
                        type="password"
                        required
                        placeholder="Enter new password"
                        value={newAdminPassword}
                        onChange={(e) => setNewAdminPassword(e.target.value)}
                        className="w-full px-3 py-2 text-xs rounded-lg bg-white border border-[#E6D1A0]/60"
                      />
                    </div>
                  </div>
                  <button
                    type="submit"
                    className="px-5 py-2 text-xs font-semibold uppercase tracking-wider text-white bg-[#4A3023] hover:bg-[#2F211B] rounded-lg shadow-xs cursor-pointer"
                  >
                    Update Admin Password
                  </button>
                </form>
              </div>

              {/* Supabase Production Integration Guide */}
              <div className="p-6 rounded-2xl bg-white border border-[#E6D1A0]/60 space-y-4 shadow-xs">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="font-serif text-lg font-bold text-[#2F211B]">
                      Production Supabase PostgreSQL Migration
                    </h3>
                    <p className="text-xs text-[#7C6556]">
                      Ready-to-run SQL schema with tables for company settings, slides, services, collections, gallery, and Row-Level Security (RLS).
                    </p>
                  </div>
                  <button
                    onClick={copySqlMigration}
                    className="px-4 py-2 text-xs font-semibold uppercase tracking-wider text-white bg-[#4A3023] hover:bg-[#2F211B] rounded-lg flex items-center gap-1.5 cursor-pointer shadow-xs"
                  >
                    {copiedSql ? (
                      <>
                        <CheckCircle2 className="w-4 h-4 text-emerald-400" /> Copied!
                      </>
                    ) : (
                      <>
                        <Copy className="w-4 h-4" /> Copy SQL Migration
                      </>
                    )}
                  </button>
                </div>

                <div className="p-4 rounded-xl bg-[#2F211B] text-[#E6D1A0] text-xs font-mono max-h-60 overflow-y-auto leading-relaxed border border-[#C49A43]/40">
                  <pre>{storage.generateSupabaseSqlMigration()}</pre>
                </div>
              </div>
            </div>
          )}
        </main>
      </div>
    </div>
  );
};
