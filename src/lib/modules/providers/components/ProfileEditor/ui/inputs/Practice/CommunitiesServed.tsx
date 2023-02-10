import { Control, Controller } from 'react-hook-form';
import { CommunitiesServed, ProviderProfile } from '@/lib/shared/types';
import { Autocomplete, TextField } from '@mui/material';
import { InputWrapper } from '@/lib/shared/components/ui';

type CommunitiesServed = typeof CommunitiesServed.ENTRIES[number];

interface CommunitiesServedInputProps {
    control: Control<ProviderProfile.ProviderProfile>;
    disabled?: boolean;
}

export const CommunitiesServedInput = ({
    control,
    disabled,
}: CommunitiesServedInputProps) => (
    <Controller
        control={control}
        name="communitiesServed"
        render={({ field: { onChange, onBlur, value, name } }) => (
            <InputWrapper fullWidth label="Communties Served">
                <Autocomplete
                    multiple
                    options={CommunitiesServed.ENTRIES}
                    onChange={(_, value) => onChange(value)}
                    {...{
                        onBlur,
                        name,
                        disabled,
                        value,
                    }}
                    renderInput={(params) => (
                        <TextField {...params} label="Communities Served" />
                    )}
                />
            </InputWrapper>
        )}
    />
);
