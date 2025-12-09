import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import useDashboardData from '../hooks/useDashboardData';
import useTheme from '../hooks/useTheme';
import CustomTooltip from './CustomTooltip';

const SalesChart: React.FC = () => {
  const { salesData, isSalesLoading, salesError } = useDashboardData();
  const theme = useTheme();
  const textColor = theme === 'dark' ? '#fff' : '#333';

  if (isSalesLoading) {
    return (
      <div className="animate-pulse">
        <div className="h-6 bg-bg-tertiary dark:bg-bg-tertiary rounded w-1/4 mb-4"></div>
        <div className="h-72 bg-bg-tertiary dark:bg-bg-tertiary rounded"></div>
      </div>
    );
  }

  if (salesError) {
    return (
      <div className="p-4 text-center text-danger">
        Error: {salesError}
      </div>
    );
  }

  if (salesData.length === 0) {
    return (
      <div className="p-4 text-center text-text-secondary dark:text-text-secondary">
        No sales data available
      </div>
    );
  }

  return (
    <ResponsiveContainer width="100%" height={300}>
      <BarChart data={salesData}>
        <CartesianGrid strokeDasharray="3 3" stroke={theme === 'dark' ? '#444' : '#ccc'} />
        <XAxis dataKey="name" tick={{ fill: textColor }} />
        <YAxis tick={{ fill: textColor }} />
        <Tooltip content={<CustomTooltip />} />
        <Legend wrapperStyle={{ color: textColor }} />
        <Bar dataKey="sales" fill="#8884d8" name="Sales" />
        <Bar dataKey="revenue" fill="#82ca9d" name="Revenue" />
      </BarChart>
    </ResponsiveContainer>
  );
};

export default SalesChart;
