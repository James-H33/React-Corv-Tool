function Nav() {
  return (
    <nav className="ct-nav-container">
      <div className="ct-nav-container__content">
        <a className="ct-nav-logo-link" aria-label="Home">
          <img
            src="assets/images/mid-year-factory-logo.png"
            alt="Mid Year Factory Logo"
            className="ct-nav-logo"
          />
        </a>

        {/* @if (isLoggedIn()) {
      <div
        className="ct-nav-mobile-menu__toggle"
        (click)="openMenu()"
        role="button"
        aria-label="Open mobile menu"
        tabindex="0"
      >
        <ct-icon icon="category" size="16"></ct-icon>
      </div>
    } */}
      </div>
    </nav>
  );
}

export default Nav;
