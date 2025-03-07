import { Meta, StoryObj } from '@storybook/react';

import { Image } from './image';

const meta: Meta<typeof Image> = {
  component: Image,
};

export default meta;

type Story = StoryObj<typeof Image>;

export const Default: Story = {
  args: {}
};
