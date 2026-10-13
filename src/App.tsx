import React, { useState, useEffect } from 'react';
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
  AutomatedRepliesConfig,
  SeoConfig,
  VideoSectionConfig,
} from './types';
import { storage } from './services/storage';
import { Navbar } from './components/layout/Navbar';
import { Footer } from './components/layout/Footer';
import { FloatingWhatsApp } from './components/common/FloatingWhatsApp';
import { NotificationToast, ToastMessage } from './components/common/NotificationToast';
import { HomePage } from './pages/HomePage';
import { AboutPage } from './pages/AboutPage';
import { ServicesPage } from './pages/ServicesPage';
import { ProductsPage } from './pages/ProductsPage';
import { CurtainsBlindsPage } from './pages/CurtainsBlindsPage';
import { GalleryPage } from './pages/GalleryPage';
import { ContactPage } from './pages/ContactPage';
import { PrivacyPolicyPage } from './pages/PrivacyPolicyPage';
import { AdminLogin } from './pages/admin/AdminLogin';
import { AdminDashboard } from './pages/admin/AdminDashboard';

function resolveCurrentRoute(): PageRoute {
  // 1. Check window.location.pathname first (e.g. /admin/login or /services)
  const pathname = window.location.pathname.replace(/^\/+|\/+$/g, '').toLowerCase().trim();
  if (pathname === 'admin/login' || pathname === 'admin-login') return 'admin-login';
  if (pathname === 'admin' || pathname === 'admin/dashboard') return 'admin';
  if (pathname === 'about') return 'about';
  if (pathname === 'services') return 'services';
  if (pathname === 'products' || pathname === 'catalogue' || pathname === 'shop') return 'products';
  if (pathname === 'curtains-blinds' || pathname === 'curtains' || pathname === 'blinds') return 'curtains-blinds';
  if (pathname === 'gallery' || pathname === 'projects') return 'gallery';
  if (pathname === 'contact') return 'contact';
  if (pathname === 'privacy' || pathname === 'privacy-policy') return 'privacy';

  // 2. Check window.location.hash as reliable fallback (e.g. #/admin/login or #/contact)
  const hash = window.location.hash.replace(/^#\/?/, '').toLowerCase().trim();
  if (hash === 'admin/login' || hash === 'admin-login') return 'admin-login';
  if (hash === 'admin' || hash === 'admin/dashboard') return 'admin';
  if (hash === 'about') return 'about';
  if (hash === 'services') return 'services';
  if (hash === 'products' || hash === 'catalogue' || hash === 'shop') return 'products';
  if (hash === 'curtains-blinds' || hash === 'curtains' || hash === 'blinds') return 'curtains-blinds';
  if (hash === 'gallery' || hash === 'projects') return 'gallery';
  if (hash === 'contact') return 'contact';
  if (hash === 'privacy' || hash === 'privacy-policy') return 'privacy';

  return 'home';
}

function getPathForRoute(page: PageRoute): string {
  if (page === 'home') return '/';
  if (page === 'admin-login') return '/admin/login';
  return `/${page}`;
}

export function App() {
  const [currentPage, setCurrentPage] = useState<PageRoute>(resolveCurrentRoute);
  const [isAdmin, setIsAdmin] = useState<boolean>(() => storage.isAdminAuthenticated());
  const [toasts, setToasts] = useState<ToastMessage[]>([]);

  // Page state parameters (e.g. pre-selecting service on quote form)
  const [navState, setNavState] = useState<{
    selectedService?: string;
    selectedItem?: string;
  }>({});

  // Dynamic persisted states
  const [settings, setSettings] = useState<CompanySettings>(() => storage.getSettings());
  const [slides, setSlides] = useState<HeroSlide[]>(() => storage.getHeroSlides());
  const [services, setServices] = useState<ServiceItem[]>(() => storage.getServices());
  const [collections, setCollections] = useState<CollectionItem[]>(() => storage.getCollections());
  const [products, setProducts] = useState<ProductItem[]>(() => storage.getProducts());
  const [productCategories, setProductCategories] = useState<ProductCategory[]>(() =>
    storage.getProductCategories()
  );
  const [gallery, setGallery] = useState<GalleryProject[]>(() => storage.getGallery());
  const [testimonials, setTestimonials] = useState<Testimonial[]>(() => storage.getTestimonials());
  const [automatedReplies, setAutomatedReplies] = useState<AutomatedRepliesConfig>(() =>
    storage.getAutomatedReplies()
  );
  const [seo, setSeo] = useState<SeoConfig>(() => storage.getSeo());
  const [videoSection, setVideoSection] = useState<VideoSectionConfig>(() =>
    storage.getVideoSection()
  );

  // Sync document title and meta
  useEffect(() => {
    document.title = `${settings.name} | ${settings.tagline} | ${settings.location}`;
  }, [settings]);

  // Handle URL changes, browser forward/back buttons, and direct address bar entries
  useEffect(() => {
    const handleUrlChange = () => {
      const nextRoute = resolveCurrentRoute();
      setCurrentPage(nextRoute);
    };

    window.addEventListener('popstate', handleUrlChange);
    window.addEventListener('hashchange', handleUrlChange);
    return () => {
      window.removeEventListener('popstate', handleUrlChange);
      window.removeEventListener('hashchange', handleUrlChange);
    };
  }, []);

  const handleNavigate = (page: PageRoute, state?: { selectedService?: string; selectedItem?: string }) => {
    if (state) {
      setNavState(state);
    } else {
      setNavState({});
    }
    setCurrentPage(page);

    const targetPath = getPathForRoute(page);
    if (window.location.pathname !== targetPath) {
      window.history.pushState(null, '', targetPath);
    }
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleShowToast = (
    title: string,
    description?: string,
    type: 'success' | 'error' | 'info' = 'success'
  ) => {
    const newToast: ToastMessage = {
      id: 'toast-' + Date.now() + '-' + Math.random().toString(36).substr(2, 4),
      title,
      description,
      type,
    };
    setToasts((prev) => [...prev, newToast]);
  };

  const handleDismissToast = (id: string) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  };

  const handleAdminLogout = () => {
    storage.setAdminAuthenticated(false);
    setIsAdmin(false);
    setCurrentPage('home');
    window.history.pushState(null, '', '/');
    handleShowToast('Logged out of admin portal', undefined, 'info');
  };

  const handleAdminLoginSuccess = () => {
    storage.setAdminAuthenticated(true);
    setIsAdmin(true);
    setCurrentPage('admin');
    window.history.pushState(null, '', '/admin');
    handleShowToast('Welcome to IFYTEX Interior Design Admin Dashboard');
  };

  const isPublicPage = currentPage !== 'admin';

  return (
    <div className="min-h-screen flex flex-col bg-white text-[#2F211B] antialiased">
      {/* Toast notifications */}
      <NotificationToast toasts={toasts} onDismiss={handleDismissToast} />

      {/* Floating WhatsApp Quick Contact Button (Visible on all public pages) */}
      {isPublicPage && (
        <FloatingWhatsApp
          phone={settings.whatsappNumber}
          businessName={settings.name}
        />
      )}

      {/* Public Header (only on public pages & admin login) */}
      {isPublicPage && (
        <Navbar
          currentPage={currentPage}
          onNavigate={handleNavigate}
          settings={settings}
        />
      )}

      {/* Page Routing */}
      <div className="flex-1">
        {currentPage === 'home' && (
          <HomePage
            onNavigate={handleNavigate}
            settings={settings}
            slides={slides}
            services={services}
            collections={collections}
            gallery={gallery}
            testimonials={testimonials}
            videoSection={videoSection}
          />
        )}

        {currentPage === 'about' && (
          <AboutPage onNavigate={handleNavigate} settings={settings} />
        )}

        {currentPage === 'services' && (
          <ServicesPage
            onNavigate={handleNavigate}
            services={services}
            settings={settings}
          />
        )}

        {currentPage === 'products' && (
          <ProductsPage
            onNavigate={handleNavigate}
            products={products}
            categories={productCategories}
            settings={settings}
          />
        )}

        {currentPage === 'curtains-blinds' && (
          <CurtainsBlindsPage
            onNavigate={handleNavigate}
            collections={collections}
            settings={settings}
          />
        )}

        {currentPage === 'gallery' && (
          <GalleryPage
            onNavigate={handleNavigate}
            gallery={gallery}
            settings={settings}
          />
        )}

        {currentPage === 'contact' && (
          <ContactPage
            onNavigate={handleNavigate}
            settings={settings}
            automatedReplies={automatedReplies}
            initialService={navState.selectedService}
            initialItem={navState.selectedItem}
          />
        )}

        {currentPage === 'privacy' && (
          <PrivacyPolicyPage onNavigate={handleNavigate} settings={settings} />
        )}

        {currentPage === 'admin-login' && (
          <AdminLogin
            onNavigate={handleNavigate}
            onLoginSuccess={handleAdminLoginSuccess}
            settings={settings}
          />
        )}

        {currentPage === 'admin' && (
          <AdminDashboard
            onNavigate={handleNavigate}
            onLogout={handleAdminLogout}
            settings={settings}
            onUpdateSettings={setSettings}
            slides={slides}
            onUpdateSlides={setSlides}
            services={services}
            onUpdateServices={setServices}
            collections={collections}
            onUpdateCollections={setCollections}
            products={products}
            onUpdateProducts={(newProds) => {
              setProducts(newProds);
              storage.saveProducts(newProds);
            }}
            categories={productCategories}
            onUpdateCategories={(newCats) => {
              setProductCategories(newCats);
              storage.saveProductCategories(newCats);
            }}
            gallery={gallery}
            onUpdateGallery={setGallery}
            testimonials={testimonials}
            onUpdateTestimonials={setTestimonials}
            automatedReplies={automatedReplies}
            onUpdateAutomatedReplies={setAutomatedReplies}
            seo={seo}
            onUpdateSeo={setSeo}
            videoSection={videoSection}
            onUpdateVideoSection={setVideoSection}
            onShowToast={handleShowToast}
          />
        )}
      </div>

      {/* Public Footer */}
      {isPublicPage && <Footer onNavigate={handleNavigate} settings={settings} />}
    </div>
  );
}

export default App;
