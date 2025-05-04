import type { Meta, StoryObj } from '@storybook/react';
import { AuthorProfile } from '../components/features/Article/AuthorProfile';

const meta: Meta<typeof AuthorProfile> = {
  title: 'Features/Article/AuthorProfile',
  component: AuthorProfile,
  tags: ['autodocs'],
  argTypes: {
    authorName: { control: 'text' },
    authorLink: { control: 'text' },
    avatarUrl: { control: 'text' },
    description: { control: 'text' },
  },
};

export default meta;
type Story = StoryObj<typeof AuthorProfile>;

export const Default: Story = {
  args: {
    authorName: '真緑',
    authorLink: '/mmdrbird',
    avatarUrl: '/placeholder-avatar.png',
    description: '絵を描くアカウント。気まぐれにFGO中心の雑多二次創作。告知・連絡用 @mmdrbird',
  },
};

export const WithoutDescription: Story = {
  args: {
    authorName: 'シンプルユーザー',
    authorLink: '/simple-user',
    avatarUrl: '/placeholder-avatar.png',
  },
};

export const WithoutAvatar: Story = {
  args: {
    authorName: 'アバターなしユーザー',
    authorLink: '/no-avatar-user',
    description: '簡単な自己紹介文。',
  },
};
