import React from 'react';
import { PageRoute, CompanySettings } from '../types';
import { createWhatsAppChatUrl } from '../services/whatsapp';
import { ShieldCheck, Ruler, Sparkles, Building2, Home, CheckCircle2, Phone, ArrowRight } from 'lucide-react';

interface AboutPageProps {
  onNavigate: (page: PageRoute) => void;
  settings: CompanySettings;
}

export const AboutPage: React.FC<AboutPageProps> = ({ onNavigate, settings }) => {
  const whatsappUrl = createWhatsAppChatUrl(
    settings.whatsappNumber,
    `Hello ${settings.name}, I would like to enquire about your interior and window treatment services.`
  );

  return (
    <div className="w-full bg-[#F5F0E7]">
      {/* Page Header Banner */}
      <section className="relative py-20 bg-[#3B261D] text-white border-b border-[#C9A45C]/35">
        <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 text-center">
          <span className="text-xs uppercase tracking-[0.2em] font-bold text-[#E6D1A0]">
            About IFYTEX Interior Design
          </span>
          <h1 className="font-serif text-3xl sm:text-5xl text-white mt-2 mb-4">
            Bespoke Window Craftsmanship & Interior Elegance
          </h1>
          <p className="text-base text-[#FAF7F2]/85 max-w-2xl mx-auto leading-relaxed font-light">
            Specialising in premium curtains, imported fabrics, modern window blinds, and complete interior solutions in Abuja, Nigeria.
          </p>
        </div>
      </section>

      {/* Philosophy & 12+ Years Experience Section */}
      <section className="py-20 lg:py-24 bg-white border-b border-[#C9A45C]/25">
        <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
            <div className="lg:col-span-6 space-y-6">
              <span className="text-xs uppercase tracking-[0.2em] font-bold text-[#C9A45C]">
                Our Philosophy
              </span>
              <h2 className="font-serif text-3xl sm:text-4xl text-[#3B261D] leading-tight">
                Designed for Comfort, Tailored for Prestige
              </h2>
              <p className="text-sm sm:text-base text-[#6E5A4E] leading-relaxed">
                IFYTEX Interior Design was built on a simple yet exacting standard: that window treatments should never be an afterthought. They are the essential architectural frame of every room, defining natural light balance, temperature insulation, acoustic serenity, and aesthetic character.
              </p>
              <p className="text-sm sm:text-base text-[#6E5A4E] leading-relaxed">
                Based in Abuja, our team works closely with private homeowners, interior designers, architects, and corporate facilities to deliver custom window solutions tailored precisely to each space.
              </p>

              {/* Experience feature box */}
              <div className="p-6 rounded-2xl bg-[#F5F0E7] border border-[#C9A45C]/40 space-y-2">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-lg bg-[#3B261D] text-[#E6D1A0] flex items-center justify-center font-serif text-lg font-bold shadow-xs">
                    12+
                  </div>
                  <h3 className="font-serif text-xl text-[#3B261D] font-semibold">
                    {settings.experienceHeadline}
                  </h3>
                </div>
                <p className="text-sm text-[#6E5A4E] leading-relaxed pt-1">
                  {settings.experienceDescription}
                </p>
              </div>
            </div>

            <div className="lg:col-span-6 relative">
              <div className="rounded-2xl overflow-hidden border border-[#C9A45C]/40 shadow-xl bg-white p-2">
                <img
                  src="/src/assets/images/hero_luxury_curtains_hd_1791792231098.jpg"
                  alt="IFYTEX Interior Design Showroom Living Space"
                  className="w-full h-[460px] object-cover rounded-xl"
                  loading="lazy"
                  referrerPolicy="no-referrer"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Residential & Commercial Capabilities */}
      <section className="py-20 lg:py-24 bg-[#F5F0E7] border-b border-[#C9A45C]/25">
        <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <span className="text-xs uppercase tracking-[0.2em] font-bold text-[#C9A45C]">
              What Sets Us Apart
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl text-[#3B261D] mt-2 mb-3">
              Residential & Commercial Excellence
            </h2>
            <p className="text-sm text-[#6E5A4E]">
              Equipped to execute intimate private residences as well as high-volume commercial installations.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Residential */}
            <div className="p-8 rounded-2xl bg-white border border-[#C9A45C]/35 shadow-sm space-y-4">
              <div className="w-12 h-12 rounded-xl bg-[#F5F0E7] border border-[#C9A45C]/50 flex items-center justify-center text-[#3B261D]">
                <Home className="w-6 h-6 text-[#C9A45C]" />
              </div>
              <h3 className="font-serif text-2xl text-[#3B261D] font-semibold">
                Residential Sanctuaries
              </h3>
              <p className="text-sm text-[#6E5A4E] leading-relaxed">
                From luxury villas in Maitama and Asokoro to apartments in Jabi and Guzape, we provide bespoke luxury drapes, layered sheers, motorized bedroom blackouts, custom pelmets, and decorative accessories that make living spaces warm and refined.
              </p>
              <ul className="space-y-2.5 pt-2 text-xs text-[#6E5A4E]">
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-[#C9A45C]" /> Double-height living room curtain drops
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-[#C9A45C]" /> 100% total blackout drapes for master suites
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-[#C9A45C]" /> Hand-tailored pelmets with gold trim accents
                </li>
              </ul>
            </div>

            {/* Commercial */}
            <div className="p-8 rounded-2xl bg-white border border-[#C9A45C]/35 shadow-sm space-y-4">
              <div className="w-12 h-12 rounded-xl bg-[#F5F0E7] border border-[#C9A45C]/50 flex items-center justify-center text-[#3B261D]">
                <Building2 className="w-6 h-6 text-[#C9A45C]" />
              </div>
              <h3 className="font-serif text-2xl text-[#3B261D] font-semibold">
                Commercial & Corporate
              </h3>
              <p className="text-sm text-[#6E5A4E] leading-relaxed">
                We equip executive offices, diplomatic premises, hospitality suites, and commercial boardrooms across Abuja with durable vertical blinds, venetian blinds, roller blinds, and acoustic draperies engineered for easy operation and minimal maintenance.
              </p>
              <ul className="space-y-2.5 pt-2 text-xs text-[#6E5A4E]">
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-[#C9A45C]" /> Vertical & roller blinds for conference facilities
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-[#C9A45C]" /> Flame-retardant and stain-resistant commercial fabrics
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-[#C9A45C]" /> Rapid multi-floor installation capability
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Service Approach & Process */}
      <section className="py-20 lg:py-24 bg-white border-b border-[#C9A45C]/25">
        <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
          <div className="max-w-3xl mx-auto text-center mb-16">
            <span className="text-xs uppercase tracking-[0.2em] font-bold text-[#C9A45C]">
              Our Craft & Commitment
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl text-[#3B261D] mt-2 mb-3">
              The IFYTEX Standard of Service
            </h2>
            <p className="text-sm text-[#6E5A4E]">
              Every customer relationship is grounded in punctuality, transparent pricing, and unwavering attention to detail.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="p-6 rounded-2xl bg-[#F5F0E7] border border-[#C9A45C]/35 shadow-xs space-y-3">
              <Ruler className="w-6 h-6 text-[#C9A45C]" />
              <h4 className="font-serif text-lg font-semibold text-[#3B261D]">
                Precision Measurement
              </h4>
              <p className="text-xs text-[#6E5A4E] leading-relaxed">
                Accurate millimeters matter. We inspect window frame clearance, check wall substrate strengths, and determine optimal track lengths to ensure neat drapery drops.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-[#F5F0E7] border border-[#C9A45C]/35 shadow-xs space-y-3">
              <Sparkles className="w-6 h-6 text-[#C9A45C]" />
              <h4 className="font-serif text-lg font-semibold text-[#3B261D]">
                Imported Fabric Curation
              </h4>
              <p className="text-xs text-[#6E5A4E] leading-relaxed">
                We bring tactile swatches directly to your space in Abuja, enabling you to inspect textures, weave density, and light-filtering qualities under your room&apos;s natural lighting.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-[#F5F0E7] border border-[#C9A45C]/35 shadow-xs space-y-3">
              <ShieldCheck className="w-6 h-6 text-[#C9A45C]" />
              <h4 className="font-serif text-lg font-semibold text-[#3B261D]">
                Professional Fitting
              </h4>
              <p className="text-xs text-[#6E5A4E] leading-relaxed">
                Our fitters use heavy-duty fixings, test smooth track glider operation, steam out transit wrinkles, and leave your room clean and immaculate.
              </p>
            </div>
          </div>

          <div className="mt-14 text-center">
            <div className="inline-flex flex-wrap items-center justify-center gap-4">
              <button
                onClick={() => onNavigate('contact')}
                className="px-7 py-3.5 text-xs font-bold uppercase tracking-wider text-white bg-[#3B261D] hover:bg-[#2A1A13] transition-colors rounded-lg cursor-pointer flex items-center gap-2 shadow-sm"
              >
                Request a Consultation <ArrowRight className="w-3.5 h-3.5" />
              </button>
              <a
                href={whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="px-7 py-3.5 text-xs font-bold uppercase tracking-wider text-[#3B261D] bg-[#F5F0E7] border border-[#C9A45C] hover:bg-white transition-colors rounded-lg flex items-center gap-2 cursor-pointer shadow-xs"
              >
                <Phone className="w-3.5 h-3.5 text-[#C9A45C]" />
                WhatsApp Us Directly
              </a>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
