/**
 * IFYTEX Interior Design WhatsApp Utilities
 * Handles phone normalization, Nigerian E.164 conversion,
 * and pre-filled customer reply messages.
 */

export const IFYTEX_BUSINESS_WHATSAPP_RAW = '09061302309';
export const IFYTEX_BUSINESS_WHATSAPP_INTL = '2349061302309';

export interface PhoneValidationResult {
  isValid: boolean;
  normalized: string;
  formattedDisplay: string;
  errorMessage?: string;
}

/**
 * Validates and normalizes Nigerian and international phone numbers for WhatsApp.
 * Handles numbers beginning with 0, 234, +234, spaces, dashes, or parentheses.
 */
export function validateAndNormalizeNigerianPhone(rawPhone?: string | null): PhoneValidationResult {
  if (!rawPhone || !rawPhone.trim()) {
    return {
      isValid: false,
      normalized: '',
      formattedDisplay: '',
      errorMessage: 'Customer did not provide a phone number.',
    };
  }

  const trimmed = rawPhone.trim();
  // Strip all non-digit characters except leading plus if any
  const cleaned = trimmed.replace(/[^\d+]/g, '');
  const digits = cleaned.replace(/\D/g, '');

  if (!digits || digits.length < 8) {
    return {
      isValid: false,
      normalized: '',
      formattedDisplay: trimmed,
      errorMessage: `Phone number "${trimmed}" is too short or contains invalid characters.`,
    };
  }

  // 1. Standard Nigerian local number with 11 digits: e.g. 09061302309, 08031234567
  if (digits.startsWith('0') && digits.length === 11) {
    const normalized = '234' + digits.slice(1);
    return {
      isValid: true,
      normalized,
      formattedDisplay: `+234 ${digits.slice(1, 4)} ${digits.slice(4, 7)} ${digits.slice(7)}`,
    };
  }

  // 2. Nigerian international number starting with 234 (13 digits: e.g. 2349061302309 or +2349061302309)
  if (digits.startsWith('234') && digits.length === 13) {
    return {
      isValid: true,
      normalized: digits,
      formattedDisplay: `+234 ${digits.slice(3, 6)} ${digits.slice(6, 9)} ${digits.slice(9)}`,
    };
  }

  // 3. Nigerian local 10 digits without leading zero: e.g. 9061302309
  if (digits.length === 10 && ['7', '8', '9'].includes(digits[0])) {
    const normalized = '234' + digits;
    return {
      isValid: true,
      normalized,
      formattedDisplay: `+234 ${digits.slice(0, 3)} ${digits.slice(3, 6)} ${digits.slice(6)}`,
    };
  }

  // 4. Starts with 234 and length between 11 and 14 digits
  if (digits.startsWith('234') && digits.length >= 11 && digits.length <= 14) {
    return {
      isValid: true,
      normalized: digits,
      formattedDisplay: `+${digits}`,
    };
  }

  // 5. Generic international phone number (starts with + or 9-15 digits)
  if (digits.length >= 9 && digits.length <= 15) {
    if (digits.startsWith('0')) {
      const normalized = '234' + digits.slice(1);
      return {
        isValid: true,
        normalized,
        formattedDisplay: `+234 ${digits.slice(1)}`,
      };
    }
    return {
      isValid: true,
      normalized: digits,
      formattedDisplay: `+${digits}`,
    };
  }

  return {
    isValid: false,
    normalized: '',
    formattedDisplay: trimmed,
    errorMessage: `"${trimmed}" could not be recognized as a valid phone number.`,
  };
}

/**
 * Formats a Nigerian local phone number (e.g. 09061302309) into international E.164 without plus or spaces (e.g. 2349061302309)
 * for WhatsApp wa.me links.
 */
export function formatWhatsAppNumberForLink(phone: string): string {
  const result = validateAndNormalizeNigerianPhone(phone);
  if (result.isValid) {
    return result.normalized;
  }
  return IFYTEX_BUSINESS_WHATSAPP_INTL;
}

/**
 * Builds a direct wa.me link with encoded pre-filled text
 */
export function createWhatsAppChatUrl(phone: string, text: string): string {
  const internationalNumber = formatWhatsAppNumberForLink(phone);
  const encodedText = encodeURIComponent(text);
  return `https://wa.me/${internationalNumber}?text=${encodedText}`;
}

/**
 * Generates the official IFYTEX personalized reply message according to enquiry type:
 *
 * For quote requests:
 * "Hello [Customer Name], thank you for contacting IFYTEX Interior Design about [Requested Service]. We have received your quotation request and would be happy to discuss your requirements with you. Please let us know any additional details that may help us assist you. Thank you!"
 *
 * For contact enquiries:
 * "Hello [Customer Name], thank you for reaching out to IFYTEX Interior Design. We have received your message and would be happy to assist you. We look forward to speaking with you!"
 */
export function generateEnquiryWhatsAppReplyMessage(enquiry: {
  fullName: string;
  type?: 'contact' | 'quote';
  serviceRequired?: string;
}): string {
  const customerName = enquiry.fullName?.trim() || 'Valued Client';
  const isQuote = enquiry.type === 'quote' || !enquiry.type;

  if (isQuote) {
    const service = enquiry.serviceRequired?.trim() || 'your interior project';
    return `Hello ${customerName}, thank you for contacting IFYTEX Interior Design about ${service}. We have received your quotation request and would be happy to discuss your requirements with you. Please let us know any additional details that may help us assist you. Thank you!`;
  } else {
    return `Hello ${customerName}, thank you for reaching out to IFYTEX Interior Design. We have received your message and would be happy to assist you. We look forward to speaking with you!`;
  }
}
