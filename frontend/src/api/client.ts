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
    // We can normalize errors here to always return a consistent shape
    const defaultError = "An unexpected error occurred. Please try again.";
    
    if (error.response) {
      // The request was made and the server responded with a status code
      // that falls out of the range of 2xx
      console.error('[API Error]', error.response.data);
      const data = error.response.data as any;
      return Promise.reject(data?.detail || data?.error || defaultError);
    } else if (error.request) {
      // The request was made but no response was received
      console.error('[Network Error]', error.request);
      return Promise.reject("Network error. Please check your connection.");
    } else {
      // Something happened in setting up the request that triggered an Error
      console.error('[Request Error]', error.message);
      return Promise.reject(error.message || defaultError);
    }
  }
);
