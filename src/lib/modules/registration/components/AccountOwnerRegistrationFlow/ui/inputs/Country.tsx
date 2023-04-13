import { Control, Controller } from 'react-hook-form';
import { FormValidation, Select } from '@/lib/shared/components/ui';
import { RegisterAccountOwner } from '@/lib/modules/registration/features';
import { UNITED_STATES, CANADA, Country } from '@/lib/shared/types';

interface InputProps {
    control: Control<RegisterAccountOwner.Input>;
    defaultValue?: Country.Country;
}

export const CountryInput = ({
    control,
    defaultValue = UNITED_STATES.COUNTRY.CODE,
}: InputProps) => (
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
                id="country"
                options={[
                    {
                        value: UNITED_STATES.COUNTRY.CODE,
                        displayText: UNITED_STATES.COUNTRY.NAME,
                    },
                    {
                        value: CANADA.COUNTRY.CODE,
                        displayText: CANADA.COUNTRY.NAME,
                    },
                ]}
                required
                label="Country"
                sx={{
                    width: '100%',
                }}
                errorMessage={
                    isTouched
                        ? FormValidation.getStateValidationErrorMessage(
                              error?.type as FormValidation.StateValidationType,
                              'Country'
                          )
                        : undefined
                }
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
