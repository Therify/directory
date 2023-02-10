import { Meta, StoryObj } from '@storybook/react';
import { ProfileEditor } from './ProfileEditor';

const meta: Meta<typeof ProfileEditor> = {
    title: 'components/features/providers/ProfileEditor',
    component: ProfileEditor,
};

export default meta;

export const Default: StoryObj<typeof ProfileEditor> = {
    decorators: [
        (Story) => (
            <div style={{ width: '95vw', height: '95vh' }}>{Story()}</div>
        ),
    ],
    args: {
        onBack: () => console.log('back'),
        practice: {
            id: 'test',
            city: 'Nashville',
            state: 'Tennessee',
            website: 'https://www.example.com',
            name: 'Therify Therapy',
        },
    },
};
