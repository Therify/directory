import { Meta, StoryObj } from '@storybook/react';
import { DirectoryCard } from './DirectoryCard';

const meta: Meta<typeof DirectoryCard> = {
    title: 'Features/Directory/DirectoryCard',
    component: DirectoryCard,
    argTypes: {
        isFavorite: {
            control: {
                type: 'boolean',
            },
        },
    },
};

export default meta;

export const Default: StoryObj<typeof DirectoryCard> = {
    args: {},
};
