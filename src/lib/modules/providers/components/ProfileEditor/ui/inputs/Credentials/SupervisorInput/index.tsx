import { Switch, FormSectionSubtitle } from '@/lib/shared/components/ui';
import { ProviderProfile, ProviderSupervisor, State } from '@/lib/shared/types';
import { Box } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import { useEffect, useState } from 'react';
import { Control } from 'react-hook-form';
import { SupervisorForm } from './SupervisorForm';

interface SupervisorManagerProps {
    disabled?: boolean;
    control: Control<ProviderProfile.ProviderProfile>;
    setSupervisor: (
        supervisor: ProviderProfile.ProviderProfile['supervisor']
    ) => void;
}
const DEFAULT_SUPERVISOR: ProviderProfile.ProviderProfile['supervisor'] = {
    name: '',
    npiNumber: '',
    supervisorLicense: {
        expiration: '',
        licenseNumber: '',
        state: State.ENTRIES[0],
    },
} as const;

export const SupervisorInput = ({
    disabled,
    control,
    setSupervisor,
}: SupervisorManagerProps) => {
    const theme = useTheme();
    const [isSupervised, setIsSupervised] = useState(false);
    const [localSupervisor, setLocalSupervisor] =
        useState<ProviderSupervisor.ProviderSupervisor>(DEFAULT_SUPERVISOR);

    // This allows the supervisor form to be re-hydrated with supervisor data
    // when a user fills out the supervisor section, unchecks the switch (setting the profile supervisor value to `null`),
    // and then rechecks the switch.
    const storeLocalData = (
        key:
            | keyof ProviderSupervisor.ProviderSupervisor
            | keyof ProviderSupervisor.ProviderSupervisor['supervisorLicense'],
        value: string
    ) => {
        if (['npiNumber', 'name', 'supervisorLicense'].includes(key)) {
            return setLocalSupervisor({
                ...localSupervisor,
                [key]: value,
            });
        }
        return setLocalSupervisor({
            ...localSupervisor,
            supervisorLicense: {
                ...localSupervisor.supervisorLicense,
                [key]: value,
            },
        });
    };

    useEffect(() => {
        if (isSupervised) {
            setSupervisor(localSupervisor);
        } else {
            setSupervisor(null);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [isSupervised]);

    return (
        <Box>
            <FormSectionSubtitle>Supervision</FormSectionSubtitle>
            <Switch
                disabled={disabled}
                displayText="Are you supervised?"
                checked={isSupervised}
                onChange={() => {
                    setIsSupervised(!isSupervised);
                }}
                style={{ marginBottom: theme.spacing(4) }}
            />
            {isSupervised && (
                <SupervisorForm
                    disabled={disabled}
                    control={control}
                    storeLocalData={storeLocalData}
                />
            )}
        </Box>
    );
};
