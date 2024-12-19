import { useState, useCallback } from 'react';

export const useForm = (initialState = {}, onSubmit = () => {}) => {
  const [values, setValues] = useState(initialState);
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);

  const handleChange = useCallback((e) => {
    const { name, value } = e.target;
    setValues(prev => ({ ...prev, [name]: value }));
    // Clear error when field is modified
    setErrors(prev => ({ ...prev, [name]: '' }));
  }, []);

  const handleSubmit = useCallback(async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await onSubmit(values);
    } catch (error) {
      setErrors(error.errors || { form: error.message });
    } finally {
      setLoading(false);
    }
  }, [values, onSubmit]);

  return {
    values,
    errors,
    loading,
    handleChange,
    handleSubmit,
    setValues,
    setErrors
  };
};