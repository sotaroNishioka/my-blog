import type { Meta, StoryObj } from '@storybook/react';
import { ArticleHeader } from '../components/features/Article/ArticleHeader'; // ../ になっているはずだが再確認・修正

const meta: Meta<typeof ArticleHeader> = {
  title: 'Features/Article/ArticleHeader',
  component: ArticleHeader,
  tags: ['autodocs'],
  argTypes: {
    title: { control: 'text' },
    authorName: { control: 'text' },
    authorLink: { control: 'text' },
    publishedDate: { control: 'text' },
    authorAvatarUrl: { control: 'text' },
  },
};

export default meta;
type Story = StoryObj<typeof ArticleHeader>;

export const Default: Story = {
  args: {
    title: 'そうだ、SAITAMA行こう。',
    authorName: '真緑',
    authorLink: '/mmdrbird', // 仮のリンク
    publishedDate: '2025-04-21',
    authorAvatarUrl: '/placeholder-avatar.png', // 仮のアバター
  },
};

export const WithoutAvatar: Story = {
  args: {
    title: 'アバターなしの記事ヘッダー',
    authorName: 'テストユーザー',
    authorLink: '/test-user',
    publishedDate: '2024-01-01',
    // authorAvatarUrl を指定しない
  },
};

export const LongTitle: Story = {
  args: {
    title: 'これは非常に、非常に、本当に非常に長い記事のタイトルであり、複数行に折り返される可能性があります',
    authorName: '真緑',
    authorLink: '/mmdrbird',
    publishedDate: '2025-04-21',
    authorAvatarUrl: '/placeholder-avatar.png',
  },
};
