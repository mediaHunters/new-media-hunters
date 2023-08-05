// Import language resources directly
import polishTranslations from "./i18n/pl.js";
import englishTranslations from "./i18n/en.js";

class LanguageManager {
  constructor(supportedLanguages, defaultLanguage) {
    this.supportedLanguages = supportedLanguages;
    this.defaultLanguage = defaultLanguage;
    this.userLanguage = this.defaultLanguage; // Store user language as a class property
  }

  initialize() {
    this.userLanguage = this.getUserLanguagePreference() || this.getUserLanguage(navigator.languages[0].toLowerCase());
    i18next.init({
      lng: this.userLanguage,
      debug: true,
      resources: this.supportedLanguages,
    });

    this.translateAllElements();

    const switchLanguageBtn = document.getElementById("switchLanguageBtn");
    switchLanguageBtn.addEventListener("click", this.handleLanguageSwitch.bind(this));
  }

  translateAllElements() {
    const elementsToTranslate = document.querySelectorAll("[data-i18n]");
    elementsToTranslate.forEach((element) => {
      const translationKey = element.dataset.i18n;
      element.textContent = i18next.t(translationKey);
    });
  }

  handleLanguageSwitch(evt) {
    if (!evt.target.matches("button")) {
      return;
    }

    const otherLanguage = evt.target.textContent;
    if (i18next.language === otherLanguage) {
      return;
    }

    i18next.changeLanguage(otherLanguage, (err, t) => {
      if (err) {
        console.error(err);
        return;
      }

      this.userLanguage = otherLanguage; // Update user language
      this.translateAllElements();

      // Save the user's language preference to localStorage
      localStorage.setItem("languagePreference", otherLanguage);
    });
  }

  getUserLanguagePreference() {
    try {
      const languagePreference = localStorage.getItem("languagePreference");
      return this.supportedLanguages[languagePreference] ? languagePreference : null;
    } catch (error) {
      return null;
    }
  }

  createFallbackChain(lang) {
    const fallbackChain = [lang];
    const subtags = lang.split("-");
    while (subtags.length > 1) {
      subtags.pop();
      fallbackChain.push(subtags.join("-"));
    }
    return fallbackChain;
  }

  getUserLanguage(userPreference) {
    const memo = new Map();

    const findSupportedLanguage = (lang) => {
      if (this.supportedLanguages[lang]) {
        return lang;
      }
      const primaryLang = lang.split("-")[0];
      if (this.supportedLanguages[primaryLang]) {
        return primaryLang;
      }
      return null;
    };

    const searchLanguage = (lang) => {
      if (memo.has(lang)) {
        return memo.get(lang);
      }

      const fallbackChain = this.createFallbackChain(lang);
      for (const langInChain of fallbackChain) {
        const supportedLang = findSupportedLanguage(langInChain);
        if (supportedLang) {
          memo.set(lang, supportedLang);
          return supportedLang;
        }
      }

      memo.set(lang, this.defaultLanguage);
      return this.defaultLanguage;
    };

    return searchLanguage(userPreference);
  }
}

const supportedLanguages = {
  pl: polishTranslations,
  en: englishTranslations,
};

const defaultLanguage = "en";
const langManager = new LanguageManager(supportedLanguages, defaultLanguage);
langManager.initialize();
