import { configureStore } from '@reduxjs/toolkit';
import appReducer from './application/application.reducer';
import { ApplicationMiddlewareEffects } from './application/application.effects';
import { CarMiddlewareEffects } from './car/car.effects';
import carReducer from './car/car.reducer';
// import toastReducer from './toast/toast.reducer';
// import { ToastMiddlewareEffects } from './toast/toast.effects';

export const store = configureStore({
  reducer: {
    app: appReducer,
    car: carReducer,
    // toast: toastReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().prepend([
      ApplicationMiddlewareEffects.middleware,
      CarMiddlewareEffects.middleware,
      // ToastMiddlewareEffects.middleware,
    ]),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
