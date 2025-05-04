import type { Meta, StoryObj } from '@storybook/react';
import { Footer } from '../components/layout/Footer';

const meta: Meta<typeof Footer> = {
  title: 'Layout/Footer',
  component: Footer,
  tags: ['autodocs'],
  parameters: {
    layout: 'fullscreen',
  },
};

export default meta;
type Story = StoryObj<typeof Footer>;

export const Default: Story = {}; // 引数なしでデフォルト表示
