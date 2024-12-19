import React from 'react';

interface FormInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string;
  error?: string;
  rounded?: 'top' | 'bottom' | 'both' | 'none';
}

const FormInput: React.FC<FormInputProps> = ({
  label,
  error,
  rounded = 'both',
  className = '',
  ...props
}) => {
  const getRoundedClasses = () => {
    switch (rounded) {
      case 'top':
        return 'rounded-t-md';
      case 'bottom':
        return 'rounded-b-md';
      case 'both':
        return 'rounded-md';
      default:
        return '';
    }
  };

  return (
    <div>
      <label htmlFor={props.id} className="sr-only">
        {label}
      </label>
      <input
        {...props}
        className={`appearance-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 ${getRoundedClasses()} focus:outline-none focus:ring-primary focus:border-primary focus:z-10 sm:text-sm ${className}`}
      />
      {error && (
        <p className="mt-1 text-sm text-red-600">{error}</p>
      )}
    </div>
  );
};

export default FormInput;