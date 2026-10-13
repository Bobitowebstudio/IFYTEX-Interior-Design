import React, { useState, useMemo } from 'react';
import { PageRoute, ProductItem, ProductCategory, CompanySettings } from '../types';
import { createWhatsAppChatUrl } from '../services/whatsapp';
import {
  Search,
  ArrowRight,
  Phone,
  Eye,
  X,
  Sparkles,
  ChevronLeft,
  ChevronRight,
  Maximize2,
  Check,
} from 'lucide-react';

interface ProductsPageProps {
  onNavigate: (page: PageRoute) => void;
  products: ProductItem[];
  categories: ProductCategory[];
  settings: CompanySettings;
}

export const ProductsPage: React.FC<ProductsPageProps> = ({
  onNavigate,
  products,
  categories,
  settings,
}) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [modalProduct, setModalProduct] = useState<ProductItem | null>(null);
  const [activeImageIndex, setActiveImageIndex] = useState<number>(0);

  // Only published products for the public catalogue, sorted by sortOrder
  const publishedProducts = useMemo(() => {
    return products
      .filter((p) => p.published)
      .sort((a, b) => a.sortOrder - b.sortOrder);
  }, [products]);

  // Extract all categories actually present or defined
  const filterCategories = useMemo(() => {
    const list = categories.map((c) => c.name);
    // Include any category names from products if not already in list
    publishedProducts.forEach((p) => {
      if (p.category && !list.includes(p.category)) {
        list.push(p.category);
      }
    });
    return ['All', ...list];
  }, [categories, publishedProducts]);

  // Filter products by category and optional search query
  const filteredProducts = useMemo(() => {
    return publishedProducts.filter((product) => {
      const matchesCategory =
        selectedCategory === 'All' ||
        product.category === selectedCategory ||
        (!product.category && selectedCategory === 'Other Products');
      const matchesSearch =
        searchQuery.trim() === '' ||
        product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        product.category.toLowerCase().includes(searchQuery.toLowerCase());
      return matchesCategory && matchesSearch;
    });
  }, [publishedProducts, selectedCategory, searchQuery]);

  const handleOpenModal = (product: ProductItem) => {
    setModalProduct(product);
    setActiveImageIndex(0);
  };

  const handleCloseModal = () => {
    setModalProduct(null);
    setActiveImageIndex(0);
  };

  const modalImages = modalProduct?.images && modalProduct.images.length > 0
    ? modalProduct.images
    : modalProduct
    ? [modalProduct.mainImage]
    : [];

  const getWhatsAppEnquiryUrl = (product: ProductItem) => {
    return createWhatsAppChatUrl(
      settings.whatsappNumber || '09061302309',
      `Hello IFYTEX Interior Design, I am enquiring about "${product.name}" from your product showcase. Could you share more information about fabrics, availability and measurements in Abuja?`
    );
  };

  return (
    <div className="w-full bg-[#F5F0E7] min-h-screen">
      {/* ============================================================ */}
      {/* 1. HERO HEADER BANNER */}
      {/* Deep Espresso Brown with Champagne Gold Accents */}
      {/* ============================================================ */}
      <section className="relative py-20 lg:py-24 bg-[#3B261D] text-white border-b border-[#C9A45C]/35">
        <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 text-center">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#FAF7F2]/10 border border-[#C9A45C]/40 mb-4 backdrop-blur-xs">
            <Sparkles className="w-3.5 h-3.5 text-[#E6D1A0]" />
            <span className="text-xs uppercase tracking-[0.2em] font-bold text-[#E6D1A0]">
              Product Showcase
            </span>
          </div>

          <h1 className="font-serif text-3xl sm:text-5xl lg:text-6xl text-white font-normal mt-2 mb-4 leading-tight">
            Curtain Materials, Blinds & Hardware
          </h1>

          <p className="text-sm sm:text-base text-[#FAF7F2]/85 max-w-2xl mx-auto leading-relaxed font-light">
            Explore our curated selection of imported curtain fabrics, Turkish designs, modern blinds, custom pelmets, motorized tracks, and designer accessories in Abuja.
          </p>
        </div>
      </section>

      {/* ============================================================ */}
      {/* 2. CATEGORY FILTER & SEARCH BAR */}
      {/* Warm Ivory background with White Filter Chips */}
      {/* ============================================================ */}
      <section className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 pt-10 pb-6">
        <div className="flex flex-col lg:flex-row items-stretch lg:items-center justify-between gap-5 pb-6 border-b border-[#C9A45C]/30">
          {/* Scrollable Category Filter Pills */}
          <div className="flex items-center gap-2 overflow-x-auto pb-2 lg:pb-0 scrollbar-none">
            {filterCategories.map((cat) => {
              const isActive = selectedCategory === cat;
              return (
                <button
                  key={cat}
                  onClick={() => setSelectedCategory(cat)}
                  className={`px-4 py-2 text-xs rounded-xl whitespace-nowrap transition-all cursor-pointer font-sans ${
                    isActive
                      ? 'bg-[#3B261D] text-[#E6D1A0] font-bold shadow-xs border border-[#C9A45C]'
                      : 'bg-white text-[#3B261D] hover:bg-[#FAF7F2] border border-[#C9A45C]/35 font-medium'
                  }`}
                >
                  {cat}
                </button>
              );
            })}
          </div>

          {/* Search Bar */}
          <div className="relative min-w-[260px] lg:min-w-[280px]">
            <Search className="w-4 h-4 text-[#8C7667] absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search products..."
              className="w-full pl-10 pr-4 py-2.5 text-xs rounded-xl bg-white border border-[#C9A45C]/40 text-[#3B261D] placeholder:text-[#8C7667] focus:outline-hidden focus:border-[#C9A45C] shadow-2xs"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-[#8C7667] hover:text-[#3B261D] p-0.5"
                aria-label="Clear search"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            )}
          </div>
        </div>
      </section>

      {/* ============================================================ */}
      {/* 3. PRODUCT SHOWCASE GRID — IMAGES FIRST, MINIMAL TEXT */}
      {/* Only: Product Image + Product Name underneath. No prices. */}
      {/* ============================================================ */}
      <section className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 py-8 pb-24">
        {filteredProducts.length === 0 ? (
          <div className="text-center py-20 bg-white rounded-2xl border border-[#C9A45C]/35 p-8 shadow-xs max-w-xl mx-auto">
            <p className="font-serif text-xl text-[#3B261D]">No products found</p>
            <p className="text-xs text-[#6E5A4E] mt-1.5 leading-relaxed">
              No products match the selected category &ldquo;{selectedCategory}&rdquo;
              {searchQuery ? ` or search query "${searchQuery}"` : ''}.
            </p>
            <button
              onClick={() => {
                setSelectedCategory('All');
                setSearchQuery('');
              }}
              className="mt-5 px-5 py-2.5 text-xs font-bold uppercase tracking-wider text-white bg-[#3B261D] hover:bg-[#2A1A13] rounded-lg transition-colors cursor-pointer shadow-xs"
            >
              Show All Products
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 lg:gap-8">
            {filteredProducts.map((product) => {
              const displayImage = product.mainImage || (product.images && product.images[0]) || '';
              return (
                <div
                  key={product.id}
                  onClick={() => handleOpenModal(product)}
                  className="group bg-white rounded-2xl overflow-hidden border border-[#C9A45C]/35 hover:border-[#C9A45C] hover:shadow-lg transition-all duration-300 flex flex-col cursor-pointer"
                  tabIndex={0}
                  role="button"
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' || e.key === ' ') {
                      e.preventDefault();
                      handleOpenModal(product);
                    }
                  }}
                  aria-label={`View ${product.name}`}
                >
                  {/* Image container — Large, high-quality, consistent proportions */}
                  <div className="relative aspect-square w-full overflow-hidden bg-[#F5F0E7]">
                    <img
                      src={displayImage}
                      alt={product.name}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                      loading="lazy"
                      referrerPolicy="no-referrer"
                    />

                    {/* Subtle quick view overlay icon on hover */}
                    <div className="absolute inset-0 bg-[#3B261D]/20 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center pointer-events-none">
                      <div className="w-10 h-10 rounded-full bg-white/95 text-[#3B261D] flex items-center justify-center shadow-md transform translate-y-2 group-hover:translate-y-0 transition-transform">
                        <Eye className="w-5 h-5 text-[#C9A45C]" />
                      </div>
                    </div>
                  </div>

                  {/* Product Name Underneath Image — Clean, readable, strictly no price */}
                  <div className="p-5 flex-1 flex flex-col justify-between">
                    <h3 className="font-serif text-base sm:text-lg font-medium text-[#3B261D] group-hover:text-[#C9A45C] transition-colors leading-snug line-clamp-2">
                      {product.name}
                    </h3>

                    {/* Category indicator (subtle and restrained) */}
                    {product.category && (
                      <span className="text-[11px] uppercase tracking-wider text-[#8C7667] mt-2 block font-medium">
                        {product.category}
                      </span>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        )}

        {/* Bottom Consultation Banner */}
        <div className="mt-16 p-8 sm:p-10 rounded-2xl bg-white border border-[#C9A45C]/35 shadow-sm text-center max-w-4xl mx-auto">
          <span className="text-xs uppercase tracking-[0.2em] font-bold text-[#C9A45C]">
            Custom Orders & Swatches
          </span>
          <h2 className="font-serif text-2xl sm:text-3xl text-[#3B261D] mt-2 mb-3">
            Looking for a Specific Fabric, Pattern or Custom Specification?
          </h2>
          <p className="text-xs sm:text-sm text-[#6E5A4E] max-w-2xl mx-auto leading-relaxed">
            We source luxury Turkish damasks, French sheers, Italian velvets and contemporary blind mechanisms directly for bespoke architectural projects in Abuja.
          </p>
          <div className="mt-6 flex flex-wrap items-center justify-center gap-4">
            <button
              onClick={() => onNavigate('contact')}
              className="px-6 py-3 text-xs font-bold uppercase tracking-wider text-white bg-[#3B261D] hover:bg-[#2A1A13] rounded-lg transition-colors cursor-pointer shadow-xs"
            >
              Book Fabric Consultation
            </button>
            <a
              href={createWhatsAppChatUrl(
                settings.whatsappNumber || '09061302309',
                'Hello IFYTEX Interior Design, I would like to request fabric swatches and enquire about your product collections.'
              )}
              target="_blank"
              rel="noopener noreferrer"
              className="px-6 py-3 text-xs font-bold uppercase tracking-wider text-[#3B261D] bg-[#F5F0E7] border border-[#C9A45C] hover:bg-white rounded-lg transition-colors flex items-center gap-2 cursor-pointer shadow-xs"
            >
              <Phone className="w-3.5 h-3.5 text-[#C9A45C]" />
              Chat on WhatsApp
            </a>
          </div>
        </div>
      </section>

      {/* ============================================================ */}
      {/* 4. PRODUCT DETAIL MODAL (HIGH RESOLUTION IMAGE & WHATSAPP ENQUIRY) */}
      {/* Strictly no price, checkout or add to cart buttons */}
      {/* ============================================================ */}
      {modalProduct && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-xs animate-in fade-in duration-200"
          onClick={handleCloseModal}
        >
          <div
            className="relative w-full max-w-3xl bg-white rounded-2xl overflow-hidden border border-[#C9A45C]/50 shadow-2xl flex flex-col md:flex-row"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close Button */}
            <button
              onClick={handleCloseModal}
              className="absolute top-3 right-3 z-20 w-8 h-8 rounded-full bg-black/60 text-white hover:bg-black flex items-center justify-center transition-colors cursor-pointer"
              aria-label="Close product view"
            >
              <X className="w-4 h-4" />
            </button>

            {/* Left Image View with Carousel for Multi-Image Products */}
            <div className="md:w-3/5 relative bg-[#F5F0E7] flex flex-col items-center justify-center min-h-[320px] md:min-h-[460px]">
              <img
                src={modalImages[activeImageIndex] || modalProduct.mainImage}
                alt={modalProduct.name}
                className="w-full h-full max-h-[480px] object-cover"
              />

              {/* Multi-image indicators and arrows if more than one image */}
              {modalImages.length > 1 && (
                <>
                  <button
                    onClick={() =>
                      setActiveImageIndex((prev) =>
                        prev === 0 ? modalImages.length - 1 : prev - 1
                      )
                    }
                    className="absolute left-3 top-1/2 -translate-y-1/2 w-9 h-9 rounded-full bg-black/50 hover:bg-black text-white flex items-center justify-center transition-colors cursor-pointer"
                    aria-label="Previous image"
                  >
                    <ChevronLeft className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() =>
                      setActiveImageIndex((prev) =>
                        prev === modalImages.length - 1 ? 0 : prev + 1
                      )
                    }
                    className="absolute right-3 top-1/2 -translate-y-1/2 w-9 h-9 rounded-full bg-black/50 hover:bg-black text-white flex items-center justify-center transition-colors cursor-pointer"
                    aria-label="Next image"
                  >
                    <ChevronRight className="w-4 h-4" />
                  </button>

                  <div className="absolute bottom-3 inset-x-0 flex items-center justify-center gap-1.5">
                    {modalImages.map((_, idx) => (
                      <button
                        key={idx}
                        onClick={() => setActiveImageIndex(idx)}
                        className={`h-1.5 rounded-full transition-all cursor-pointer ${
                          idx === activeImageIndex
                            ? 'w-6 bg-[#C9A45C]'
                            : 'w-2 bg-white/70 hover:bg-white'
                        }`}
                        aria-label={`Show image ${idx + 1}`}
                      />
                    ))}
                  </div>
                </>
              )}
            </div>

            {/* Right Details Panel — Restrained and Focused */}
            <div className="md:w-2/5 p-6 sm:p-8 flex flex-col justify-between bg-white space-y-6">
              <div>
                {modalProduct.category && (
                  <span className="text-[11px] uppercase tracking-wider text-[#C9A45C] font-bold block mb-1.5">
                    {modalProduct.category}
                  </span>
                )}
                <h3 className="font-serif text-2xl text-[#3B261D] font-medium leading-snug">
                  {modalProduct.name}
                </h3>
                <div className="w-10 h-0.5 bg-[#C9A45C] my-3" />

                <div className="space-y-2.5 pt-2 text-xs text-[#6E5A4E]">
                  <div className="flex items-center gap-2">
                    <Check className="w-3.5 h-3.5 text-[#C9A45C] shrink-0" />
                    <span>Available for bespoke measurement in Abuja</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Check className="w-3.5 h-3.5 text-[#C9A45C] shrink-0" />
                    <span>Professional fitting & track installation</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Check className="w-3.5 h-3.5 text-[#C9A45C] shrink-0" />
                    <span>Authentic imported craftsmanship & materials</span>
                  </div>
                </div>
              </div>

              {/* Single Restrained WhatsApp Action */}
              <div className="pt-4 border-t border-[#C9A45C]/25 space-y-3">
                <a
                  href={getWhatsAppEnquiryUrl(modalProduct)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full py-3.5 px-4 text-xs font-bold uppercase tracking-wider text-white bg-[#3B261D] hover:bg-[#2A1A13] rounded-xl flex items-center justify-center gap-2 transition-all shadow-md active:scale-98 cursor-pointer"
                >
                  <svg className="w-4 h-4 fill-current text-[#25D366]" viewBox="0 0 24 24">
                    <path d="M17.507 14.307l-.009.075c-.239.987-1.18 1.802-2.193 1.902-.656.065-1.503-.024-3.072-.676-2.008-.834-3.513-2.613-4.468-4.108-.946-1.482-1.04-2.457-.962-2.923.109-.643.529-1.229 1.053-1.492.315-.158.64-.202.909-.202.261 0 .493.011.666.027.202.019.417.061.593.473.197.461.674 1.638.733 1.758.059.12.099.261.02.418-.079.157-.118.256-.236.395-.118.139-.249.311-.355.417-.119.119-.243.249-.105.486.138.237.615 1.014 1.32 1.642.908.809 1.674 1.06 1.912 1.178.238.118.377.099.516-.06.139-.158.594-.693.752-.931.158-.238.317-.198.535-.118.218.079 1.385.653 1.623.772.238.119.396.178.455.277.059.099.059.574-.18 1.561zM12.04 2C6.518 2 2.03 6.476 2.03 11.986c0 1.954.567 3.779 1.554 5.327L2 22l4.832-1.557c1.482.88 3.208 1.388 5.208 1.388 5.522 0 10.01-4.476 10.01-9.986C22.05 6.476 17.562 2 12.04 2z" />
                  </svg>
                  Enquire on WhatsApp
                </a>

                <button
                  onClick={() => {
                    handleCloseModal();
                    onNavigate('contact');
                  }}
                  className="w-full py-2.5 px-4 text-xs font-semibold uppercase tracking-wider text-[#3B261D] hover:bg-[#F5F0E7] border border-[#C9A45C]/40 rounded-xl flex items-center justify-center gap-1.5 transition-colors cursor-pointer"
                >
                  Request Consultation <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
