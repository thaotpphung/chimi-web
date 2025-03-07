import { Meta, StoryObj } from '@storybook/react';

import { RecipeCard } from './recipe-card';

const meta: Meta<typeof RecipeCard> = {
  component: RecipeCard,
};

export default meta;

type Story = StoryObj<typeof RecipeCard>;

export const Default: Story = {
  args: {}
};
