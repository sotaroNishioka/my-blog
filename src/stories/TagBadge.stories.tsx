import type { Meta, StoryObj } from '@storybook/react';
import { TagBadge } from '../components/common/TagBadge';

const meta: Meta<typeof TagBadge> = {
  title: 'Common/TagBadge',
  component: TagBadge,
  tags: ['autodocs'],
  argTypes: {
    tag: { control: 'text' },
    className: { control: 'text' },
  },
};

export default meta;
type Story = StoryObj<typeof TagBadge>;

export const Default: Story = {
  args: {
    tag: '日記',
  },
};

export const LongTag: Story = {
  args: {
    tag: 'tailwindcss',
  },
};

export const WithCustomClass: Story = {
  args: {
    tag: 'カスタム',
    className: 'bg-blue-100 text-blue-800 hover:bg-blue-200',
  },
};
