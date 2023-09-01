import axios, { AxiosRequestConfig, InternalAxiosRequestConfig } from 'axios';
import { InteractionRequiredAuthError } from '@azure/msal-browser';
import { msalInstance } from '.';
import { silentRequest } from './authConfig';
import { getAccessToken, handleInterceptorError } from './utils/api';

interface RetryConfig extends AxiosRequestConfig {
  retry: number;
  retryDelay: number;
}

export const axiosInstance = axios.create({
  baseURL: '/api',
});

export const globalConfig: RetryConfig = {
  retry: 1,
  retryDelay: 1000,
};

axiosInstance.interceptors.request.use(
  async (config) => {
    const accessToken = await getAccessToken();
    if (accessToken) {
      return {
        ...config,
        headers: { ...config.headers, Authorization: `Bearer ${accessToken}` },
      } as InternalAxiosRequestConfig;
    }

    return config;
  },
  (error) => handleInterceptorError(error),
);

axiosInstance.interceptors.response.use(
  (res) => res,
  async (err) => {
    if (err?.request?.status === 401 && err?.config?.retry === 1) {
      const failedRequest = err.config;
      failedRequest.retry -= 1;
      const accessToken = await getAccessToken();
      if (accessToken) {
        failedRequest.headers.Authorization = `Bearer ${accessToken}`;
        return axiosInstance.request(failedRequest)
          .catch((error) => handleInterceptorError(error));
      }
    }

    return Promise.reject(err);
  },
);
