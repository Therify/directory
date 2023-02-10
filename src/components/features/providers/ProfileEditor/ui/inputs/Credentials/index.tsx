import { Control } from 'react-hook-form';
import { FormSectionTitle } from '@/components/ui/FormElements';
import { Box } from '@mui/material';
import { styled } from '@mui/material/styles';
import { State, ProviderCredential, ProviderProfile } from '@/lib/types';
import { NpiNumberInput } from './NpiNumber';
import { AcceptedInsuranceInput } from './AcceptedInsurance';
import { CredentialsManagerInput } from './CredentialsManager';
import { PracticeStartDateInput } from './PracticeStartDate';

interface IdentitySectionProps {
    control: Control<ProviderProfile.ProviderProfile>;
    disabled?: boolean;
    defaultValues: {
        npiNumber?: string;
        credentials?: ProviderCredential.ProviderCredential[];
        practiceStartDate?: Date;
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
            <TwoInputContainer>
                <PracticeStartDateInput control={control} disabled={disabled} />
                <NpiNumberInput control={control} />
            </TwoInputContainer>
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

const TwoInputContainer = styled(Box)(({ theme }) => ({
    width: '100%',
    display: 'flex',
    flexDirection: 'column',
    [theme.breakpoints.up('md')]: {
        flexDirection: 'row',
    },

    '& > *': {
        flex: 1,
        [theme.breakpoints.up('md')]: {
            width: `calc(50% - ${theme.spacing(1)})`,
            '&:first-of-type': {
                marginRight: theme.spacing(1),
            },
            '&:last-of-type': {
                marginLeft: theme.spacing(1),
            },
        },
    },
}));
