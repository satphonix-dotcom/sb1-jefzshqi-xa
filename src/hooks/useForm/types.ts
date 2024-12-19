import { FormState, FormErrors } from '../../types/form';

export interface UseFormConfig<T> {
  initialValues: T;
  validate?: (values: T) => FormErrors;
  onSubmit: (values: T) => Promise<void>;
}

export interface UseFormReturn<T> {
  formState: FormState<T>;
  handleChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
  handleBlur: (e: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
  handleSubmit: (e: React.FormEvent) => Promise<void>;
  setFieldValue: (name: keyof T, value: any) => void;
  setFieldError: (name: keyof T, error: string) => void;
  resetForm: () => void;
}