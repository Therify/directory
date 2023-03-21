import { Control, Controller } from 'react-hook-form';

import { Select, SelectOption } from '@/lib/shared/components/ui';
import {
    CANADA,
    Country,
    ProviderCredential,
    UNITED_STATES,
} from '@/lib/shared/types';
import { asSelectOptions } from '@/lib/shared/utils';

interface StateInputProps {
    control: Control<ProviderCredential.ProviderCredential>;
    defaultValue?: ProviderCredential.ProviderCredential['state'];
    disabled?: boolean;
    country: Country.Country;
}

export const StateInput = ({
    control,
    defaultValue,
    disabled,
    country,
}: StateInputProps) => {
    const options = asSelectOptions(getCountryStates(country));
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
            render={({ field: { onChange, onBlur, value, name } }) => (
                <Select
                    id="state"
                    label={`Issuing ${regionName}`}
                    placeholder={regionName}
                    fullWidth
                    value={value}
                    {...{
                        onBlur,
                        options,
                        onChange,
                        name,
                        disabled,
                    }}
                />
            )}
        />
    );
};

const getCountryStates = (country: Country.Country) => {
    switch (country) {
        case UNITED_STATES.COUNTRY.CODE:
            return UNITED_STATES.STATE.ENTRIES;
        case CANADA.COUNTRY.CODE:
            return CANADA.PROVINCE.ENTRIES;
        default:
            return [];
    }
};
