import { Control, Controller } from 'react-hook-form';
import { State } from '@/lib/types';
import { Autocomplete, TextField } from '@mui/material';
import { ProviderProfile } from '@/lib/types/providerProfile';

type LicensedState = typeof State.ENTRIES[number];

interface StateInputProps {
    control: Control<ProviderProfile>;
    defaultValue?: LicensedState[];
    disabled?: boolean;
}

export const LicensedStatesInput = ({
    control,
    defaultValue,
    disabled,
}: StateInputProps) => (
    <Controller
        control={control}
        name="licensedStates"
        defaultValue={defaultValue}
        // rules={{
        //     required: true,
        // }}
        render={({ field: { onChange, onBlur, value, name } }) => (
            <Autocomplete
                multiple
                options={State.ENTRIES}
                onChange={(_, value) => onChange(value)}
                {...{
                    onBlur,
                    name,
                    disabled,
                    value,
                }}
                renderInput={(params) => (
                    <TextField {...params} label="Licensed States" />
                )}
            />
        )}
    />
);
