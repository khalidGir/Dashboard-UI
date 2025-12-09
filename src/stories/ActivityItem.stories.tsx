import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import ActivityItem from '../components/ActivityItem';

const meta: Meta<typeof ActivityItem> = {
  title: 'Components/ActivityItem',
  component: ActivityItem,
  tags: ['autodocs'],
  argTypes: {
    icon: {
      control: 'text',
      description: 'Icon to display in the activity item.',
    },
    title: {
      control: 'text',
      description: 'Main title of the activity.',
    },
    subtitle: {
      control: 'text',
      description: 'Subtitle or description of the activity.',
    },
    time: {
      control: 'text',
      description: 'Timestamp for the activity.',
    },
    className: {
      control: 'text',
      description: 'Additional CSS classes to apply to the item.',
    },
  },
};

export default meta;
type Story = StoryObj<typeof ActivityItem>;

export const ReportGenerated: Story = {
  args: {
    icon: '📊',
    title: 'New report generated',
    subtitle: 'Monthly performance report is ready',
    time: '2 min ago',
  },
};

export const UserRegistered: Story = {
  args: {
    icon: '👤',
    title: 'New user registered',
    subtitle: 'Alex Johnson joined the platform',
    time: '1 hour ago',
  },
};

export const OrderReceived: Story = {
  args: {
    icon: '🛒',
    title: 'New order received',
    subtitle: 'Order #12345 for $245.00',
    time: '3 hours ago',
  },
};

export const SalesTargetAchieved: Story = {
  args: {
    icon: '📈',
    title: 'Sales target achieved',
    subtitle: 'Reached 95% of monthly sales goal',
    time: '5 hours ago',
  },
};

export const SystemUpdate: Story = {
  args: {
    icon: '🔧',
    title: 'System updated',
    subtitle: 'Dashboard version 2.1.0 installed',
    time: '1 day ago',
  },
};

export const LongText: Story = {
  args: {
    icon: '📝',
    title: 'Very long activity title that spans multiple lines',
    subtitle: 'This is a very long subtitle that might span multiple lines to test how the component handles long text',
    time: 'Just now',
  },
};

export const RecentActivity: Story = {
  args: {
    icon: '🔔',
    title: 'Reminder',
    subtitle: 'Meeting with team scheduled for tomorrow',
    time: 'Now',
  },
};