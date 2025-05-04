import type { Meta, StoryObj } from '@storybook/react';
import { Header } from '../components/layout/Header';

const meta: Meta<typeof Header> = {
  title: 'Layout/Header',
  component: Header,
  tags: ['autodocs'],
  parameters: {
    // レイアウトコンポーネントなので、ページ全体での表示を確認しやすくする
    layout: 'fullscreen',
  },
  argTypes: {
    siteTitle: { control: 'text' },
  },
};

export default meta;
type Story = StoryObj<typeof Header>;

export const Default: Story = {
  args: {
    siteTitle: 'しずかなブログ',
  },
};

export const LongTitle: Story = {
  args: {
    siteTitle: '非常に長いサイトタイトルを持つブログの場合',
  },
};
