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
    variant: { control: 'select', options: ['outline', 'primary'] },
  },
  // Use `fn` to spy on the onClick arg, which will appear in the actions panel once invoked
  args: { onClick: fn() },
};

export default meta;
type Story = StoryObj<typeof Button>;

export const Default: Story = {
  args: {
    children: 'はじめる',
    type: 'submit',
    disabled: false,
    className: 'aa\n',
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

export const Outline: Story = {
  args: {
    children: '枠線ボタン (デフォルト)',
    variant: 'outline',
  },
};

export const Primary: Story = {
  args: {
    children: 'プライマリボタン',
    variant: 'primary',
  },
};

export const DisabledOutline: Story = {
  args: {
    children: '無効 (枠線)',
    disabled: true,
    variant: 'outline',
  },
};

export const DisabledPrimary: Story = {
  args: {
    children: '無効 (プライマリ)',
    disabled: true,
    variant: 'primary',
  },
};

export const CustomClassOutline: Story = {
  args: {
    children: 'カスタム枠線ボタン',
    variant: 'outline',
    className: 'border-red-500 text-red-500 hover:bg-red-50',
  },
};

export const CustomClassPrimary: Story = {
  args: {
    children: 'カスタムプライマリボタン',
    variant: 'primary',
    className: 'bg-teal-600 hover:bg-teal-700',
  },
};
