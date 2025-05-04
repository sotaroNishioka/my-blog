import type { Meta, StoryObj } from '@storybook/react';
import { ArticleBody } from '../components/features/Article/ArticleBody';

const meta: Meta<typeof ArticleBody> = {
  title: 'Features/Article/ArticleBody',
  component: ArticleBody,
  tags: ['autodocs'],
  argTypes: {
    contentHtml: { control: 'text' },
    className: { control: 'text' },
  },
};

export default meta;
type Story = StoryObj<typeof ArticleBody>;

const sampleHtmlContent = `
<h2>これは H2 見出しです</h2>
<p>これは通常の段落です。<strong>太字</strong>や<em>イタリック</em>も含まれます。</p>
<ul>
  <li>リストアイテム 1</li>
  <li>リストアイテム 2</li>
</ul>
<blockquote>
  <p>これは引用ブロックです。</p>
</blockquote>
<pre><code class="language-javascript">// これはコードブロックです
console.log('Hello, world!');
</code></pre>
<p>リンクも表示できます: <a href="https://example.com">Example Link</a></p>
`;

export const Default: Story = {
  args: {
    contentHtml: sampleHtmlContent,
  },
};

export const WithCustomClass: Story = {
  args: {
    contentHtml: '<p>このコンテンツには追加のクラスが適用されています。</p>',
    className: 'bg-blue-100 p-4 rounded',
  },
};
