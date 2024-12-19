import { useAppSelector } from './useAppSelector';
import { User } from '../types';

interface AuthState {
  isAuthenticated: boolean;
  user: User | null;
  loading: boolean;
  error: string | null;
}

export const useAuth = () => {
  const auth = useAppSelector(state => state.auth) as AuthState;
  return auth;
};