import * as ToastService from './toast.actions';

import type { ToastControl } from '@common/types/toast-control.inteface';
import { createSlice } from '@reduxjs/toolkit/react';

interface ToastState {
  toasts: ToastControl[];
  activeToasts: ToastControl[];
}

const initialState: ToastState = {
  toasts: [],
  activeToasts: [],
};

const toastSlice = createSlice({
  name: 'toast',
  initialState,
  reducers: {},
  extraReducers: (builder) => {

    builder.addCase(ToastService.showToastSuccess, (state, { payload }) => {
      return {
        ...state,
        toasts: payload.toasts,
        activeToasts: payload.activeToasts,
      };
    });

    builder.addCase(ToastService.dismissToastSuccess, (state, { payload }) => {
      return {
        ...state,
        toasts: payload.toasts,
        activeToasts: payload.activeToasts,
      };
    });

    builder.addCase(ToastService.setActiveToasts, (state, { payload }) => {
      return {
        ...state,
        activeToasts: payload.toasts
      };
    });
  },
});

export default toastSlice.reducer;
