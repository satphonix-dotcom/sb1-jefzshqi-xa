import { useState } from 'react';
import { forgotPassword } from '../../../services/auth.service';

export const useForgotPasswordForm = () => {
  const [email, setEmail] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
    setError(null);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      await forgotPassword(email);
      setSuccess(true);
    } catch (error) {
      setError(error instanceof Error ? error.message : 'Failed to send reset link');
    } finally {
      setLoading(false);
    }
  };

  return {
    email,
    error,
    success,
    loading,
    handleChange,
    handleSubmit
  };
};