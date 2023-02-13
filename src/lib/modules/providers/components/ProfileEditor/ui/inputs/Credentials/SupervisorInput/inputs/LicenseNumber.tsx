import { Control, Controller } from 'react-hook-form';
import { Input } from '@/lib/shared/components/ui';
import { ProviderProfile, ProviderSupervisor } from '@/lib/shared/types';

interface InputProps {
    control: Control<ProviderProfile.ProviderProfile>;
    defaultValue?: string;
    disabled?: boolean;
    storeLocalData: (
        key:
            | keyof ProviderSupervisor.ProviderSupervisor
            | keyof ProviderSupervisor.ProviderSupervisor['supervisorLicense'],
        value: string
    ) => void;
}

export const LicenseNumberInput = ({
    control,
    defaultValue = '',
    disabled,
    storeLocalData,
}: InputProps) => (
    <Controller
        control={control}
        name="supervisor.supervisorLicense.licenseNumber"
        defaultValue={defaultValue}
        rules={{
            required: {
                value: true,
                message: 'Supervisor License Number is required',
            },
        }}
        render={({
            field: { onChange, onBlur, value, name },
            fieldState: { error, isTouched },
        }) => (
            <Input
                required
                label="License Number"
                fullWidth
                id="licenseNumber"
                placeholder="Supervisor License Number"
                errorMessage={isTouched ? error?.message : undefined}
                onChange={(e) => {
                    onChange(e);
                    storeLocalData('licenseNumber', e.target.value);
                }}
                {...{
                    disabled,
                    onBlur,
                    value,
                    name,
                }}
            />
        )}
    />
);
