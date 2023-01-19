import { Control, Controller } from 'react-hook-form';
import { Input, FormValidation } from '@/components/ui';
import { HandlePracticeOnboarding } from '@/lib/features/onboarding';

interface PracticeNameInputProps {
    control: Control<HandlePracticeOnboarding.Input>;
    defaultValue?: string;
    onInputBlur: () => void;
}

export const PracticeNameInput = ({
    control,
    defaultValue = '',
    onInputBlur,
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
                    onChange,
                    value,
                    name,
                }}
            />
        )}
    />
);
