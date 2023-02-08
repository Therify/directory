import { Control, Controller } from 'react-hook-form';
import { Language } from '@/lib/types';
import { Autocomplete, TextField } from '@mui/material';
import { ProviderProfile } from '@/lib/types/providerProfile';

type LanguagesSpoken = typeof Language.ENTRIES[number];

interface LanguagesInputProps {
    control: Control<ProviderProfile>;
    defaultValue?: string[];
    disabled?: boolean;
}

export const LanguagesSpokenInput = ({
    control,
    defaultValue = [],
    disabled,
}: LanguagesInputProps) => (
    <Controller
        control={control}
        name="languagesSpoken"
        defaultValue={defaultValue as LanguagesSpoken[]}
        rules={{
            required: true,
        }}
        render={({ field: { onChange, onBlur, value, name } }) => (
            <Autocomplete
                multiple
                options={Language.ENTRIES}
                onChange={(_, value) => onChange(value)}
                {...{
                    onBlur,
                    name,
                    disabled,
                    value,
                }}
                renderInput={(params) => (
                    <TextField {...params} label="Languages spoken" />
                )}
            />
        )}
    />
);
