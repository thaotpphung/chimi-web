import { Meta, StoryObj } from '@storybook/react';

import { Popover } from './popover';

const meta: Meta<typeof Popover> = {
  component: Popover,
};

export default meta;

type Story = StoryObj<typeof Popover>;

export const Default: Story = {
  args: {}
};
