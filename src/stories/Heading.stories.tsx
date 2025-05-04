import type { Meta, StoryObj } from '@storybook/react';
import { Heading } from '../components/common/Heading';

const meta: Meta<typeof Heading> = {
  title: 'Common/Heading',
  component: Heading,
  tags: ['autodocs'],
  argTypes: {
    level: {
      control: { type: 'select', options: [1, 2, 3, 4, 5, 6] },
    },
    children: {
      control: 'text',
    },
    className: {
      control: 'text',
    },
  },
};

export default meta;
type Story = StoryObj<typeof Heading>;

export const H1: Story = {
  args: {
    level: 1,
    children: 'しずかなインターネット',
  },
};

export const H2: Story = {
  args: {
    level: 2,
    children: '騒がしいインターネットの片隅に あなたの静かな場所を作りましょう',
  },
};

export const H3: Story = {
  args: {
    level: 3,
    children: 'Heading Level 3',
  },
};

export const CustomClass: Story = {
  args: {
    level: 1,
    children: 'Custom Styled H1',
    className: 'text-purple-700 underline',
  },
};
