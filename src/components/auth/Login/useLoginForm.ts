import { useNavigate, useLocation } from 'react-router-dom';
import { useAppDispatch } from '../../../hooks';
import { loginStart, loginSuccess, loginFailure } from '../../../store/slices/authSlice';
import { AuthService } from '../../../services/auth.service';
import { useForm } from '../../../hooks/useForm';

interface LoginFormValues {
  email: string;
  password: string;
}

export const useLoginForm = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const location = useLocation();

  const from = location.state?.from?.pathname || '/';

  const { values, errors, loading, handleChange, handleSubmit } = useForm<LoginFormValues>({
    initialValues: {
      email: '',
      password: ''
    },
    onSubmit: async (formValues) => {
      dispatch(loginStart());
      try {
        const data = await AuthService.login(formValues.email, formValues.password);
        dispatch(loginSuccess(data));
        navigate(from, { replace: true });
      } catch (error) {
        const message = error instanceof Error ? error.message : 'Login failed';
        dispatch(loginFailure(message));
        throw error;
      }
    }
  });

  return {
    values,
    errors,
    loading,
    handleChange,
    handleSubmit
  };
};