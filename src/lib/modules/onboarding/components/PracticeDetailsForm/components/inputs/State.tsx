import { Control, Controller } from 'react-hook-form';
import { Select, FormValidation } from '@/lib/shared/components/ui';
import { HandlePracticeOnboarding } from '@/lib/modules/onboarding/features';
import { asSelectOptions } from '@/lib/shared/utils';
import { UNITED_STATES, CANADA } from '@/lib/shared/types';

interface StateInputProps {
    control: Control<HandlePracticeOnboarding.Input>;
    defaultValue?: HandlePracticeOnboarding.Input['state'];
    onInputBlur: () => void;
    disabled?: boolean;
    country: HandlePracticeOnboarding.Input['country'];
}

export const StateInput = ({
    control,
    defaultValue,
    onInputBlur,
    disabled,
    country,
}: StateInputProps) => (
    <Controller
        control={control}
        name="state"
        defaultValue={defaultValue}
        rules={{
            required: true,
            validate: {
                isInCountry: (value) => {
                    const validator =
                        country === CANADA.COUNTRY.CODE
                            ? CANADA.PROVINCE.validate
                            : UNITED_STATES.STATE.validate;
                    return safeValidateState(value, validator);
                },
            },
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
                        ? error?.type === 'isInCountry'
                            ? `Please select a valid ${
                                  country === CANADA.COUNTRY.CODE
                                      ? 'province'
                                      : 'state'
                              }.`
                            : FormValidation.getNameValidationErrorMessage(
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
                options={asSelectOptions(
                    country === UNITED_STATES.COUNTRY.CODE
                        ? UNITED_STATES.STATE.ENTRIES
                        : CANADA.PROVINCE.ENTRIES
                )}
                {...{
                    onChange,
                    name,
                    disabled,
                }}
            />
        )}
    />
);

const safeValidateState = (
    state: string,
    validator: (input: unknown) => any
) => {
    try {
        validator(state);
        return true;
    } catch (_) {
        return false;
    }
};
