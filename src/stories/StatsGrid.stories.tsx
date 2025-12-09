import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import StatsGrid from '../components/StatsGrid';

const meta: Meta<typeof StatsGrid> = {
  title: 'Components/StatsGrid',
  component: StatsGrid,
  tags: ['autodocs'],
  parameters: {
    layout: 'fullscreen',
  },
};

export default meta;
type Story = StoryObj<typeof StatsGrid>;

export const Default: Story = {};

export const Loading: Story = {
  parameters: {
    // This would show the loading state with skeleton cards
  },
};