import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import Header from '../components/Header';

const meta: Meta<typeof Header> = {
  title: 'Components/Header',
  component: Header,
  tags: ['autodocs'],
  parameters: {
    // More on how to position stories at: https://storybook.js.org/docs/react/configure/story-layout
    layout: 'fullscreen',
  },
};

export default meta;
type Story = StoryObj<typeof Header>;

export const Default: Story = {};

export const WithLongTitle: Story = {
  decorators: [
    (Story) => (
      <div className="min-h-screen bg-bg-primary dark:bg-bg-primary">
        <Story />
      </div>
    )
  ],
  args: {}
};