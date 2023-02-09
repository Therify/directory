import { Meta, StoryObj } from '@storybook/react';
import { CreateOrUpdateProfile } from './CreateOrUpdateProfile';

const meta: Meta<typeof CreateOrUpdateProfile> = {
    title: 'components/features/providers/CreateOrUpdateProfile',
    component: CreateOrUpdateProfile,
};

export default meta;

export const Default: StoryObj<typeof CreateOrUpdateProfile> = {
    args: {},
};
