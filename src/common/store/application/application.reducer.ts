import * as AppActions from './application.actions';

import { createSlice } from '@reduxjs/toolkit/react';

interface ApplicationState {
  authToken: string | null;
  isMobileMenuOpen: boolean;
  passwordResetInProgress: boolean;
  forgotPasswordInProgress: boolean;
}

const initialState: ApplicationState = {
  authToken: null,
  isMobileMenuOpen: false,
  passwordResetInProgress: false,
  forgotPasswordInProgress: false,
};

const appSlice = createSlice({
  name: 'app',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(AppActions.openMobileMenu, (state) => {
      return {
        ...state,
        isMobileMenuOpen: true,
      };
    });

    builder.addCase(AppActions.closeMobileMenu, (state) => {
      return {
        ...state,
        isMobileMenuOpen: false,
      };
    });

    builder.addCase(AppActions.setAuthToken, (state, { payload }) => {
      return {
        ...state,
        authToken: payload,
      };
    });

    builder.addCase(AppActions.loginSuccess, (state, { payload }) => {
      return {
        ...state,
        authToken: payload.authToken,
      };
    });
  },
});

export default appSlice.reducer;
