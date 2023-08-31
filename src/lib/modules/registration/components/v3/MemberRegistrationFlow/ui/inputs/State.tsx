import { Control, Controller } from 'react-hook-form';
import { FormValidation, Select } from '@/lib/shared/components/ui';
import { RegisterMember } from '@/lib/modules/registration/features';
import { TEST_IDS } from './testIds';
import { CANADA, Country, UNITED_STATES } from '@/lib/shared/types';
import { asSelectOptions } from '@/lib/shared/utils';

interface StateInputProps {
    control: Control<RegisterMember.Input>;
    defaultValue?: string;
    country: Country.Country;
}

export const StateInput = ({
    control,
    defaultValue = UNITED_STATES.STATE.MAP.NEW_YORK,
    country,
}: StateInputProps) => {
    const regionName = country === CANADA.COUNTRY.CODE ? 'Province' : 'State';
    return (
        <Controller
            control={control}
            name="state"
            defaultValue={defaultValue}
            rules={{
                required: true,
                validate: {
                    isInCountry: (value) => {
                        try {
                            country === CANADA.COUNTRY.CODE
                                ? CANADA.PROVINCE.validate(value)
                                : UNITED_STATES.STATE.validate(value);
                            return true;
                        } catch (e) {
                            return false;
                        }
                    },
                },
            }}
            render={({
                field: { onChange, onBlur, value, name },
                fieldState: { error, isTouched },
            }) => (
                <Select
                    id="state"
                    data-testid={TEST_IDS.FIRST_NAME}
                    options={asSelectOptions(
                        country === CANADA.COUNTRY.CODE
                            ? CANADA.PROVINCE.ENTRIES
                            : UNITED_STATES.STATE.ENTRIES
                    )}
                    required
                    label={regionName}
                    placeholder={regionName}
                    sx={{
                        width: '100%',
                    }}
                    errorMessage={
                        isTouched
                            ? FormValidation.getStateValidationErrorMessage(
                                  error?.type as FormValidation.StateValidationType,
                                  regionName
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
};
