import type { Meta, StoryObj } from '@storybook/react';
import { fn } from '@storybook/test';
import { Button } from '../components/common/Button';

const meta: Meta<typeof Button> = {
  title: 'Common/Button',
  component: Button,
  tags: ['autodocs'],
  argTypes: {
    children: { control: 'text' },
    className: { control: 'text' },
    disabled: { control: 'boolean' },
    type: { control: 'select', options: ['button', 'submit', 'reset'] },
  },
  // Use `fn` to spy on the onClick arg, which will appear in the actions panel once invoked
  args: { onClick: fn() },
};

export default meta;
type Story = StoryObj<typeof Button>;

export const Default: Story = {
  args: {
    children: 'はじめる',
    type: "submit",
    disabled: false,
    className: "aa\n"
  },
};

export const Disabled: Story = {
  args: {
    children: '送信中...',
    disabled: true,
  },
};

export const CustomClass: Story = {
  args: {
    children: 'カスタムボタン',
    className: 'bg-green-500 hover:bg-green-600',
  },
};
