import { Switch, FormSectionSubtitle } from '@/lib/shared/components/ui';
import {
    ProviderProfile,
    ProviderSupervisor,
    UNITED_STATES,
} from '@/lib/shared/types';
import { Box } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import { useEffect, useState } from 'react';
import { Control } from 'react-hook-form';
import { SupervisorForm } from './SupervisorForm';

interface SupervisorManagerProps {
    disabled?: boolean;
    control: Control<ProviderProfile.ProviderProfile>;
    supervisor: ProviderProfile.ProviderProfile['supervisor'];
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
        state: UNITED_STATES.STATE.ENTRIES[0],
        country: UNITED_STATES.COUNTRY.CODE,
    },
} as const;

export const SupervisorInput = ({
    disabled,
    control,
    supervisor,
    setSupervisor,
}: SupervisorManagerProps) => {
    const theme = useTheme();
    const [isSupervised, setIsSupervised] = useState(!!supervisor);
    const [localSupervisor, setLocalSupervisor] =
        useState<ProviderSupervisor.ProviderSupervisor>(
            supervisor ?? DEFAULT_SUPERVISOR
        );

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
            {/* // TODO: this components logs an error about uncontrolled inputs becoming controlled */}
            {isSupervised && (
                <SupervisorForm
                    disabled={disabled}
                    control={control}
                    storeLocalData={storeLocalData}
                    supervisor={supervisor}
                />
            )}
        </Box>
    );
};
