import { Control, Controller } from 'react-hook-form';
import { Select, FormValidation } from '@/components/ui';
import { asSelectOptions } from '@/lib/utils';
import { Gender } from '@/lib/types';
import { ProviderProfile } from '@/lib/types/providerProfile';

interface GenderInputProps {
    control: Control<ProviderProfile>;
    defaultValue?: string;
    disabled?: boolean;
}
const OPTIONS = asSelectOptions(Gender.ENTRIES);

export const GenderInput = ({
    control,
    defaultValue,
    disabled,
}: GenderInputProps) => (
    <Controller
        control={control}
        name="gender"
        defaultValue={defaultValue as typeof Gender.ENTRIES[number]}
        rules={{
            required: true,
        }}
        render={({
            field: { onChange, onBlur, value, name },
            fieldState: { error, isTouched },
        }) => (
            <Select
                required
                fullWidth
                label="Gender"
                id="gender"
                errorMessage={
                    isTouched
                        ? FormValidation.getNameValidationErrorMessage(
                              error?.type as FormValidation.NameValidationType,
                              'Gender'
                          )
                        : undefined
                }
                value={value}
                {...{
                    options: OPTIONS,
                    onChange,
                    name,
                    onBlur,
                    disabled,
                }}
            />
        )}
    />
);
