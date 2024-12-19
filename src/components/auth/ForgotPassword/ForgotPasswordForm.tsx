import React from 'react';
import FormInput from '../../common/FormInput';
import FormButton from '../../common/FormButton';
import { useForgotPasswordForm } from './useForgotPasswordForm';

const ForgotPasswordForm: React.FC = () => {
  const { email, error, success, loading, handleChange, handleSubmit } = useForgotPasswordForm();

  if (success) {
    return (
      <div className="rounded-md bg-green-50 p-4">
        <div className="flex">
          <div className="flex-shrink-0">
            <svg className="h-5 w-5 text-green-400" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
            </svg>
          </div>
          <div className="ml-3">
            <h3 className="text-sm font-medium text-green-800">
              Check your email
            </h3>
            <p className="mt-2 text-sm text-green-700">
              If an account exists for {email}, you will receive a password reset link.
            </p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="mt-8 space-y-6">
      {error && (
        <div className="rounded-md bg-red-50 p-4">
          <div className="flex">
            <div className="ml-3">
              <h3 className="text-sm font-medium text-red-800">
                {error}
              </h3>
            </div>
          </div>
        </div>
      )}

      <FormInput
        id="email"
        name="email"
        type="email"
        label="Email address"
        placeholder="Email address"
        value={email}
        onChange={handleChange}
        required
      />

      <FormButton
        type="submit"
        isLoading={loading}
        loadingText="Sending..."
      >
        Send reset link
      </FormButton>
    </form>
  );
};

export default ForgotPasswordForm;