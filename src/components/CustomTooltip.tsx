import React from 'react';
import PropTypes from 'prop-types';

interface CustomTooltipProps {
  active?: boolean;
  payload?: Array<{ name: string; value: string | number; color: string }>;
  label?: string | number;
}

const CustomTooltip: React.FC<CustomTooltipProps> = ({ active, payload, label }) => {
  if (active && payload && payload.length) {
    return (
      <div className="p-4 bg-bg-secondary dark:bg-bg-secondary border border-border-color dark:border-border-color rounded-lg shadow-lg">
        <p className="label text-text-primary dark:text-text-primary">{`${label}`}</p>
        {payload.map((p: { name: string; value: string | number; color: string }, index: number) => (
          <p key={index} style={{ color: p.color }}>{`${p.name}: ${p.value}`}</p>
        ))}
      </div>
    );
  }

  return null;
};

CustomTooltip.propTypes = {
  active: PropTypes.bool,
  payload: PropTypes.arrayOf(PropTypes.shape({
    name: PropTypes.string,
    value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    color: PropTypes.string,
  })),
  label: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
};

export default CustomTooltip;
