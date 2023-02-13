import { ProviderAvailability } from '@/lib/shared/types';
import { Meta, StoryObj } from '@storybook/react';
import { ConnectionWidget } from './ConnectionWidget';

const meta: Meta<typeof ConnectionWidget> = {
    title: 'components/features/directory/ConnectionWidget',
    component: ConnectionWidget,
};

export default meta;

export const WithAvailabiliuty: StoryObj<typeof ConnectionWidget> = {
    args: {
        providerAvailability: ProviderAvailability.MAP.AVAILABLE,
    },
};

export const NoAvailabiliuty: StoryObj<typeof ConnectionWidget> = {
    args: {
        providerAvailability: ProviderAvailability.MAP.UNAVAILABLE,
    },
};

export const ProviderSelected: StoryObj<typeof ConnectionWidget> = {
    args: {
        providerHasBeenSelected: true,
    },
};

export const Waitlist: StoryObj<typeof ConnectionWidget> = {
    args: {
        providerAvailability: ProviderAvailability.MAP.WAIT_LIST,
    },
};
