import type { Meta, StoryObj } from '@storybook/react';
import { TabNavigation } from '../components/features/Navigation/TabNavigation'; // パスを確認

const meta: Meta<typeof TabNavigation> = {
  title: 'Features/Navigation/TabNavigation',
  component: TabNavigation,
  tags: ['autodocs'],
  argTypes: {
    // tabsはオブジェクトの配列なので、コントロールを無効化するか、複雑なコントロールを設定
    tabs: { control: 'object' },
    activeHref: { control: 'text' },
    className: { control: 'text' },
  },
};

export default meta;
type Story = StoryObj<typeof TabNavigation>;

const sampleTabs = [
  { label: 'すべて', href: '/user/sample' },
  { label: '日記', href: '/user/sample?tag=diary' },
  { label: 'お知らせ', href: '/user/sample?tag=notice' },
  { label: '技術記事', href: '/user/sample?tag=tech' },
];

export const Default: Story = {
  args: {
    tabs: sampleTabs,
    activeHref: '/user/sample', // 「すべて」をアクティブに
  },
};

export const DiaryActive: Story = {
  args: {
    tabs: sampleTabs,
    activeHref: '/user/sample?tag=diary', // 「日記」をアクティブに
  },
};

export const CustomClass: Story = {
  args: {
    tabs: sampleTabs,
    activeHref: '/user/sample',
    className: 'bg-yellow-100', // 背景色を変えてみる
  },
};
