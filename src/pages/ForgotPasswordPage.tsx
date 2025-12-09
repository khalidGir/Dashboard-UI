import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useForm, SubmitHandler } from 'react-hook-form';
import Input from '../components/form/Input';
import Button from '../components/Button';

interface ForgotPasswordFormInputs {
  email: string;
}

const ForgotPasswordPage: React.FC = () => {
  const { register, handleSubmit, formState: { errors } } = useForm<ForgotPasswordFormInputs>();
  const [isLoading, setIsLoading] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');
  const navigate = useNavigate();

  const onSubmit: SubmitHandler<ForgotPasswordFormInputs> = async (data) => {
    setIsLoading(true);

    try {
      // Simulate API call to send password reset email
      await new Promise(resolve => setTimeout(resolve, 1000));

      // In a real app, this would be an actual API request
      console.log('Password reset request for:', data.email);

      // Show success message
      setSuccessMessage('Password reset link has been sent to your email address.');
    } catch (error) {
      console.error('Error sending password reset:', error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-bg-primary">
      <div className="w-full max-w-md p-8 space-y-6 bg-bg-secondary rounded-lg shadow-md">
        <h2 className="text-2xl font-bold text-center text-text-primary">Forgot your password?</h2>

        <p className="text-sm text-center text-text-secondary">
          Enter your email address and we will send you a link to reset your password.
        </p>

        {successMessage && (
          <div className="p-3 text-green-700 bg-green-100 rounded-md">
            {successMessage}
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
          <Button className="w-full" type="submit" disabled={isLoading}>
            {isLoading ? 'Sending...' : 'Send Reset Link'}
          </Button>
        </form>
        <p className="text-sm text-center text-text-secondary">
          Remember your password? <Link to="/login" className="text-primary hover:underline">Login</Link>
        </p>
      </div>
    </div>
  );
};

export default ForgotPasswordPage;
