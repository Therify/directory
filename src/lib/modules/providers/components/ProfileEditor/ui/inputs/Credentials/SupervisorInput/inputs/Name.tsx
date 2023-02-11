import { Control, Controller } from 'react-hook-form';
import { Input, FormValidation } from '@/lib/shared/components/ui';
import { ProviderProfile, ProviderSupervisor } from '@/lib/shared/types';

interface InputProps {
    control: Control<ProviderProfile.ProviderProfile>;
    disabled?: boolean;
    storeLocalData: (
        key:
            | keyof ProviderSupervisor.ProviderSupervisor
            | keyof ProviderSupervisor.ProviderSupervisor['supervisorLicense'],
        value: string
    ) => void;
}

export const NameInput = ({
    control,
    disabled,
    storeLocalData,
}: InputProps) => (
    <Controller
        control={control}
        name="supervisor.name"
        defaultValue=""
        rules={{
            required: true,
        }}
        render={({
            field: { onChange, onBlur, value, name },
            fieldState: { error, isTouched },
        }) => (
            <Input
                required
                fullWidth
                id="name"
                label="Name"
                placeholder="Supervisor Name"
                errorMessage={
                    isTouched
                        ? FormValidation.getNameValidationErrorMessage(
                              error?.type as FormValidation.NameValidationType,
                              'Name'
                          )
                        : undefined
                }
                onChange={(e) => {
                    onChange(e);
                    storeLocalData('name', e.target.value);
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
