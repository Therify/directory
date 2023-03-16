import { Meta, StoryFn } from '@storybook/react';
import { SelfAssessment } from './SelfAsseessmentForm';

const meta: Meta = {
    component: SelfAssessment,
    title: 'SelfAssessmentForm',
};

export default meta;

export const SelfAssessmentStory: StoryFn = () => <SelfAssessment />;
