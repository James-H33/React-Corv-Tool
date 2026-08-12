import type { AxiosError } from "axios";
import apiClient from "./api-client";
import { store } from "@store/store";
import { setAuthToken } from "@common/store/application/application.actions";

function tokenRefreshService() {
  let isRefreshing = false;
  let refreshPromise: Promise<string> | null = null;

  const handleTokenExpiredError = (error: AxiosError) => {
    console.error('Token expired! Redirecting to login...', error);

    if (isRefreshing && refreshPromise) {
      return refreshPromise;
    }

    isRefreshing = true;

    refreshPromise = apiClient.get('/auth/refresh', { withCredentials: true })
      .then(response => {
        const newToken = response.data.authToken;
        isRefreshing = false;
        store.dispatch(setAuthToken(newToken));
        return newToken;
      });

    return refreshPromise;
  }

  return {
    handleTokenExpiredError,
  }
}

const tokenRefreshServiceInstance = tokenRefreshService();

export default tokenRefreshServiceInstance;
