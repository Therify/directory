import { Control, Controller } from 'react-hook-form';
import { Input, FormValidation } from '@/lib/shared/components/ui';
import { HandleAccountOnboarding } from '@/lib/modules/onboarding/features';

interface AccountNameInputProps {
    control: Control<HandleAccountOnboarding.Input>;
    defaultValue?: string;
    onInputBlur: () => void;
    disabled?: boolean;
}

export const AccountNameInput = ({
    control,
    defaultValue = '',
    onInputBlur,
    disabled,
}: AccountNameInputProps) => (
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
                label="Account Name"
                errorMessage={
                    isTouched
                        ? FormValidation.getNameValidationErrorMessage(
                              error?.type as FormValidation.NameValidationType,
                              'Account Name'
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
