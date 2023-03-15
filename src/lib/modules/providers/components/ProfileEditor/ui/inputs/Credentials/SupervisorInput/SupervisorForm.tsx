import { Control } from 'react-hook-form';
import { styled } from '@mui/material/styles';
import { Box } from '@mui/material';
import { Divider, FormSectionSubtitle } from '@/lib/shared/components/ui';
import {
    ProviderProfile,
    ProviderSupervisor,
    UNITED_STATES,
} from '@/lib/shared/types';
import {
    NameInput,
    NpiNumberInput,
    ExpirationDateInput,
    StateInput,
    LicenseNumberInput,
    CountryInput,
} from './inputs';

interface SupervisorFormProps {
    control: Control<ProviderProfile.ProviderProfile>;
    disabled?: boolean;
    supervisor: ProviderProfile.ProviderProfile['supervisor'];
    storeLocalData: (
        key:
            | keyof ProviderSupervisor.ProviderSupervisor
            | keyof ProviderSupervisor.ProviderSupervisor['supervisorLicense'],
        value: string
    ) => void;
}

export const SupervisorForm = ({
    disabled,
    control,
    supervisor,
    storeLocalData,
}: SupervisorFormProps) => (
    <Box width="100%">
        <Divider />
        <FormSectionSubtitle>Supervisor Details</FormSectionSubtitle>
        <Box width="100%">
            <NameInput
                control={control}
                disabled={disabled}
                storeLocalData={storeLocalData}
            />
            <NpiNumberInput
                control={control}
                disabled={disabled}
                storeLocalData={storeLocalData}
            />
            <LicenseNumberInput
                control={control}
                disabled={disabled}
                storeLocalData={storeLocalData}
            />
            <ExpirationDateInput
                control={control}
                disabled={disabled}
                storeLocalData={storeLocalData}
            />
            <TwoInputContainer>
                <StateInput
                    control={control}
                    disabled={disabled}
                    storeLocalData={storeLocalData}
                    country={
                        supervisor?.supervisorLicense.country ??
                        UNITED_STATES.COUNTRY.CODE
                    }
                />
                <CountryInput
                    control={control}
                    disabled={disabled}
                    storeLocalData={storeLocalData}
                />
            </TwoInputContainer>
        </Box>
    </Box>
);

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
