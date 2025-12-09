import React, { memo } from 'react';
import PropTypes from 'prop-types';

interface ButtonProps {
  children: React.ReactNode;
  onClick?: () => void;
  variant?: 'primary' | 'secondary' | 'danger' | 'success';
  className?: string;
  disabled?: boolean;
}

const Button: React.FC<ButtonProps> = ({
  children,
  onClick,
  variant = 'primary',
  className = '',
  disabled = false,
}) => {
  const baseStyles =
    'px-4 py-2 rounded-md font-semibold transition duration-300 ease-in-out';
  let variantStyles = '';

  switch (variant) {
    case 'primary':
      variantStyles = disabled ? 'bg-primary opacity-50 cursor-not-allowed' : 'bg-primary hover:bg-primary-darker text-white';
      break;
    case 'secondary':
      variantStyles = disabled
        ? 'bg-bg-tertiary opacity-50 cursor-not-allowed'
        : 'bg-bg-tertiary hover:bg-gray-400 dark:hover:bg-bg-tertiary text-text-primary dark:text-text-primary';
      break;
    case 'danger':
      variantStyles = disabled ? 'bg-danger opacity-50 cursor-not-allowed' : 'bg-danger hover:bg-red-600 text-white';
      break;
    case 'success':
      variantStyles = disabled ? 'bg-success opacity-50 cursor-not-allowed' : 'bg-success hover:bg-green-600 text-white';
      break;
    default:
      variantStyles = disabled ? 'bg-primary opacity-50 cursor-not-allowed' : 'bg-primary hover:bg-primary-darker text-white';
  }

  return (
    <button
      className={`${baseStyles} ${variantStyles} ${className}`}
      onClick={onClick}
      disabled={disabled}
    >
      {children}
    </button>
  );
};

Button.propTypes = {
  children: PropTypes.node.isRequired,
  onClick: PropTypes.func,
  variant: PropTypes.oneOf(['primary', 'secondary', 'danger', 'success']),
  className: PropTypes.string,
  disabled: PropTypes.bool,
};

export default memo(Button);
