import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import ThemeToggle from '../components/ThemeToggle';

const meta: Meta<typeof ThemeToggle> = {
  title: 'Components/ThemeToggle',
  component: ThemeToggle,
  tags: ['autodocs'],
  argTypes: {
    className: {
      control: 'text',
      description: 'Additional CSS classes to apply to the toggle button.',
    },
  },
};

export default meta;
type Story = StoryObj<typeof ThemeToggle>;

export const Default: Story = {};

export const WithCustomClass: Story = {
  args: {
    className: 'text-lg p-2',
  },
};