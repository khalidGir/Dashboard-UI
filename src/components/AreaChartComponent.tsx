import React from 'react';
import PropTypes from 'prop-types';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { performanceData } from '../data/chartData';
import useTheme from '../hooks/useTheme';
import CustomTooltip from './CustomTooltip';

const AreaChartComponent: React.FC = () => {
  const theme = useTheme();
  const textColor = theme === 'dark' ? '#fff' : '#333';
  const strokeColor = theme === 'dark' ? 'var(--color-primary-darker)' : 'var(--color-primary)';
  const fillColor = theme === 'dark' ? 'var(--color-primary)' : 'var(--color-primary)';

  return (
    <ResponsiveContainer width="100%" height={300}>
      <AreaChart
        data={performanceData}
        margin={{
          top: 10,
          right: 30,
          left: 0,
          bottom: 0,
        }}
      >
        <CartesianGrid strokeDasharray="3 3" stroke={theme === 'dark' ? '#444' : '#ccc'} />
        <XAxis dataKey="name" tick={{ fill: textColor }} />
        <YAxis tick={{ fill: textColor }} />
        <Tooltip content={<CustomTooltip />} />
        <Area type="monotone" dataKey="uv" stroke={strokeColor} fill={fillColor} />
      </AreaChart>
    </ResponsiveContainer>
  );
};

AreaChartComponent.propTypes = {
  // No specific props for this component, as it uses internal data and context
};

export default AreaChartComponent;
