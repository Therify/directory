import { Control, Controller } from 'react-hook-form';
import { Religion } from '@/lib/types';
import { Autocomplete, TextField } from '@mui/material';
import { ProviderProfile } from '@/lib/types/providerProfile';

type CommunitiesServed = typeof Religion.ENTRIES[number];

interface CommunitiesServedInputProps {
    control: Control<ProviderProfile>;
    defaultValue?: string[];
    disabled?: boolean;
}

export const CommunitiesServedInput = ({
    control,
    defaultValue,
    disabled,
}: CommunitiesServedInputProps) => (
    <Controller
        control={control}
        name="specialties"
        defaultValue={defaultValue as CommunitiesServed[]}
        rules={{
            required: true,
        }}
        render={({ field: { onChange, onBlur, value, name } }) => (
            <Autocomplete
                multiple
                options={Religion.ENTRIES}
                {...{
                    onChange,
                    onBlur,
                    name,
                    disabled,
                    value,
                }}
                renderInput={(params) => (
                    <TextField {...params} label="Communities Served" />
                )}
            />
        )}
    />
);
