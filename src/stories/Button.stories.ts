import type { Meta, StoryObj } from '@storybook/react';
import { fn } from '@storybook/test';
import { Button } from './Button';

// More on how to set up stories at: https://storybook.js.org/docs/writing-stories#default-export
const meta: Meta<typeof Button> = {
  title: 'Components/Button',
  component: Button,
  parameters: {
    // Optional parameter to center the component in the Canvas. More info: https://storybook.js.org/docs/configure/story-layout
    layout: 'centered',
  },
  // This component will have an automatically generated Autodocs entry: https://storybook.js.org/docs/writing-docs/autodocs
  tags: ['autodocs'],
  // More on argTypes: https://storybook.js.org/docs/api/argtypes
  argTypes: {
    // children は ArgTypes でコントロールせず、args で指定する
    children: { control: false },
    // primary と size はコントロールできるようにする
    primary: { control: 'boolean' },
    size: { control: 'select', options: ['small', 'medium', 'large'] },
    // className は Storybook 上ではあまり使わないので非表示に
    className: { table: { disable: true } },
    // onClick は Action として表示
    onClick: { action: 'clicked' },
  },
  // 共通のargs、ここではonClickだけ設定
  args: { onClick: fn() },
};

export default meta;
type Story = StoryObj<typeof Button>;

// More on writing stories with args: https://storybook.js.org/docs/writing-stories/args
export const Primary: Story = {
  args: {
    primary: true,
    children: 'Primary Button',
  },
};

export const Secondary: Story = {
  args: {
    primary: false,
    children: 'Secondary Button',
  },
};

export const Large: Story = {
  args: {
    size: 'large',
    children: 'Large Button',
  },
};

export const Small: Story = {
  args: {
    size: 'small',
    children: 'Small Button',
  },
};
