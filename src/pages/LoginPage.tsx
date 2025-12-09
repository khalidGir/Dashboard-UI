import React, { useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useForm, SubmitHandler } from 'react-hook-form';
import Input from '../components/form/Input';
import Button from '../components/Button';
import { useAuthStore } from '../store/useAuthStore';

interface LoginFormInputs {
  email: string;
  password: string;
  rememberMe: boolean;
}

const LoginPage: React.FC = () => {
  const { register, handleSubmit, formState: { errors } } = useForm<LoginFormInputs>();
  const { login, isLoading, error: authError, isAuthenticated } = useAuthStore();
  const navigate = useNavigate();

  useEffect(() => {
    if (isAuthenticated) {
      navigate('/');
    }
  }, [isAuthenticated, navigate]);

  const onSubmit: SubmitHandler<LoginFormInputs> = async (data) => {
    await login(data.email, data.password, data.rememberMe);
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-bg-primary">
      <div className="w-full max-w-md p-8 space-y-6 bg-bg-secondary rounded-lg shadow-md">
        <h2 className="text-2xl font-bold text-center text-text-primary">Login to your account</h2>

        {authError && (
          <div
            className="p-3 text-red-700 bg-red-100 rounded-md"
            role="alert"
            aria-live="polite"
          >
            {authError}
          </div>
        )}

        <form className="space-y-6" onSubmit={handleSubmit(onSubmit)}>
          <Input
            label="Email address"
            name="email"
            type="email"
            register={register("email", {
              required: "Email is required",
              pattern: {
                value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                message: "Invalid email address"
              }
            })}
            error={errors.email?.message}
          />

          <Input
            label="Password"
            name="password"
            type="password"
            register={register("password", {
              required: "Password is required",
              minLength: {
                value: 6,
                message: "Password must be at least 6 characters"
              }
            })}
            error={errors.password?.message}
          />

          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <input
                id="rememberMe"
                type="checkbox"
                {...register("rememberMe")}
                className="w-4 h-4 text-primary bg-gray-100 border-gray-300 rounded focus:ring-primary focus:outline-none focus:ring-2"
              />
              <label htmlFor="rememberMe" className="ml-2 block text-sm text-text-secondary">Remember me</label>
            </div>
            <Link to="/forgot-password" className="text-sm text-primary hover:underline focus:outline-none focus:ring-2 focus:ring-primary rounded">Forgot your password?</Link>
          </div>

          <Button className="w-full" type="submit" disabled={isLoading}>
            {isLoading ? 'Logging In...' : 'Login'}
          </Button>
        </form>
        <p className="text-sm text-center text-text-secondary">
          Don't have an account? <Link to="/register" className="text-primary hover:underline focus:outline-none focus:ring-2 focus:ring-primary rounded">Sign up</Link>
        </p>
      </div>
    </div>
  );
};

export default LoginPage;
