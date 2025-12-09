import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import DataTablePage from '../pages/DataTablePage';

const meta: Meta<typeof DataTablePage> = {
  title: 'Pages/Data Table',
  component: DataTablePage,
  tags: ['autodocs'],
  parameters: {
    layout: 'fullscreen',
  },
};

export default meta;
type Story = StoryObj<typeof DataTablePage>;

export const Default: Story = {};

export const Loading: Story = {
  parameters: {
    // This would require mocking the data fetching to show loading state
  },
};