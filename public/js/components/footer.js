/**
 * Renderiza o Footer nas páginas.
 * Contém os itens de navegação, informações de contato e a logo da empresa.
 */
class Footer extends HTMLElement {
  constructor() {
    super();
    this.loadCSS();
  }

  loadCSS() {
    if (!document.querySelector('link[href*="footer.css"]')) {
      const link = document.createElement("link");
      link.rel = "stylesheet";
      link.href = "./css/components/footer.css";
      document.head.appendChild(link);
    }
  }

  connectedCallback() {
    this.innerHTML = `
    <footer class="home-footer">
      <div class="footer-left">
        <div class="enterprise-footer">
          <img
            class="logo"
            src="./images/vsm-development-logo.png"
            alt="Website Logo"
          />
          <div class="copyright">
            <p class="copyright">
              Copyright © 2025 | Powered<br />by VSM Development
            </p>
          </div>
        </div>
        <div class="nav-footer">
          <h2 class="company" data-i18n="footer.company">Company</h2>
          <!-- home, about, services, contact -->
          <ul class="nav-list-footer">
            <li><a href="./" data-i18n="nav.home">Home</a></li>
            <li><a href="portfolio.html" data-i18n="nav.portfolio">Portfolio</a></li>
            <li><a href="about.html" data-i18n="nav.about">About</a></li>
            <li><a href="contact.html" data-i18n="nav.contact">Contact</a></li>
            <li><a href="policy.html" data-i18n="nav.policy">Privacy Policy</a></li>
          </ul>
        </div>
      </div>

      <div class="contact-footer">
        <h2 class="contact-title" data-i18n="help-us.contact-us">Contact us</h2>
        <div class="contact-addresses">
          <a href="mailto:vsm.development7@gmail.com"
            >vsm.development7@gmail.com</a
          >
          <a href="https://wa.me/5564935002198">+55 64 93500-2198</a>
        </div>
      </div>
    </footer>
    `;
  }
}

customElements.define("footer-component", Footer);
