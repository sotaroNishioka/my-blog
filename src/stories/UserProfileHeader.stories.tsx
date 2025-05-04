import type { Meta, StoryObj } from '@storybook/react';
import { UserProfileHeader } from '../components/features/UserProfile/UserProfileHeader';

const meta: Meta<typeof UserProfileHeader> = {
  title: 'Features/UserProfile/UserProfileHeader',
  component: UserProfileHeader,
  tags: ['autodocs'],
  argTypes: {
    userName: { control: 'text' },
    description: { control: 'text' },
    avatarUrl: { control: 'text' },
  },
};

export default meta;
type Story = StoryObj<typeof UserProfileHeader>;

export const Default: Story = {
  args: {
    userName: '真緑',
    description: '絵を描くアカウント。気まぐれにFGO中心の雑多二次創作。告知・連絡用 @mmdrbird',
    avatarUrl: '/placeholder-avatar.png', // 仮のパス
  },
};

export const WithoutDescription: Story = {
  args: {
    userName: 'シンプルユーザー',
    avatarUrl: '/placeholder-avatar.png',
  },
};

export const WithoutAvatar: Story = {
  args: {
    userName: 'アバターなしユーザー',
    description: 'アバター画像が設定されていません。',
  },
};
