import { useState, useCallback } from 'react';
import { FormErrors } from '../types';

interface UseFormProps<T> {
  initialValues: T;
  onSubmit: (values: T) => Promise<void>;
  validate?: (values: T) => FormErrors;
}

export const useForm = <T extends Record<string, any>>({ 
  initialValues, 
  onSubmit, 
  validate 
}: UseFormProps<T>) => {
  const [values, setValues] = useState<T>(initialValues);
  const [errors, setErrors] = useState<FormErrors>({});
  const [loading, setLoading] = useState(false);

  const handleChange = useCallback((
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setValues(prev => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: undefined }));
    }
  }, [errors]);

  const handleSubmit = useCallback(async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setErrors({});

    try {
      if (validate) {
        const validationErrors = validate(values);
        if (Object.keys(validationErrors).length > 0) {
          setErrors(validationErrors);
          return;
        }
      }

      await onSubmit(values);
    } catch (error) {
      setErrors({ 
        form: error instanceof Error ? error.message : 'An error occurred' 
      });
    } finally {
      setLoading(false);
    }
  }, [values, validate, onSubmit]);

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