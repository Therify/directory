import { Control, Controller } from 'react-hook-form';
import { Ethnicity } from '@/lib/types';
import { Autocomplete, TextField } from '@mui/material';
import { ProviderProfile } from '@/lib/types/providerProfile';

type Ethnicities = typeof Ethnicity.ENTRIES[number];

interface EthnicitiesInputProps {
    control: Control<ProviderProfile>;
    defaultValue?: string[];
    disabled?: boolean;
}

export const EthnicitiesInput = ({
    control,
    defaultValue,
    disabled,
}: EthnicitiesInputProps) => (
    <Controller
        control={control}
        name="specialties"
        defaultValue={defaultValue as Ethnicities[]}
        rules={{
            required: true,
        }}
        render={({ field: { onChange, onBlur, value, name } }) => (
            <Autocomplete
                multiple
                options={Ethnicity.ENTRIES}
                {...{
                    onChange,
                    onBlur,
                    name,
                    disabled,
                    value,
                }}
                renderInput={(params) => (
                    <TextField {...params} label="Your Ethnicity" />
                )}
            />
        )}
    />
);
