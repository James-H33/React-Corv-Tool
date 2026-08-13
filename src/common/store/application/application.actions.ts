import { createAction } from '@reduxjs/toolkit';

export const openMobileMenu = createAction('application/openMobileMenu');
export const closeMobileMenu = createAction('application/closeMobileMenu');

export const setAuthToken = createAction<string>('application/setAuthToken');
export const login = createAction<{ email: string; password: string }>('application/login');
export const loginSuccess = createAction<{ authToken: string }>('application/loginSuccess');

export const logout = createAction('application/logout');
export const logoutSuccess = createAction('application/logoutSuccess');

