import React from 'react';
import { PageRoute, CompanySettings } from '../types';
import { ShieldCheck, ArrowLeft } from 'lucide-react';

interface PrivacyPolicyPageProps {
  onNavigate: (page: PageRoute) => void;
  settings: CompanySettings;
}

export const PrivacyPolicyPage: React.FC<PrivacyPolicyPageProps> = ({
  onNavigate,
  settings,
}) => {
  return (
    <div className="w-full bg-[#FAF7F2]">
      {/* Header */}
      <section className="relative py-16 bg-[#2F211B] text-white border-b border-[#C49A43]/30">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <span className="text-xs uppercase tracking-[0.2em] font-semibold text-[#E6D1A0]">
            Legal & Confidentiality
          </span>
          <h1 className="font-serif text-3xl sm:text-4xl text-white mt-2 mb-2">
            Privacy Policy & Client Data Protection
          </h1>
          <p className="text-xs text-[#E6D1A0]/70">
            Last updated: October 2026 · IFYTEX Interior Design, Abuja, Nigeria
          </p>
        </div>
      </section>

      {/* Content */}
      <section className="max-w-4xl mx-auto px-6 py-16">
        <div className="bg-white rounded-2xl p-8 sm:p-12 border border-[#E6D1A0]/40 shadow-xs space-y-8 text-sm text-[#5C4537] leading-relaxed">
          <div className="flex items-center gap-3 pb-6 border-b border-[#FAF7F2]">
            <ShieldCheck className="w-6 h-6 text-[#C49A43]" />
            <h2 className="font-serif text-xl font-bold text-[#2F211B]">
              Our Commitment to Your Privacy
            </h2>
          </div>

          <div>
            <h3 className="font-serif text-lg font-semibold text-[#2F211B] mb-2">
              1. Information We Collect
            </h3>
            <p>
              When you submit an enquiry, request a consultation, or communicate with IFYTEX Interior Design via our website or WhatsApp, we collect the necessary contact details to deliver bespoke window treatments:
            </p>
            <ul className="list-disc pl-5 mt-2 space-y-1 text-xs">
              <li>Full name, telephone / WhatsApp number, and optional email address</li>
              <li>Delivery and measurement area in Abuja (e.g. Maitama, Asokoro, Guzape, etc.)</li>
              <li>Room specifications, window measurements, fabric preferences, and any uploaded room photos</li>
            </ul>
          </div>

          <div>
            <h3 className="font-serif text-lg font-semibold text-[#2F211B] mb-2">
              2. How Your Information Is Used
            </h3>
            <p>
              Your personal information is used exclusively for:
            </p>
            <ul className="list-disc pl-5 mt-2 space-y-1 text-xs">
              <li>Scheduling on-site measurements and fabric consultations</li>
              <li>Calculating accurate quotations and tailored fabrication specs</li>
              <li>Communicating project milestones and installation schedules</li>
              <li>Providing post-installation customer care</li>
            </ul>
          </div>

          <div>
            <h3 className="font-serif text-lg font-semibold text-[#2F211B] mb-2">
              3. Protection of Customer Enquiries
            </h3>
            <p>
              In accordance with the Nigeria Data Protection Act (NDPA) and strict privacy best practices:
            </p>
            <ul className="list-disc pl-5 mt-2 space-y-1 text-xs">
              <li>Your submission details, phone numbers, and residential locations are strictly private.</li>
              <li>We never publish customer enquiries, personal phone numbers, or residential addresses on public pages.</li>
              <li>We do not sell, rent, or trade your contact information to third-party marketing companies.</li>
            </ul>
          </div>

          <div>
            <h3 className="font-serif text-lg font-semibold text-[#2F211B] mb-2">
              4. Photographs of Installed Spaces
            </h3>
            <p>
              We take pride in our window craft. Where photographs of completed window drapes or blinds are featured in our portfolio, they focus on the window treatments and fabric craftsmanship. We never display identifying personal artifacts, address numbers, or sensitive homeowner items without express consent.
            </p>
          </div>

          <div>
            <h3 className="font-serif text-lg font-semibold text-[#2F211B] mb-2">
              5. Contact Us Regarding Your Data
            </h3>
            <p>
              If you have any questions or wish to review, update, or remove your enquiry records from our internal system, contact us directly:
            </p>
            <div className="mt-3 p-4 rounded-xl bg-[#FAF7F2] border border-[#E6D1A0]/40 text-xs space-y-1 text-[#4A3023]">
              <p><strong>Business Name:</strong> {settings.name}</p>
              <p><strong>Location:</strong> {settings.location}</p>
              <p><strong>Email:</strong> {settings.email}</p>
              <p><strong>WhatsApp:</strong> {settings.whatsappNumber}</p>
            </div>
          </div>

          <div className="pt-6 border-t border-[#FAF7F2]">
            <button
              onClick={() => onNavigate('home')}
              className="px-5 py-2.5 text-xs font-semibold uppercase tracking-wider text-[#4A3023] border border-[#C49A43] hover:bg-[#FAF7F2] transition-colors rounded-lg flex items-center gap-2 cursor-pointer"
            >
              <ArrowLeft className="w-3.5 h-3.5" /> Return to Homepage
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};
