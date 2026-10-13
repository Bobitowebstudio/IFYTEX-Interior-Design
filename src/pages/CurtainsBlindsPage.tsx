import React, { useState } from 'react';
import { PageRoute, CollectionItem, CompanySettings } from '../types';
import { createWhatsAppChatUrl } from '../services/whatsapp';
import { Search, Phone, ArrowRight, Eye, X, Check } from 'lucide-react';

interface CurtainsBlindsPageProps {
  onNavigate: (page: PageRoute, state?: { selectedItem?: string }) => void;
  collections: CollectionItem[];
  settings: CompanySettings;
}

export const CurtainsBlindsPage: React.FC<CurtainsBlindsPageProps> = ({
  onNavigate,
  collections,
  settings,
}) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [activeModalItem, setActiveModalItem] = useState<CollectionItem | null>(null);

  // Extract unique categories
  const categories = ['All', ...Array.from(new Set(collections.map((c) => c.category)))];

  const filteredItems = collections.filter((item) => {
    if (!item.published) return false;
    const matchesCategory =
      selectedCategory === 'All' || item.category === selectedCategory;
    const matchesSearch =
      item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (item.materialStyle && item.materialStyle.toLowerCase().includes(searchQuery.toLowerCase()));
    return matchesCategory && matchesSearch;
  });

  const getItemWhatsAppUrl = (item: CollectionItem) => {
    return createWhatsAppChatUrl(
      settings.whatsappNumber,
      `Hello IFYTEX Interior Design, I am enquiring about "${item.name}" from your ${item.category} collection. Is this available for custom measurement in Abuja?`
    );
  };

  return (
    <div className="w-full bg-[#F5F0E7]">
      {/* Header Banner */}
      <section className="relative py-20 bg-[#3B261D] text-white border-b border-[#C9A45C]/35">
        <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 text-center">
          <span className="text-xs uppercase tracking-[0.2em] font-bold text-[#E6D1A0]">
            Bespoke Collection Catalogue
          </span>
          <h1 className="font-serif text-3xl sm:text-5xl text-white mt-2 mb-4">
            Luxury Curtains, Blinds & Imported Fabrics
          </h1>
          <p className="text-base text-[#FAF7F2]/85 max-w-2xl mx-auto leading-relaxed font-light">
            Explore our curated fabrics, pleated draperies, upholstered pelmets, and contemporary window blind systems tailored to measure in Abuja.
          </p>
        </div>
      </section>

      {/* Filter and Search Bar */}
      <section className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 pt-12 pb-6">
        <div className="flex flex-col md:flex-row items-stretch md:items-center justify-between gap-4 pb-6 border-b border-[#C9A45C]/30">
          {/* Category Tabs */}
          <div className="flex items-center gap-2 overflow-x-auto pb-2 md:pb-0 scrollbar-none">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-4 py-2 text-xs rounded-xl whitespace-nowrap transition-all cursor-pointer ${
                  selectedCategory === cat
                    ? 'bg-[#3B261D] text-white font-bold shadow-xs'
                    : 'bg-white text-[#3B261D] hover:bg-[#FAF7F2] border border-[#C9A45C]/40 font-medium'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Search Input */}
          <div className="relative min-w-[260px]">
            <Search className="w-4 h-4 text-[#8C7667] absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search fabrics, curtains, blinds..."
              className="w-full pl-9 pr-4 py-2.5 text-xs rounded-xl bg-white border border-[#C9A45C]/40 text-[#3B261D] focus:outline-hidden focus:border-[#C9A45C] shadow-2xs"
            />
          </div>
        </div>
      </section>

      {/* Items Grid */}
      <section className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 py-8 pb-24">
        {filteredItems.length === 0 ? (
          <div className="text-center py-20 bg-white rounded-2xl border border-[#C9A45C]/35 p-8 shadow-xs">
            <p className="font-serif text-xl text-[#3B261D]">No collection items found</p>
            <p className="text-xs text-[#6E5A4E] mt-1">
              Try adjusting your category filter or search keywords.
            </p>
            <button
              onClick={() => {
                setSelectedCategory('All');
                setSearchQuery('');
              }}
              className="mt-4 px-4 py-2 text-xs font-bold uppercase text-white bg-[#3B261D] hover:bg-[#2A1A13] rounded-lg transition-colors"
            >
              Reset Filters
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredItems.map((item) => (
              <div
                key={item.id}
                className="group bg-white rounded-2xl overflow-hidden border border-[#C9A45C]/35 hover:border-[#C9A45C] hover:shadow-lg transition-all duration-300 flex flex-col"
              >
                {/* Image */}
                <div className="relative h-64 overflow-hidden bg-[#F5F0E7]">
                  <img
                    src={item.imageUrl}
                    alt={item.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    loading="lazy"
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute top-3 left-3 bg-white/95 backdrop-blur-xs text-[#3B261D] text-[11px] font-bold px-3 py-1 rounded-md border border-[#C9A45C]/50 shadow-2xs">
                    {item.category}
                  </div>
                  <button
                    onClick={() => setActiveModalItem(item)}
                    className="absolute bottom-3 right-3 p-2 bg-[#3B261D]/85 text-[#E6D1A0] rounded-lg hover:bg-[#3B261D] transition-colors cursor-pointer"
                    title="Quick View Details"
                  >
                    <Eye className="w-4 h-4" />
                  </button>
                </div>

                {/* Content */}
                <div className="p-6 flex-1 flex flex-col justify-between space-y-4">
                  <div>
                    <h3 className="font-serif text-xl font-semibold text-[#3B261D] group-hover:text-[#C9A45C] transition-colors leading-snug">
                      {item.name}
                    </h3>
                    <p className="text-xs text-[#6E5A4E] mt-2 leading-relaxed">
                      {item.description}
                    </p>

                    {item.materialStyle && (
                      <div className="mt-3 text-xs text-[#6E5A4E] flex items-center gap-1.5">
                        <span className="font-semibold text-[#3B261D]">Material / Style:</span>
                        <span>{item.materialStyle}</span>
                      </div>
                    )}

                    {item.indicativePrice && (
                      <div className="mt-1 text-xs text-[#C9A45C] font-semibold">
                        {item.indicativePrice}
                      </div>
                    )}
                  </div>

                  <div className="pt-4 border-t border-[#C9A45C]/20 flex items-center justify-between gap-3">
                    <span className="text-[11px] text-[#8C7667] font-medium">
                      {item.availability}
                    </span>

                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => setActiveModalItem(item)}
                        className="p-2 text-xs rounded-lg border border-[#C9A45C]/50 text-[#3B261D] hover:bg-[#F5F0E7] transition-colors cursor-pointer font-medium"
                        title="View Specifications"
                      >
                        Details
                      </button>
                      <a
                        href={getItemWhatsAppUrl(item)}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="px-3.5 py-2 text-xs font-bold uppercase tracking-wider text-white bg-[#3B261D] hover:bg-[#2A1A13] transition-colors rounded-lg flex items-center gap-1.5 shadow-2xs"
                      >
                        <Phone className="w-3.5 h-3.5 text-[#E6D1A0]" />
                        Enquire
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </section>

      {/* Item Quick View Modal */}
      {activeModalItem && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-in fade-in duration-200">
          <div className="relative w-full max-w-2xl bg-white rounded-2xl overflow-hidden border border-[#C49A43]/40 shadow-2xl flex flex-col md:flex-row">
            <button
              onClick={() => setActiveModalItem(null)}
              className="absolute top-4 right-4 z-10 p-2 rounded-full bg-white/80 hover:bg-white text-[#2F211B] transition-colors cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="md:w-1/2 h-64 md:h-auto relative bg-[#FAF7F2]">
              <img
                src={activeModalItem.imageUrl}
                alt={activeModalItem.name}
                className="w-full h-full object-cover"
                referrerPolicy="no-referrer"
              />
            </div>

            <div className="md:w-1/2 p-6 sm:p-8 flex flex-col justify-between space-y-4">
              <div>
                <span className="text-xs uppercase tracking-wider text-[#C49A43] font-semibold">
                  {activeModalItem.category}
                </span>
                <h3 className="font-serif text-2xl font-bold text-[#2F211B] mt-1">
                  {activeModalItem.name}
                </h3>
                <p className="text-xs sm:text-sm text-[#5C4537] mt-3 leading-relaxed">
                  {activeModalItem.description}
                </p>

                {activeModalItem.materialStyle && (
                  <div className="mt-4 p-3 rounded-lg bg-[#FAF7F2] text-xs space-y-1">
                    <span className="font-semibold text-[#4A3023] block">Specifications:</span>
                    <span className="text-[#7C6556]">{activeModalItem.materialStyle}</span>
                  </div>
                )}

                <div className="mt-3 flex items-center gap-2 text-xs text-[#7C6556]">
                  <Check className="w-4 h-4 text-[#C49A43]" />
                  <span>{activeModalItem.availability}</span>
                </div>
              </div>

              <div className="pt-4 border-t border-[#E6D1A0]/40 flex flex-col gap-2.5">
                <a
                  href={getItemWhatsAppUrl(activeModalItem)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full py-3 text-center text-xs font-semibold uppercase tracking-wider text-white bg-[#4A3023] hover:bg-[#2F211B] transition-colors rounded-lg flex items-center justify-center gap-2"
                >
                  <Phone className="w-3.5 h-3.5 text-[#E6D1A0]" />
                  WhatsApp Enquiry for this Item
                </a>
                <button
                  onClick={() => {
                    setActiveModalItem(null);
                    onNavigate('contact', { selectedItem: activeModalItem.name });
                  }}
                  className="w-full py-2.5 text-center text-xs font-semibold uppercase tracking-wider text-[#4A3023] border border-[#C49A43] hover:bg-[#FAF7F2] transition-colors rounded-lg cursor-pointer"
                >
                  Request On-Site Measurement
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
