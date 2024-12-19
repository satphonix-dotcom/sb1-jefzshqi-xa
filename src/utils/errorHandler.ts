import { AxiosError } from 'axios';

interface ApiError {
  message: string;
  errors?: Record<string, string>;
}

export const handleApiError = (error: unknown): Error => {
  if (error instanceof AxiosError && error.response?.data) {
    const apiError = error.response.data as ApiError;
    return new Error(apiError.message || 'An error occurred');
  }
  
  if (error instanceof Error) {
    return error;
  }
  
  return new Error('An unexpected error occurred');
};