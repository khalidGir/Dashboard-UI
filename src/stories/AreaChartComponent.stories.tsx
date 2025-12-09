import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import AreaChartComponent from '../components/AreaChartComponent';

// Sample data for the chart
const sampleData = [
  { name: 'Jan', value: 4000 },
  { name: 'Feb', value: 3000 },
  { name: 'Mar', value: 2000 },
  { name: 'Apr', value: 2780 },
  { name: 'May', value: 1890 },
  { name: 'Jun', value: 2390 },
  { name: 'Jul', value: 3490 },
];

const meta: Meta<typeof AreaChartComponent> = {
  title: 'Components/Charts/AreaChart',
  component: AreaChartComponent,
  tags: ['autodocs'],
  argTypes: {
    data: {
      control: { type: 'object' },
      description: 'Data to display in the chart.',
    },
    dataKey: {
      control: 'text',
      description: 'Key in the data object to use for the area values.',
    },
    title: {
      control: 'text',
      description: 'Title for the chart.',
    },
    className: {
      control: 'text',
      description: 'Additional CSS classes to apply to the chart container.',
    },
  },
};

export default meta;
type Story = StoryObj<typeof AreaChartComponent>;

export const Default: Story = {
  args: {
    data: sampleData,
    dataKey: 'value',
    title: 'Monthly Performance',
  },
};

export const WithoutTitle: Story = {
  args: {
    data: sampleData,
    dataKey: 'value',
    title: '',
  },
};

export const WithDifferentData: Story = {
  args: {
    data: [
      { name: 'Q1', value: 1000 },
      { name: 'Q2', value: 3000 },
      { name: 'Q3', value: 2000 },
      { name: 'Q4', value: 4000 },
    ],
    dataKey: 'value',
    title: 'Quarterly Sales',
  },
};