import { Control, Controller } from 'react-hook-form';
import { Input } from '@/lib/shared/components/ui';
import { ProviderProfile, ProviderSupervisor } from '@/lib/shared/types';

interface NpiNumberInputProps {
    control: Control<ProviderProfile.ProviderProfile>;
    disabled?: boolean;
    storeLocalData: (
        key:
            | keyof ProviderSupervisor.ProviderSupervisor
            | keyof ProviderSupervisor.ProviderSupervisor['supervisorLicense'],
        value: string
    ) => void;
}

export const NpiNumberInput = ({
    control,
    disabled,
    storeLocalData,
}: NpiNumberInputProps) => (
    <Controller
        control={control}
        name="supervisor.npiNumber"
        defaultValue=""
        render={({ field: { onChange, onBlur, value, name } }) => (
            <Input
                fullWidth
                id="npiNumber"
                label="NPI Number"
                placeholder="Supervisor NPI Number"
                onChange={(e) => {
                    onChange(e);
                    storeLocalData('npiNumber', e.target.value);
                }}
                {...{
                    onBlur,
                    value,
                    name,
                    disabled,
                }}
            />
        )}
    />
);
