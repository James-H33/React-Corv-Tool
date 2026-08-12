// export const loadViewDataStart = createAction<{ viewId: string }>(
//   'gantt/loadViewDataStart',
// );

import { createAction } from '@reduxjs/toolkit';

// import { createActionGroup, emptyProps, props } from '@ngrx/store';

// export const ApplicationActions = createActionGroup({
//   source: 'Application',
//   events: {
//     login: props<{ email: string; password: string }>(),
//     loginSuccess: props<{ authToken: string }>(),

//     logout: emptyProps(),
//     logoutSuccess: emptyProps(),

//     signup: props<{ email: string; password: string }>(),
//     signupSuccess: props<{ authToken: string }>(),

//     openMobileMenu: emptyProps(),
//     closeMobileMenu: emptyProps(),

//     setAuthToken: props<{ authToken: string }>(),

//     forgotPassword: props<{ email: string }>(),
//     forgotPasswordSuccess: emptyProps(),

//     resetPassword: props<{ token: string; newPassword: string }>(),
//     resetPasswordSuccess: emptyProps(),

//     verifyUser: props<{ token: string }>(),
//     verifyUserSuccess: emptyProps(),
//   },
// });

export const openMobileMenu = createAction('application/openMobileMenu');
export const closeMobileMenu = createAction('application/closeMobileMenu');

export const setAuthToken = createAction<string>('application/setAuthToken');

export const login = createAction<{ email: string; password: string }>('application/login');
export const loginSuccess = createAction<{ authToken: string }>('application/loginSuccess');

export const logout = createAction('application/logout');
export const logoutSuccess = createAction('application/logoutSuccess');

