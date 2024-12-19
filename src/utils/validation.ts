import { FormErrors } from '../types/form';

export const validateRequired = (value: any, fieldName: string): string | undefined => {
  if (!value || (typeof value === 'string' && !value.trim())) {
    return `${fieldName} is required`;
  }
  return undefined;
};

export const validateEmail = (email: string): string | undefined => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    return 'Invalid email address';
  }
  return undefined;
};

export const validatePassword = (password: string): string | undefined => {
  if (password.length < 8) {
    return 'Password must be at least 8 characters';
  }
  if (!/[A-Z]/.test(password)) {
    return 'Password must contain at least one uppercase letter';
  }
  if (!/[a-z]/.test(password)) {
    return 'Password must contain at least one lowercase letter';
  }
  if (!/[0-9]/.test(password)) {
    return 'Password must contain at least one number';
  }
  return undefined;
};

export const combineValidators = (...validators: ((value: any) => string | undefined)[]) => {
  return (value: any): string | undefined => {
    for (const validator of validators) {
      const error = validator(value);
      if (error) return error;
    }
    return undefined;
  };
};