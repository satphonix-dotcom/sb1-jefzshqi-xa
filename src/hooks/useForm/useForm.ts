import { useState, useCallback } from 'react';
import { UseFormConfig, UseFormReturn } from './types';
import { FormState, FormErrors } from '../../types/form';

export function useForm<T extends Record<string, any>>({
  initialValues,
  validate,
  onSubmit
}: UseFormConfig<T>): UseFormReturn<T> {
  const [formState, setFormState] = useState<FormState<T>>({
    values: initialValues,
    errors: {},
    touched: Object.keys(initialValues).reduce((acc, key) => ({
      ...acc,
      [key]: false
    }), {} as Record<keyof T, boolean>),
    isSubmitting: false,
    isValid: true
  });

  const validateField = useCallback((name: keyof T, value: any): string | undefined => {
    if (!validate) return undefined;
    const errors = validate({ ...formState.values, [name]: value });
    return errors[name as string];
  }, [formState.values, validate]);

  const setFieldValue = useCallback((name: keyof T, value: any) => {
    const error = validateField(name, value);
    setFormState(prev => ({
      ...prev,
      values: { ...prev.values, [name]: value },
      errors: { ...prev.errors, [name]: error },
      isValid: !error && Object.values(prev.errors).every(err => !err)
    }));
  }, [validateField]);

  const handleChange = useCallback((e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFieldValue(name as keyof T, value);
  }, [setFieldValue]);

  const handleBlur = useCallback((e: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name } = e.target;
    setFormState(prev => ({
      ...prev,
      touched: { ...prev.touched, [name]: true }
    }));
  }, []);

  const handleSubmit = useCallback(async (e: React.FormEvent) => {
    e.preventDefault();
    setFormState(prev => ({ ...prev, isSubmitting: true }));

    try {
      if (validate) {
        const errors = validate(formState.values);
        if (Object.keys(errors).length > 0) {
          setFormState(prev => ({
            ...prev,
            errors,
            isSubmitting: false,
            isValid: false
          }));
          return;
        }
      }

      await onSubmit(formState.values);
      setFormState(prev => ({
        ...prev,
        errors: {},
        isSubmitting: false,
        isValid: true
      }));
    } catch (error) {
      setFormState(prev => ({
        ...prev,
        errors: {
          form: error instanceof Error ? error.message : 'An error occurred'
        },
        isSubmitting: false
      }));
    }
  }, [formState.values, validate, onSubmit]);

  const setFieldError = useCallback((name: keyof T, error: string) => {
    setFormState(prev => ({
      ...prev,
      errors: { ...prev.errors, [name]: error },
      isValid: false
    }));
  }, []);

  const resetForm = useCallback(() => {
    setFormState({
      values: initialValues,
      errors: {},
      touched: Object.keys(initialValues).reduce((acc, key) => ({
        ...acc,
        [key]: false
      }), {} as Record<keyof T, boolean>),
      isSubmitting: false,
      isValid: true
    });
  }, [initialValues]);

  return {
    formState,
    handleChange,
    handleBlur,
    handleSubmit,
    setFieldValue,
    setFieldError,
    resetForm
  };
}