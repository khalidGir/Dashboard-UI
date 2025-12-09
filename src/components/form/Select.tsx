import React, { memo } from 'react';
import { UseFormRegisterReturn } from 'react-hook-form';

interface SelectProps {
  label: string;
  name: string;
  options: Array<{ value: string; label: string }>;
  register: UseFormRegisterReturn;
  error?: string;
  className?: string;
}

const Select: React.FC<SelectProps> = ({
  label,
  name,
  options,
  register,
  error,
  className = '',
}) => {
  const hasError = !!error;

  return (
    <div className={`mb-4 ${className}`}>
      <label htmlFor={name} className="block text-sm font-medium text-text-secondary">
        {label}
      </label>
      <select
        id={name}
        {...register}
        aria-invalid={hasError}
        aria-describedby={hasError ? `${name}-error` : undefined}
        className={`w-full px-3 py-2 mt-1 border rounded-md ${
          hasError
            ? 'border-danger focus:ring-danger focus:border-danger'
            : 'border-border-color focus:ring-primary focus:border-primary'
        } bg-bg-primary text-text-primary focus:outline-none focus:ring-2`}
      >
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
      {error && (
        <p
          id={`${name}-error`}
          className="mt-1 text-sm text-danger"
          role="alert"
        >
          {error}
        </p>
      )}
    </div>
  );
};

export default memo(Select);
