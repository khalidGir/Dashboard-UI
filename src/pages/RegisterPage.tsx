import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useForm, SubmitHandler } from 'react-hook-form';
import Input from '../components/form/Input';
import Button from '../components/Button';
import { useAuthStore } from '../store/useAuthStore';

interface RegisterFormInputs {
  fullName: string;
  email: string;
  password: string;
  confirmPassword: string;
}

const RegisterPage: React.FC = () => {
  const { register, handleSubmit, formState: { errors }, watch } = useForm<RegisterFormInputs>();
  const { login, isLoading, error: authError } = useAuthStore();
  const navigate = useNavigate();

  const password = watch('password');

  const onSubmit: SubmitHandler<RegisterFormInputs> = async (data) => {
    // In a real app, you would call a register API here
    // For this demo, we'll just call the login function after 'registering'
    try {
      // Simulate registration process
      await new Promise(resolve => setTimeout(resolve, 1000));

      // After registration, log the user in
      await login(data.email, data.password, false);
    } catch (error: any) {
      console.error('Registration error:', error);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-bg-primary">
      <div className="w-full max-w-md p-8 space-y-6 bg-bg-secondary rounded-lg shadow-md">
        <h2 className="text-2xl font-bold text-center text-text-primary">Create a new account</h2>

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
            label="Full Name"
            name="fullName"
            type="text"
            register={register("fullName", {
              required: "Full name is required"
            })}
            error={errors.fullName?.message}
          />

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

          <Input
            label="Confirm Password"
            name="confirmPassword"
            type="password"
            register={register("confirmPassword", {
              required: "Please confirm your password",
              validate: (value) =>
                value === password || "Passwords do not match"
            })}
            error={errors.confirmPassword?.message}
          />

          <Button className="w-full" type="submit" disabled={isLoading}>
            {isLoading ? 'Creating Account...' : 'Register'}
          </Button>
        </form>
        <p className="text-sm text-center text-text-secondary">
          Already have an account? <Link to="/login" className="text-primary hover:underline focus:outline-none focus:ring-2 focus:ring-primary rounded">Login</Link>
        </p>
      </div>
    </div>
  );
};

export default RegisterPage;
