import React, { memo } from 'react';
import PropTypes from 'prop-types';

interface ActivityItemProps {
  icon: React.ReactNode;
  title: string;
  subtitle: string;
  time: string;
}

const ActivityItem: React.FC<ActivityItemProps> = ({ icon, title, subtitle, time }) => {
  return (
    <div className="flex items-center p-4 border-b border-border-color transition duration-300 hover:bg-bg-tertiary dark:hover:bg-bg-tertiary">
      <div className="text-2xl mr-4" aria-hidden="true">{icon}</div>
      <div className="flex-grow">
        <h4 className="font-semibold text-text-primary dark:text-text-primary">{title}</h4>
        <p className="text-text-secondary dark:text-text-secondary text-sm">{subtitle}</p>
      </div>
      <div className="text-text-tertiary dark:text-text-tertiary text-sm" aria-label={`Time: ${time}`}>{time}</div>
    </div>
  );
};

ActivityItem.propTypes = {
  icon: PropTypes.node.isRequired,
  title: PropTypes.string.isRequired,
  subtitle: PropTypes.string.isRequired,
  time: PropTypes.string.isRequired,
};

export default memo(ActivityItem);
