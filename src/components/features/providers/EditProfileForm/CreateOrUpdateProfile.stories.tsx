import { Meta, StoryObj } from '@storybook/react';
import { CreateOrUpdateProfile } from './CreateOrUpdateProfile';

const meta: Meta<typeof CreateOrUpdateProfile> = {
    title: 'components/features/providers/CreateOrUpdateProfile',
    component: CreateOrUpdateProfile,
};

export default meta;

export const Default: StoryObj<typeof CreateOrUpdateProfile> = {
    decorators: [
        (Story) => (
            <div style={{ width: '95vw', height: '95vh' }}>{Story()}</div>
        ),
    ],
    args: {
        practice: {
            id: 'test',
            city: 'Nashville',
            state: 'Tennessee',
            website: 'https://www.example.com',
        },
    },
};
