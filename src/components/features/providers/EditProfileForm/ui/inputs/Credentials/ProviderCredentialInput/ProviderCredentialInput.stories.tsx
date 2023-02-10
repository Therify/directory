import { Meta, StoryObj } from '@storybook/react';
import { ProviderCredentialInput } from './ProviderCredentialInput';

const meta: Meta<typeof ProviderCredentialInput> = {
    title: 'components/ui/FormElements/ProviderCredentialInput',
    component: ProviderCredentialInput,
};

export default meta;

export const Default: StoryObj<typeof ProviderCredentialInput> = {
    args: {},
};
