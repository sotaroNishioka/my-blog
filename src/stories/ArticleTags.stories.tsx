import type { Meta, StoryObj } from '@storybook/react';
import { ArticleTags } from '../components/features/Article/ArticleTags';

const meta: Meta<typeof ArticleTags> = {
  title: 'Features/Article/ArticleTags',
  component: ArticleTags,
  tags: ['autodocs'],
  argTypes: {
    tags: { control: 'object' },
    className: { control: 'text' },
  },
};

export default meta;
type Story = StoryObj<typeof ArticleTags>;

export const Default: Story = {
  args: {
    tags: ['落書き', '日記', 'FGO'],
  },
};

export const SingleTag: Story = {
  args: {
    tags: ['お知らせ'],
  },
};

export const NoTags: Story = {
  args: {
    tags: [],
  },
};

export const WithCustomClass: Story = {
  args: {
    tags: ['タグ1', 'タグ2'],
    className: 'border-t border-dashed pt-4',
  },
};
