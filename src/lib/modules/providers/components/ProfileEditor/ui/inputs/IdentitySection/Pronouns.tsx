import { Control, Controller } from 'react-hook-form';
import { Select, FormValidation } from '@/lib/shared/components/ui';
import { asSelectOptions } from '@/lib/shared/utils';
import { Pronoun, ProviderProfile } from '@/lib/shared/types';

interface PronounsInputProps {
    control: Control<ProviderProfile.ProviderProfile>;
    disabled?: boolean;
}
const PRONOUNS_OPTIONS = asSelectOptions(Pronoun.ENTRIES);

export const PronounsInput = ({ control, disabled }: PronounsInputProps) => (
    <Controller
        control={control}
        name="pronouns"
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
                label="Pronouns"
                id="pronouns"
                placeholder="Choose your pronouns"
                errorMessage={
                    isTouched
                        ? FormValidation.getNameValidationErrorMessage(
                              error?.type as FormValidation.NameValidationType,
                              'Pronouns'
                          )
                        : undefined
                }
                value={value}
                {...{
                    options: PRONOUNS_OPTIONS,
                    onChange,
                    name,
                    onBlur,
                    disabled,
                }}
            />
        )}
    />
);
