import type { Meta, StoryObj } from '@storybook/react';
import { within, expect } from '@storybook/test';
import HomePage from '../pages/index'; // <-- Update path here
import { PostData } from '../lib/posts'; // Assuming PostData type is still in lib/posts

// モックデータ (Home.test.tsx からコピー)
const mockPosts = [
  {
    id: 'test-post-1',
    title: 'Test Post 1',
    date: '2024-01-01',
    tags: ['tag1', 'tag2'],
  },
  {
    id: 'test-post-2',
    title: 'Test Post 2',
    date: '2024-01-02',
    tags: ['tag3'],
  },
];

const meta: Meta<typeof HomePage> = {
  title: 'Pages/Home', // Storybookでの表示名
  component: HomePage,
  parameters: {
    layout: 'fullscreen', // レイアウトに合わせて全画面表示
  },
  tags: ['autodocs'], // 自動ドキュメント生成
  argTypes: {
    posts: { control: false }, // Propsはargsで渡すのでコントロール不要
  },
};

export default meta;
type Story = StoryObj<typeof HomePage>;

// 記事が複数ある場合のストーリー
export const WithPosts: Story = {
  args: {
    posts: mockPosts,
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    // 見出しが表示されているか
    const heading = await canvas.findByRole('heading', { name: /Blog Posts/i });
    expect(heading).toBeInTheDocument();

    // 記事タイトルが表示されているか
    const postTitle1 = await canvas.findByRole('heading', { name: /Test Post 1/i });
    expect(postTitle1).toBeInTheDocument();
    const postTitle2 = await canvas.findByRole('heading', { name: /Test Post 2/i });
    expect(postTitle2).toBeInTheDocument();

    // 記事数が正しいか (article タグ)
    const articles = await canvas.findAllByRole('article');
    expect(articles).toHaveLength(2);

    // 日付が表示されているか
    const date1 = await canvas.findByText('2024-01-01');
    expect(date1).toBeInTheDocument();
    const date2 = await canvas.findByText('2024-01-02');
    expect(date2).toBeInTheDocument();

    // タグが表示されているか
    const tag1 = await canvas.findByText('tag1');
    expect(tag1).toBeInTheDocument();
    const tag2 = await canvas.findByText('tag2');
    expect(tag2).toBeInTheDocument();
    const tag3 = await canvas.findByText('tag3');
    expect(tag3).toBeInTheDocument();
  },
};

// 記事がない場合のストーリー
export const NoPosts: Story = {
  args: {
    posts: [],
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    // 見出しが表示されているか
    const heading = await canvas.findByRole('heading', { name: /Blog Posts/i });
    expect(heading).toBeInTheDocument();

    // 記事がない旨のメッセージが表示されるか (または記事リストが空か)
    // Homeコンポーネントの実装に合わせて調整が必要なのだ
    // 例: const noPostsMessage = await canvas.queryByText(/No posts found/i);
    //     expect(noPostsMessage).toBeInTheDocument();
    // または
    const articles = canvas.queryAllByRole('article');
    expect(articles).toHaveLength(0);
  },
};
