import api from '../utils/api';
import { User } from '../types';
import { STORAGE_KEYS } from '../utils/constants';
import { handleApiError } from '../utils/errorHandler';

interface LoginResponse {
  token: string;
  user: User;
}

interface RegisterData {
  username: string;
  email: string;
  password: string;
}

export class AuthService {
  static async login(email: string, password: string): Promise<LoginResponse> {
    try {
      const response = await api.post('/auth/login', { email, password });
      const { token, user } = response.data;
      localStorage.setItem(STORAGE_KEYS.TOKEN, token);
      return { token, user };
    } catch (error) {
      throw handleApiError(error);
    }
  }

  static async register(data: RegisterData): Promise<LoginResponse> {
    try {
      const response = await api.post('/auth/register', data);
      const { token, user } = response.data;
      localStorage.setItem(STORAGE_KEYS.TOKEN, token);
      return { token, user };
    } catch (error) {
      throw handleApiError(error);
    }
  }

  static async getCurrentUser(): Promise<User> {
    try {
      const response = await api.get('/auth/me');
      return response.data;
    } catch (error) {
      throw handleApiError(error);
    }
  }

  static logout(): void {
    localStorage.removeItem(STORAGE_KEYS.TOKEN);
  }
}