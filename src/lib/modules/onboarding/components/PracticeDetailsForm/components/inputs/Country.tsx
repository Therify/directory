import { Control, Controller } from 'react-hook-form';
import {
    Select,
    FormValidation,
    SelectOption,
} from '@/lib/shared/components/ui';
import { HandlePracticeOnboarding } from '@/lib/modules/onboarding/features';
import { UNITED_STATES, CANADA } from '@/lib/shared/types';

interface CountryInputProps {
    control: Control<HandlePracticeOnboarding.Input>;
    defaultValue?: HandlePracticeOnboarding.Input['country'];
    onInputBlur: () => void;
    disabled?: boolean;
}

const options: SelectOption[] = [
    {
        value: CANADA.COUNTRY.CODE,
        displayText: CANADA.COUNTRY.NAME,
    },
    {
        value: UNITED_STATES.COUNTRY.CODE,
        displayText: UNITED_STATES.COUNTRY.NAME,
    },
];

export const CountryInput = ({
    control,
    defaultValue = UNITED_STATES.COUNTRY.CODE,
    onInputBlur,
    disabled,
}: CountryInputProps) => (
    <Controller
        control={control}
        name="country"
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
                autoComplete="off"
                fullWidth
                id="country"
                placeholder="Country"
                errorMessage={
                    isTouched
                        ? FormValidation.getNameValidationErrorMessage(
                              error?.type as FormValidation.NameValidationType,
                              'Country'
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
