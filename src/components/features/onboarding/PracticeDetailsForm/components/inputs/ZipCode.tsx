import { Control, Controller } from 'react-hook-form';
import { Input, FormValidation } from '@/components/ui';
import { HandlePracticeOnboarding } from '@/lib/features/onboarding';

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
        }}
        render={({
            field: { onChange, onBlur, value, name },
            fieldState: { error, isTouched },
        }) => (
            <Input
                required
                fullWidth
                id="zip-code"
                placeholder="Zip Code *"
                type="tel"
                errorMessage={
                    isTouched
                        ? FormValidation.getNameValidationErrorMessage(
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
