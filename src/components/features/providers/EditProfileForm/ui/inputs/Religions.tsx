import { Control, Controller } from 'react-hook-form';
import { Religion } from '@/lib/types';
import { Autocomplete, TextField } from '@mui/material';
import { ProviderProfile } from '@/lib/types/providerProfile';

type Religions = typeof Religion.ENTRIES[number];

interface ReligionsInputProps {
    control: Control<ProviderProfile>;
    defaultValue?: string[];
    disabled?: boolean;
}

export const ReligionsInput = ({
    control,
    defaultValue,
    disabled,
}: ReligionsInputProps) => (
    <Controller
        control={control}
        name="specialties"
        defaultValue={defaultValue as Religions[]}
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
                    <TextField {...params} label="Religions" />
                )}
            />
        )}
    />
);
