import type { Toast } from '@common/types/toast.interface';
import { createAction } from '@reduxjs/toolkit';

export const showToast = createAction<Toast>('toast/showToast');
export const showToastSuccess = createAction<{
  toasts: Toast[];
  activeToasts: Toast[];
}>('toast/showToastSuccess');

export const setActiveToasts = createAction<{ toasts: Toast[] }>(
  'toast/setActiveToasts'
);

export const dismissToast = createAction<{ id: number }>('toast/dismissToast');
export const dismissToastSuccess = createAction<{
  toasts: Toast[];
  activeToasts: Toast[];
}>('toast/dismissToastSuccess');
