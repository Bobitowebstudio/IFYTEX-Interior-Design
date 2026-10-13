import React from 'react';

interface BrandLogoProps {
  customLogoUrl?: string;
  className?: string;
  imgClassName?: string;
  onClick?: () => void;
  size?: 'header' | 'footer' | 'admin' | 'sm' | 'md' | 'lg';
}

export const BrandLogo: React.FC<BrandLogoProps> = ({
  customLogoUrl,
  className = '',
  imgClassName = '',
  onClick,
  size = 'header',
}) => {
  // Primary logo asset: exact transparent-background artwork provided by client
  const logoSrc = customLogoUrl || '/main_ify_logo-removebg-preview.png';

  // Sizing definitions:
  // - header: Desktop ~180-220px wide (e.g. 180px md, 205px lg, 220px xl), Mobile ~120-145px wide
  // - footer: Prominent, clear ~180-200px wide
  // - admin: Professional ~150-175px wide
  const sizeClasses = {
    header: 'w-[125px] sm:w-[145px] md:w-[180px] lg:w-[205px] xl:w-[220px] h-auto object-contain',
    footer: 'w-[155px] sm:w-[175px] md:w-[190px] lg:w-[200px] xl:w-[205px] h-auto object-contain',
    admin: 'w-[145px] sm:w-[165px] md:w-[175px] h-auto object-contain',
    sm: 'w-[110px] sm:w-[130px] h-auto object-contain',
    md: 'w-[145px] sm:w-[165px] h-auto object-contain',
    lg: 'w-[180px] sm:w-[210px] h-auto object-contain',
  }[size];

  return (
    <div
      onClick={onClick}
      className={`inline-flex items-center cursor-pointer select-none transition-transform hover:scale-[1.01] ${className}`}
      role={onClick ? 'button' : undefined}
      tabIndex={onClick ? 0 : undefined}
      onKeyDown={(e) => {
        if (onClick && (e.key === 'Enter' || e.key === ' ')) {
          e.preventDefault();
          onClick();
        }
      }}
      aria-label="IFYTEX Interior Design"
    >
      <img
        src={logoSrc}
        alt="IFYTEX Interior Design — Curtains, Blinds & Interior Solutions"
        className={`shrink-0 ${sizeClasses} transition-all ${imgClassName}`}
        loading="eager"
      />
    </div>
  );
};
