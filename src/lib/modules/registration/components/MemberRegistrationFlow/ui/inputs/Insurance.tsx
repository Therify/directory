import { Control, Controller } from 'react-hook-form';
import { Input, FormValidation } from '@/lib/shared/components/ui';
import { RegisterMember } from '@/lib/modules/registration/features';
import { TEST_IDS } from './testIds';

interface InsuranceInputProps {
    control: Control<RegisterMember.Input>;
    defaultValue?: string;
}

export const InsuranceInput = ({
    control,
    defaultValue = '',
}: InsuranceInputProps) => (
    <Controller
        control={control}
        name="insurance"
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
                id="insurance"
                label="Insurance"
                errorMessage={
                    isTouched
                        ? FormValidation.getInsuranceValidationErrorMessage(
                              error?.type as FormValidation.InsuranceValidationType,
                              'Insurance'
                          )
                        : undefined
                }
                autoComplete="insurance"
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
