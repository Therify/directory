import { Meta, StoryFn, } from '@storybook/react';
import { CareJumbotron as CareJumbotronUi } from './CareJumbotron';

const meta: Meta<typeof CareJumbotronUi> = {
    title: 'UI/CareJumbotron',
    component: CareJumbotronUi,
    args: {
        hasCareTeam: false,
        hasRecommendationsForReview: false,
        hasCompletedSelfAssessment: false,
    }
};

export default meta;

export const Default: StoryFn<typeof CareJumbotronUi> = (args) => (
    <CareJumbotronUi {...args} />
);
