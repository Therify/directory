import { Control, Controller } from 'react-hook-form';
import { ProviderProfile, AreaOfFocus } from '@/lib/types';
import { Autocomplete, TextField } from '@mui/material';
import { InputWrapper } from '@/components/ui';

type Specialties = typeof AreaOfFocus.ENTRIES[number];

interface SpecialtiesInputProps {
    control: Control<ProviderProfile.ProviderProfile>;
    disabled?: boolean;
}

export const SpecialtiesInput = ({
    control,
    disabled,
}: SpecialtiesInputProps) => (
    <Controller
        control={control}
        name="specialties"
        rules={{
            required: true,
        }}
        render={({
            field: { onChange, onBlur, value, name },
            fieldState: { error },
        }) => (
            <InputWrapper
                fullWidth
                required
                label="Areas of Focus"
                errorMessage={
                    error?.type
                        ? 'At least one specialty is required'
                        : undefined
                }
            >
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
            </InputWrapper>
        )}
    />
);
