import { Meta, StoryFn } from '@storybook/react';
import { Jumbotron as JumbotronUi, JumbotronProps } from './Jumbotron';

const meta: Meta<typeof JumbotronUi> = {
    title: 'UI/Jumbotron',
    component: JumbotronUi,
};

export default meta;

const defaultProps: JumbotronProps = {
    headerText: 'Build your Care Team...',
    backgroundProps: {
        backgroundImageUrl:
            'https://res.cloudinary.com/dbrkfldqn/image/upload/v1673453029/app.therify.co/login/8_jvntyl.jpg',
    },
    callToAction: {
        label: 'Get Started',
        onClick: () => alert('Clicked!'),
    },
};

const subheaderProps: JumbotronProps = {
    headerText: 'Top text',
    subHeaderText: 'Bottom text',
    backgroundProps: {
        backgroundImageUrl:
            'https://res.cloudinary.com/dbrkfldqn/image/upload/v1673453029/app.therify.co/login/10_dj9do6.jpg',
    },
    callToAction: {
        label: 'Please click me',
        onClick: () => alert('Thank you'),
    },
};

const noButtonProps: JumbotronProps = {
    headerText: 'Top text',
    subHeaderText: 'Bottom text',
    backgroundProps: {
        backgroundImageUrl:
            'https://res.cloudinary.com/dbrkfldqn/image/upload/v1673453029/app.therify.co/login/10_dj9do6.jpg',
    },
    callToAction: {
        label: 'Please click me',
        onClick: () => alert('Thank you'),
    },
};

const celebrationProps: JumbotronProps = {
    headerText: 'Top text',
    backgroundProps: {
        useCelebrationStyling: true,
    },
    callToAction: {
        label: 'Please click me',
        onClick: () => alert('Thank you'),
    },
};

export const Default: StoryFn<typeof JumbotronUi> = () => (
    <JumbotronUi {...defaultProps} />
);
export const WithSubheader: StoryFn<typeof JumbotronUi> = () => (
    <JumbotronUi {...subheaderProps} />
);
export const NoButton: StoryFn<typeof JumbotronUi> = () => (
    <JumbotronUi {...noButtonProps} />
);
export const CelebrationBackground: StoryFn<typeof JumbotronUi> = () => (
    <JumbotronUi {...celebrationProps} />
);
