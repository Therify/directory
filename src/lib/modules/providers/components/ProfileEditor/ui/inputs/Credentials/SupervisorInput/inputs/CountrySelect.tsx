import { Control, Controller } from 'react-hook-form';
import { Select, SelectOption } from '@/lib/shared/components/ui';
import {
    ProviderCredential,
    Country,
    UNITED_STATES,
    CANADA,
    ProviderProfile,
    ProviderSupervisor,
} from '@/lib/shared/types';

interface CountryInputProps {
    control: Control<ProviderProfile.ProviderProfile>;
    defaultValue?: Country.Country;
    disabled?: boolean;
    storeLocalData: (
        key: keyof ProviderSupervisor.ProviderSupervisor['supervisorLicense'],
        value: string
    ) => void;
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
    defaultValue = Country.MAP.UNITED_STATES,
    disabled,
}: CountryInputProps) => (
    <Controller
        control={control}
        name="supervisor.supervisorLicense.country"
        defaultValue={defaultValue}
        rules={{
            required: true,
        }}
        render={({ field: { onChange, onBlur, value, name } }) => (
            <Select
                id="country"
                label="Issuing Country"
                placeholder="Country"
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
