import { Control, Controller } from 'react-hook-form';
import { AgeGroup } from '@/lib/types';
import { Autocomplete, TextField } from '@mui/material';
import { ProviderProfile } from '@/lib/types/providerProfile';

type AgeGroupsServed = typeof AgeGroup.ENTRIES[number];

interface AgeGroupsServedInputProps {
    control: Control<ProviderProfile>;
    defaultValue?: string[];
    disabled?: boolean;
}

export const AgeGroupsServedServedInput = ({
    control,
    defaultValue,
    disabled,
}: AgeGroupsServedInputProps) => (
    <Controller
        control={control}
        name="ageGroups"
        defaultValue={defaultValue as AgeGroupsServed[]}
        rules={{
            required: true,
        }}
        render={({ field: { onChange, onBlur, value, name } }) => (
            <Autocomplete
                multiple
                options={AgeGroup.ENTRIES}
                {...{
                    onChange,
                    onBlur,
                    name,
                    disabled,
                    value,
                }}
                renderInput={(params) => (
                    <TextField {...params} label="Age Groups Served" />
                )}
            />
        )}
    />
);
