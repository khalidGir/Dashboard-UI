import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import Select from '../components/form/Select';

const meta: Meta<typeof Select> = {
  title: 'Components/Form/Select',
  component: Select,
  tags: ['autodocs'],
  argTypes: {
    label: {
      control: 'text',
      description: 'Label for the select field.',
    },
    name: {
      control: 'text',
      description: 'Name attribute for the select field.',
    },
    options: {
      control: { type: 'object' },
      description: 'Array of options for the select dropdown.',
    },
    register: {
      description: 'React Hook Form register function object.',
    },
    error: {
      control: 'text',
      description: 'Error message to display below the select.',
    },
    className: {
      control: 'text',
      description: 'Additional CSS classes to apply to the select container.',
    },
    defaultValue: {
      control: 'text',
      description: 'Default value for the select field.',
    },
    disabled: {
      control: 'boolean',
      description: 'Whether the select is disabled.',
    },
  },
};

export default meta;
type Story = StoryObj<typeof Select>;

// Template for creating interactive stories
const InteractiveSelectTemplate: Story = {
  render: (args) => {
    // Mock register function for Storybook
    const mockRegister = {
      onChange: (e: React.ChangeEvent<HTMLSelectElement>) => console.log('Changed:', e.target.value),
      onBlur: () => console.log('Blurred'),
      ref: () => {},
      name: args.name || 'select',
    };

    return <Select {...args} register={mockRegister} />;
  },
};

export const Default: Story = {
  ...InteractiveSelectTemplate,
  args: {
    label: 'Select Role',
    name: 'role',
    options: [
      { value: '', label: 'Select a role' },
      { value: 'admin', label: 'Admin' },
      { value: 'editor', label: 'Editor' },
      { value: 'viewer', label: 'Viewer' },
    ],
    register: {} as any, // Mock register will be used in the render function
  },
};

export const WithError: Story = {
  ...InteractiveSelectTemplate,
  args: {
    label: 'Select Category',
    name: 'category',
    options: [
      { value: '', label: 'Select a category' },
      { value: 'technology', label: 'Technology' },
      { value: 'business', label: 'Business' },
      { value: 'design', label: 'Design' },
    ],
    error: 'Please select a valid category',
    register: {} as any,
  },
};

export const Disabled: Story = {
  ...InteractiveSelectTemplate,
  args: {
    label: 'Disabled Select',
    name: 'disabledSelect',
    options: [
      { value: '', label: 'Select an option' },
      { value: 'option1', label: 'Option 1' },
      { value: 'option2', label: 'Option 2' },
    ],
    disabled: true,
    register: {} as any,
  },
};

export const WithDefaultValue: Story = {
  ...InteractiveSelectTemplate,
  args: {
    label: 'Pre-selected Value',
    name: 'preselected',
    options: [
      { value: '', label: 'Select an option' },
      { value: 'option1', label: 'Option 1' },
      { value: 'option2', label: 'Option 2' },
      { value: 'option3', label: 'Option 3' },
    ],
    defaultValue: 'option2',
    register: {} as any,
  },
};

export const ManyOptions: Story = {
  ...InteractiveSelectTemplate,
  args: {
    label: 'Country Selection',
    name: 'country',
    options: [
      { value: '', label: 'Select a country' },
      { value: 'us', label: 'United States' },
      { value: 'ca', label: 'Canada' },
      { value: 'uk', label: 'United Kingdom' },
      { value: 'de', label: 'Germany' },
      { value: 'fr', label: 'France' },
      { value: 'jp', label: 'Japan' },
      { value: 'au', label: 'Australia' },
      { value: 'br', label: 'Brazil' },
      { value: 'in', label: 'India' },
      { value: 'cn', label: 'China' },
      { value: 'mx', label: 'Mexico' },
    ],
    register: {} as any,
  },
};