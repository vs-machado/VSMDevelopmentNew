let translations = {};
let currentLang = "en";

export async function loadTranslations(lang = "en") {
  currentLang = lang;
  const res = await fetch(`./locales/${lang}.json`);
  translations = await res.json();
  applyTranslations();
}

function applyTranslations() {
  document.querySelectorAll("[data-i18n]").forEach((el) => {
    const key = el.getAttribute("data-i18n");
    if (translations[key]) {
      el.textContent = translations[key];
    }
  });
}

export function changeLanguage(lang) {
  loadTranslations(lang);
}
