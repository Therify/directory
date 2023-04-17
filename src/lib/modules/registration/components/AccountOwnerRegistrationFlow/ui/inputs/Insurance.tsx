import { Control, Controller } from 'react-hook-form';
import { Input, FormValidation, Select } from '@/lib/shared/components/ui';
import { RegisterAccountOwner } from '@/lib/modules/registration/features';
import { TEST_IDS } from './testIds';
import { asSelectOptions } from '@/lib/shared/utils';
import { InsuranceProvider } from '@/lib/shared/types';

interface InsuranceInputProps {
    control: Control<RegisterAccountOwner.Input>;
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
            <Select
                required
                id="insurance"
                label="Insurance"
                options={asSelectOptions([...InsuranceProvider.ENTRIES]).map(
                    (option) =>
                        option.value === "I don't have insurance"
                            ? {
                                  ...option,
                                  displayText:
                                      "I don't have or wont use insurance",
                              }
                            : option
                )}
                sx={{
                    width: '100%',
                }}
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
