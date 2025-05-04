import type { Meta, StoryObj } from '@storybook/react';
import { ArticleCard } from '../components/features/Article/ArticleCard';

const meta: Meta<typeof ArticleCard> = {
  title: 'Features/Article/ArticleCard',
  component: ArticleCard,
  tags: ['autodocs'],
  argTypes: {
    id: { control: 'text' },
    title: { control: 'text' },
    date: { control: 'text' },
    tags: { control: 'object' },
  },
};

export default meta;
type Story = StoryObj<typeof ArticleCard>;

export const Default: Story = {
  args: {
    id: 'test-post-1',
    title: '最初のテスト投稿',
    date: '2024-01-01',
    tags: ['Next.js', 'TypeScript'],
  },
};

export const WithoutTags: Story = {
  args: {
    id: 'test-post-2',
    title: 'タグのない投稿',
    date: '2024-01-02',
    // tags を指定しない
  },
};

export const LongTitle: Story = {
  args: {
    id: 'test-post-3',
    title: 'これは非常に長い記事のタイトルで、カード内でどのように表示されるかを確認するためのものです',
    date: '2024-01-03',
    tags: ['テスト'],
  },
};
