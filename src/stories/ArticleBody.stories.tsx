import type { Meta, StoryObj } from '@storybook/react';
import { ArticleBody } from '../components/features/Article/ArticleBody';

const meta: Meta<typeof ArticleBody> = {
  title: 'Features/Article/ArticleBody',
  component: ArticleBody,
  tags: ['autodocs'],
  argTypes: {
    markdownContent: { control: 'text' },
  },
};

export default meta;
type Story = StoryObj<typeof ArticleBody>;

const sampleMarkdownContent = `
## これは H2 見出しです

これは通常の段落です。**太字**や*イタリック*も含まれます。

- リストアイテム 1
- リストアイテム 2

> これは引用ブロックです。

\`\`\`javascript
// これはコードブロックです
console.log('Hello, world!');
\`\`\`

リンクも表示できます: [Example Link](https://example.com)
`;

export const Default: Story = {
  args: {
    markdownContent: sampleMarkdownContent,
  },
};

// export const WithCustomClass: Story = {
//   args: {
//     markdownContent: 'このコンテンツには追加のクラスが適用されています。',
//     className: 'bg-blue-100 p-4 rounded',
//   },
// };
