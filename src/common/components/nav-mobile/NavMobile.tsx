import Button from '@common/components/button/Button';
import { classnames } from '@common/utils/classnames';
import { Link } from 'react-router-dom';
import Icon from '@common/components/icon/Icon';
import { IconTypes } from '@common/types/icon';
import './NavMobile.scss';

interface NavMobileProps {
  isMenuOpen: boolean;
  closeMenu: () => void;
  logout: () => void;
}

function NavMobile({ isMenuOpen, closeMenu, logout }: NavMobileProps) {
  return (
    <div
      className={classnames({ 'ct-nav-mobile-menu': true, open: isMenuOpen })}
    >
      <div
        className="ct-nav-mobile-menu__close"
        onClick={closeMenu}
        role="button"
        aria-label="Close mobile menu"
        tabIndex={0}
      >
        <Button variant="outline" onClick={closeMenu}>
          <Icon icon={IconTypes.BackArrow} size={16} />
        </Button>
      </div>

      <div className="ct-nav-mobile-menu-content">
        <div className="ct-nav-mobile-menu-content__item">
          <Link to={'/v/cars'} onClick={closeMenu}>
            Home
          </Link>
        </div>

        <div className="ct-nav-mobile-menu-content__item">
          <Link to={'/login'} onClick={logout}>
            Logout
          </Link>
        </div>
      </div>
    </div>
  );
}

export default NavMobile;
