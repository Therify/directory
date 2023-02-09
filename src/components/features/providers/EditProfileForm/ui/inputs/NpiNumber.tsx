import { Control, Controller } from 'react-hook-form';
import { Input } from '@/components/ui';
import { ProviderProfile } from '@/lib/types/providerProfile';

interface NpiNumberInputProps {
    control: Control<ProviderProfile>;
    defaultValue?: string;
}

export const NpiNumberInput = ({
    control,
    defaultValue = '',
}: NpiNumberInputProps) => (
    <Controller
        control={control}
        name="npiNumber"
        defaultValue={defaultValue}
        rules={{
            required: true,
        }}
        render={({
            field: { onChange, onBlur, value, name },
            fieldState: { error, isTouched },
        }) => (
            <Input
                fullWidth
                id="npiNumber"
                label="NPI Number"
                // errorMessage={
                //     isTouched
                //         ? FormValidation.getNameValidationErrorMessage(
                //               error?.type as FormValidation.NameValidationType,
                //               'First Name'
                //           )
                //         : undefined
                // }
                {...{
                    onChange,
                    onBlur,
                    value,
                    name,
                }}
            />
        )}
    />
);
