import { Control, Controller } from 'react-hook-form';
import { Select, FormValidation } from '@/components/ui';
import { asSelectOptions } from '@/lib/utils';
import { Pronoun } from '@/lib/types';
import { ProviderProfile } from '@/lib/types/providerProfile';

interface PronounsInputProps {
    control: Control<ProviderProfile>;
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
