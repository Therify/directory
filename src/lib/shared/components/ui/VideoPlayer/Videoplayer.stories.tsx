import { StoryObj, Meta } from '@storybook/react';
import { VideoPlayer } from './VideoPlayer';

const meta: Meta<typeof VideoPlayer> = {
    component: VideoPlayer,
    title: 'VideoPlayer',
};

export default meta;

export const Default: StoryObj<typeof VideoPlayer> = {
    args: {
        url: 'http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4',
        controls: true,
    },
};
