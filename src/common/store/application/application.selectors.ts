import { createSelector } from '@reduxjs/toolkit';
import type { RootState } from '../store';

const selectApp = (s: RootState) => s.app;

export const selectAuthToken = createSelector(
  selectApp,
  (s) => s.authToken,
);

export const selectIsLoggedIn = createSelector(selectAuthToken, (authToken) => !!authToken);

export const selectIsMobileMenuOpen = createSelector(
  selectApp,
  (s) => s.isMobileMenuOpen,
);

export const selectAppCredentials = createSelector(selectAuthToken, (authToken) => {
  if (authToken) {
    const userInfoSection = authToken.split('.')[1];
    const json = atob(userInfoSection);
    const decodedToken = JSON.parse(json);

    return {
      userId: decodedToken.userId,
      email: decodedToken.email,
    };
  } else {
    return null;
  }
});
