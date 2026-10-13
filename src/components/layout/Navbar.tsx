import React, { useState } from 'react';
import { PageRoute, CompanySettings } from '../../types';
import { BrandLogo } from '../common/BrandLogo';
import { Menu, X } from 'lucide-react';

interface NavbarProps {
  currentPage: PageRoute;
  onNavigate: (page: PageRoute) => void;
  settings: CompanySettings;
}

export const Navbar: React.FC<NavbarProps> = ({
  currentPage,
  onNavigate,
  settings,
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navItems: { label: string; page: PageRoute }[] = [
    { label: 'Home', page: 'home' },
    { label: 'About', page: 'about' },
    { label: 'Services', page: 'services' },
    { label: 'Products', page: 'products' },
    { label: 'Curtains & Blinds', page: 'curtains-blinds' },
    { label: 'Gallery', page: 'gallery' },
    { label: 'Contact', page: 'contact' },
  ];

  const handleNav = (page: PageRoute) => {
    onNavigate(page);
    setMobileMenuOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <header className="sticky top-0 z-40 w-full bg-white/98 backdrop-blur-xs border-b border-[#E6D1A0]/40 shadow-[0_2px_12px_rgba(42,30,23,0.04)]">
      {/* Main navigation container — strictly nothing above this header */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between min-h-[115px] sm:min-h-[125px] md:min-h-[135px] lg:min-h-[145px] py-3 sm:py-3.5">
          {/* Approved IFYTEX Logo on the left at prominent scale (180-220px desktop, 120-145px mobile) */}
          <div className="shrink-0 flex items-center py-1">
            <BrandLogo
              customLogoUrl={settings.logoUrl}
              onClick={() => handleNav('home')}
              size="header"
            />
          </div>

          {/* Navigation links arranged neatly across the centre / right */}
          <nav className="hidden md:flex items-center gap-6 lg:gap-8">
            {navItems.map((item) => {
              const isActive = currentPage === item.page;
              return (
                <button
                  key={item.page}
                  onClick={() => handleNav(item.page)}
                  className={`relative py-2.5 text-sm font-semibold tracking-wide transition-all whitespace-nowrap cursor-pointer ${
                    isActive
                      ? 'text-[#C49A43]'
                      : 'text-[#2F211B] hover:text-[#C49A43]'
                  }`}
                >
                  {item.label}
                  {isActive && (
                    <span className="absolute bottom-0 left-0 right-0 h-[2.5px] bg-[#C49A43] rounded-full" />
                  )}
                </button>
              );
            })}
          </nav>

          {/* Mobile hamburger menu toggle */}
          <div className="flex md:hidden items-center">
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-lg text-[#2F211B] hover:bg-[#FAF7F2] transition-colors cursor-pointer"
              aria-label="Toggle navigation menu"
              aria-expanded={mobileMenuOpen}
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu Drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-white border-b border-[#E6D1A0]/40 px-6 py-5 shadow-xl animate-in slide-in-from-top-2 duration-200">
          <nav className="flex flex-col space-y-2">
            {navItems.map((item) => {
              const isActive = currentPage === item.page;
              return (
                <button
                  key={item.page}
                  onClick={() => handleNav(item.page)}
                  className={`text-left py-3 px-3.5 rounded-lg text-sm font-semibold transition-colors cursor-pointer ${
                    isActive
                      ? 'bg-[#FAF7F2] text-[#C49A43] border-l-3 border-[#C49A43]'
                      : 'text-[#2F211B] hover:bg-[#FAF7F2]'
                  }`}
                >
                  {item.label}
                </button>
              );
            })}
          </nav>
        </div>
      )}
    </header>
  );
};
