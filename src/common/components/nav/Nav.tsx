import Icon from '../icon/Icon';
import { IconTypes } from '@common/types/icon';
import CorvToolLogo from '@assets/images/mid-year-factory-logo.png';
import './Nav.scss';

interface NavProps {
  isLoggedIn: boolean;
  openMobileMenu: () => void;
}

function Nav({ isLoggedIn, openMobileMenu }: NavProps) {
  return (
    <nav className="ct-nav-container">
      <div className="ct-nav-container__content">
        <a className="ct-nav-logo-link" aria-label="Home">
          <img
            src={CorvToolLogo}
            alt="Mid Year Factory Logo"
            className="ct-nav-logo"
          />
        </a>

        {isLoggedIn && (
          <div
            className="ct-nav-mobile-menu__toggle"
            role="button"
            aria-label="Open mobile menu"
            tabIndex={0}
            onClick={() => {
              openMobileMenu();
            }}
          >
            <Icon icon={IconTypes.Category} size={16} />
          </div>
        )}
      </div>
    </nav>
  );
}

export default Nav;
