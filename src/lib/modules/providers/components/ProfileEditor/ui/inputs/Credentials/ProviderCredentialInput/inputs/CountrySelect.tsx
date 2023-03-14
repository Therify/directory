import { Control, Controller } from 'react-hook-form';
import { Select } from '@/lib/shared/components/ui';
import { ProviderCredential, Country } from '@/lib/shared/types';
import { asSelectOptions } from '@/lib/shared/utils';

interface CountryInputProps {
    control: Control<ProviderCredential.ProviderCredential>;
    defaultValue?: (typeof Country.ENTRIES)[number];
    disabled?: boolean;
}
const options = asSelectOptions(Country.ENTRIES);

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
