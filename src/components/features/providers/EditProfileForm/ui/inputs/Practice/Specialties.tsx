import { Control, Controller } from 'react-hook-form';
import { AreaOfFocus } from '@/lib/types';
import { Autocomplete, TextField } from '@mui/material';
import { ProviderProfile } from '@/lib/types/providerProfile';

type Specialties = typeof AreaOfFocus.ENTRIES[number];

interface SpecialtiesInputProps {
    control: Control<ProviderProfile>;
    defaultValue?: string[];
    disabled?: boolean;
}

export const SpecialtiesInput = ({
    control,
    defaultValue = [],
    disabled,
}: SpecialtiesInputProps) => (
    <Controller
        control={control}
        name="specialties"
        defaultValue={defaultValue as Specialties[]}
        rules={{
            required: true,
        }}
        render={({ field: { onChange, onBlur, value, name } }) => (
            <Autocomplete
                multiple
                options={AreaOfFocus.ENTRIES}
                onChange={(_, value) => onChange(value)}
                {...{
                    onBlur,
                    name,
                    disabled,
                    value,
                }}
                renderInput={(params) => (
                    <TextField {...params} label="Areas of Focus" />
                )}
            />
        )}
    />
);
