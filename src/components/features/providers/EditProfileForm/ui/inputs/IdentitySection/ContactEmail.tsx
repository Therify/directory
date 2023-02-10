import { Controller, Control } from 'react-hook-form';
import { Input, FormValidation } from '@/components/ui';
import { ProviderProfile } from '@/lib/types/providerProfile';

interface ContactEmailInputProps {
    control: Control<ProviderProfile>;
    disabled?: boolean;
}

export const ContactEmailInput = ({
    control,
    disabled,
}: ContactEmailInputProps) => (
    <Controller
        control={control}
        name="contactEmail"
        rules={{
            required: true,
            validate: {
                [FormValidation.EmailValidationType.IsValid]:
                    FormValidation.isValidEmail,
            },
        }}
        defaultValue=""
        render={({
            field: { onChange, onBlur, value, name },
            fieldState: { error, isTouched },
        }) => {
            const errorType = error?.type as FormValidation.EmailValidationType;
            return (
                <Input
                    required
                    fullWidth
                    id="contactEmail"
                    label="Contact Email"
                    errorMessage={
                        isTouched
                            ? FormValidation.getEmailValidationErrorMessage(
                                  errorType
                              )
                            : undefined
                    }
                    autoComplete="email"
                    type="email"
                    disabled={disabled}
                    helperText="This email will receive referral information, but will not be publically listed on your profile."
                    {...{
                        onChange,
                        onBlur,
                        value,
                        name,
                    }}
                />
            );
        }}
    />
);
