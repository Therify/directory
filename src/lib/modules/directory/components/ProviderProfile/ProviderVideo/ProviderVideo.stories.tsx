import { Meta, StoryObj } from '@storybook/react';
import { ProviderVideo } from './ProviderVideo';
import { faker } from '@faker-js/faker';

export default {
    title: 'ProviderVideo',
    component: ProviderVideo,
} as Meta;

export const Default: StoryObj<typeof ProviderVideo> = {
    args: {
        givenName: faker.name.firstName(),
        profileImageUrl: faker.image.avatar(),
        videoPlayerProps: {
            url: 'http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4',
        },
    },
};
