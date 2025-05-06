import type { Meta, StoryObj } from '@storybook/react';
import { within, expect } from '@storybook/test';
import Layout from '../components/layout/Layout';

// More on how to set up stories at: https://storybook.js.org/docs/writing-stories#default-export
const meta: Meta<typeof Layout> = {
  title: 'Components/Layout', // Storybookのサイドバーでの表示名
  component: Layout, // 対象のコンポーネント
  parameters: {
    // Optional parameter to center the component in the Canvas. More info: https://storybook.js.org/docs/configure/story-layout
    layout: 'fullscreen', // 全画面表示にするのだ
  },
  // This component will have an automatically generated Autodocs entry: https://storybook.js.org/docs/writing-docs/autodocs
  tags: ['autodocs'], // 自動ドキュメント生成を有効にするのだ
  // More on argTypes: https://storybook.js.org/docs/api/argtypes
  argTypes: {
    // children のコントロールは不要なので空にするのだ
    children: { control: false },
  },
};

export default meta;
type Story = StoryObj<typeof Layout>;

// More on writing stories with args: https://storybook.js.org/docs/writing-stories/args
export const Default: Story = {
  args: {
    // children に表示するサンプルコンテンツ
    children: <div className="p-4 bg-blue-100 border border-blue-300 rounded">Test Content</div>,
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    // ヘッダーのブログタイトルが表示されているか
    const headerTitle = await canvas.findByText('My Blog');
    expect(headerTitle).toBeInTheDocument();

    // 子要素が表示されているか
    const childContent = await canvas.findByText('Test Content');
    expect(childContent).toBeInTheDocument();

    // フッターのコピーライトが表示されているか (年を含む部分一致)
    const footerText = await canvas.findByText(/© \d{4} My Blog. Built with Next.js and TypeScript./);
    expect(footerText).toBeInTheDocument();
  },
};
