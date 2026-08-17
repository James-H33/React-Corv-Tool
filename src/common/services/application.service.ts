import { logout, setAuthToken } from '@common/store/application/application.actions';
import * as AppSelectors from '@common/store/application/application.selectors';
import { store } from '@store/store';

const baseApiUrl = import.meta.env.VITE_BASE_API_URL ?? '';

function getBaseApiUrl(): string {
  return baseApiUrl;
}

function getAuthToken(): string | null {
  return AppSelectors.selectAuthToken(store.getState());
}

function updateAuthToken(token: string): void {
  store.dispatch(setAuthToken(token));
}

function clearSession(): void {
  store.dispatch(logout());
}

export const applicationService = {
  getBaseApiUrl,
  getAuthToken,
  setAuthToken: updateAuthToken,
  logout: clearSession,
}
