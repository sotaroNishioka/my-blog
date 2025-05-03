import type { Meta, StoryObj } from '@storybook/react';
import { within, expect } from '@storybook/test';
import ArticleCard from '../components/ArticleCard';
import { PostData } from '../lib/posts';

// モックデータ (Home.test.tsx などから拝借)
const mockArticleData = {
  id: 'test-story-post',
  title: 'Storybook Test Post Title',
  date: '2024-07-28',
  tags: ['storybook', 'testing'],
};

const meta: Meta<typeof ArticleCard> = {
  title: 'Components/ArticleCard',
  component: ArticleCard,
  parameters: {
    layout: 'centered', // カードなので中央表示が良いかも
  },
  tags: ['autodocs'],
  argTypes: {
    // Propsの型は自動で推論されることが多いが、明示しても良い
    id: { control: 'text' },
    title: { control: 'text' },
    date: { control: 'text' },
    tags: { control: 'object' },
  },
  args: mockArticleData, // Default args for the story
};

export default meta;
type Story = StoryObj<typeof ArticleCard>;

// 基本的な表示のストーリー
export const Default: Story = {
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    // 記事タイトルが表示されているか
    const title = await canvas.findByRole('heading', { name: mockArticleData.title });
    expect(title).toBeInTheDocument();

    // 日付が表示されているか
    const date = await canvas.findByText(mockArticleData.date);
    expect(date).toBeInTheDocument();

    // タグが表示されているか
    const tag1 = await canvas.findByText(mockArticleData.tags[0]);
    expect(tag1).toBeInTheDocument();
    const tag2 = await canvas.findByText(mockArticleData.tags[1]);
    expect(tag2).toBeInTheDocument();

    // リンクが正しいか (href属性を確認)
    const link = await canvas.findByRole('link');
    expect(link).toHaveAttribute('href', `/posts/${mockArticleData.id}`);
  },
};

// タグがない場合のストーリー (オプション)
export const WithoutTags: Story = {
  args: {
    ...mockArticleData,
    tags: [],
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    // タグ要素が存在しないことを確認 (タグのコンテナ要素のセレクタなどを使うとより確実)
    const tagElements = canvas.queryAllByText(/^storybook$|^testing$/i); // 例: テキストで探す
    expect(tagElements).toHaveLength(0);

    // 他の要素は表示されていることを確認
    const title = await canvas.findByRole('heading', { name: mockArticleData.title });
    expect(title).toBeInTheDocument();
  },
};
