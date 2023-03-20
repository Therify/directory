import { Control, Controller } from 'react-hook-form';
import { Select, SelectOption } from '@/lib/shared/components/ui';
import {
    ProviderCredential,
    Country,
    CANADA,
    UNITED_STATES,
} from '@/lib/shared/types';

interface CountryInputProps {
    control: Control<ProviderCredential.ProviderCredential>;
    defaultValue?: (typeof Country.ENTRIES)[number];
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
    defaultValue = Country.MAP.UNITED_STATES,
    disabled,
}: CountryInputProps) => (
    <Controller
        control={control}
        name="country"
        defaultValue={defaultValue}
        rules={{
            required: true,
        }}
        render={({ field: { onChange, onBlur, value, name } }) => (
            <Select
                id="country"
                label="Country"
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
