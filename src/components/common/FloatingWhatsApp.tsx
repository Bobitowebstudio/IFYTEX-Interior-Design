import React from 'react';
import { createWhatsAppChatUrl } from '../../services/whatsapp';

interface FloatingWhatsAppProps {
  phone: string;
  businessName: string;
}

export const FloatingWhatsApp: React.FC<FloatingWhatsAppProps> = ({
  phone,
  businessName,
}) => {
  const message = `Hello ${businessName}, I would like to enquire about your luxury curtains, blinds and interior design services in Abuja.`;
  const whatsappUrl = createWhatsAppChatUrl(phone, message);

  return (
    <aside aria-label="WhatsApp quick contact">
      <a
        href={whatsappUrl}
        target="_blank"
        rel="noopener noreferrer"
        aria-label={`Chat with ${businessName} on WhatsApp`}
        title={`Chat with ${businessName} on WhatsApp`}
        className="fixed bottom-6 right-6 z-40 group flex items-center gap-2.5 p-3 sm:px-4 sm:py-3 rounded-full bg-[#25D366] text-white shadow-lg hover:shadow-xl hover:bg-[#20ba59] transition-all duration-200 focus:outline-hidden focus:ring-2 focus:ring-offset-2 focus:ring-[#25D366]"
      >
        {/* Recognisable WhatsApp SVG Icon */}
        <svg
          className="w-6 h-6 fill-current shrink-0"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path d="M17.507 14.307l-.009.075c-.239.987-1.18 1.802-2.193 1.902-.656.065-1.503-.024-3.072-.676-2.008-.834-3.513-2.613-4.468-4.108-.946-1.482-1.04-2.457-.962-2.923.109-.643.529-1.229 1.053-1.492.315-.158.64-.202.909-.202.261 0 .493.011.666.027.202.019.417.061.593.473.197.461.674 1.638.733 1.758.059.12.099.261.02.418-.079.157-.118.256-.236.395-.118.139-.249.311-.355.417-.119.119-.243.249-.105.486.138.237.615 1.014 1.32 1.642.908.809 1.674 1.06 1.912 1.178.238.118.377.099.516-.06.139-.158.594-.693.752-.931.158-.238.317-.198.535-.118.218.079 1.385.653 1.623.772.238.119.396.178.455.277.059.099.059.574-.18 1.561zM12.04 2C6.518 2 2.03 6.476 2.03 11.986c0 1.954.567 3.779 1.554 5.327L2 22l4.832-1.557c1.482.88 3.208 1.388 5.208 1.388 5.522 0 10.01-4.476 10.01-9.986C22.05 6.476 17.562 2 12.04 2z" />
        </svg>

        <span className="hidden sm:inline text-xs font-semibold tracking-wide whitespace-nowrap">
          Chat on WhatsApp
        </span>
      </a>
    </aside>
  );
};
