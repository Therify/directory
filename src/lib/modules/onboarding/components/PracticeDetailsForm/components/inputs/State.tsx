import { Control, Controller } from 'react-hook-form';
import {
    Select,
    SelectOption,
    FormValidation,
} from '@/lib/shared/components/ui';
import { HandlePracticeOnboarding } from '@/lib/modules/onboarding/features';
import { asSelectOptions } from '@/lib/shared/utils';
import { State } from '@/lib/shared/types';

interface StateInputProps {
    control: Control<HandlePracticeOnboarding.Input>;
    defaultValue?: string;
    onInputBlur: () => void;
    disabled?: boolean;
}
const options: SelectOption[] = asSelectOptions(State.ENTRIES);

export const StateInput = ({
    control,
    defaultValue = State.MAP.NEW_YORK,
    onInputBlur,
    disabled,
}: StateInputProps) => (
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
                required
                fullWidth
                id="state"
                placeholder="State"
                errorMessage={
                    isTouched
                        ? FormValidation.getNameValidationErrorMessage(
                              error?.type as FormValidation.NameValidationType,
                              'State'
                          )
                        : undefined
                }
                value={value}
                onBlur={() => {
                    onBlur();
                    onInputBlur();
                }}
                {...{
                    options,
                    onChange,
                    name,
                    disabled,
                }}
            />
        )}
    />
);
