import api from '../utils/api';
import { setLocalStorage, clearLocalStorage } from '../utils/storage';
import { handleApiError } from '../utils/errorHandler';
import { API_ENDPOINTS } from '../constants';

export const login = async (email, password) => {
  try {
    const response = await api.post(API_ENDPOINTS.AUTH.LOGIN, { email, password });
    const { token, user } = response.data;
    setLocalStorage('token', token);
    return { token, user };
  } catch (error) {
    throw handleApiError(error);
  }
};

export const register = async (userData) => {
  try {
    const response = await api.post(API_ENDPOINTS.AUTH.REGISTER, userData);
    const { token, user } = response.data;
    setLocalStorage('token', token);
    return { token, user };
  } catch (error) {
    throw handleApiError(error);
  }
};

export const logout = () => {
  clearLocalStorage();
};

export const verifyEmail = async (token) => {
  try {
    const response = await api.get(`${API_ENDPOINTS.AUTH.VERIFY_EMAIL}/${token}`);
    return response.data;
  } catch (error) {
    throw handleApiError(error);
  }
};

export const forgotPassword = async (email) => {
  try {
    const response = await api.post(API_ENDPOINTS.AUTH.FORGOT_PASSWORD, { email });
    return response.data;
  } catch (error) {
    throw handleApiError(error);
  }
};

export const resetPassword = async (token, password) => {
  try {
    const response = await api.post(`${API_ENDPOINTS.AUTH.RESET_PASSWORD}/${token}`, { password });
    return response.data;
  } catch (error) {
    throw handleApiError(error);
  }
};

export const getCurrentUser = async () => {
  try {
    const response = await api.get('/auth/me');
    return response.data;
  } catch (error) {
    throw handleApiError(error);
  }
};