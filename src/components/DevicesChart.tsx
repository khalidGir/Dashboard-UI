import React from 'react';
import { PieChart, Pie, Tooltip, Legend, Cell, ResponsiveContainer } from 'recharts';
import useDashboardData from '../hooks/useDashboardData';
import useTheme from '../hooks/useTheme';
import CustomTooltip from './CustomTooltip';

const COLORS = ['#0088FE', '#00C49F', '#FFBB28'];

const DevicesChart: React.FC = () => {
  const { userData, isUserDataLoading, userDataError } = useDashboardData();
  const theme = useTheme();
  const textColor = theme === 'dark' ? '#fff' : '#333';

  if (isUserDataLoading) {
    return (
      <div className="animate-pulse">
        <div className="h-6 bg-bg-tertiary dark:bg-bg-tertiary rounded w-1/4 mb-4"></div>
        <div className="h-72 bg-bg-tertiary dark:bg-bg-tertiary rounded"></div>
      </div>
    );
  }

  if (userDataError) {
    return (
      <div className="p-4 text-center text-danger">
        Error: {userDataError}
      </div>
    );
  }

  if (userData.length === 0) {
    return (
      <div className="p-4 text-center text-text-secondary dark:text-text-secondary">
        No user data available
      </div>
    );
  }

  return (
    <ResponsiveContainer width="100%" height={300}>
      <PieChart>
        <Pie
          data={userData}
          cx="50%"
          cy="50%"
          labelLine={false}
          outerRadius={80}
          fill="#8884d8"
          dataKey="value"
          label={({ name, percent }) => `${name}: ${percent !== undefined ? (percent * 100).toFixed(0) : 'N/A'}%`}
        >
          {userData.map((_, index) => (
            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
          ))}
        </Pie>
        <Tooltip content={<CustomTooltip />} />
        <Legend wrapperStyle={{ color: textColor }} />
      </PieChart>
    </ResponsiveContainer>
  );
};

export default DevicesChart;
