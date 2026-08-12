import { createListenerMiddleware } from '@reduxjs/toolkit';
import type { RootState } from '../store';
import * as AppActions from './application.actions';
import authService from '@common/services/auth.service';
import { router } from '../../../routes';
import { selectAppCredentials } from './application.selectors';

export const ApplicationMiddlewareEffects = createListenerMiddleware();

ApplicationMiddlewareEffects.startListening({
  actionCreator: AppActions.login,
  effect: async (action, listenerApi) => {
    try {
      const response = await authService.login(action.payload);
      listenerApi.dispatch(
        AppActions.loginSuccess({ authToken: response.authToken })
      );
    } catch (error) {
      console.error('Login failed:', error);
    }
  },
});

ApplicationMiddlewareEffects.startListening({
  actionCreator: AppActions.loginSuccess,
  effect: async () => {
    try {
      await router.navigate('/v/cars');
    } catch (error) {
      console.error('Error during login success handling:', error);
    }
  },
});

ApplicationMiddlewareEffects.startListening({
  actionCreator: AppActions.logout,
  effect: async (_, listenerApi) => {
    try {
      const state = listenerApi.getState() as RootState;
      const credentials = selectAppCredentials(state);
      const userId = credentials?.userId ?? 'userId';
      await authService.logout(userId);
    } catch (error) {
      console.error('Error during logout handling:', error);
    }
  },
});
