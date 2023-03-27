import { Control, Controller } from 'react-hook-form';
import { Select } from '@/lib/shared/components/ui';
import {
    CANADA,
    Country,
    ProviderProfile,
    ProviderSupervisor,
    UNITED_STATES,
} from '@/lib/shared/types';
import { asSelectOptions } from '@/lib/shared/utils';

interface StateInputProps {
    control: Control<ProviderProfile.ProviderProfile>;
    defaultValue?: typeof UNITED_STATES.STATE.ENTRIES[number];
    disabled?: boolean;
    country: Country.Country | null;
    storeLocalData: (
        key:
            | keyof ProviderSupervisor.ProviderSupervisor
            | keyof ProviderSupervisor.ProviderSupervisor['supervisorLicense'],
        value: string
    ) => void;
}
const options = asSelectOptions(UNITED_STATES.STATE.ENTRIES);

export const StateInput = ({
    control,
    defaultValue,
    disabled,
    storeLocalData,
    country,
}: StateInputProps) => {
    const regionName = country === CANADA.COUNTRY.CODE ? 'Province' : 'State';
    return (
        <Controller
            control={control}
            name="supervisor.supervisorLicense.state"
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
            render={({ field: { onChange, onBlur, value, name } }) => (
                <Select
                    required
                    id="state"
                    label={`Issuing ${regionName}`}
                    placeholder={regionName}
                    fullWidth
                    value={value}
                    onChange={(state) => {
                        onChange(state);
                        storeLocalData('state', state);
                    }}
                    options={asSelectOptions(
                        country === CANADA.COUNTRY.CODE
                            ? CANADA.PROVINCE.ENTRIES
                            : UNITED_STATES.STATE.ENTRIES
                    )}
                    {...{
                        onBlur,
                        name,
                        disabled,
                    }}
                />
            )}
        />
    );
};

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
