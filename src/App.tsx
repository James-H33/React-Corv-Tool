import NavMobile from '@common/components/nav-mobile/NavMobile';
import Nav from '@common/components/nav/Nav';
import Toast from '@common/components/toast/Toast';
import { useToast } from '@common/services/toast.service';
import * as AppActions from '@store/application/application.actions';
import {
  closeMobileMenu,
  openMobileMenu,
} from '@store/application/application.actions';
import * as AppSelectors from '@store/application/application.selectors';
import { selectIsLoggedIn } from '@store/application/application.selectors';
import { useCallback, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Outlet } from 'react-router-dom';
import './App.scss';

function App() {
  const dispatch = useDispatch();
  const isLoggedIn = useSelector(selectIsLoggedIn);
  const isMobileMenuOpen = useSelector(AppSelectors.selectIsMobileMenuOpen);
  const toastService = useToast();

  useEffect(() => {
    toastService.showToast({
      message: 'This is a sample toast notification.',
      type: 'info',
      duration: 3000,
    });

    setTimeout(() => {
      toastService.showToast({
        message: 'This is a sample toast notification.',
        type: 'error',
        duration: 3000,
      });
    }, 1000)

    setTimeout(() => {
      toastService.showToast({
        message: 'This is a sample toast notification.',
        type: 'success',
        duration: 3000,
      });
    }, 1500)
  }, []);

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
        <Toast />
      </main>
    </>
  );
}

export default App;
