import { Meta } from '@storybook/react';
import { CriteriaCard, CRITERIA_CARD_TYPES } from './CriteriaCard';

const meta: Meta<typeof CriteriaCard> = {
    title: 'Components/Features/Directory/ProviderProfile/CriteriaCard',
    component: CriteriaCard,
};

export default meta;

export const Default = () => (
    <CriteriaCard type={CRITERIA_CARD_TYPES.INSURANCE} />
);
