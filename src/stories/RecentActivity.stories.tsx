import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import RecentActivity from '../components/RecentActivity';

const meta: Meta<typeof RecentActivity> = {
  title: 'Components/RecentActivity',
  component: RecentActivity,
  tags: ['autodocs'],
  parameters: {
    layout: 'fullscreen',
  },
};

export default meta;
type Story = StoryObj<typeof RecentActivity>;

export const Default: Story = {};

export const Loading: Story = {
  parameters: {
    // This would show the loading state with skeleton cards
  },
};