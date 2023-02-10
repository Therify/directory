import { Phone } from '@mui/icons-material';
import { Meta } from '@storybook/react';
import { CalloutBanner } from './CalloutBanner';

const meta: Meta<typeof CalloutBanner> = {
    title: 'Components/Features/Directory/ProviderProfile/CalloutBanner',
    component: CalloutBanner,
};

export default meta;

export const Default = () => (
    <CalloutBanner
        title="Callout Banner Title"
        description="Callout Banner Description"
        icon={<Phone />}
    />
);
