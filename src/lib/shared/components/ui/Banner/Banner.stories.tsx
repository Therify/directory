import { Meta, StoryFn } from '@storybook/react';
import { Banner as BannerUi } from './Banner';

const meta: Meta<typeof BannerUi> = {
    title: 'Components/Banner',
    component: BannerUi,
    args: {
        message: 'Did you know we have banners?',
        linkText: 'Click Here',
        linkUrl: '/',
    },
};

export default meta;

export const Default: StoryFn<typeof BannerUi> = (args) => (
    <BannerUi {...args} />
);
