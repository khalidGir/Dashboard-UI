import React from 'react';
import { Link } from 'react-router-dom';

const NotFoundPage: React.FC = () => {
  return (
    <div className="p-6 bg-bg-secondary dark:bg-bg-secondary rounded-lg shadow-md text-center">
      <h2 className="text-2xl font-semibold text-text-primary dark:text-text-primary mb-4">404 - Page Not Found</h2>
      <p className="text-text-secondary dark:text-text-secondary mb-4">The page you are looking for does not exist.</p>
      <Link to="/" className="text-primary hover:underline">Go to Dashboard</Link>
    </div>
  );
};

export default NotFoundPage;
