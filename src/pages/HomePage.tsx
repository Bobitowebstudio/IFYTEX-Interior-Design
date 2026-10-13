import React, { useState, useEffect, useRef } from 'react';
import {
  PageRoute,
  CompanySettings,
  HeroSlide,
  ServiceItem,
  CollectionItem,
  GalleryProject,
  Testimonial,
  VideoSectionConfig,
} from '../types';
import { createWhatsAppChatUrl } from '../services/whatsapp';
import { DEFAULT_HERO_SLIDES, DEFAULT_VIDEO_SECTION } from '../services/storage';
import { VideoSection } from '../components/home/VideoSection';
import {
  ChevronLeft,
  ChevronRight,
  ArrowRight,
  Compass,
  Ruler,
  Layers,
  Sparkles,
  Shield,
  Star,
  Eye,
  Check,
} from 'lucide-react';

interface HomePageProps {
  onNavigate: (page: PageRoute) => void;
  settings: CompanySettings;
  slides: HeroSlide[];
  services: ServiceItem[];
  collections: CollectionItem[];
  gallery: GalleryProject[];
  testimonials: Testimonial[];
  videoSection?: VideoSectionConfig;
  onOpenProjectModal?: (project: GalleryProject) => void;
}

export const HomePage: React.FC<HomePageProps> = ({
  onNavigate,
  settings,
  slides,
  services,
  collections,
  gallery,
  testimonials,
  videoSection = DEFAULT_VIDEO_SECTION,
  onOpenProjectModal,
}) => {
  // Guarantee exactly two working slides with reliable fallback
  const candidateSlides = (slides && slides.length >= 2 ? slides.filter((s) => s.enabled) : DEFAULT_HERO_SLIDES);
  const activeSlides = candidateSlides.length >= 2 ? candidateSlides.slice(0, 2) : DEFAULT_HERO_SLIDES.slice(0, 2);
  const [currentSlideIndex, setCurrentSlideIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const timerRef = useRef<number | null>(null);

  // Auto rotation with pause on hover
  useEffect(() => {
    if (activeSlides.length <= 1 || isPaused) return;

    timerRef.current = window.setInterval(() => {
      setCurrentSlideIndex((prev) => (prev + 1) % activeSlides.length);
    }, 6500);

    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [activeSlides.length, isPaused]);

  const handlePrevSlide = () => {
    setCurrentSlideIndex((prev) => (prev === 0 ? activeSlides.length - 1 : prev - 1));
  };

  const handleNextSlide = () => {
    setCurrentSlideIndex((prev) => (prev + 1) % activeSlides.length);
  };

  const whatsappUrl = createWhatsAppChatUrl(
    settings.whatsappNumber,
    `Hello ${settings.name}, I would like to enquire about your luxury curtains and blinds in Abuja.`
  );

  const processSteps = [
    {
      num: '01',
      title: 'Consultation',
      desc: 'We discuss your aesthetic vision, daylight balance, privacy needs, and budget for your Abuja home or office.',
      icon: Compass,
    },
    {
      num: '02',
      title: 'Measurement',
      desc: 'Our specialist conducts precise on-site window measurements to determine optimal track placements, drop lengths, and clearances.',
      icon: Ruler,
    },
    {
      num: '03',
      title: 'Fabric and Style Selection',
      desc: 'Choose from our curated imported fabrics, jacquards, voiles, velvets, blackout textiles, and pelmet trims with real tactile swatches.',
      icon: Layers,
    },
    {
      num: '04',
      title: 'Preparation and Customisation',
      desc: 'Every drape, shade, and pelmet is tailored with precision stitching, reinforced headers, and exact pleat calculations.',
      icon: Sparkles,
    },
    {
      num: '05',
      title: 'Professional Installation',
      desc: 'Our experienced fitters mount brackets, anchor tracks securely, steam-dress drapes, and verify seamless smooth operation.',
      icon: Shield,
    },
  ];

  const whyChooseUs = [
    {
      title: 'Over 12 Years of Experience',
      desc: 'A proven track record of designing and fitting premium window treatments for residences, estates, and corporate spaces in Abuja.',
    },
    {
      title: 'Wide Range of Curtains & Fabrics',
      desc: 'Direct access to imported luxury fabrics, sheer voiles, blackout linings, designer pelmets, and contemporary blind materials.',
    },
    {
      title: 'Personalised Consultation',
      desc: 'We tailor every design to your interior architecture, wall colors, lighting angles, and room proportions.',
    },
    {
      title: 'Careful On-Site Measurement',
      desc: 'Laser-accurate window assessments that eliminate fitting errors and ensure graceful floor-to-ceiling proportions.',
    },
    {
      title: 'Professional Installation',
      desc: 'Secure heavy-duty wall anchors, precision track alignment, and expert steaming so your drapes look stunning immediately.',
    },
    {
      title: 'Residential & Commercial Solutions',
      desc: 'Equipped to handle single master bedrooms, entire private mansions, executive offices, and commercial boardrooms.',
    },
  ];

  return (
    <div className="w-full bg-white">
      {/* ============================================================ */}
      {/* 7. HOMEPAGE HERO — EXACTLY TWO REFINED LUXURY SLIDES */}
      {/* ============================================================ */}
      <section
        className="relative w-full h-[580px] sm:h-[640px] lg:h-[680px] xl:h-[720px] max-h-[calc(100vh-130px)] overflow-hidden bg-[#2F211B]"
        onMouseEnter={() => setIsPaused(true)}
        onMouseLeave={() => setIsPaused(false)}
        aria-roledescription="carousel"
        aria-label="IFYTEX Interior Design Featured Highlights"
      >
        {activeSlides.map((slide, index) => {
          const isActive = index === currentSlideIndex;
          return (
            <div
              key={slide.id}
              className={`absolute inset-0 transition-opacity duration-700 ease-in-out ${
                isActive ? 'opacity-100 z-10' : 'opacity-0 z-0 pointer-events-none'
              }`}
            >
              {/* Layer 1: Sharp, high-resolution interior photography without blur filters */}
              <img
                src={slide.imageUrl}
                alt={slide.title}
                className="absolute inset-0 w-full h-full object-cover object-center"
                loading={index === 0 ? 'eager' : 'lazy'}
                referrerPolicy="no-referrer"
              />

              {/* Layer 2: Subtle, controlled dark gradient overlay — keeping fabrics, sunlight, and interior textures bright and vivid */}
              <div className="absolute inset-0 bg-gradient-to-r from-[#2F211B]/85 via-[#2F211B]/50 md:via-[#2F211B]/35 to-transparent" />
              <div className="absolute inset-0 bg-gradient-to-t from-[#2F211B]/60 via-transparent to-black/10" />

              {/* Layer 3: Foreground content container */}
              <div className="relative z-20 max-w-7xl mx-auto h-full px-6 sm:px-10 lg:px-12 flex items-center">
                {/* Layer 4: Headline, description, and call-to-action buttons */}
                <div className="max-w-2xl text-white py-8 sm:py-10">
                  <div className="inline-flex items-center gap-2.5 mb-2.5 sm:mb-3.5">
                    <span className="h-[2px] w-6 bg-[#C49A43]" />
                    <span className="text-xs sm:text-sm uppercase tracking-[0.2em] font-bold text-[#E6D1A0]">
                      {slide.subtitle}
                    </span>
                  </div>

                  <h1 className="font-serif text-3xl sm:text-4xl lg:text-5xl xl:text-6xl font-bold leading-[1.12] text-white mb-3 sm:mb-5 text-balance drop-shadow-[0_2px_12px_rgba(0,0,0,0.6)]">
                    {slide.title}
                  </h1>

                  <p className="text-sm sm:text-base lg:text-lg text-[#FAF7F2] font-normal leading-relaxed mb-6 sm:mb-8 max-w-xl drop-shadow-[0_1px_6px_rgba(0,0,0,0.5)]">
                    {slide.description}
                  </p>

                  <div className="flex flex-wrap items-center gap-3.5 sm:gap-4">
                    {slide.primaryBtnLink === 'curtains-blinds' ? (
                      <button
                        onClick={() => onNavigate('curtains-blinds')}
                        className="px-6 sm:px-8 py-3.5 sm:py-4 text-xs sm:text-sm font-bold uppercase tracking-wider text-[#2F211B] bg-[#E6D1A0] hover:bg-[#C49A43] transition-all rounded-lg shadow-md hover:shadow-lg cursor-pointer flex items-center gap-2.5 active:scale-[0.98]"
                      >
                        {slide.primaryBtnText}
                        <ArrowRight className="w-4 h-4" />
                      </button>
                    ) : (
                      <button
                        onClick={() => onNavigate('services')}
                        className="px-6 sm:px-8 py-3.5 sm:py-4 text-xs sm:text-sm font-bold uppercase tracking-wider text-[#2F211B] bg-[#E6D1A0] hover:bg-[#C49A43] transition-all rounded-lg shadow-md hover:shadow-lg cursor-pointer flex items-center gap-2.5 active:scale-[0.98]"
                      >
                        {slide.primaryBtnText}
                        <ArrowRight className="w-4 h-4" />
                      </button>
                    )}

                    {slide.secondaryBtnLink === 'whatsapp' ? (
                      <a
                        href={whatsappUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="px-6 sm:px-8 py-3.5 sm:py-4 text-xs sm:text-sm font-bold uppercase tracking-wider text-white border-2 border-[#E6D1A0]/80 hover:bg-white/15 transition-all rounded-lg flex items-center gap-2.5 cursor-pointer backdrop-blur-xs active:scale-[0.98]"
                      >
                        <svg className="w-4 h-4 fill-current text-[#25D366]" viewBox="0 0 24 24">
                          <path d="M17.507 14.307l-.009.075c-.239.987-1.18 1.802-2.193 1.902-.656.065-1.503-.024-3.072-.676-2.008-.834-3.513-2.613-4.468-4.108-.946-1.482-1.04-2.457-.962-2.923.109-.643.529-1.229 1.053-1.492.315-.158.64-.202.909-.202.261 0 .493.011.666.027.202.019.417.061.593.473.197.461.674 1.638.733 1.758.059.12.099.261.02.418-.079.157-.118.256-.236.395-.118.139-.249.311-.355.417-.119.119-.243.249-.105.486.138.237.615 1.014 1.32 1.642.908.809 1.674 1.06 1.912 1.178.238.118.377.099.516-.06.139-.158.594-.693.752-.931.158-.238.317-.198.535-.118.218.079 1.385.653 1.623.772.238.119.396.178.455.277.059.099.059.574-.18 1.561zM12.04 2C6.518 2 2.03 6.476 2.03 11.986c0 1.954.567 3.779 1.554 5.327L2 22l4.832-1.557c1.482.88 3.208 1.388 5.208 1.388 5.522 0 10.01-4.476 10.01-9.986C22.05 6.476 17.562 2 12.04 2z" />
                        </svg>
                        {slide.secondaryBtnText}
                      </a>
                    ) : (
                      <button
                        onClick={() => onNavigate('contact')}
                        className="px-6 sm:px-8 py-3.5 sm:py-4 text-xs sm:text-sm font-bold uppercase tracking-wider text-white border-2 border-[#E6D1A0]/80 hover:bg-white/15 transition-all rounded-lg flex items-center gap-2.5 cursor-pointer backdrop-blur-xs active:scale-[0.98]"
                      >
                        {slide.secondaryBtnText}
                        <ArrowRight className="w-4 h-4" />
                      </button>
                    )}
                  </div>
                </div>
              </div>
            </div>
          );
        })}

        {/* Carousel Navigation Arrows */}
        <div className="absolute z-20 bottom-8 right-8 sm:right-12 flex items-center gap-2.5">
          <button
            onClick={handlePrevSlide}
            className="w-10 h-10 rounded-lg border border-[#E6D1A0]/40 bg-[#2F211B]/60 text-white hover:bg-[#C49A43] hover:text-[#2F211B] flex items-center justify-center transition-colors cursor-pointer"
            aria-label="Previous Slide"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>
          <button
            onClick={handleNextSlide}
            className="w-10 h-10 rounded-lg border border-[#E6D1A0]/40 bg-[#2F211B]/60 text-white hover:bg-[#C49A43] hover:text-[#2F211B] flex items-center justify-center transition-colors cursor-pointer"
            aria-label="Next Slide"
          >
            <ChevronRight className="w-5 h-5" />
          </button>
        </div>

        {/* Slide Indicators */}
        <div className="absolute z-20 bottom-9 left-8 sm:left-12 flex items-center gap-2">
          {activeSlides.map((_, i) => (
            <button
              key={i}
              onClick={() => setCurrentSlideIndex(i)}
              className={`h-1.5 transition-all duration-300 rounded-full cursor-pointer ${
                i === currentSlideIndex
                  ? 'w-7 bg-[#E6D1A0]'
                  : 'w-2 bg-white/40 hover:bg-white/70'
              }`}
              aria-label={`Go to slide ${i + 1}`}
            />
          ))}
          <span className="text-xs text-[#E6D1A0]/70 ml-2 font-mono">
            0{currentSlideIndex + 1} / 0{activeSlides.length}
          </span>
        </div>
      </section>

      {/* ============================================================ */}
      {/* BRAND INTRODUCTION & 12+ YEARS TRUST */}
      {/* Warm Ivory Background (#F5F0E7) with Pristine White Containers */}
      {/* ============================================================ */}
      <section className="py-20 lg:py-24 border-b border-[#C9A45C]/25 bg-[#F5F0E7]">
        <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
            {/* Left Content */}
            <div className="lg:col-span-7 space-y-6">
              <div className="inline-flex items-center gap-2">
                <span className="h-[2px] w-6 bg-[#C9A45C]" />
                <span className="text-xs uppercase tracking-[0.2em] font-bold text-[#C9A45C]">
                  IFYTEX Interior Design Heritage
                </span>
              </div>

              <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl text-[#3B261D] leading-tight text-balance">
                Beautiful Interiors Begin with the Right Details
              </h2>

              <p className="text-sm sm:text-base text-[#6E5A4E] leading-relaxed">
                At IFYTEX Interior Design, we believe window treatments are the architectural soul of any living or workspace. Windows frame your world, filter the natural daylight of Abuja, and establish the acoustic warmth and luxury tone of your entire interior.
              </p>

              {/* Experience and trust statement in clean white card with subtle gold border */}
              <div className="p-6 sm:p-7 rounded-2xl bg-white border border-[#C9A45C]/35 shadow-sm space-y-2.5">
                <h3 className="font-serif text-xl sm:text-2xl text-[#3B261D] font-medium">
                  {settings.experienceHeadline}
                </h3>
                <p className="text-sm text-[#6E5A4E] leading-relaxed">
                  {settings.experienceDescription}
                </p>
              </div>

              <div className="pt-2 flex flex-wrap gap-4 items-center">
                <button
                  onClick={() => onNavigate('about')}
                  className="px-6 py-3 text-xs font-bold uppercase tracking-wider text-white bg-[#3B261D] hover:bg-[#2A1A13] transition-colors rounded-lg cursor-pointer shadow-xs"
                >
                  Learn More About Us
                </button>
                <button
                  onClick={() => onNavigate('contact')}
                  className="px-6 py-3 text-xs font-bold uppercase tracking-wider text-[#3B261D] bg-white border border-[#C9A45C] hover:bg-[#F5F0E7] transition-colors rounded-lg cursor-pointer shadow-xs"
                >
                  Book a Consultation
                </button>
              </div>
            </div>

            {/* Right Visual Image */}
            <div className="lg:col-span-5 relative">
              <div className="relative rounded-2xl overflow-hidden border border-[#C9A45C]/40 shadow-lg bg-white p-2">
                <img
                  src={services[2]?.imageUrl || services[0]?.imageUrl}
                  alt="IFYTEX Interior Design finishing"
                  className="w-full h-[420px] object-cover rounded-xl"
                  loading="lazy"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute bottom-2 inset-x-2 p-6 bg-gradient-to-t from-[#2A1A13]/90 via-[#2A1A13]/40 to-transparent text-white rounded-b-xl">
                  <span className="text-xs uppercase tracking-widest text-[#E6D1A0] font-semibold">
                    Craftsmanship in Abuja
                  </span>
                  <p className="text-sm text-white/95 mt-1 font-light">
                    Precision measurements, bespoke drapes, and flawless installation.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ============================================================ */}
      {/* FEATURED SERVICES */}
      {/* Clean White Background (#FFFFFF) with Warm Ivory Cards */}
      {/* ============================================================ */}
      <section className="py-20 lg:py-24 bg-white border-b border-[#C9A45C]/25">
        <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <span className="text-xs uppercase tracking-[0.2em] font-bold text-[#C9A45C]">
              What We Do
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl text-[#3B261D] mt-2 mb-3">
              Comprehensive Window & Interior Solutions
            </h2>
            <p className="text-sm text-[#6E5A4E] leading-relaxed">
              From luxurious imported drape fabrics and motorization to corporate office blinds and complete interior styling.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {services.slice(0, 6).map((service) => (
              <div
                key={service.id}
                className="group bg-[#F5F0E7] rounded-2xl overflow-hidden border border-[#C9A45C]/35 shadow-xs hover:shadow-md hover:border-[#C9A45C] transition-all duration-300 flex flex-col"
              >
                <div className="relative h-56 overflow-hidden bg-white">
                  <img
                    src={service.imageUrl}
                    alt={service.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    loading="lazy"
                    referrerPolicy="no-referrer"
                  />
                </div>
                <div className="p-6 flex-1 flex flex-col justify-between">
                  <div>
                    <h3 className="font-serif text-xl font-semibold text-[#3B261D] group-hover:text-[#C9A45C] transition-colors">
                      {service.title}
                    </h3>
                    <p className="text-xs sm:text-sm text-[#6E5A4E] mt-2 leading-relaxed">
                      {service.shortDescription}
                    </p>
                  </div>
                  <div className="pt-5 mt-4 border-t border-[#C9A45C]/20 flex items-center justify-between">
                    <button
                      onClick={() => onNavigate('services')}
                      className="text-xs font-bold uppercase tracking-wider text-[#3B261D] hover:text-[#C9A45C] flex items-center gap-1.5 transition-colors cursor-pointer"
                    >
                      View Details <ArrowRight className="w-3.5 h-3.5" />
                    </button>
                    <button
                      onClick={() => onNavigate('contact')}
                      className="text-xs font-medium text-[#6E5A4E] hover:text-[#3B261D] transition-colors cursor-pointer"
                    >
                      Request Quote
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="text-center mt-12">
            <button
              onClick={() => onNavigate('services')}
              className="px-8 py-3.5 text-xs font-bold uppercase tracking-wider text-white bg-[#3B261D] hover:bg-[#2A1A13] transition-colors rounded-lg cursor-pointer shadow-sm"
            >
              Explore All Services & Capabilities
            </button>
          </div>
        </div>
      </section>

      {/* ============================================================ */}
      {/* FEATURED COLLECTIONS */}
      {/* Warm Ivory Background (#F5F0E7) with Crisp White Cards */}
      {/* ============================================================ */}
      <section className="py-20 lg:py-24 bg-[#F5F0E7] border-b border-[#C9A45C]/25">
        <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
          <div className="flex flex-col md:flex-row items-start md:items-end justify-between gap-6 mb-14">
            <div>
              <span className="text-xs uppercase tracking-[0.2em] font-bold text-[#C9A45C]">
                Curated Catalogue
              </span>
              <h2 className="font-serif text-3xl sm:text-4xl text-[#3B261D] mt-2">
                Featured Curtains, Blinds & Pelmets
              </h2>
            </div>
            <button
              onClick={() => onNavigate('curtains-blinds')}
              className="text-xs font-bold uppercase tracking-wider text-[#3B261D] hover:text-[#C9A45C] flex items-center gap-1.5 transition-colors cursor-pointer"
            >
              Browse Full Catalogue <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {collections.slice(0, 4).map((item) => {
              const itemWhatsapp = createWhatsAppChatUrl(
                settings.whatsappNumber,
                `Hello ${settings.name}, I am interested in your "${item.name}" (${item.category}). Could you share more information?`
              );
              return (
                <div
                  key={item.id}
                  className="group bg-white rounded-2xl overflow-hidden border border-[#C9A45C]/35 hover:border-[#C9A45C] hover:shadow-md transition-all flex flex-col"
                >
                  <div className="relative h-60 overflow-hidden bg-[#FAF7F2]">
                    <img
                      src={item.imageUrl}
                      alt={item.name}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      loading="lazy"
                      referrerPolicy="no-referrer"
                    />
                  </div>
                  <div className="p-5 flex-1 flex flex-col justify-between">
                    <div>
                      <span className="text-[11px] uppercase tracking-wider text-[#C9A45C] font-bold block mb-1">
                        {item.category}
                      </span>
                      <h3 className="font-serif text-lg font-medium text-[#3B261D] leading-snug">
                        {item.name}
                      </h3>
                      <p className="text-xs text-[#6E5A4E] mt-2 line-clamp-2 leading-relaxed">
                        {item.description}
                      </p>
                    </div>

                    <div className="pt-4 mt-4 border-t border-[#C9A45C]/20 flex items-center justify-between">
                      <span className="text-[11px] text-[#8C7667] font-medium">
                        {item.availability}
                      </span>
                      <a
                        href={itemWhatsapp}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-xs font-bold text-[#3B261D] hover:text-[#C9A45C] flex items-center gap-1"
                      >
                        Enquire &rarr;
                      </a>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ============================================================ */}
      {/* CRAFTSMANSHIP IN MOTION — ADMIN-MANAGED VIDEO SHOWCASE */}
      {/* ============================================================ */}
      {videoSection && (
        <VideoSection
          config={videoSection}
          settings={settings}
          onNavigate={onNavigate}
        />
      )}

      {/* ============================================================ */}
      {/* SELECTED PROJECTS (PORTFOLIO GALLERY) */}
      {/* Clean White Background (#FFFFFF) with Ivory Framed Cards */}
      {/* ============================================================ */}
      <section className="py-20 lg:py-24 bg-white border-b border-[#C9A45C]/25">
        <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
          <div className="text-center max-w-2xl mx-auto mb-14">
            <span className="text-xs uppercase tracking-[0.2em] font-bold text-[#C9A45C]">
              Portfolio Highlights
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl text-[#3B261D] mt-2 mb-3">
              Selected Window Installations in Abuja
            </h2>
            <p className="text-xs sm:text-sm text-[#6E5A4E]">
              A glimpse into custom drapery, pelmets, and contemporary blinds crafted for refined residences.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {gallery.slice(0, 4).map((proj) => (
              <div
                key={proj.id}
                onClick={() => (onOpenProjectModal ? onOpenProjectModal(proj) : onNavigate('gallery'))}
                className="group relative rounded-2xl overflow-hidden cursor-pointer shadow-md hover:shadow-xl transition-all duration-300 h-80 bg-[#3B261D] border border-[#C9A45C]/40"
              >
                <img
                  src={proj.coverImageUrl}
                  alt={proj.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  loading="lazy"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#2A1A13]/90 via-[#2A1A13]/30 to-transparent" />

                <div className="absolute inset-0 p-5 flex flex-col justify-end text-white">
                  <span className="text-[11px] uppercase tracking-wider text-[#E6D1A0] font-bold">
                    {proj.category}
                  </span>
                  <h3 className="font-serif text-base sm:text-lg text-white font-medium mt-1 leading-snug">
                    {proj.title}
                  </h3>
                  {proj.location && (
                    <span className="text-xs text-[#E6D1A0]/80 mt-1 block font-light">
                      {proj.location}
                    </span>
                  )}
                  <div className="pt-3 mt-2 border-t border-white/20 flex items-center justify-between text-xs text-[#E6D1A0]">
                    <span>View project</span>
                    <Eye className="w-3.5 h-3.5" />
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="text-center mt-12">
            <button
              onClick={() => onNavigate('gallery')}
              className="px-8 py-3.5 text-xs font-bold uppercase tracking-wider text-[#3B261D] bg-[#F5F0E7] border border-[#C9A45C] hover:bg-white transition-colors rounded-lg cursor-pointer shadow-xs"
            >
              View Full Gallery & Projects
            </button>
          </div>
        </div>
      </section>

      {/* ============================================================ */}
      {/* OUR PROCESS (5 STEPS) */}
      {/* Warm Ivory Background (#F5F0E7) with Crisp White Cards */}
      {/* ============================================================ */}
      <section className="py-20 lg:py-24 bg-[#F5F0E7] border-b border-[#C9A45C]/25">
        <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <span className="text-xs uppercase tracking-[0.2em] font-bold text-[#C9A45C]">
              Step-by-Step Excellence
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl text-[#3B261D] mt-2 mb-3">
              Our 5-Step Customer Journey
            </h2>
            <p className="text-sm text-[#6E5A4E]">
              Every window treatment project is handled with exacting care from initial consultation to final drapery dressing.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-6">
            {processSteps.map((step) => {
              const Icon = step.icon;
              return (
                <div
                  key={step.num}
                  className="p-6 rounded-2xl bg-white border border-[#C9A45C]/35 shadow-xs hover:shadow-md transition-all flex flex-col justify-between"
                >
                  <div>
                    <div className="flex items-center justify-between mb-4">
                      <span className="font-mono text-2xl font-bold text-[#C9A45C]">
                        {step.num}
                      </span>
                      <div className="w-9 h-9 rounded-lg bg-[#F5F0E7] border border-[#C9A45C]/50 flex items-center justify-center text-[#3B261D]">
                        <Icon className="w-4 h-4 text-[#C9A45C]" />
                      </div>
                    </div>
                    <h3 className="font-serif text-lg font-semibold text-[#3B261D] mb-2">
                      {step.title}
                    </h3>
                    <p className="text-xs text-[#6E5A4E] leading-relaxed">
                      {step.desc}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ============================================================ */}
      {/* WHY CHOOSE IFYTEX INTERIOR DESIGN? */}
      {/* Clean White Background (#FFFFFF) with Warm Ivory Detail Cards */}
      {/* ============================================================ */}
      <section className="py-20 lg:py-24 bg-white border-b border-[#C9A45C]/25">
        <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            <div className="lg:col-span-5 space-y-5">
              <span className="text-xs uppercase tracking-[0.2em] font-bold text-[#C9A45C]">
                Why Choose IFYTEX Interior Design
              </span>
              <h2 className="font-serif text-3xl sm:text-4xl text-[#3B261D] leading-tight">
                Trusted Craftsmanship, Premium Fabrics & Reliable Fit
              </h2>
              <p className="text-sm text-[#6E5A4E] leading-relaxed">
                With more than 12 years of experience in Abuja, we bring deep technical knowledge of fabrics, tracks, and architecture to ensure your window treatments perform reliably for years.
              </p>
              <div className="pt-2">
                <button
                  onClick={() => onNavigate('contact')}
                  className="px-6 py-3 text-xs font-bold uppercase tracking-wider text-white bg-[#3B261D] hover:bg-[#2A1A13] transition-colors rounded-lg cursor-pointer shadow-sm"
                >
                  Book a Consultation
                </button>
              </div>
            </div>

            <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-6">
              {whyChooseUs.map((item, idx) => (
                <div
                  key={idx}
                  className="p-5 rounded-2xl bg-[#F5F0E7] border border-[#C9A45C]/35 shadow-xs hover:border-[#C9A45C] transition-all"
                >
                  <div className="flex items-start gap-3">
                    <div className="w-5 h-5 rounded-full bg-white text-[#C9A45C] flex items-center justify-center shrink-0 mt-0.5 border border-[#C9A45C]">
                      <Check className="w-3.5 h-3.5 stroke-[2.5]" />
                    </div>
                    <div>
                      <h3 className="text-sm font-bold text-[#3B261D]">
                        {item.title}
                      </h3>
                      <p className="text-xs text-[#6E5A4E] mt-1.5 leading-relaxed">
                        {item.desc}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ============================================================ */}
      {/* TESTIMONIALS (SAMPLE PLACEHOLDERS IN DEV) */}
      {/* Warm Ivory Background (#F5F0E7) with Crisp White Cards */}
      {/* ============================================================ */}
      <section className="py-20 lg:py-24 bg-[#F5F0E7] border-b border-[#C9A45C]/25">
        <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
          <div className="text-center max-w-2xl mx-auto mb-14">
            <span className="text-xs uppercase tracking-[0.2em] font-bold text-[#C9A45C]">
              Client Feedback
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl text-[#3B261D] mt-2 mb-3">
              Words from Our Valued Clients
            </h2>
            <p className="text-xs text-[#8C7667] italic">
              [Development sample placeholders — genuine customer reviews will be added via the admin dashboard]
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {testimonials.map((t) => (
              <div
                key={t.id}
                className="p-7 rounded-2xl bg-white border border-[#C9A45C]/35 shadow-sm hover:shadow-md transition-all flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center gap-1 text-[#C9A45C] mb-4">
                    {[...Array(t.rating)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-current" />
                    ))}
                  </div>
                  <p className="text-sm text-[#3B261D] italic leading-relaxed mb-6 font-serif">
                    &ldquo;{t.quote}&rdquo;
                  </p>
                </div>
                <div className="pt-4 border-t border-[#C9A45C]/20">
                  <h4 className="text-sm font-bold text-[#3B261D]">{t.clientName}</h4>
                  <span className="text-xs text-[#6E5A4E]">{t.clientRoleOrLocation}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ============================================================ */}
      {/* FINAL CALL TO ACTION */}
      {/* Deep Espresso Brown Background with Cream & Champagne Gold */}
      {/* ============================================================ */}
      <section className="py-20 lg:py-24 bg-[#3B261D] text-white">
        <div className="max-w-4xl mx-auto px-6 text-center space-y-6">
          <span className="text-xs uppercase tracking-[0.2em] font-bold text-[#E6D1A0]">
            Start Your Transformation
          </span>
          <h2 className="font-serif text-3xl sm:text-5xl text-white font-normal text-balance">
            Let’s Make Your Space Feel Exceptional
          </h2>
          <p className="text-base text-[#FAF7F2]/85 max-w-2xl mx-auto leading-relaxed font-light">
            Whether you need custom luxury curtains for a new Abuja residence or modern motorized blinds for an office suite, our team is ready to assist.
          </p>

          <div className="pt-4 flex flex-wrap items-center justify-center gap-4">
            <button
              onClick={() => onNavigate('contact')}
              className="px-8 py-4 text-xs font-bold uppercase tracking-wider text-[#3B261D] bg-[#E6D1A0] hover:bg-[#C9A45C] transition-colors rounded-lg shadow-md cursor-pointer flex items-center gap-2"
            >
              Request a Quote <ArrowRight className="w-3.5 h-3.5" />
            </button>
            <a
              href={whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="px-8 py-4 text-xs font-semibold uppercase tracking-wider text-white border border-[#E6D1A0] hover:bg-white/10 transition-colors rounded-lg flex items-center gap-2 cursor-pointer"
            >
              <svg className="w-4 h-4 fill-current text-[#25D366]" viewBox="0 0 24 24">
                <path d="M17.507 14.307l-.009.075c-.239.987-1.18 1.802-2.193 1.902-.656.065-1.503-.024-3.072-.676-2.008-.834-3.513-2.613-4.468-4.108-.946-1.482-1.04-2.457-.962-2.923.109-.643.529-1.229 1.053-1.492.315-.158.64-.202.909-.202.261 0 .493.011.666.027.202.019.417.061.593.473.197.461.674 1.638.733 1.758.059.12.099.261.02.418-.079.157-.118.256-.236.395-.118.139-.249.311-.355.417-.119.119-.243.249-.105.486.138.237.615 1.014 1.32 1.642.908.809 1.674 1.06 1.912 1.178.238.118.377.099.516-.06.139-.158.594-.693.752-.931.158-.238.317-.198.535-.118.218.079 1.385.653 1.623.772.238.119.396.178.455.277.059.099.059.574-.18 1.561zM12.04 2C6.518 2 2.03 6.476 2.03 11.986c0 1.954.567 3.779 1.554 5.327L2 22l4.832-1.557c1.482.88 3.208 1.388 5.208 1.388 5.522 0 10.01-4.476 10.01-9.986C22.05 6.476 17.562 2 12.04 2z" />
              </svg>
              Chat on WhatsApp ({settings.whatsappNumber})
            </a>
          </div>
        </div>
      </section>
    </div>
  );
};
