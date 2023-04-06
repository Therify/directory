import { Meta, StoryFn } from '@storybook/react';
import { SelfAssessmentForm } from './SelfAsseessmentForm';

const meta: Meta = {
    component: SelfAssessmentForm,
    title: 'SelfAssessmentForm',
};

export default meta;

export const SelfAssessmentStory: StoryFn = () => <SelfAssessmentForm />;
