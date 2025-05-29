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

// Exibe o menu de navegação em dispositivos móveis
document.addEventListener("DOMContentLoaded", () => {
  const menuButton = document.querySelector("#menuButton");
  if (menuButton) {
    menuButton.addEventListener("click", () => setSidebar('flex'));
  }
});

document.addEventListener("DOMContentLoaded", () => {
  const menuButton = document.querySelector("#closeSidebarMenu");
  if (menuButton) {
    menuButton.addEventListener("click", () => setSidebar('none'));
  }
});

/**
 * Altera o estilo da sidebar para exibi-la ou ocultá-la.
 * 
 * @param {string} style Estilo da sidebar. Utilize "flex" para exibir
 * e "none" para ocultar. 
 */
function setSidebar(style) {
  const sidebar = document.querySelector(".sidebar");
  sidebar.style.display = style;
}
