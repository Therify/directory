import { type Meta, type StoryFn } from '@storybook/react';
import { VideoPlayer as Component } from './VideoPlayer';

const meta: Meta<typeof Component> = {
    title: 'Media/VideoPlayer',
    component: Component,
};

export default meta;

const VIDEO_URL =
    'http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4';

export const Player: StoryFn<typeof Component> = (args) => {
    return <Component src={VIDEO_URL} />;
};
