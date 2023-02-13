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
        rules={{
            required: {
                value: true,
                message: 'NPI Number is required',
            },
        }}
        render={({
            field: { onChange, onBlur, value, name },
            fieldState: { error, isTouched },
        }) => (
            <Input
                fullWidth
                required
                id="npiNumber"
                label="NPI Number"
                placeholder="Supervisor NPI Number"
                errorMessage={isTouched ? error?.message : undefined}
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
