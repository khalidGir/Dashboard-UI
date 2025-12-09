import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import StatCard from '../components/StatCard';
import { FiDollarSign, FiUsers, FiShoppingCart, FiBarChart2 } from 'react-icons/fi';

const meta: Meta<typeof StatCard> = {
  title: 'Components/StatCard',
  component: StatCard,
  tags: ['autodocs'],
  argTypes: {
    title: {
      control: 'text',
      description: 'Title of the stat card.',
    },
    value: {
      control: 'text',
      description: 'Main value displayed in the card.',
    },
    change: {
      control: 'text',
      description: 'Percentage change value to display.',
    },
    isPositive: {
      control: 'boolean',
      description: 'Determines if the change is positive (green) or negative (red).',
    },
    icon: {
      description: 'Icon component to display in the card.',
    },
    className: {
      control: 'text',
      description: 'Additional CSS classes to apply to the card.',
    },
  },
};

export default meta;
type Story = StoryObj<typeof StatCard>;

export const RevenueCard: Story = {
  args: {
    title: 'Total Revenue',
    value: '$24,580',
    change: '↑ 12.5%',
    isPositive: true,
    icon: <FiDollarSign className="text-2xl text-primary" />,
  },
};

export const NewCustomersCard: Story = {
  args: {
    title: 'New Customers',
    value: '1,243',
    change: '↑ 8.2%',
    isPositive: true,
    icon: <FiUsers className="text-2xl text-primary" />,
  },
};

export const PendingOrdersCard: Story = {
  args: {
    title: 'Pending Orders',
    value: '86',
    change: '↓ 3.1%',
    isPositive: false,
    icon: <FiShoppingCart className="text-2xl text-primary" />,
  },
};

export const BounceRateCard: Story = {
  args: {
    title: 'Bounce Rate',
    value: '32.4%',
    change: '↑ 1.7%',
    isPositive: false, // Since bounce rate is typically negative when it increases
    icon: <FiBarChart2 className="text-2xl text-primary" />,
  },
};

export const CustomValues: Story = {
  args: {
    title: 'Custom Stat',
    value: 'Custom Value',
    change: '↓ 5.0%',
    isPositive: false,
    icon: <FiBarChart2 className="text-2xl text-primary" />,
  },
};

export const LargeValue: Story = {
  args: {
    title: 'Large Number',
    value: '9,876,543',
    change: '↑ 50.0%',
    isPositive: true,
    icon: <FiDollarSign className="text-2xl text-primary" />,
  },
};

export const ZeroChange: Story = {
  args: {
    title: 'No Change',
    value: '1,000',
    change: '0.0%',
    isPositive: true,
    icon: <FiUsers className="text-2xl text-primary" />,
  },
};