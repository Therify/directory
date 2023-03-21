import { Control } from 'react-hook-form';
import { FormSectionTitle } from '@/lib/shared/components/ui/FormElements';
import { Box } from '@mui/material';
import { styled } from '@mui/material/styles';
import { Region, ProviderProfile } from '@/lib/shared/types';
import { NpiNumberInput } from './NpiNumber';
import { AcceptedInsuranceInput } from './AcceptedInsurance';
import { CredentialsManagerInput } from './CredentialsManager';
import { PracticeStartDateInput } from './PracticeStartDate';
import { SupervisorInput } from './SupervisorInput';

interface IdentitySectionProps {
    isTherapist: boolean;
    control: Control<ProviderProfile.ProviderProfile>;
    disabled?: boolean;
    licensedStates?: Region.StateAndCountry[];
    supervisor: ProviderProfile.ProviderProfile['supervisor'];
    setSupervisor: (
        supervisor: ProviderProfile.ProviderProfile['supervisor']
    ) => void;
}
export const CredentialsSection = ({
    isTherapist,
    control,
    disabled,
    supervisor,
    licensedStates = [],
    setSupervisor,
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
                {isTherapist && (
                    <>
                        <AcceptedInsuranceInput
                            control={control}
                            locationOptions={licensedStates}
                        />
                        <SupervisorInput
                            supervisor={supervisor}
                            setSupervisor={setSupervisor}
                            control={control}
                            disabled={disabled}
                        />
                    </>
                )}
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
