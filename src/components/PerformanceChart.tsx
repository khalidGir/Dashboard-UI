import React from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import useDashboardData from '../hooks/useDashboardData';
import useTheme from '../hooks/useTheme';
import CustomTooltip from './CustomTooltip';

const PerformanceChart: React.FC = () => {
  const { performanceData, isPerformanceLoading, performanceError } = useDashboardData();
  const theme = useTheme();
  const textColor = theme === 'dark' ? '#fff' : '#333';

  if (isPerformanceLoading) {
    return (
      <div className="animate-pulse">
        <div className="h-6 bg-bg-tertiary dark:bg-bg-tertiary rounded w-1/4 mb-4"></div>
        <div className="h-72 bg-bg-tertiary dark:bg-bg-tertiary rounded"></div>
      </div>
    );
  }

  if (performanceError) {
    return (
      <div className="p-4 text-center text-danger">
        Error: {performanceError}
      </div>
    );
  }

  if (performanceData.length === 0) {
    return (
      <div className="p-4 text-center text-text-secondary dark:text-text-secondary">
        No performance data available
      </div>
    );
  }

  return (
    <ResponsiveContainer width="100%" height={300}>
      <LineChart data={performanceData}>
        <CartesianGrid strokeDasharray="3 3" stroke={theme === 'dark' ? '#444' : '#ccc'} />
        <XAxis dataKey="name" tick={{ fill: textColor }} />
        <YAxis tick={{ fill: textColor }} />
        <Tooltip content={<CustomTooltip />} />
        <Legend wrapperStyle={{ color: textColor }} />
        <Line type="monotone" dataKey="pv" stroke="#8884d8" activeDot={{ r: 8 }} name="Page Views" />
        <Line type="monotone" dataKey="uv" stroke="#82ca9d" name="Unique Visitors" />
      </LineChart>
    </ResponsiveContainer>
  );
};

export default PerformanceChart;
