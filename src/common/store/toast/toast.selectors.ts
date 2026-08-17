import { createSelector } from '@reduxjs/toolkit';
import type { RootState } from '../store';

const selectApp = (s: RootState) => s.toast;

export const selectToasts = createSelector(
  selectApp,
  (s) => s.toasts,
);

export const selectActiveToasts = createSelector(
  selectApp,
  (s) => s.activeToasts,
);

