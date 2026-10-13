import React, { useState } from 'react';
import { PageRoute, GalleryProject, CompanySettings } from '../types';
import { createWhatsAppChatUrl } from '../services/whatsapp';
import { Eye, MapPin, Phone, X, ArrowRight } from 'lucide-react';

interface GalleryPageProps {
  onNavigate: (page: PageRoute) => void;
  gallery: GalleryProject[];
  settings: CompanySettings;
}

export const GalleryPage: React.FC<GalleryPageProps> = ({
  onNavigate,
  gallery,
  settings,
}) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [previewProject, setPreviewProject] = useState<GalleryProject | null>(null);

  const categories = ['All', ...Array.from(new Set(gallery.map((g) => g.category)))];

  const filteredProjects = gallery.filter((item) => {
    if (!item.published) return false;
    if (selectedCategory === 'All') return true;
    return item.category === selectedCategory;
  });

  const getProjectWhatsAppUrl = (project: GalleryProject) => {
    return createWhatsAppChatUrl(
      settings.whatsappNumber,
      `Hello IFYTEX Interior Design, I saw your project "${project.title}" (${project.category}) in your gallery. I would love something similar for my space in Abuja.`
    );
  };

  return (
    <div className="w-full bg-[#FAF7F2]">
      {/* Banner */}
      <section className="relative py-20 bg-[#2F211B] text-white border-b border-[#C49A43]/30">
        <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 text-center">
          <span className="text-xs uppercase tracking-[0.2em] font-semibold text-[#E6D1A0]">
            Bespoke Portfolio
          </span>
          <h1 className="font-serif text-3xl sm:text-5xl text-white mt-2 mb-4">
            Curtains, Blinds & Interior Installations
          </h1>
          <p className="text-base text-[#E6D1A0]/80 max-w-2xl mx-auto leading-relaxed">
            A showcase of bespoke draperies, automated blind systems, upholstered pelmets, and turnkey residential spaces across Abuja.
          </p>
        </div>
      </section>

      {/* Filter Tabs */}
      <section className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 pt-12 pb-6">
        <div className="flex items-center gap-2 overflow-x-auto pb-4 scrollbar-none border-b border-[#E6D1A0]/40">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-4 py-2 text-xs font-medium rounded-lg whitespace-nowrap transition-colors cursor-pointer ${
                selectedCategory === cat
                  ? 'bg-[#4A3023] text-white font-semibold'
                  : 'bg-white text-[#5C4537] hover:bg-[#F7F1E5] border border-[#E6D1A0]/40'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </section>

      {/* Gallery Grid */}
      <section className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 py-8 pb-24">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredProjects.map((proj) => (
            <div
              key={proj.id}
              onClick={() => setPreviewProject(proj)}
              className="group bg-white rounded-2xl overflow-hidden border border-[#E6D1A0]/50 hover:border-[#C49A43] hover:shadow-xl transition-all duration-300 cursor-pointer flex flex-col"
            >
              <div className="relative h-72 overflow-hidden bg-[#2F211B]">
                <img
                  src={proj.coverImageUrl}
                  alt={proj.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  loading="lazy"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-80 group-hover:opacity-100 transition-opacity" />

                <div className="absolute top-4 left-4 bg-white/90 backdrop-blur-xs text-[#4A3023] text-[11px] font-semibold px-2.5 py-1 rounded-md border border-[#E6D1A0]">
                  {proj.category}
                </div>

                <div className="absolute bottom-4 right-4 p-2.5 rounded-lg bg-[#2F211B]/80 text-[#E6D1A0] group-hover:bg-[#C49A43] group-hover:text-white transition-colors">
                  <Eye className="w-4 h-4" />
                </div>
              </div>

              <div className="p-6 flex-1 flex flex-col justify-between">
                <div>
                  <h3 className="font-serif text-xl font-semibold text-[#2F211B] group-hover:text-[#C49A43] transition-colors">
                    {proj.title}
                  </h3>
                  {proj.location && (
                    <div className="flex items-center gap-1.5 text-xs text-[#7C6556] mt-1.5">
                      <MapPin className="w-3.5 h-3.5 text-[#C49A43]" />
                      <span>{proj.location}</span>
                    </div>
                  )}
                  {proj.description && (
                    <p className="text-xs text-[#7C6556] mt-3 leading-relaxed">
                      {proj.description}
                    </p>
                  )}
                </div>

                <div className="pt-4 mt-4 border-t border-[#FAF7F2] flex items-center justify-between">
                  <span className="text-xs font-semibold text-[#4A3023] flex items-center gap-1">
                    View Project <ArrowRight className="w-3.5 h-3.5 text-[#C49A43]" />
                  </span>
                  <span className="text-[11px] text-[#A8988B]">Abuja Installation</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Lightbox Modal */}
      {previewProject && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-xs animate-in fade-in duration-200">
          <div className="relative w-full max-w-4xl bg-white rounded-2xl overflow-hidden border border-[#C49A43]/40 shadow-2xl flex flex-col max-h-[90vh]">
            <button
              onClick={() => setPreviewProject(null)}
              className="absolute top-4 right-4 z-20 p-2.5 rounded-full bg-black/60 hover:bg-black text-white transition-colors cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="overflow-y-auto">
              <div className="relative h-96 sm:h-[460px] bg-black">
                <img
                  src={previewProject.coverImageUrl}
                  alt={previewProject.title}
                  className="w-full h-full object-cover"
                  referrerPolicy="no-referrer"
                />
              </div>

              <div className="p-6 sm:p-8 space-y-5">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                  <div>
                    <span className="text-xs uppercase tracking-wider text-[#C49A43] font-semibold">
                      {previewProject.category}
                    </span>
                    <h2 className="font-serif text-2xl sm:text-3xl font-bold text-[#2F211B] mt-1">
                      {previewProject.title}
                    </h2>
                    {previewProject.location && (
                      <p className="flex items-center gap-1.5 text-xs text-[#7C6556] mt-1">
                        <MapPin className="w-3.5 h-3.5 text-[#C49A43]" />
                        {previewProject.location}
                      </p>
                    )}
                  </div>

                  <a
                    href={getProjectWhatsAppUrl(previewProject)}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-6 py-3 text-xs font-semibold uppercase tracking-wider text-white bg-[#4A3023] hover:bg-[#2F211B] transition-colors rounded-lg flex items-center justify-center gap-2"
                  >
                    <Phone className="w-3.5 h-3.5 text-[#E6D1A0]" />
                    Enquire About Similar Project
                  </a>
                </div>

                {previewProject.description && (
                  <p className="text-sm text-[#5C4537] leading-relaxed pt-2 border-t border-[#E6D1A0]/30">
                    {previewProject.description}
                  </p>
                )}

                <div className="p-4 rounded-xl bg-[#FAF7F2] border border-[#E6D1A0]/40 flex items-center justify-between text-xs text-[#7C6556]">
                  <span>Custom measurements and fabric swatches available on site in Abuja.</span>
                  <button
                    onClick={() => {
                      setPreviewProject(null);
                      onNavigate('contact');
                    }}
                    className="font-semibold text-[#4A3023] hover:text-[#C49A43] cursor-pointer"
                  >
                    Request Free Quote &rarr;
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
