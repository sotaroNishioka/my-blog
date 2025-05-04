import type { Meta, StoryObj } from '@storybook/react';
import { Paragraph } from '../components/common/Paragraph';

const meta: Meta<typeof Paragraph> = {
  title: 'Common/Paragraph',
  component: Paragraph,
  tags: ['autodocs'],
  argTypes: {
    children: {
      control: 'text',
    },
    className: {
      control: 'text',
    },
  },
};

export default meta;
type Story = StoryObj<typeof Paragraph>;

export const Default: Story = {
  args: {
    children:
      'しずかなインターネットは、日記やエッセイを書くのにちょうどいい、文章書き散らしサービスです。ここでは有益な情報を書くことはあまり求められていません。「たくさんの人に読まれなくていい」「自分のために、ひょっとすると、どこかの誰かのために」そんな気楽さで文章を書くための場所です。',
  },
};

export const CustomClass: Story = {
  args: {
    children: 'This paragraph has a custom class for text color.',
    className: 'text-blue-600',
  },
};
