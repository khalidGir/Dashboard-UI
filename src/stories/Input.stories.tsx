import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import Input from '../components/form/Input';

const meta: Meta<typeof Input> = {
  title: 'Components/Form/Input',
  component: Input,
  tags: ['autodocs'],
  argTypes: {
    label: {
      control: 'text',
      description: 'Label for the input field.',
    },
    name: {
      control: 'text',
      description: 'Name attribute for the input field.',
    },
    type: {
      control: 'select',
      options: ['text', 'email', 'password', 'number', 'tel', 'url'],
      description: 'Type of input field.',
    },
    placeholder: {
      control: 'text',
      description: 'Placeholder text for the input field.',
    },
    error: {
      control: 'text',
      description: 'Error message to display below the input.',
    },
    register: {
      description: 'React Hook Form register function object.',
    },
    className: {
      control: 'text',
      description: 'Additional CSS classes to apply to the input container.',
    },
    disabled: {
      control: 'boolean',
      description: 'Whether the input is disabled.',
    },
  },
};

export default meta;
type Story = StoryObj<typeof Input>;

// Template for creating interactive stories
const InteractiveInputTemplate: Story = {
  render: (args) => {
    // Mock register function for Storybook
    const mockRegister = {
      onChange: (e: React.ChangeEvent<HTMLInputElement>) => console.log('Changed:', e.target.value),
      onBlur: () => console.log('Blurred'),
      ref: () => {},
      name: args.name || 'input',
    };

    return <Input {...args} register={mockRegister} />;
  },
};

export const Default: Story = {
  ...InteractiveInputTemplate,
  args: {
    label: 'Username',
    name: 'username',
    type: 'text',
    placeholder: 'Enter your username',
    register: {} as any, // Mock register will be used in the render function
  },
};

export const WithError: Story = {
  ...InteractiveInputTemplate,
  args: {
    label: 'Email Address',
    name: 'email',
    type: 'email',
    placeholder: 'Enter your email address',
    error: 'Please enter a valid email address',
    register: {} as any,
  },
};

export const Password: Story = {
  ...InteractiveInputTemplate,
  args: {
    label: 'Password',
    name: 'password',
    type: 'password',
    placeholder: 'Enter your password',
    register: {} as any,
  },
};

export const Disabled: Story = {
  ...InteractiveInputTemplate,
  args: {
    label: 'Disabled Field',
    name: 'disabledField',
    type: 'text',
    placeholder: 'This field is disabled',
    disabled: true,
    register: {} as any,
  },
};

export const WithLongPlaceholder: Story = {
  ...InteractiveInputTemplate,
  args: {
    label: 'Description',
    name: 'description',
    type: 'text',
    placeholder: 'Enter a detailed description of the item or service',
    register: {} as any,
  },
};