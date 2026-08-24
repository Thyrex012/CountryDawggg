/**
 * Cambodian mobile phone number validator
 * Based on prefix data from TRC (Telecommunication Regulator of Cambodia)
 * https://trc.gov.kh/en/resources/mobile-prefixes/
 *
 * Format: 3-digit prefix (starting with 0) + subscriber number
 *   - Most prefixes use a 6-digit subscriber number (9 digits total)
 *   - "Starred" prefixes use a 7-digit subscriber number (10 digits total)
 */

// Prefixes with a 6-digit subscriber number -> total length 9 (e.g. 012345678)
const SIX_DIGIT_PREFIXES = new Set([
  // Cellcard
  '011', '012', '014', '017', '061', '077', '078', '085', '089', '092', '095', '099',
  // Metfone
  '060', '066', '067', '068', '090',
  // Smart
  '010', '015', '016', '069', '070', '081', '086', '087', '093', '098',
]);

// Prefixes with a 7-digit subscriber number -> total length 10 (e.g. 0761234567)
const SEVEN_DIGIT_PREFIXES = new Set([
  '076',                        // Cellcard
  '031', '071', '088', '097',   // Metfone
  '018',                        // qb / Seatel
  '096',                        // Smart
]);

const CARRIER_BY_PREFIX = {
  '011': 'Cellcard', '012': 'Cellcard', '014': 'Cellcard', '017': 'Cellcard',
  '061': 'Cellcard', '077': 'Cellcard', '078': 'Cellcard', '085': 'Cellcard',
  '089': 'Cellcard', '092': 'Cellcard', '095': 'Cellcard', '099': 'Cellcard', '076': 'Cellcard',

  '060': 'Metfone', '066': 'Metfone', '067': 'Metfone', '068': 'Metfone', '090': 'Metfone',
  '031': 'Metfone', '071': 'Metfone', '088': 'Metfone', '097': 'Metfone',

  '018': 'qb (Seatel)',

  '010': 'Smart', '015': 'Smart', '016': 'Smart', '069': 'Smart', '070': 'Smart',
  '081': 'Smart', '086': 'Smart', '093': 'Smart', '096': 'Smart', '098': 'Smart', '087': 'Smart',
};

/**
 * Normalizes a phone number string: strips spaces/dashes/parens/dots,
 * and converts a +855 / 855 country code into the local 0-prefixed form.
 */
function normalizeCambodianPhoneNumber(phone) {
  if (typeof phone !== 'string') return null;

  let cleaned = phone.trim().replace(/[\s\-().]/g, '');

  if (cleaned.startsWith('+855')) {
    cleaned = '0' + cleaned.slice(4);
  } else if (cleaned.startsWith('855')) {
    cleaned = '0' + cleaned.slice(3);
  }

  return cleaned;
}

/**
 * Returns true if the given string is a valid Cambodian mobile number.
 */
function isValidCambodianPhoneNumber(phone) {
  const cleaned = normalizeCambodianPhoneNumber(phone);
  if (!cleaned || !/^0\d{8,9}$/.test(cleaned)) return false;

  const prefix = cleaned.slice(0, 3);

  if (SEVEN_DIGIT_PREFIXES.has(prefix)) {
    return cleaned.length === 10; // 3-digit prefix + 7-digit number
  }
  if (SIX_DIGIT_PREFIXES.has(prefix)) {
    return cleaned.length === 9; // 3-digit prefix + 6-digit number
  }
  return false;
}

/**
 * Returns the carrier name for a valid number, or null if invalid/unknown.
 */
function getCambodianCarrier(phone) {
  if (!isValidCambodianPhoneNumber(phone)) return null;
  const cleaned = normalizeCambodianPhoneNumber(phone);
  return CARRIER_BY_PREFIX[cleaned.slice(0, 3)] || null;
}

export { isValidCambodianPhoneNumber, getCambodianCarrier };