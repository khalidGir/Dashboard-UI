import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';

import Alert from '../components/Alert';

const meta: Meta<typeof Alert> = {
  title: 'Components/Alert',
  component: Alert,
  tags: ['autodocs'],
  argTypes: {
    message: {
      control: 'text',
      description: 'The message content of the alert.',
    },
    type: {
      control: 'select',
      options: ['success', 'info', 'warning', 'danger'],
      description: 'The type of the alert, dictating its visual style.',
    },
    className: {
      control: 'text',
      description: 'Additional Tailwind CSS classes to apply to the alert container.',
    },
    onClose: {
      action: 'closed', // Logs a 'closed' action when the close button is clicked
      description: 'Callback function triggered when the alert is closed.',
    },
  },
};

export default meta;
type Story = StoryObj<typeof Alert>;

export const Success: Story = {
  args: {
    message: 'This is a success alert!',
    type: 'success',
  },
};

export const Info: Story = {
  args: {
    message: 'This is an informational alert.',
    type: 'info',
  },
};

export const Warning: Story = {
  args: {
    message: 'This is a warning alert! Please take action.',
    type: 'warning',
  },
};

export const Danger: Story = {
  args: {
    message: 'This is a danger alert! Something went wrong.',
    type: 'danger',
  },
};

export const Closable: Story = {
  args: {
    message: 'You can close this alert.',
    type: 'info',
    onClose: () => alert('Alert closed!'),
  },
};
