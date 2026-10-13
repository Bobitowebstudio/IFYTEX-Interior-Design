import React, { useState } from 'react';
import { PageRoute, ServiceItem, CompanySettings } from '../types';
import { createWhatsAppChatUrl } from '../services/whatsapp';
import { CheckCircle2, Phone, ArrowRight } from 'lucide-react';

interface ServicesPageProps {
  onNavigate: (page: PageRoute, state?: { selectedService?: string }) => void;
  services: ServiceItem[];
  settings: CompanySettings;
}

export const ServicesPage: React.FC<ServicesPageProps> = ({
  onNavigate,
  services,
  settings,
}) => {
  const [activeServiceId, setActiveServiceId] = useState<string>(services[0]?.id || '');

  const publishedServices = services.filter((s) => s.published);

  const handleEnquireService = (serviceTitle: string) => {
    onNavigate('contact', { selectedService: serviceTitle });
  };

  const getServiceWhatsAppUrl = (title: string) => {
    return createWhatsAppChatUrl(
      settings.whatsappNumber,
      `Hello IFYTEX Interior Design, I am interested in your "${title}" service in Abuja. Could we schedule a consultation?`
    );
  };

  return (
    <div className="w-full bg-[#FAF7F2]">
      {/* Services Header Banner */}
      <section className="relative py-20 bg-[#2F211B] text-white border-b border-[#C49A43]/30">
        <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 text-center">
          <span className="text-xs uppercase tracking-[0.2em] font-semibold text-[#E6D1A0]">
            Expert Interior Services
          </span>
          <h1 className="font-serif text-3xl sm:text-5xl text-white mt-2 mb-4">
            Curtains, Blinds & Bespoke Interior Solutions
          </h1>
          <p className="text-base text-[#E6D1A0]/80 max-w-2xl mx-auto leading-relaxed">
            From precision on-site measurements and imported fabric selections to flawless installations across Abuja.
          </p>
        </div>
      </section>

      {/* Services Grid & Detailed Cards */}
      <section className="py-20 lg:py-24 max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
        <div className="space-y-16 lg:space-y-24">
          {publishedServices.map((service, index) => {
            const isReversed = index % 2 !== 0;
            return (
              <div
                key={service.id}
                id={service.id}
                className={`grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center p-8 sm:p-10 rounded-2xl bg-white border border-[#E6D1A0]/40 shadow-xs`}
              >
                {/* Visual Image */}
                <div
                  className={`lg:col-span-6 relative rounded-xl overflow-hidden border border-[#E6D1A0]/40 bg-[#FAF7F2] ${
                    isReversed ? 'lg:order-2' : 'lg:order-1'
                  }`}
                >
                  <img
                    src={service.imageUrl}
                    alt={service.title}
                    className="w-full h-[360px] sm:h-[420px] object-cover"
                    loading="lazy"
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute top-4 left-4 bg-[#2F211B]/80 text-[#E6D1A0] text-xs font-mono font-semibold px-3 py-1 rounded-md backdrop-blur-xs">
                    0{index + 1}
                  </div>
                </div>

                {/* Content */}
                <div
                  className={`lg:col-span-6 space-y-5 ${
                    isReversed ? 'lg:order-1' : 'lg:order-2'
                  }`}
                >
                  <div>
                    <span className="text-xs uppercase tracking-[0.2em] font-semibold text-[#C49A43]">
                      Specialised Service
                    </span>
                    <h2 className="font-serif text-2xl sm:text-3xl text-[#2F211B] font-semibold mt-1">
                      {service.title}
                    </h2>
                  </div>

                  <p className="text-sm sm:text-base text-[#5C4537] leading-relaxed">
                    {service.fullDescription}
                  </p>

                  {/* Feature Bullets */}
                  <div className="space-y-2.5 pt-2">
                    <h4 className="text-xs uppercase tracking-wider font-semibold text-[#4A3023]">
                      Key Highlights:
                    </h4>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                      {service.features.map((feature, fIdx) => (
                        <div
                          key={fIdx}
                          className="flex items-start gap-2 text-xs text-[#7C6556]"
                        >
                          <CheckCircle2 className="w-4 h-4 text-[#C49A43] shrink-0 mt-0.5" />
                          <span>{feature}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Action Buttons */}
                  <div className="pt-4 flex flex-wrap items-center gap-3">
                    <button
                      onClick={() => handleEnquireService(service.title)}
                      className="px-6 py-3 text-xs font-semibold uppercase tracking-wider text-white bg-[#4A3023] hover:bg-[#2F211B] transition-colors rounded-lg flex items-center gap-2 cursor-pointer shadow-xs"
                    >
                      Request Quote for this Service <ArrowRight className="w-3.5 h-3.5" />
                    </button>
                    <a
                      href={getServiceWhatsAppUrl(service.title)}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="px-5 py-3 text-xs font-semibold uppercase tracking-wider text-[#4A3023] border border-[#C49A43] hover:bg-[#FAF7F2] transition-colors rounded-lg flex items-center gap-2"
                    >
                      <Phone className="w-3.5 h-3.5 text-[#C49A43]" />
                      WhatsApp Enquire
                    </a>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Bottom Booking Banner */}
        <div className="mt-20 p-8 sm:p-12 rounded-2xl bg-[#2F211B] text-white text-center space-y-5 border border-[#C49A43]/40">
          <span className="text-xs uppercase tracking-widest text-[#E6D1A0] font-semibold">
            On-Site Measurement in Abuja
          </span>
          <h3 className="font-serif text-2xl sm:text-3xl text-white">
            Need Expert Advice for Your Windows or Interior?
          </h3>
          <p className="text-sm text-[#E6D1A0]/80 max-w-xl mx-auto leading-relaxed">
            Our team visits your home or office with fabric swatches, discusses your lighting and aesthetic requirements, and takes laser-accurate measurements.
          </p>
          <div className="pt-2 flex flex-wrap justify-center gap-4">
            <button
              onClick={() => onNavigate('contact')}
              className="px-8 py-3.5 text-xs font-semibold uppercase tracking-wider text-[#2F211B] bg-[#E6D1A0] hover:bg-[#C49A43] transition-colors rounded-lg cursor-pointer"
            >
              Book Measurement & Consultation
            </button>
            <a
              href={createWhatsAppChatUrl(
                settings.whatsappNumber,
                `Hello IFYTEX Interior Design, I would like to book an on-site measurement in Abuja.`
              )}
              target="_blank"
              rel="noopener noreferrer"
              className="px-8 py-3.5 text-xs font-semibold uppercase tracking-wider text-white border border-[#E6D1A0] hover:bg-white/10 transition-colors rounded-lg flex items-center gap-2"
            >
              <Phone className="w-3.5 h-3.5 text-[#E6D1A0]" />
              Chat on WhatsApp
            </a>
          </div>
        </div>
      </section>
    </div>
  );
};
