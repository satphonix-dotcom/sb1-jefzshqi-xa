import React from 'react';
import { Link } from 'react-router-dom';
import { useLoginForm } from './useLoginForm';
import FormInput from '../../common/FormInput';
import FormButton from '../../common/FormButton';
import AuthError from '../shared/AuthError';

const LoginForm: React.FC = () => {
  const { values, errors, loading, handleChange, handleSubmit } = useLoginForm();

  return (
    <form onSubmit={handleSubmit} className="mt-8 space-y-6">
      {errors.form && <AuthError message={errors.form} />}

      <div className="rounded-md shadow-sm -space-y-px">
        <FormInput
          id="email"
          name="email"
          type="email"
          label="Email address"
          value={values.email}
          onChange={handleChange}
          required
          autoComplete="email"
          rounded="top"
        />
        <FormInput
          id="password"
          name="password"
          type="password"
          label="Password"
          value={values.password}
          onChange={handleChange}
          required
          autoComplete="current-password"
          rounded="bottom"
        />
      </div>

      <div className="flex items-center justify-between">
        <Link
          to="/forgot-password"
          className="text-sm font-medium text-primary hover:text-primary-dark"
        >
          Forgot your password?
        </Link>
      </div>

      <FormButton
        type="submit"
        isLoading={loading}
        loadingText="Signing in..."
      >
        Sign in
      </FormButton>

      <div className="text-center">
        <p className="text-sm text-gray-600">
          Don't have an account?{' '}
          <Link
            to="/register"
            className="font-medium text-primary hover:text-primary-dark"
          >
            Sign up
          </Link>
        </p>
      </div>
    </form>
  );
};

export default LoginForm;