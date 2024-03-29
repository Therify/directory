import { Control, Controller } from 'react-hook-form';
import { Input, FormValidation } from '@/lib/shared/components/ui';
import { HandlePracticeOnboarding } from '@/lib/modules/onboarding/features';

interface PracticeNameInputProps {
    control: Control<HandlePracticeOnboarding.Input>;
    defaultValue?: string;
    onInputBlur: () => void;
    disabled?: boolean;
}

export const PracticeNameInput = ({
    control,
    defaultValue = '',
    onInputBlur,
    disabled,
}: PracticeNameInputProps) => (
    <Controller
        control={control}
        name="name"
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
                autoComplete="off"
                id="name"
                label="Practice Name"
                errorMessage={
                    isTouched
                        ? FormValidation.getNameValidationErrorMessage(
                              error?.type as FormValidation.NameValidationType,
                              'Practice Name'
                          )
                        : undefined
                }
                helperText="If you are an individual, you can use your name."
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
