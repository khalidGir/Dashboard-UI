import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { FiX } from 'react-icons/fi';

interface AlertProps {
  message: string;
  type?: 'success' | 'info' | 'warning' | 'danger';
  className?: string;
  onClose?: () => void;
}

const Alert: React.FC<AlertProps> = ({
  message,
  type = 'info',
  className = '',
  onClose,
}) => {
  const [isVisible, setIsVisible] = useState(true);

  if (!isVisible) return null;

  let typeStyles = '';
  let iconColor = '';

  switch (type) {
    case 'success':
      typeStyles = 'bg-success-100 border-success-400 text-success-700 dark:bg-success-900 dark:border-success-600 dark:text-success-200';
      iconColor = 'text-success dark:text-success-300';
      break;
    case 'info':
      typeStyles = 'bg-info-100 border-info-400 text-info-700 dark:bg-info-900 dark:border-info-600 dark:text-info-200';
      iconColor = 'text-info dark:text-info-300';
      break;
    case 'warning':
      typeStyles = 'bg-warning-100 border-warning-400 text-warning-700 dark:bg-warning-900 dark:border-warning-600 dark:text-warning-200';
      iconColor = 'text-warning dark:text-warning-300';
      break;
    case 'danger':
      typeStyles = 'bg-danger-100 border-danger-400 text-danger-700 dark:bg-danger-900 dark:border-danger-600 dark:text-danger-200';
      iconColor = 'text-danger dark:text-danger-300';
      break;
    default:
      typeStyles = 'bg-info-100 border-info-400 text-info-700 dark:bg-info-900 dark:border-info-600 dark:text-info-200';
      iconColor = 'text-info dark:text-info-300';
  }

  const handleClose = () => {
    setIsVisible(false);
    onClose && onClose();
  };

  return (
    <div
      className={`relative flex items-center justify-between p-4 mb-4 rounded-lg border ${typeStyles} ${className}`}
      role="alert"
    >
      <span className="block sm:inline">{message}</span>
      {onClose && (
        <button
          onClick={handleClose}
          className={`absolute top-0 bottom-0 right-0 px-4 py-3 ${iconColor}`}
          aria-label="Close"
        >
          <FiX />
        </button>
      )}
    </div>
  );
};

Alert.propTypes = {
  message: PropTypes.string.isRequired,
  type: PropTypes.oneOf(['success', 'info', 'warning', 'danger']),
  className: PropTypes.string,
  onClose: PropTypes.func,
};

export default Alert;
