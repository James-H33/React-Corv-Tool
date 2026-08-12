import { logout, setAuthToken } from '@common/store/application/application.actions';
import * as AppSelectors from '@common/store/application/application.selectors';
import { store, type AppDispatch } from '@store/store';
import { useDispatch, useSelector } from 'react-redux';

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

export function useApplicationService() {
  const dispatch = useDispatch<AppDispatch>();
  const authToken = useSelector(AppSelectors.selectAuthToken);

  return {
    authToken,
    getBaseApiUrl,
    getAuthToken: () => authToken,
    setAuthToken: (token: string) => dispatch(setAuthToken(token)),
    logout: () => dispatch(logout()),
  };
}

export const applicationService = {
  getBaseApiUrl,
  getAuthToken,
  setAuthToken: updateAuthToken,
  logout: clearSession,
}
