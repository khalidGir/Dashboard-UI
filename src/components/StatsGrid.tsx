import React, { memo, useMemo, useCallback } from 'react';
import StatCard from './StatCard';
import { FiDollarSign, FiUsers, FiShoppingCart, FiBarChart2 } from 'react-icons/fi';
import useDashboardData from '../hooks/useDashboardData';

const StatsGrid: React.FC = () => {
  const { statsData, isStatsLoading, statsError } = useDashboardData();

  const iconMap = useMemo(() => ({
    'dollar': <FiDollarSign className="text-2xl text-primary" />,
    'users': <FiUsers className="text-2xl text-primary" />,
    'shopping-cart': <FiShoppingCart className="text-2xl text-primary" />,
    'bar-chart': <FiBarChart2 className="text-2xl text-primary" />,
  }), []);

  const StatCardMemo = useCallback((stat: (typeof statsData)[0], index: number) => (
    <div
      key={stat.id}
      className="animate-fadeIn"
      style={{ animationDelay: `${index * 0.1}s` }}
    >
      <StatCard
        icon={iconMap[stat.icon] || iconMap['dollar']}
        title={stat.title}
        value={stat.value}
        change={stat.change}
        isPositive={stat.isPositive}
      />
    </div>
  ), [iconMap]);

  if (isStatsLoading) {
    return (
      <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 p-6">
        {[...Array(4)].map((_, index) => (
          <div key={index} className="bg-bg-secondary dark:bg-bg-secondary p-6 rounded-lg shadow-md animate-pulse">
            <div className="h-4 bg-bg-tertiary dark:bg-bg-tertiary rounded w-3/4 mb-4"></div>
            <div className="h-8 bg-bg-tertiary dark:bg-bg-tertiary rounded w-full mb-2"></div>
            <div className="h-4 bg-bg-tertiary dark:bg-bg-tertiary rounded w-1/2"></div>
          </div>
        ))}
      </section>
    );
  }

  if (statsError) {
    return (
      <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 p-6">
        <div className="col-span-4 p-4 text-center text-danger">
          Error: {statsError}
        </div>
      </section>
    );
  }

  if (statsData.length === 0) {
    return (
      <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 p-6">
        <div className="col-span-4 p-4 text-center text-text-secondary dark:text-text-secondary">
          No stats data available
        </div>
      </section>
    );
  }


  return (
    <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 p-6">
      {statsData.map((stat, index) => StatCardMemo(stat, index))}
    </section>
  );
};

export default memo(StatsGrid);
