import type { Meta, StoryObj } from '@storybook/react';
import { Link } from '../components/common/Link';

const meta: Meta<typeof Link> = {
  title: 'Common/Link',
  component: Link,
  tags: ['autodocs'],
  argTypes: {
    href: { control: 'text' },
    children: { control: 'text' },
    className: { control: 'text' },
    isExternal: { control: 'boolean' },
  },
};

export default meta;
type Story = StoryObj<typeof Link>;

export const Internal: Story = {
  args: {
    href: '/about',
    children: 'できることを見る',
  },
};

export const External: Story = {
  args: {
    href: 'https://github.com/sotaroNishioka',
    children: 'GitHub Profile',
    isExternal: true, // 明示的に指定 (hrefだけでも判定される)
  },
};

export const CustomClass: Story = {
  args: {
    href: '/terms',
    children: '規約とポリシー (カスタムカラー)',
    className: 'text-red-500 hover:text-red-700',
  },
};
