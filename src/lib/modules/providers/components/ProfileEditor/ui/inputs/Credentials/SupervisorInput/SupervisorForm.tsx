import { Control } from 'react-hook-form';
import { styled } from '@mui/material/styles';
import { Box } from '@mui/material';
import { Divider, FormSectionSubtitle } from '@/lib/shared/components/ui';
import { ProviderProfile, ProviderSupervisor } from '@/lib/shared/types';
import {
    NameInput,
    NpiNumberInput,
    ExpirationDateInput,
    StateInput,
    LicenseNumberInput,
} from './inputs';

interface SupervisorFormProps {
    control: Control<ProviderProfile.ProviderProfile>;
    disabled?: boolean;
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
            <LicenseNumberInput
                control={control}
                disabled={disabled}
                storeLocalData={storeLocalData}
            />
            <TwoInputContainer>
                <ExpirationDateInput
                    control={control}
                    disabled={disabled}
                    storeLocalData={storeLocalData}
                />
                <StateInput
                    control={control}
                    disabled={disabled}
                    storeLocalData={storeLocalData}
                />
            </TwoInputContainer>
            <NpiNumberInput
                control={control}
                disabled={disabled}
                storeLocalData={storeLocalData}
            />
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
