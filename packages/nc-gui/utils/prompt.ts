/* eslint-disable prettier/prettier */
export const LANGUAGES = {
  'auto': 'Auto',
  'zh-Hans': '简体中文',
  'zh-Hant': '繁體中文',
  'en': 'English',
  'yue': '粵語',
} as const

export type Language = keyof typeof LANGUAGES;

export const getTranslatePrompt = (fromLang: Language, toLang: Language) => {
    if (fromLang === 'zh-Hans' || fromLang === 'zh-Hant') {
      if (toLang === 'zh-Hant') {
        return '翻译成繁体白话文';
      } else if (toLang === 'zh-Hans') {
        return '翻译成简体白话文';
      } else if (toLang === 'yue') {
        return '翻译成粤语白话文';
      }
    }
    if (toLang === 'yue') {
      return `翻译成${LANGUAGES[toLang] || toLang}`;
    }
    if (fromLang === 'auto') {
      if (toLang === 'zh-Hant') {
        return '翻譯為繁體';
      }
      if (toLang === 'zh-Hans') {
        return '翻译成简体';
      }
      return `translate into ${LANGUAGES[toLang] || toLang}`;
    }
    if (fromLang === toLang) {
      if (toLang === 'zh-Hant' || toLang === 'zh-Hans') {
        return '润色此句';
      } else {
        return 'polish this sentence';
      }
    }
    return `translate from ${LANGUAGES[fromLang] || fromLang} to ${LANGUAGES[toLang] || toLang}`;
  };
