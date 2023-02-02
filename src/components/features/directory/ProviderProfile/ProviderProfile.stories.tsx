import { Meta, StoryObj } from '@storybook/react';
import { ProviderProfile } from './ProviderProfile';

const meta: Meta<typeof ProviderProfile> = {
    title: 'components/features/directory/ProviderProfile',
    component: ProviderProfile,
};

export default meta;

export const Basic: StoryObj<typeof ProviderProfile> = {};
