import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import Sidebar from '../components/Sidebar';

const meta: Meta<typeof Sidebar> = {
  title: 'Components/Sidebar',
  component: Sidebar,
  tags: ['autodocs'],
  parameters: {
    layout: 'fullscreen',
  },
};

export default meta;
type Story = StoryObj<typeof Sidebar>;

export const Default: Story = {};

export const Collapsed: Story = {
  decorators: [
    (Story) => (
      <div className="flex min-h-screen bg-bg-primary dark:bg-bg-primary">
        <div className="w-16 bg-bg-secondary dark:bg-bg-secondary h-screen shadow-md">
          <Sidebar />
        </div>
        <div className="flex-1 p-6">
          <Story />
        </div>
      </div>
    )
  ],
};