/**
 * Renderiza a Header nas páginas.
 * Exibe um menu compacto de navegação caso a página seja aberta
 * em dispositivos móveis.
 */
class Header extends HTMLElement {
  constructor() {
    super();
    this.loadCSS();
  }

  loadCSS() {
    if (!document.querySelector('link[href*="header.css"]')) {
      const link = document.createElement("link");
      link.rel = "stylesheet";
      link.href = "./css/components/header.css";
      document.head.appendChild(link);
    }
  }

  connectedCallback() {
    this.innerHTML = `
        <header>
      <div class="logo">
        <img src="./images/vsm-development-logo.png" alt="Website Logo" />
      </div>

      <div class="header-right">
        <nav>
          <ul class="sidebar">
            <li id="closeSidebarMenu">
              <a href="#"
                ><svg
                  xmlns="http://www.w3.org/2000/svg"
                  height="26px"
                  viewBox="0 -960 960 960"
                  width="26px"
                  fill="#000000"
                >
                  <path
                    d="m256-200-56-56 224-224-224-224 56-56 224 224 224-224 56 56-224 224 224 224-56 56-224-224-224 224Z"
                  /></svg
              ></a>
            </li>
            <li><a href="./" data-i18n="nav.home">Home</a></li>
            <li><a href="Portfolio" data-i18n="nav.portfolio">Portfolio</a></li>
            <li><a href="About" data-i18n="nav.about">About</a></li>
            <li><a href="Contact" data-i18n="nav.contact">Contact</a></li>
          </ul>
          <ul>
            <!-- TODO: implementar um botão para alterar o idioma do site-->
            <li class="hideOnMobile">
              <a href="./" data-i18n="nav.home">Home</a>
            </li>
            <li class="hideOnMobile">
              <a href="Portfolio" data-i18n="nav.portfolio">Portfolio</a>
            </li>
            <li class="hideOnMobile">
              <a href="About" data-i18n="nav.about">About</a>
            </li>
            <li class="hideOnMobile">
              <a href="Contact" data-i18n="nav.contact">Contact</a>
            </li>
            <li id="menuButton">
              <a href="#"
                ><svg
                  xmlns="http://www.w3.org/2000/svg"
                  height="26px"
                  viewBox="0 -960 960 960"
                  width="26px"
                  fill="#e3e3e3"
                >
                  <path
                    d="M120-240v-80h720v80H120Zm0-200v-80h720v80H120Zm0-200v-80h720v80H120Z"
                  /></svg
              ></a>
            </li>
          </ul>
        </nav>
      </div>
    </header>
    `;

    this.attachEventListeners();
  }

  /**
   * Exibe o menu de navegação em dispositivos móveis
   * */
  attachEventListeners() {
    const openBtn = this.querySelector("#menuButton");
    const closeBtn = this.querySelector("#closeSidebarMenu");

    if (openBtn) {
      openBtn.addEventListener("click", () => this.setSidebar("flex"));
    }

    if (closeBtn) {
      closeBtn.addEventListener("click", () => this.setSidebar("none"));
    }
  }

  /**
   * Altera o estilo da sidebar para exibi-la ou ocultá-la.
   * @param {string} style "flex" para exibir, "none" para ocultar.
   */
  setSidebar(style) {
    const sidebar = this.querySelector(".sidebar");
    if (sidebar) sidebar.style.display = style;
  }
}

customElements.define("header-component", Header);

/** Em caso de implementação a mudança de idiomas:
 * 
 *       <div class="language-switcher">
        <button data-lang-switch="en" class="active">EN</button>
        <button data-lang-switch="pt">PT</button>
        <button data-lang-switch="es">ES</button>
      </div>
 */
