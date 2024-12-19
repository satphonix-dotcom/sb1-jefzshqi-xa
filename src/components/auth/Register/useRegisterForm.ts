import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAppDispatch } from '../../../hooks';
import { loginSuccess } from '../../../store/slices/authSlice';
import { register } from '../../../services/auth.service';
import { validatePassword } from '../../../utils/validation';

interface RegisterFormValues {
  username: string;
  email: string;
  password: string;
  confirmPassword: string;
}

interface RegisterFormErrors {
  form?: string;
  password?: string;
}

export const useRegisterForm = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const [values, setValues] = useState<RegisterFormValues>({
    username: '',
    email: '',
    password: '',
    confirmPassword: ''
  });
  const [errors, setErrors] = useState<RegisterFormErrors>({});
  const [loading, setLoading] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setValues(prev => ({
      ...prev,
      [name]: value
    }));
    setErrors({});
  };

  const validateForm = (): boolean => {
    const newErrors: RegisterFormErrors = {};

    if (values.password !== values.confirmPassword) {
      newErrors.form = 'Passwords do not match';
    }

    if (!validatePassword(values.password)) {
      newErrors.password = 'Password must be at least 8 characters and include uppercase, lowercase, and numbers';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }

    setLoading(true);

    try {
      const data = await register({
        username: values.username,
        email: values.email,
        password: values.password
      });
      dispatch(loginSuccess(data));
      navigate('/');
    } catch (error) {
      const message = error instanceof Error ? error.message : 'Registration failed';
      setErrors({ form: message });
    } finally {
      setLoading(false);
    }
  };

  return {
    values,
    errors,
    loading,
    handleChange,
    handleSubmit
  };
};