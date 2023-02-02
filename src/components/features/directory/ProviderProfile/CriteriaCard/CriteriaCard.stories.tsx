import { Meta } from '@storybook/react';
import { CriteriaCard } from './CriteriaCard';

const meta: Meta<typeof CriteriaCard> = {
    title: 'Components/Features/Directory/ProviderProfile/CriteriaCard',
    component: CriteriaCard,
};

export default meta;

export const Default = () => <CriteriaCard type="info" />;
