// i18n.js
let translations = {};
let currentLang = "en";

// Helper function to get nested translation value
function getNestedTranslation(obj, path) {
  return path.split(".").reduce((current, key) => {
    return current && current[key] !== undefined ? current[key] : null;
  }, obj);
}

/**
 * Carrega o idioma padrão ou selecionado pelo usuário.
 *
 * @param {string} lang Idioma selecionado.
 */
export async function loadTranslations(lang = "en") {
  console.log("Loading translations for language:", lang);
  currentLang = lang;
  try {
    // Using relative path since we're in the public/js directory
    const res = await fetch(`./locales/${lang}.json`);
    if (!res.ok) {
      throw new Error(`Failed to load translations: ${res.status}`);
    }
    translations = await res.json();
    console.log("Translations loaded:", translations);
    applyTranslations();
  } catch (error) {
    console.error("Error loading translations:", error);
    // Configura o idioma para inglês caso não consiga carregar o idioma selecionado
    if (lang !== "en") {
      loadTranslations("en");
    }
  }
}

/**
 * Aplica as traduções obtidas nos arquivos da pasta locales.
 */
function applyTranslations() {
  console.log("Applying translations to elements...");
  document.querySelectorAll("[data-i18n]").forEach((el) => {
    const key = el.getAttribute("data-i18n");
    console.log("Translating element with key:", key);
    const translation = getNestedTranslation(translations, key);
    if (translation) {
      // Handle newlines in translations
      el.textContent = translation.replace(/\\n/g, "\n");
    } else {
      console.warn("Translation not found for key:", key);
    }
  });

  document.documentElement.lang = currentLang;
}

export function changeLanguage(lang) {
  loadTranslations(lang);
}

export function getCurrentLanguage() {
  return currentLang;
}
