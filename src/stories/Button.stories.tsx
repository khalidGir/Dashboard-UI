import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';

import Button from '../components/Button';

// More on how to set up stories at: https://storybook.js.org/docs/react/writing-stories/introduction
const meta: Meta<typeof Button> = {
  title: 'Components/Button', // Categorizes the component in Storybook UI
  component: Button, // The component itself
  tags: ['autodocs'], // Enables auto-generated documentation for the component
  argTypes: {
    children: {
      control: 'text', // Allows editing the button text in Storybook controls
      description: 'The content to be rendered inside the button.',
    },
    onClick: {
      action: 'clicked', // Logs a 'clicked' action when the button is clicked
      description: 'Callback function triggered when the button is clicked.',
    },
    variant: {
      control: 'select', // Provides a dropdown for selecting variants
      options: ['primary', 'secondary', 'danger', 'success'], // Available variants
      description: 'The visual style variant of the button.',
    },
    className: {
      control: 'text',
      description: 'Additional Tailwind CSS classes to apply to the button.',
    },
  },
};

export default meta;
type Story = StoryObj<typeof Button>;

// More on writing stories with args: https://storybook.js.org/docs/react/writing-stories/args
export const Primary: Story = {
  args: {
    children: 'Primary Button',
    variant: 'primary',
  },
};

export const Secondary: Story = {
  args: {
    children: 'Secondary Button',
    variant: 'secondary',
  },
};

export const Danger: Story = {
  args: {
    children: 'Danger Button',
    variant: 'danger',
  },
};

export const Success: Story = {
  args: {
    children: 'Success Button',
    variant: 'success',
  },
};

export const CustomClass: Story = {
  args: {
    children: 'Custom Styled',
    variant: 'primary',
    className: 'border-2 border-primary-darker px-8 py-3 text-lg', // Example custom styling
  },
};