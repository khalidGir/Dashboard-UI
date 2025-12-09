import React from 'react';
import PropTypes from 'prop-types';

interface ChartContainerProps {
  title: string;
  children: React.ReactNode;
}

const ChartContainer: React.FC<ChartContainerProps> = ({ title, children }) => {
  return (
    <div className="bg-bg-secondary dark:bg-bg-secondary p-6 rounded-lg shadow-md">
      <h2 className="text-xl font-semibold mb-4 text-text-primary dark:text-text-primary">{title}</h2>
      {children}
    </div>
  );
};

ChartContainer.propTypes = {
  title: PropTypes.string.isRequired,
  children: PropTypes.node.isRequired,
};

export default ChartContainer;
