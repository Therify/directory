import { Control, Controller } from 'react-hook-form';
import { AgeGroup } from '@/lib/types';
import { Autocomplete, TextField } from '@mui/material';
import { ProviderProfile } from '@/lib/types/providerProfile';
import { InputWrapper } from '@/components/ui';

type AgeGroupsServed = typeof AgeGroup.ENTRIES[number];

interface AgeGroupsServedInputProps {
    control: Control<ProviderProfile>;
    disabled?: boolean;
}

export const AgeGroupsServedServedInput = ({
    control,
    disabled,
}: AgeGroupsServedInputProps) => (
    <Controller
        control={control}
        name="ageGroups"
        rules={{ required: true }}
        render={({
            field: { onChange, onBlur, value, name },
            fieldState: { error },
        }) => (
            <InputWrapper
                fullWidth
                required
                label="Ages Served"
                errorMessage={
                    error?.type
                        ? 'At least one selection is required'
                        : undefined
                }
            >
                <Autocomplete
                    multiple
                    options={AgeGroup.ENTRIES}
                    onChange={(_, value) => onChange(value)}
                    {...{
                        onBlur,
                        name,
                        disabled,
                        value,
                    }}
                    renderInput={(params) => (
                        <TextField {...params} label="Ages Served" />
                    )}
                />
            </InputWrapper>
        )}
    />
);
