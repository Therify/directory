import { Control, Controller } from 'react-hook-form';
import { Input, FormValidation } from '@/lib/shared/components/ui';
import { RegisterMember } from '@/lib/modules/registration/features';
import { TEST_IDS } from './testIds';

interface SurnameInputProps {
    control: Control<RegisterMember.Input>;
    defaultValue?: string;
}

export const SurnameInput = ({
    control,
    defaultValue = '',
}: SurnameInputProps) => (
    <Controller
        control={control}
        name="surname"
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
                id="surname"
                label="Last Name"
                errorMessage={
                    isTouched
                        ? FormValidation.getNameValidationErrorMessage(
                              error?.type as FormValidation.NameValidationType,
                              'Last Name'
                          )
                        : undefined
                }
                autoComplete="last-name"
                data-testid={TEST_IDS.LAST_NAME}
                {...{
                    onChange,
                    onBlur,
                    value,
                    name,
                }}
            />
        )}
    />
);
