import { Meta, StoryObj } from '@storybook/react';
import { ConnectionWidget } from './ConnectionWidget';

const meta: Meta<typeof ConnectionWidget> = {
    title: 'components/features/directory/ConnectionWidget',
    component: ConnectionWidget,
};

export default meta;

export const WithAvailability: StoryObj<typeof ConnectionWidget> = {
    args: {
        newClientStatus: 'accepting',
    },
};

export const NoAvailability: StoryObj<typeof ConnectionWidget> = {
    args: {
        newClientStatus: 'not_accepting',
    },
};

export const ProviderSelected: StoryObj<typeof ConnectionWidget> = {
    args: {
        providerHasBeenSelected: true,
    },
};

export const Waitlist: StoryObj<typeof ConnectionWidget> = {
    args: {
        newClientStatus: 'waitlist',
    },
};
