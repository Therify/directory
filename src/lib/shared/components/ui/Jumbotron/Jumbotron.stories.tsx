import { Meta, StoryFn, } from '@storybook/react';
import { Jumbotron as JumbotronUi } from './Jumbotron';

const meta: Meta<typeof JumbotronUi> = {
    title: 'UI/Jumbotron',
    component: JumbotronUi,
    args: {
        hasRecommendationsForReview: false,
        hasStartedCare: false,
    }
};

export default meta;

export const Default: StoryFn<typeof JumbotronUi> = (args) => (
    <JumbotronUi {...args} />
);
