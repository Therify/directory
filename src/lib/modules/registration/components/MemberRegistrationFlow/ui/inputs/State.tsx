import { Control, Controller } from 'react-hook-form';
import { Input, FormValidation } from '@/lib/shared/components/ui';
import { RegisterMember } from '@/lib/modules/registration/features';
import { TEST_IDS } from './testIds';

interface StateInputProps {
    control: Control<RegisterMember.Input>;
    defaultValue?: string;
}

export const StateInput = ({ control, defaultValue = '' }: StateInputProps) => (
    <Controller
        control={control}
        name="state"
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
                id="state"
                label="State"
                errorMessage={
                    isTouched
                        ? FormValidation.getStateValidationErrorMessage(
                              error?.type as FormValidation.StateValidationType,
                              'State'
                          )
                        : undefined
                }
                autoComplete="state"
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
