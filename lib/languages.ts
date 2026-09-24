export interface LanguageOption {
  code: string;
  name: string;
  nativeName: string;
  category: 'indian' | 'worldwide';
}

// All 22 Scheduled Indian Languages + English (India) & major regional languages
export const INDIAN_LANGUAGES: LanguageOption[] = [
  { code: 'hi-IN', name: 'Hindi', nativeName: 'हिन्दी', category: 'indian' },
  { code: 'en-IN', name: 'English (India)', nativeName: 'English (India)', category: 'indian' },
  { code: 'bn-IN', name: 'Bengali', nativeName: 'বাংলা', category: 'indian' },
  { code: 'te-IN', name: 'Telugu', nativeName: 'తెలుగు', category: 'indian' },
  { code: 'mr-IN', name: 'Marathi', nativeName: 'मराठी', category: 'indian' },
  { code: 'ta-IN', name: 'Tamil', nativeName: 'தமிழ்', category: 'indian' },
  { code: 'ur-IN', name: 'Urdu', nativeName: 'اردو', category: 'indian' },
  { code: 'gu-IN', name: 'Gujarati', nativeName: 'ગુજરાતી', category: 'indian' },
  { code: 'kn-IN', name: 'Kannada', nativeName: 'ಕನ್ನಡ', category: 'indian' },
  { code: 'ml-IN', name: 'Malayalam', nativeName: 'മലയാളം', category: 'indian' },
  { code: 'or-IN', name: 'Odia', nativeName: 'ଓଡ଼ିଆ', category: 'indian' },
  { code: 'pa-IN', name: 'Punjabi', nativeName: 'ਪੰਜਾਬੀ', category: 'indian' },
  { code: 'as-IN', name: 'Assamese', nativeName: 'অসমীয়া', category: 'indian' },
  { code: 'mai-IN', name: 'Maithili', nativeName: 'मैथिली', category: 'indian' },
  { code: 'sat-IN', name: 'Santali', nativeName: 'संथाली / ᱥᱟᱱᱛᱟᱲᱤ', category: 'indian' },
  { code: 'ks-IN', name: 'Kashmiri', nativeName: 'कॉशुर / كٲشُر', category: 'indian' },
  { code: 'ne-IN', name: 'Nepali', nativeName: 'नेपाली', category: 'indian' },
  { code: 'kok-IN', name: 'Konkani', nativeName: 'कोंकणी', category: 'indian' },
  { code: 'sd-IN', name: 'Sindhi', nativeName: 'سنڌي / सिन्धी', category: 'indian' },
  { code: 'doi-IN', name: 'Dogri', nativeName: 'डोगरी', category: 'indian' },
  { code: 'mni-IN', name: 'Manipuri (Meitei)', nativeName: 'মৈতৈলোন্', category: 'indian' },
  { code: 'brx-IN', name: 'Bodo', nativeName: 'बड़ो', category: 'indian' },
  { code: 'sa-IN', name: 'Sanskrit', nativeName: 'संस्कृतम्', category: 'indian' },
  { code: 'bho-IN', name: 'Bhojpuri', nativeName: 'भोजपुरी', category: 'indian' },
  { code: 'mwr-IN', name: 'Marwari', nativeName: 'मारवाड़ी', category: 'indian' },
  { code: 'hne-IN', name: 'Chhattisgarhi', nativeName: 'छत्तीसगढ़ी', category: 'indian' },
];

