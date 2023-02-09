import { Control } from 'react-hook-form';
import { FormSectionTitle } from '@/components/ui/FormElements';
import { ProviderProfile } from '@/lib/types/providerProfile';
import { Box } from '@mui/material';
import { styled } from '@mui/material/styles';
import { State, ProviderCredential } from '@/lib/types';
import { NpiNumberInput } from './NpiNumber';
import { AcceptedInsuranceInput } from './AcceptedInsurance';
import { CredentialsManagerInput } from './CredentialsManager';

interface IdentitySectionProps {
    control: Control<ProviderProfile>;
    disabled?: boolean;
    defaultValues: {
        npiNumber?: string;
        credentials?: ProviderCredential.ProviderCredential[];
    };
    licensedStates?: typeof State.ENTRIES[number][];
}
export const CredentialsSection = ({
    control,
    defaultValues,
    disabled,
    licensedStates = [],
}: IdentitySectionProps) => {
    return (
        <Container>
            <FormSectionTitle>Your Credentials</FormSectionTitle>
            <NpiNumberInput
                control={control}
                defaultValue={defaultValues.npiNumber}
            />
            <Box marginTop={6}>
                <CredentialsManagerInput
                    control={control}
                    disabled={disabled}
                />
                <AcceptedInsuranceInput
                    control={control}
                    stateOptions={licensedStates}
                />
            </Box>
        </Container>
    );
};

const Container = styled(Box)(({ theme }) => ({
    width: '100%',
    display: 'flex',
    flexDirection: 'column',
    '& > *': {
        flex: 1,
    },
}));
