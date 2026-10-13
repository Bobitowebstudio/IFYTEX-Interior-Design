import React from 'react';
import { PageRoute, CompanySettings } from '../../types';
import { BrandLogo } from '../common/BrandLogo';
import { createWhatsAppChatUrl } from '../../services/whatsapp';
import { Mail, MapPin, Clock, ArrowRight, Instagram, Facebook } from 'lucide-react';

interface FooterProps {
  onNavigate: (page: PageRoute) => void;
  settings: CompanySettings;
}

export const Footer: React.FC<FooterProps> = ({ onNavigate, settings }) => {
  const whatsappUrl = createWhatsAppChatUrl(
    settings.whatsappNumber,
    `Hello ${settings.name}, I would like to enquire about your curtains, blinds and interior design services.`
  );

  const handleNav = (page: PageRoute) => {
    onNavigate(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-[#3B261D] text-[#FAF7F2] border-t border-[#C9A45C]/35">
      {/* Top Banner / Consultation Callout */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 border-b border-white/10">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          <div className="max-w-xl">
            <span className="text-xs uppercase tracking-widest text-[#E6D1A0] font-bold">
              Abuja Bespoke Window Treatments
            </span>
            <h3 className="font-serif text-2xl sm:text-3xl text-white mt-1">
              Elevate Your Home with Tailored Luxury Drapes & Blinds
            </h3>
            <p className="text-sm text-[#E6D1A0]/85 mt-2 font-light">
              Book an accurate on-site window measurement and fabric consultation across Abuja.
            </p>
          </div>
          <div className="flex flex-wrap items-center gap-4">
            <button
              onClick={() => handleNav('contact')}
              className="px-6 py-3 text-xs font-bold uppercase tracking-wider text-[#3B261D] bg-[#E6D1A0] hover:bg-[#C9A45C] transition-colors rounded-lg shadow-sm flex items-center gap-2 cursor-pointer"
            >
              Request a Free Quote <ArrowRight className="w-3.5 h-3.5" />
            </button>
            <a
              href={whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="px-6 py-3 text-xs font-bold uppercase tracking-wider text-white border border-[#C9A45C] hover:bg-[#C9A45C]/20 transition-colors rounded-lg flex items-center gap-2 cursor-pointer"
            >
              <svg className="w-4 h-4 fill-current text-[#25D366]" viewBox="0 0 24 24">
                <path d="M17.507 14.307l-.009.075c-.239.987-1.18 1.802-2.193 1.902-.656.065-1.503-.024-3.072-.676-2.008-.834-3.513-2.613-4.468-4.108-.946-1.482-1.04-2.457-.962-2.923.109-.643.529-1.229 1.053-1.492.315-.158.64-.202.909-.202.261 0 .493.011.666.027.202.019.417.061.593.473.197.461.674 1.638.733 1.758.059.12.099.261.02.418-.079.157-.118.256-.236.395-.118.139-.249.311-.355.417-.119.119-.243.249-.105.486.138.237.615 1.014 1.32 1.642.908.809 1.674 1.06 1.912 1.178.238.118.377.099.516-.06.139-.158.594-.693.752-.931.158-.238.317-.198.535-.118.218.079 1.385.653 1.623.772.238.119.396.178.455.277.059.099.059.574-.18 1.561zM12.04 2C6.518 2 2.03 6.476 2.03 11.986c0 1.954.567 3.779 1.554 5.327L2 22l4.832-1.557c1.482.88 3.208 1.388 5.208 1.388 5.522 0 10.01-4.476 10.01-9.986C22.05 6.476 17.562 2 12.04 2z" />
              </svg>
              WhatsApp Us
            </a>
          </div>
        </div>
      </div>

      {/* Main Footer Columns */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          {/* Col 1: Brand & Bio */}
          <div className="space-y-4">
            <div className="inline-flex items-center justify-center bg-[#FAF7F2] rounded-lg p-2.5 sm:p-3 border border-[#C9A45C]/30 shadow-xs">
              <BrandLogo customLogoUrl={settings.logoUrl} size="footer" onClick={() => handleNav('home')} />
            </div>
            <p className="text-sm text-[#E6D1A0]/80 leading-relaxed font-light">
              Nigeria&apos;s premier specialist in luxury curtains, imported fabrics, modern window blinds, and turnkey interior design. Bringing timeless comfort and prestige to spaces for over 12 years.
            </p>
            {/* Social Links */}
            <div className="flex items-center gap-3 pt-2">
              {settings.facebookUrl && (
                <a
                  href={settings.facebookUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-9 h-9 rounded-lg bg-white/5 border border-[#C49A43]/40 flex items-center justify-center text-[#E6D1A0] hover:text-white hover:bg-[#C49A43] transition-colors"
                  aria-label="Facebook"
                >
                  <Facebook className="w-4 h-4" />
                </a>
              )}
              {settings.instagramUrl && (
                <a
                  href={settings.instagramUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-9 h-9 rounded-lg bg-white/5 border border-[#C49A43]/40 flex items-center justify-center text-[#E6D1A0] hover:text-white hover:bg-[#C49A43] transition-colors"
                  aria-label="Instagram"
                >
                  <Instagram className="w-4 h-4" />
                </a>
              )}
              {/* Recognisable WhatsApp icon in footer */}
              <a
                href={whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 rounded-lg bg-white/5 border border-[#25D366]/60 flex items-center justify-center text-[#25D366] hover:text-white hover:bg-[#25D366] transition-colors"
                aria-label="Chat with IFYTEX Interior Design on WhatsApp"
              >
                <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                  <path d="M17.507 14.307l-.009.075c-.239.987-1.18 1.802-2.193 1.902-.656.065-1.503-.024-3.072-.676-2.008-.834-3.513-2.613-4.468-4.108-.946-1.482-1.04-2.457-.962-2.923.109-.643.529-1.229 1.053-1.492.315-.158.64-.202.909-.202.261 0 .493.011.666.027.202.019.417.061.593.473.197.461.674 1.638.733 1.758.059.12.099.261.02.418-.079.157-.118.256-.236.395-.118.139-.249.311-.355.417-.119.119-.243.249-.105.486.138.237.615 1.014 1.32 1.642.908.809 1.674 1.06 1.912 1.178.238.118.377.099.516-.06.139-.158.594-.693.752-.931.158-.238.317-.198.535-.118.218.079 1.385.653 1.623.772.238.119.396.178.455.277.059.099.059.574-.18 1.561zM12.04 2C6.518 2 2.03 6.476 2.03 11.986c0 1.954.567 3.779 1.554 5.327L2 22l4.832-1.557c1.482.88 3.208 1.388 5.208 1.388 5.522 0 10.01-4.476 10.01-9.986C22.05 6.476 17.562 2 12.04 2z" />
                </svg>
              </a>
            </div>
          </div>

          {/* Col 2: Quick Links */}
          <div>
            <h4 className="text-xs font-semibold tracking-wider uppercase text-[#E6D1A0] mb-5">
              Quick Navigation
            </h4>
            <ul className="space-y-3 text-sm text-[#E6D1A0]/80">
              <li>
                <button
                  onClick={() => handleNav('home')}
                  className="hover:text-white transition-colors cursor-pointer"
                >
                  Home
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleNav('about')}
                  className="hover:text-white transition-colors cursor-pointer"
                >
                  About IFYTEX Interior Design
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleNav('services')}
                  className="hover:text-white transition-colors cursor-pointer"
                >
                  Our Services
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleNav('products')}
                  className="hover:text-white transition-colors cursor-pointer"
                >
                  Product Showcase
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleNav('curtains-blinds')}
                  className="hover:text-white transition-colors cursor-pointer"
                >
                  Curtains & Blinds Catalogue
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleNav('gallery')}
                  className="hover:text-white transition-colors cursor-pointer"
                >
                  Gallery & Projects
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleNav('contact')}
                  className="hover:text-white transition-colors cursor-pointer"
                >
                  Request a Quote
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleNav('privacy')}
                  className="hover:text-white transition-colors cursor-pointer"
                >
                  Privacy Policy
                </button>
              </li>
            </ul>
          </div>

          {/* Col 3: Interior Services */}
          <div>
            <h4 className="text-xs font-semibold tracking-wider uppercase text-[#E6D1A0] mb-5">
              Our Services
            </h4>
            <ul className="space-y-3 text-sm text-[#E6D1A0]/80">
              <li>
                <button
                  onClick={() => handleNav('services')}
                  className="hover:text-white transition-colors cursor-pointer text-left"
                >
                  Curtains & Window Treatments
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleNav('services')}
                  className="hover:text-white transition-colors cursor-pointer text-left"
                >
                  Blinds & Window Coverings
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleNav('services')}
                  className="hover:text-white transition-colors cursor-pointer text-left"
                >
                  Interior Decoration & Contracting
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleNav('services')}
                  className="hover:text-white transition-colors cursor-pointer text-left"
                >
                  Consultation & Measurement
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleNav('services')}
                  className="hover:text-white transition-colors cursor-pointer text-left"
                >
                  Professional Installation
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleNav('services')}
                  className="hover:text-white transition-colors cursor-pointer text-left"
                >
                  Custom Interior Solutions
                </button>
              </li>
            </ul>
          </div>

          {/* Col 4: Abuja Contact & Hours */}
          <div>
            <h4 className="text-xs font-semibold tracking-wider uppercase text-[#E6D1A0] mb-5">
              Contact & Location
            </h4>
            <div className="space-y-4 text-sm text-[#E6D1A0]/80">
              <div className="flex items-start gap-3">
                <MapPin className="w-4 h-4 text-[#C49A43] shrink-0 mt-0.5" />
                <div>
                  <strong className="text-white block">{settings.location}</strong>
                  <span className="text-xs text-[#E6D1A0]/70 leading-relaxed block mt-0.5">
                    {settings.addressNote}
                  </span>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <svg className="w-4 h-4 fill-current text-[#25D366] shrink-0" viewBox="0 0 24 24">
                  <path d="M17.507 14.307l-.009.075c-.239.987-1.18 1.802-2.193 1.902-.656.065-1.503-.024-3.072-.676-2.008-.834-3.513-2.613-4.468-4.108-.946-1.482-1.04-2.457-.962-2.923.109-.643.529-1.229 1.053-1.492.315-.158.64-.202.909-.202.261 0 .493.011.666.027.202.019.417.061.593.473.197.461.674 1.638.733 1.758.059.12.099.261.02.418-.079.157-.118.256-.236.395-.118.139-.249.311-.355.417-.119.119-.243.249-.105.486.138.237.615 1.014 1.32 1.642.908.809 1.674 1.06 1.912 1.178.238.118.377.099.516-.06.139-.158.594-.693.752-.931.158-.238.317-.198.535-.118.218.079 1.385.653 1.623.772.238.119.396.178.455.277.059.099.059.574-.18 1.561zM12.04 2C6.518 2 2.03 6.476 2.03 11.986c0 1.954.567 3.779 1.554 5.327L2 22l4.832-1.557c1.482.88 3.208 1.388 5.208 1.388 5.522 0 10.01-4.476 10.01-9.986C22.05 6.476 17.562 2 12.04 2z" />
                </svg>
                <a
                  href={whatsappUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-white transition-colors"
                >
                  {settings.whatsappNumber} (WhatsApp)
                </a>
              </div>

              <div className="flex items-center gap-3">
                <Mail className="w-4 h-4 text-[#C49A43] shrink-0" />
                <a
                  href={`mailto:${settings.email}`}
                  className="hover:text-white transition-colors text-xs"
                >
                  {settings.email}
                </a>
              </div>

              <div className="flex items-center gap-3">
                <Clock className="w-4 h-4 text-[#C49A43] shrink-0" />
                <span className="text-xs">{settings.workingHours}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-12 mt-12 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-[#E6D1A0]/60">
          <p>{settings.copyrightText}</p>
          <div className="flex items-center gap-6">
            <button
              onClick={() => handleNav('privacy')}
              className="hover:text-[#E6D1A0] transition-colors cursor-pointer"
            >
              Privacy Policy
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
};
