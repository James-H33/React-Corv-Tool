import { configureStore } from '@reduxjs/toolkit';
import appReducer from './application/application.reducer';
import { ApplicationMiddlewareEffects } from './application/application.effects';
import { CarMiddlewareEffects } from './car/car.effects';
import carReducer from './car/car.reducer';

export const store = configureStore({
  reducer: {
    app: appReducer,
    car: carReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().prepend([
      ApplicationMiddlewareEffects.middleware,
      CarMiddlewareEffects.middleware,
    ]),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
