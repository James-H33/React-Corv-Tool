import axios, {
  AxiosError,
  type AxiosResponse,
  type InternalAxiosRequestConfig,
} from 'axios';
import tokenRefreshServiceInstance from './token-refresh.service';
import addAuthToken from './utils/add-token';
import { ErrorCodes } from '@common/types/error-codes';

const apiClient = axios.create({
  baseURL: 'http://localhost:3000',
  timeout: 10000,
});

// Request interceptors
apiClient.interceptors.request.use(
  (config) => addAuthToken(config),
  (error) => Promise.reject(error)
);

// Response interceptors
apiClient.interceptors.response.use(
  (response) => {
    // Any status code within the range of 2xx triggers this function
    return response;
  },
  (error: AxiosError) => {
    // Any status codes outside the range of 2xx trigger this function

    if (error.response) {
      console.log(`Error Response: `, error.response);

      // The server responded with a status code outside the 2xx range
      const { status, data } = error.response as AxiosResponse;

      if (data?.errorCode) {
        switch (data.errorCode) {
          case ErrorCodes.ACCESS_TOKEN_EXPIRED:
            return tokenRefreshServiceInstance
              .handleTokenExpiredError(error)
              .then(() => {
                return apiClient.request(
                  error.config as InternalAxiosRequestConfig
                );
              })
              .catch((refreshError) => {
                console.error('Token refresh failed:', refreshError);

                return Promise.reject(refreshError);
              });
          default:
            console.error(
              `Backend returned error code ${data.errorCode}:`,
              data
            );
        }
      } else {
        switch (status) {
          case 401:
            return tokenRefreshServiceInstance
              .handleTokenExpiredError(error)
              .then(() => {
                return apiClient.request(
                  error.config as InternalAxiosRequestConfig
                );
              })
              .catch((refreshError) => {
                console.error('Token refresh failed:', refreshError);

                return Promise.reject(refreshError);
              });
          case 403:
            console.error('Forbidden! You do not have permission.');
            break;
          case 404:
            console.error('Resource not found.');
            break;
          case 500:
            console.error('Internal Server Error. Try again later.');
            break;
          default:
            console.error(`Backend returned code ${status}:`, data);
        }
      }
    } else if (error.request) {
      // The request was made but no response was received (e.g., network timeout)
      console.error('Network error or server is unreachable:', error.request);
    } else {
      // Something happened in setting up the request that triggered an Error
      console.error('Axios configuration error:', error.message);
    }

    // 3. Reject the promise so the local calling component can still catch it if needed
    return Promise.reject(error);
  }
);

export default apiClient;
