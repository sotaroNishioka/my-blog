import type { Meta, StoryObj } from '@storybook/react';
import { BaseLayout } from '../components/layout/BaseLayout';
import { Heading } from '../components/common/Heading';
import { Paragraph } from '../components/common/Paragraph';

const meta: Meta<typeof BaseLayout> = {
  title: 'Layout/BaseLayout',
  component: BaseLayout,
  tags: ['autodocs'],
  parameters: {
    layout: 'fullscreen',
  },
  argTypes: {
    siteTitle: { control: 'text' },
    // childrenは直接コントロールしない
  },
};

export default meta;
type Story = StoryObj<typeof BaseLayout>;

export const Default: Story = {
  args: {
    siteTitle: 'レイアウトテスト',
    children: (
      <>
        <Heading level={2}>メインコンテンツエリア</Heading>
        <Paragraph>
          ここにページの主要なコンテンツが表示されます。
          BaseLayoutはヘッダーとフッターを提供し、この中央部分にchildrenを配置します。
        </Paragraph>
        <Paragraph>コンテナは左右に適切なパディングを持ち、画面幅に応じて中央に配置されます。</Paragraph>
      </>
    ),
  },
};