// Major worldwide spoken languages
export const WORLDWIDE_LANGUAGES: LanguageOption[] = [
  { code: 'en-US', name: 'English (US)', nativeName: 'English (US)', category: 'worldwide' },
  { code: 'en-GB', name: 'English (UK)', nativeName: 'English (UK)', category: 'worldwide' },
  { code: 'es-ES', name: 'Spanish', nativeName: 'Español', category: 'worldwide' },
  { code: 'zh-CN', name: 'Mandarin Chinese (Simplified)', nativeName: '中文 (简体)', category: 'worldwide' },
  { code: 'zh-TW', name: 'Mandarin Chinese (Traditional)', nativeName: '中文 (繁體)', category: 'worldwide' },
  { code: 'ar-SA', name: 'Arabic', nativeName: 'العربية', category: 'worldwide' },
  { code: 'fr-FR', name: 'French', nativeName: 'Français', category: 'worldwide' },
  { code: 'pt-BR', name: 'Portuguese (Brazil)', nativeName: 'Português (Brasil)', category: 'worldwide' },
  { code: 'pt-PT', name: 'Portuguese (Portugal)', nativeName: 'Português (Portugal)', category: 'worldwide' },
  { code: 'ru-RU', name: 'Russian', nativeName: 'Русский', category: 'worldwide' },
  { code: 'de-DE', name: 'German', nativeName: 'Deutsch', category: 'worldwide' },
  { code: 'ja-JP', name: 'Japanese', nativeName: '日本語', category: 'worldwide' },
  { code: 'ko-KR', name: 'Korean', nativeName: '한국어', category: 'worldwide' },
  { code: 'it-IT', name: 'Italian', nativeName: 'Italiano', category: 'worldwide' },
  { code: 'tr-TR', name: 'Turkish', nativeName: 'Türkçe', category: 'worldwide' },
  { code: 'vi-VN', name: 'Vietnamese', nativeName: 'Tiếng Việt', category: 'worldwide' },
  { code: 'fa-IR', name: 'Persian / Farsi', nativeName: 'فارسی', category: 'worldwide' },
  { code: 'id-ID', name: 'Indonesian', nativeName: 'Bahasa Indonesia', category: 'worldwide' },
  { code: 'ms-MY', name: 'Malay', nativeName: 'Bahasa Melayu', category: 'worldwide' },
  { code: 'th-TH', name: 'Thai', nativeName: 'ไทย', category: 'worldwide' },
  { code: 'pl-PL', name: 'Polish', nativeName: 'Polski', category: 'worldwide' },
  { code: 'nl-NL', name: 'Dutch', nativeName: 'Nederlands', category: 'worldwide' },
  { code: 'fil-PH', name: 'Filipino / Tagalog', nativeName: 'Wikang Filipino', category: 'worldwide' },
  { code: 'sw-KE', name: 'Swahili', nativeName: 'Kiswahili', category: 'worldwide' },
  { code: 'uk-UA', name: 'Ukrainian', nativeName: 'Українська', category: 'worldwide' },
  { code: 'el-GR', name: 'Greek', nativeName: 'Ελληνικά', category: 'worldwide' },
  { code: 'sv-SE', name: 'Swedish', nativeName: 'Svenska', category: 'worldwide' },
  { code: 'ro-RO', name: 'Romanian', nativeName: 'Română', category: 'worldwide' },
  { code: 'he-IL', name: 'Hebrew', nativeName: 'עברית', category: 'worldwide' },
  { code: 'cs-CZ', name: 'Czech', nativeName: 'Čeština', category: 'worldwide' },
  { code: 'hu-HU', name: 'Hungarian', nativeName: 'Magyar', category: 'worldwide' },
  { code: 'da-DK', name: 'Danish', nativeName: 'Dansk', category: 'worldwide' },
  { code: 'fi-FI', name: 'Finnish', nativeName: 'Suomi', category: 'worldwide' },
  { code: 'no-NO', name: 'Norwegian', nativeName: 'Norsk', category: 'worldwide' },
];

export const ALL_LANGUAGES: LanguageOption[] = [
  ...INDIAN_LANGUAGES,
  ...WORLDWIDE_LANGUAGES,
];

export function getLanguageLabel(codeOrName: string): string {
  const found = ALL_LANGUAGES.find(
    l => l.code === codeOrName || l.name === codeOrName || l.nativeName === codeOrName
  );
  if (found) {
    return `${found.name} (${found.nativeName})`;
  }
  return codeOrName;
}
