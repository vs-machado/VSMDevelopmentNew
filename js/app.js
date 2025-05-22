import { loadTranslations, changeLanguage } from "./i18n";

document.addEventListener('DOMContentLoaded', () => {
    loadTranslations('en'); // idioma padrão

    // Altera para o idioma selecionado pelo usuário
    document.querySelectorAll('[data-lang-switch]').forEach(btn => {
        btn.addEventListener('click', () => {
            const lang = btn.getAttribute('data-lang-switch');
            changeLanguage(lang);
        });
    });
});