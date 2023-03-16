import { Meta, StoryObj } from '@storybook/react';
import { RecommendationCard as RecommendationCardComponent } from './RecommendationCard';

const meta: Meta<typeof RecommendationCard> = {
    title: 'RecommendationCard',
    component: RecommendationCardComponent,
};

export default meta;

export const RecommendationCard: StoryObj<typeof RecommendationCardComponent> =
    {};
