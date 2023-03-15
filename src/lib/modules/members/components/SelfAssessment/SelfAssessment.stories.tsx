import { Meta, StoryFn } from '@storybook/react';
import { SelfAssessment } from './SelfAsseessment';

const meta: Meta = {
    component: SelfAssessment,
    title: 'SelfAssessment',
};

export default meta;

export const SelfAssessmentStory: StoryFn = () => <SelfAssessment />;
