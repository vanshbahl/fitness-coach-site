import axios, { AxiosError, AxiosResponse } from 'axios';

// The base URL can be defined in .env files (e.g. VITE_API_URL=/api/v1)
const baseURL = import.meta.env.VITE_API_URL || '/api/v1';

export const apiClient = axios.create({
  baseURL,
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Response interceptor for error normalization
apiClient.interceptors.response.use(                                        
  (response: AxiosResponse) => response,
  (error: AxiosError) => {
    // Development: Verbose logging
    if (import.meta.env.DEV) {
      console.error('[API Error]', {
        request: error.request,
        response: error.response?.data,
        status: error.response?.status
      });
    } else {
      // Production: Only log unexpected errors, never raw payloads
      if (!error.response || error.response.status >= 500) {
        console.error('[API Error] An unexpected network or server error occurred.');
      }
    }

    // Always reject with the original AxiosError so the Error Parser can analyze it
    return Promise.reject(error);
  }
);
