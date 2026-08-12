import NavMobile from '@common/components/nav-mobile/NavMobile';
import Nav from '@common/components/nav/Nav';
import * as AppActions from '@store/application/application.actions';
import {
  closeMobileMenu,
  openMobileMenu,
} from '@store/application/application.actions';
import * as AppSelectors from '@store/application/application.selectors';
import { selectIsLoggedIn } from '@store/application/application.selectors';
import { useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Outlet } from 'react-router-dom';
import './App.scss';

function App() {
  const dispatch = useDispatch();
  const isLoggedIn = useSelector(selectIsLoggedIn);
  const isMobileMenuOpen = useSelector(AppSelectors.selectIsMobileMenuOpen);

  const setIsMobileMenuOpen = useCallback(
    (open: boolean) => {
      if (open) {
        dispatch(openMobileMenu());
      } else {
        dispatch(closeMobileMenu());
      }
    },
    [dispatch]
  );

  const logout = useCallback(() => {
    dispatch(closeMobileMenu());
    dispatch(AppActions.logout());
  }, [dispatch]);

  return (
    <>
      <header>
        <Nav
          isLoggedIn={isLoggedIn}
          openMobileMenu={() => setIsMobileMenuOpen(true)}
        />
      </header>

      <NavMobile
        isMenuOpen={isMobileMenuOpen}
        closeMenu={() => setIsMobileMenuOpen(false)}
        logout={logout}
      />

      <main className="main">
        <Outlet />
      </main>
    </>
  );
}

export default App;
