import { Control, Controller } from 'react-hook-form';
import { Input, FormValidation } from '@/lib/shared/components/ui';
import { HandlePracticeOnboarding } from '@/lib/modules/onboarding/features';

interface ZipCodeInputProps {
    control: Control<HandlePracticeOnboarding.Input>;
    defaultValue?: string;
    onInputBlur: () => void;
    disabled?: boolean;
}

export const ZipCodeInput = ({
    control,
    defaultValue = '',
    onInputBlur,
    disabled,
}: ZipCodeInputProps) => (
    <Controller
        control={control}
        name="zip"
        defaultValue={defaultValue}
        rules={{
            required: true,
            minLength: {
                value: 5,
                message: 'Zip Code must be 5 characters',
            },
            maxLength: {
                value: 5,
                message: 'Zip Code must be 5 characters',
            },
        }}
        render={({
            field: { onChange, onBlur, value, name },
            fieldState: { error, isTouched },
        }) => (
            <Input
                required
                id="zip-code"
                placeholder="Zip Code *"
                type="tel"
                errorMessage={
                    isTouched
                        ? error?.message ??
                          FormValidation.getNameValidationErrorMessage(
                              error?.type as FormValidation.NameValidationType,
                              'Zip Code'
                          )
                        : undefined
                }
                onBlur={() => {
                    onBlur();
                    onInputBlur();
                }}
                {...{
                    disabled,
                    onChange,
                    value,
                    name,
                }}
            />
        )}
    />
);
