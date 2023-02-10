import { Control, Controller } from 'react-hook-form';
import { Select, FormValidation } from '@/components/ui';
import { asSelectOptions } from '@/lib/utils';
import { Gender } from '@/lib/types';
import { ProviderProfile } from '@/lib/types/providerProfile';

interface GenderInputProps {
    control: Control<ProviderProfile>;
    disabled?: boolean;
}
const OPTIONS = asSelectOptions(Gender.ENTRIES);

export const GenderInput = ({ control, disabled }: GenderInputProps) => (
    <Controller
        control={control}
        name="gender"
        rules={{
            required: true,
        }}
        defaultValue=""
        render={({
            field: { onChange, onBlur, value, name },
            fieldState: { error, isTouched },
        }) => (
            <Select
                required
                fullWidth
                label="Gender"
                id="gender"
                placeholder="Choose your gender"
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
