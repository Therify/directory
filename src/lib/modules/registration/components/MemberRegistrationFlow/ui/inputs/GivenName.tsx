import { Control, Controller } from 'react-hook-form';
import { Input, FormValidation } from '@/lib/shared/components/ui';
import { RegisterMember } from '@/lib/modules/registration/features';
import { TEST_IDS } from './testIds';

interface GivenNameInputProps {
    control: Control<RegisterMember.Input>;
    defaultValue?: string;
}

export const GivenNameInput = ({
    control,
    defaultValue = '',
}: GivenNameInputProps) => (
    <Controller
        control={control}
        name="givenName"
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
                id="givenName"
                label="First Name"
                errorMessage={
                    isTouched
                        ? FormValidation.getNameValidationErrorMessage(
                              error?.type as FormValidation.NameValidationType,
                              'First Name'
                          )
                        : undefined
                }
                autoComplete="first-name"
                data-testid={TEST_IDS.FIRST_NAME}
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
