// import { createListenerMiddleware } from '@reduxjs/toolkit';
// import type { RootState } from '../store';
// import * as ToastActions from './toast.actions';
// import { selectActiveToasts, selectToasts } from './toast.selectors';

// import { toastService } from '@common/services/toast.service';

// export const ToastMiddlewareEffects = createListenerMiddleware();

// ToastMiddlewareEffects.startListening({
//   actionCreator: ToastActions.showToast,
//   effect: async ({ payload }, listenerApi) => {
//     const state = listenerApi.getState() as RootState;
//     const toasts = selectToasts(state);
//     const activeToasts = selectActiveToasts(state);
//     const newToast = toastService.createToastControl(payload);
//     const { toasts: updatedToasts, activeToasts: updatedActiveToasts } =
//       toastService.processQueue([...toasts, newToast], activeToasts);

//     listenerApi.dispatch(
//       ToastActions.showToastSuccess({
//         toasts: updatedToasts,
//         activeToasts: updatedActiveToasts,
//       })
//     );
//   },
// });

// ToastMiddlewareEffects.startListening({
//   actionCreator: ToastActions.dismissToast,
//   effect: async ({ payload }, listenerApi) => {
//     const state = listenerApi.getState() as RootState;
//     const toasts = [...selectToasts(state)];
//     const activeToasts = [...selectActiveToasts(state)];

//     const toast = activeToasts.find((t) => t.id === payload.id);
//     const remainingToasts = activeToasts.filter((t) => t.id !== payload.id);

//     if (toast) {
//       toast.dismiss();
//     }

//     if (toasts.length > 0) {
//       const nextToast = toasts.shift()!;

//       nextToast.start();

//       listenerApi.dispatch(
//         ToastActions.dismissToastSuccess({
//           toasts: toasts,
//           activeToasts: [...remainingToasts, nextToast],
//         })
//       );
//     } else {
//       listenerApi.dispatch(
//         ToastActions.dismissToastSuccess({
//           toasts: toasts,
//           activeToasts: [...remainingToasts],
//         })
//       );
//     }
//   },
// });
