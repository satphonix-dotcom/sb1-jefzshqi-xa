export const handleApiError = (error) => {
  if (error.response) {
    return error.response.data.message || 'Server error occurred';
  }
  if (error.request) {
    return 'No response from server';
  }
  return 'Error setting up request';
};

export const logError = (error, context = '') => {
  console.error(`Error in ${context}:`, error);
  // Here you could add error reporting service like Sentry
};