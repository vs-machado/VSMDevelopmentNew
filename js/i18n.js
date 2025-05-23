// i18n.js
let translations = {};
let currentLang = "en";

/**
 * Carrega o idioma padrão ou selecionado pelo usuário.
 * 
 * @param {string} lang Idioma selecionado.
 */
export async function loadTranslations(lang = "en") {
  currentLang = lang;
  try {
    const res = await fetch(`./locales/${lang}.json`);
    if (!res.ok) {
      throw new Error(`HTTP error! status: ${res.status}`);
    }
    translations = await res.json();
    applyTranslations();
  } catch (error) {
    console.error(`Failed to load translations for ${lang}:`, error);
    // Configura o idioma para inglês caso não consiga carregar o idioma selecionado
    if (lang !== "en") {
      loadTranslations("en");
    }
  }
}

/**
 * Retorna a tradução armazenada em uma nested key.
 *  
 * @param {string} key Chave que contém uma tradução armazenada do json.
 * @returns Uma string com a tradução caso o valor armazenado seja string.
 *          Caso contrário, retorna null.
 */
function getNestedTranslation(key) {
  const keys = key.split(".");
  let value = translations;

  for (const k of keys) {
    if (value && typeof value === "object" && k in value) {
      value = value[k];
    } else {
      return null;
    }
  }

  return typeof value === "string" ? value : null;
}

/**
 * Aplica as traduções obtidas nos arquivos da pasta locales.
 */
function applyTranslations() {
  document.querySelectorAll("[data-i18n]").forEach((el) => {
    const key = el.getAttribute("data-i18n");
    const translation = getNestedTranslation(key);

    if (translation) {
      el.textContent = translation;
    } else {
      console.warn(`Translation not found for key: ${key}`);
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
