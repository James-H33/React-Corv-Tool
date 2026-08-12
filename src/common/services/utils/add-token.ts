import type { InternalAxiosRequestConfig } from 'axios';
import { selectAuthToken } from '@store/application/application.selectors';
import { store } from '@store/store';

function addAuthToken(config: InternalAxiosRequestConfig): InternalAxiosRequestConfig {
  const authToken = selectAuthToken(store.getState());

  if (authToken) {
    config.headers.set('Authorization', `Bearer ${authToken}`);
  } else {
    config.headers.delete('Authorization');
  }

  return config;
}

export default addAuthToken;
