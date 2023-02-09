import { Control, Controller } from 'react-hook-form';
import { Input, FormValidation } from '@/components/ui';
import { ProviderProfile } from '@/lib/types/providerProfile';

interface EducationInputProps {
    control: Control<ProviderProfile>;
    defaultValue?: string;
}

export const EducationInput = ({
    control,
    defaultValue = '',
}: EducationInputProps) => (
    <Controller
        control={control}
        name="surname"
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
                id="education"
                label="Education"
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
