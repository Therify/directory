import { Control, Controller } from 'react-hook-form';
import { Input, FormValidation, Select } from '@/lib/shared/components/ui';
import { RegisterMember } from '@/lib/modules/registration/features';
import { TEST_IDS } from './testIds';
import { Autocomplete } from '@mui/material';
import { State } from '@/lib/shared/types';
import { asSelectOptions } from '@/lib/shared/utils';

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
            <Select
                id="state"
                data-testid={TEST_IDS.FIRST_NAME}
                options={asSelectOptions(['New York'])}
                required
                label="State"
                sx={{
                    width: '100%',
                }}
                errorMessage={
                    isTouched
                        ? FormValidation.getStateValidationErrorMessage(
                              error?.type as FormValidation.StateValidationType,
                              'State'
                          )
                        : undefined
                }
                autoComplete="state"
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
