import React, { useState } from 'react';
import { PageRoute, CompanySettings, AutomatedRepliesConfig } from '../types';
import { storage } from '../services/storage';
import { createWhatsAppChatUrl } from '../services/whatsapp';
import { Phone, Mail, MapPin, Clock, CheckCircle2, AlertCircle, Send, Upload, Shield } from 'lucide-react';

interface ContactPageProps {
  onNavigate: (page: PageRoute) => void;
  settings: CompanySettings;
  automatedReplies: AutomatedRepliesConfig;
  initialService?: string;
  initialItem?: string;
}

export const ContactPage: React.FC<ContactPageProps> = ({
  onNavigate,
  settings,
  automatedReplies,
  initialService,
  initialItem,
}) => {
  const [fullName, setFullName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [serviceRequired, setServiceRequired] = useState(
    initialService || 'Curtains & Window Treatments'
  );
  const [description, setDescription] = useState(
    initialItem
      ? `I am interested in ${initialItem}. Please contact me to schedule a measurement and provide an itemized quote.`
      : ''
  );
  const [attachedImageName, setAttachedImageName] = useState<string | null>(null);
  const [privacyConsent, setPrivacyConsent] = useState(false);

  // Submission state
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const servicesList = [
    'Curtains & Window Treatments',
    'Blinds & Window Coverings',
    'Interior Decoration & Contracting',
    'Consultation & Measurement',
    'Professional Installation',
    'Custom Interior Solutions',
    'Fabric Swatch Selection & Inquiry',
    'General Consultation',
  ];

  const handleImageFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      // Check size (max 5MB)
      if (file.size > 5 * 1024 * 1024) {
        setErrorMessage('Uploaded image should be smaller than 5MB.');
        return;
      }
      setAttachedImageName(file.name);
      setErrorMessage(null);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage(null);

    // Validation
    if (!fullName.trim()) {
      setErrorMessage('Please enter your full name.');
      return;
    }
    if (!phone.trim() || phone.trim().length < 8) {
      setErrorMessage('Please enter a valid phone number (e.g. 09061302309).');
      return;
    }
    if (email.trim() && !/^\S+@\S+\.\S+$/.test(email.trim())) {
      setErrorMessage('Please provide a valid email address.');
      return;
    }
    if (!description.trim()) {
      setErrorMessage('Please describe your room or window requirements.');
      return;
    }
    if (!privacyConsent) {
      setErrorMessage('Please check the privacy consent to proceed.');
      return;
    }

    setIsSubmitting(true);

    try {
      // Save enquiry persistently
      storage.addEnquiry({
        type: 'quote',
        fullName: fullName.trim(),
        phone: phone.trim(),
        email: email.trim() || undefined,
        serviceRequired,
        description: description.trim(),
        attachedImageName: attachedImageName || undefined,
      });

      setIsSubmitting(false);
      setSubmitSuccess(true);
    } catch {
      setIsSubmitting(false);
      setErrorMessage('An unexpected error occurred while saving. Please try again or message us on WhatsApp.');
    }
  };

  const whatsappDirectUrl = createWhatsAppChatUrl(
    settings.whatsappNumber,
    `Hello ${settings.name}, my name is ${fullName || 'Client'}. I would like to request a quote for ${serviceRequired}. ${description ? `Details: ${description}` : ''}`
  );

  return (
    <div className="w-full bg-[#FAF7F2]">
      {/* Banner */}
      <section className="relative py-20 bg-[#2F211B] text-white border-b border-[#C49A43]/30">
        <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 text-center">
          <span className="text-xs uppercase tracking-[0.2em] font-semibold text-[#E6D1A0]">
            Get In Touch
          </span>
          <h1 className="font-serif text-3xl sm:text-5xl text-white mt-2 mb-4">
            Request a Quote & Book Consultation
          </h1>
          <p className="text-base text-[#E6D1A0]/80 max-w-2xl mx-auto leading-relaxed">
            Our team in Abuja provides on-site window measurements, tactile fabric consultations, and comprehensive quotes tailored to your space.
          </p>
        </div>
      </section>

      {/* Main Content: Info on Left, Form on Right */}
      <section className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 py-16 lg:py-24">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16">
          {/* Left Column: Direct Contact & Location Details */}
          <div className="lg:col-span-5 space-y-8">
            <div>
              <span className="text-xs uppercase tracking-[0.2em] font-semibold text-[#C49A43]">
                Direct Contacts
              </span>
              <h2 className="font-serif text-2xl sm:text-3xl text-[#2F211B] font-semibold mt-1">
                We Are Here to Help
              </h2>
              <p className="text-sm text-[#5C4537] mt-3 leading-relaxed">
                Have urgent questions or prefer instant real-time chat? Reach us directly on WhatsApp or phone call.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-white border border-[#E6D1A0]/40 shadow-xs space-y-6">
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-xl bg-[#FAF7F2] border border-[#E6D1A0] flex items-center justify-center text-[#4A3023] shrink-0">
                  <MapPin className="w-5 h-5 text-[#C49A43]" />
                </div>
                <div>
                  <h4 className="text-xs uppercase tracking-wider font-semibold text-[#4A3023]">
                    Location & Service Coverage
                  </h4>
                  <p className="text-sm font-semibold text-[#2F211B] mt-0.5">
                    {settings.location}
                  </p>
                  <p className="text-xs text-[#7C6556] mt-1 leading-relaxed">
                    {settings.addressNote}
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-xl bg-[#FAF7F2] border border-[#E6D1A0] flex items-center justify-center text-[#4A3023] shrink-0">
                  <Phone className="w-5 h-5 text-[#C49A43]" />
                </div>
                <div>
                  <h4 className="text-xs uppercase tracking-wider font-semibold text-[#4A3023]">
                    WhatsApp & Phone
                  </h4>
                  <a
                    href={whatsappDirectUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-sm font-semibold text-[#2F211B] hover:text-[#C49A43] transition-colors mt-0.5 block"
                  >
                    {settings.whatsappNumber}
                  </a>
                  <span className="text-xs text-[#7C6556]">Direct chat available daily</span>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-xl bg-[#FAF7F2] border border-[#E6D1A0] flex items-center justify-center text-[#4A3023] shrink-0">
                  <Mail className="w-5 h-5 text-[#C49A43]" />
                </div>
                <div>
                  <h4 className="text-xs uppercase tracking-wider font-semibold text-[#4A3023]">
                    Email Inquiries
                  </h4>
                  <a
                    href={`mailto:${settings.email}`}
                    className="text-sm font-semibold text-[#2F211B] hover:text-[#C49A43] transition-colors mt-0.5 block break-all"
                  >
                    {settings.email}
                  </a>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-xl bg-[#FAF7F2] border border-[#E6D1A0] flex items-center justify-center text-[#4A3023] shrink-0">
                  <Clock className="w-5 h-5 text-[#C49A43]" />
                </div>
                <div>
                  <h4 className="text-xs uppercase tracking-wider font-semibold text-[#4A3023]">
                    Business Consultation Hours
                  </h4>
                  <p className="text-xs text-[#7C6556] mt-0.5 leading-relaxed">
                    {settings.workingHours}
                  </p>
                </div>
              </div>
            </div>

            {/* Quick WhatsApp Box */}
            <div className="p-6 rounded-2xl bg-[#2F211B] text-white border border-[#C49A43]/40 space-y-4">
              <span className="text-xs uppercase tracking-widest text-[#E6D1A0] font-semibold">
                Instant Chat
              </span>
              <h4 className="font-serif text-xl text-white">
                Chat Directly with Our Window Specialist
              </h4>
              <p className="text-xs text-[#E6D1A0]/80 leading-relaxed">
                Send photos of your windows directly on WhatsApp for preliminary advice and rapid estimates.
              </p>
              <a
                href={whatsappDirectUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-6 py-3 text-xs font-semibold uppercase tracking-wider text-[#2F211B] bg-[#E6D1A0] hover:bg-[#C49A43] transition-colors rounded-lg"
              >
                <Phone className="w-3.5 h-3.5 text-[#2F211B]" />
                Open WhatsApp Now
              </a>
            </div>
          </div>

          {/* Right Column: Interactive Quote Request Form */}
          <div className="lg:col-span-7">
            <div className="bg-white rounded-2xl p-8 sm:p-10 border border-[#E6D1A0]/50 shadow-sm">
              {submitSuccess ? (
                /* Success State with Automated Acknowledgement */
                <div className="text-center py-10 space-y-6 animate-in fade-in duration-300">
                  <div className="w-16 h-16 rounded-full bg-[#FAF7F2] border-2 border-[#C49A43] text-[#C49A43] flex items-center justify-center mx-auto">
                    <CheckCircle2 className="w-8 h-8" />
                  </div>

                  <div>
                    <span className="text-xs uppercase tracking-widest text-[#C49A43] font-semibold">
                      Enquiry Received
                    </span>
                    <h3 className="font-serif text-2xl sm:text-3xl text-[#2F211B] font-bold mt-1">
                      Thank You, {fullName}!
                    </h3>
                  </div>

                  {/* Configured acknowledgement text matching prompt */}
                  <div className="p-6 rounded-xl bg-[#FAF7F2] border border-[#E6D1A0]/60 text-left max-w-lg mx-auto">
                    <p className="text-sm text-[#4A3023] leading-relaxed">
                      {automatedReplies.websiteSuccessMessage}
                    </p>
                  </div>

                  <div className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-4">
                    <a
                      href={whatsappDirectUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-full sm:w-auto px-6 py-3 text-xs font-semibold uppercase tracking-wider text-white bg-[#4A3023] hover:bg-[#2F211B] transition-colors rounded-lg flex items-center justify-center gap-2"
                    >
                      <Phone className="w-3.5 h-3.5 text-[#E6D1A0]" />
                      Continue on WhatsApp
                    </a>
                    <button
                      onClick={() => {
                        setSubmitSuccess(false);
                        setDescription('');
                        setFullName('');
                        setPhone('');
                      }}
                      className="w-full sm:w-auto px-6 py-3 text-xs font-semibold uppercase tracking-wider text-[#4A3023] border border-[#C49A43] hover:bg-[#FAF7F2] transition-colors rounded-lg cursor-pointer"
                    >
                      Submit Another Enquiry
                    </button>
                  </div>
                </div>
              ) : (
                /* The Enquiry / Quote Form */
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div>
                    <span className="text-xs uppercase tracking-[0.2em] font-semibold text-[#C49A43]">
                      Consultation Request
                    </span>
                    <h3 className="font-serif text-2xl sm:text-3xl text-[#2F211B] font-semibold mt-1">
                      Tell Us About Your Project
                    </h3>
                    <p className="text-xs sm:text-sm text-[#7C6556] mt-1.5">
                      Fill in your details below and we will contact you to schedule an on-site visit or provide a quotation.
                    </p>
                  </div>

                  {errorMessage && (
                    <div className="p-4 rounded-xl bg-red-50 border border-red-200 text-red-700 text-xs flex items-center gap-2">
                      <AlertCircle className="w-4 h-4 shrink-0" />
                      <span>{errorMessage}</span>
                    </div>
                  )}

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    {/* Full Name */}
                    <div>
                      <label className="block text-xs font-semibold text-[#4A3023] uppercase tracking-wider mb-1.5">
                        Full Name <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="text"
                        required
                        value={fullName}
                        onChange={(e) => setFullName(e.target.value)}
                        placeholder="e.g. Alhaji Ibrahim Mohammed"
                        className="w-full px-4 py-2.5 text-xs rounded-lg bg-[#FAF7F2] border border-[#E6D1A0]/60 text-[#2F211B] focus:outline-hidden focus:border-[#C49A43] focus:bg-white"
                      />
                    </div>

                    {/* Phone Number */}
                    <div>
                      <label className="block text-xs font-semibold text-[#4A3023] uppercase tracking-wider mb-1.5">
                        Phone Number (WhatsApp) <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="tel"
                        required
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        placeholder="e.g. 09061302309"
                        className="w-full px-4 py-2.5 text-xs rounded-lg bg-[#FAF7F2] border border-[#E6D1A0]/60 text-[#2F211B] focus:outline-hidden focus:border-[#C49A43] focus:bg-white"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    {/* Email */}
                    <div>
                      <label className="block text-xs font-semibold text-[#4A3023] uppercase tracking-wider mb-1.5">
                        Email Address <span className="text-[#A8988B] normal-case">(optional)</span>
                      </label>
                      <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="yourname@domain.com"
                        className="w-full px-4 py-2.5 text-xs rounded-lg bg-[#FAF7F2] border border-[#E6D1A0]/60 text-[#2F211B] focus:outline-hidden focus:border-[#C49A43] focus:bg-white"
                      />
                    </div>

                    {/* Service Required */}
                    <div>
                      <label className="block text-xs font-semibold text-[#4A3023] uppercase tracking-wider mb-1.5">
                        Service Required <span className="text-red-500">*</span>
                      </label>
                      <select
                        value={serviceRequired}
                        onChange={(e) => setServiceRequired(e.target.value)}
                        className="w-full px-4 py-2.5 text-xs rounded-lg bg-[#FAF7F2] border border-[#E6D1A0]/60 text-[#2F211B] focus:outline-hidden focus:border-[#C49A43] focus:bg-white cursor-pointer"
                      >
                        {servicesList.map((srv) => (
                          <option key={srv} value={srv}>
                            {srv}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>

                  {/* Project Description */}
                  <div>
                    <label className="block text-xs font-semibold text-[#4A3023] uppercase tracking-wider mb-1.5">
                      Room & Window Details <span className="text-red-500">*</span>
                    </label>
                    <textarea
                      required
                      rows={4}
                      value={description}
                      onChange={(e) => setDescription(e.target.value)}
                      placeholder="Please mention window quantities, approximate ceiling height, curtain or blind preference, and specific styling notes..."
                      className="w-full px-4 py-2.5 text-xs rounded-lg bg-[#FAF7F2] border border-[#E6D1A0]/60 text-[#2F211B] focus:outline-hidden focus:border-[#C49A43] focus:bg-white resize-y"
                    />
                  </div>

                  {/* Optional Image Upload */}
                  <div>
                    <label className="block text-xs font-semibold text-[#4A3023] uppercase tracking-wider mb-1.5">
                      Attach Window / Room Photo <span className="text-[#A8988B] normal-case">(optional, max 5MB)</span>
                    </label>
                    <div className="flex items-center gap-3">
                      <label className="px-4 py-2 text-xs font-medium rounded-lg border border-[#E6D1A0] bg-[#FAF7F2] text-[#4A3023] hover:bg-white transition-colors cursor-pointer flex items-center gap-2">
                        <Upload className="w-3.5 h-3.5 text-[#C49A43]" />
                        <span>Choose File</span>
                        <input
                          type="file"
                          accept="image/*"
                          onChange={handleImageFileChange}
                          className="hidden"
                        />
                      </label>
                      <span className="text-xs text-[#7C6556] truncate">
                        {attachedImageName || 'No image attached yet'}
                      </span>
                    </div>
                  </div>

                  {/* Privacy Notice Consent */}
                  <div className="pt-2">
                    <label className="flex items-start gap-2.5 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={privacyConsent}
                        onChange={(e) => setPrivacyConsent(e.target.checked)}
                        className="mt-1 w-4 h-4 rounded text-[#4A3023] border-[#E6D1A0] focus:ring-[#C49A43]"
                      />
                      <span className="text-xs text-[#6E5A4E] leading-relaxed">
                        I agree to IFYTEX Interior Design contacting me regarding this enquiry. All contact details remain confidential and are protected under our{' '}
                        <button
                          type="button"
                          onClick={() => onNavigate('privacy')}
                          className="text-[#4A3023] underline hover:text-[#C49A43]"
                        >
                          Privacy Notice
                        </button>.
                      </span>
                    </label>
                  </div>

                  {/* Submit Button */}
                  <div className="pt-3">
                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="w-full py-3.5 text-xs font-semibold uppercase tracking-wider text-white bg-[#4A3023] hover:bg-[#2F211B] transition-colors rounded-lg shadow-sm flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
                    >
                      {isSubmitting ? (
                        <span>Submitting Your Enquiry...</span>
                      ) : (
                        <>
                          <Send className="w-3.5 h-3.5 text-[#E6D1A0]" />
                          Submit Quote Request
                        </>
                      )}
                    </button>
                  </div>
                </form>
              )}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
