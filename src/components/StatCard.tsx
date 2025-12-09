import React, { memo } from 'react';
import PropTypes from 'prop-types';
import { motion } from 'framer-motion';

interface StatCardProps {
  title: string;
  value: string;
  change: string;
  isPositive: boolean;
  icon: React.ReactNode;
}

const StatCard: React.FC<StatCardProps> = ({ title, value, change, isPositive, icon }) => {
  const changeClass = isPositive ? 'text-success' : 'text-danger';

  return (
    <motion.div
      className="bg-bg-secondary dark:bg-bg-secondary p-6 rounded-lg shadow-md"
      whileHover={{ scale: 1.05 }}
    >
      <div className="flex items-center">
        <div className="mr-4 text-primary" data-testid="icon">{icon}</div>
        <div>
          <h3 className="text-text-secondary dark:text-text-secondary text-sm font-medium">{title}</h3>
          <p className="text-text-primary dark:text-text-primary text-2xl font-semibold my-2">{value}</p>
        </div>
      </div>
      <span className={`text-sm ${changeClass}`}>{change}</span>
    </motion.div>
  );
};

StatCard.propTypes = {
  title: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired,
  change: PropTypes.string.isRequired,
  isPositive: PropTypes.bool.isRequired,
  icon: PropTypes.node.isRequired,
};

export default memo(StatCard);
