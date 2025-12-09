import React from 'react';
import ActivityItem from './ActivityItem';
import useDashboardData from '../hooks/useDashboardData';

const RecentActivity: React.FC = () => {
  const { activityData, isActivityLoading, activityError } = useDashboardData();

  if (isActivityLoading) {
    return (
      <section className="p-6 animate-fadeIn" style={{ animationDelay: '0.7s' }}>
        <div className="bg-bg-secondary dark:bg-bg-secondary p-6 rounded-lg shadow-md">
          <h2 className="text-xl font-semibold mb-4 text-text-primary dark:text-text-primary">Recent Activity</h2>
          <div className="space-y-4">
            {[...Array(3)].map((_, index) => (
              <div key={index} className="flex items-center p-4 border-b border-border-color animate-pulse">
                <div className="w-10 h-10 rounded-md bg-bg-tertiary dark:bg-bg-tertiary mr-4"></div>
                <div className="flex-grow">
                  <div className="h-4 bg-bg-tertiary dark:bg-bg-tertiary rounded w-1/4 mb-2"></div>
                  <div className="h-3 bg-bg-tertiary dark:bg-bg-tertiary rounded w-1/2"></div>
                </div>
                <div className="h-3 bg-bg-tertiary dark:bg-bg-tertiary rounded w-16"></div>
              </div>
            ))}
          </div>
        </div>
      </section>
    );
  }

  if (activityError) {
    return (
      <section className="p-6 animate-fadeIn" style={{ animationDelay: '0.7s' }}>
        <div className="bg-bg-secondary dark:bg-bg-secondary p-6 rounded-lg shadow-md">
          <h2 className="text-xl font-semibold mb-4 text-text-primary dark:text-text-primary">Recent Activity</h2>
          <div className="p-4 text-center text-danger">
            Error: {activityError}
          </div>
        </div>
      </section>
    );
  }

  if (activityData.length === 0) {
    return (
      <section className="p-6 animate-fadeIn" style={{ animationDelay: '0.7s' }}>
        <div className="bg-bg-secondary dark:bg-bg-secondary p-6 rounded-lg shadow-md">
          <h2 className="text-xl font-semibold mb-4 text-text-primary dark:text-text-primary">Recent Activity</h2>
          <div className="p-4 text-center text-text-secondary dark:text-text-secondary">
            No recent activity available
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="p-6 animate-fadeIn" style={{ animationDelay: '0.7s' }}>
      <div className="bg-bg-secondary dark:bg-bg-secondary p-6 rounded-lg shadow-md">
        <h2 className="text-xl font-semibold mb-4 text-text-primary dark:text-text-primary">Recent Activity</h2>
        <div>
          {activityData.map((item, index) => (
            <div key={item.id} style={{ animationDelay: `${0.8 + index * 0.1}s` }}>
              <ActivityItem
                icon={item.icon}
                title={item.title}
                subtitle={item.subtitle}
                time={item.time}
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default RecentActivity;
