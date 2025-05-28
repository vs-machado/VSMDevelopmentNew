import { loadTranslations, changeLanguage } from "./i18n.js";

document.addEventListener("DOMContentLoaded", () => {
  // Carrega o idioma padrão
  loadTranslations("pt");

  // Gerencia a mudança de idiomas
  document.querySelectorAll("[data-lang-switch]").forEach((btn) => {
    btn.addEventListener("click", () => {
      const lang = btn.getAttribute("data-lang-switch");
      changeLanguage(lang);

      // Atualiza o botão seletor de idiomas
      //   document
      //     .querySelectorAll("[data-lang-switch]")
      //     .forEach((b) => b.classList.remove("active"));
      //   btn.classList.add("active");
      // TODO: implementar um botão para alterar os idiomas
    });
  });
});
