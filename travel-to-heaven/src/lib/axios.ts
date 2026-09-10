import axios, { AxiosError } from 'axios';
import type { InternalAxiosRequestConfig } from 'axios';
import type { ApiError } from '@/types/api.types';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:8080/api';

export const apiClient = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
  timeout: 15000,
});

// Request Interceptor to inject Authorization Bearer Token
apiClient.interceptors.request.use(
  (config: InternalAxiosRequestConfig) => {
    const token = localStorage.getItem('t2h_auth_token');
    if (token && config.headers) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Response Interceptor for centralized API Error Handling
apiClient.interceptors.response.use(
  (response) => response,
  (error: AxiosError<ApiError>) => {
    if (error.response) {
      const status = error.response.status;
      
      if (status === 401) {
        // Handle Unauthorized session expiration gracefully
        localStorage.removeItem('t2h_auth_token');
        localStorage.removeItem('t2h_user');
      }

      const normalizedError: ApiError = {
        status: status,
        message: error.response.data?.message || getStatusMessage(status),
        errors: error.response.data?.errors,
        timestamp: error.response.data?.timestamp || new Date().toISOString(),
        path: error.response.data?.path,
      };

      return Promise.reject(normalizedError);
    }

    // Network / Server connection failure
    const networkError: ApiError = {
      status: 0,
      message: 'Unable to connect to Travel to Heaven servers. Please check your internet connection.',
      timestamp: new Date().toISOString(),
    };

    return Promise.reject(networkError);
  }
);

function getStatusMessage(status: number): string {
  switch (status) {
    case 400: return 'Bad Request: Please check your input.';
    case 401: return 'Unauthorized: Please log in to continue.';
    case 403: return 'Forbidden: You do not have permission to access this resource.';
    case 404: return 'Resource not found.';
    case 409: return 'Conflict: Resource already exists.';
    case 422: return 'Validation Error.';
    case 500: return 'Internal Server Error. Please try again later.';
    default: return 'An unexpected error occurred.';
  }
}

export default apiClient;
