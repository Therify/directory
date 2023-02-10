import { Meta, StoryObj } from '@storybook/react';
import { ContentSearchControls } from './ContentSearchControls';

const meta: Meta<typeof ContentSearchControls> = {
    title: 'Features/Content/ContentSearchControls',
    component: ContentSearchControls,
};

export default meta;

export const Default: StoryObj<typeof ContentSearchControls> = {};
