import { Control, Controller } from 'react-hook-form';
import { Language } from '@/lib/types';
import { Autocomplete, TextField } from '@mui/material';
import { ProviderProfile } from '@/lib/types/providerProfile';
import { InputWrapper } from '@/components/ui';

type LanguagesSpoken = typeof Language.ENTRIES[number];

interface LanguagesInputProps {
    control: Control<ProviderProfile>;
    disabled?: boolean;
}

export const LanguagesSpokenInput = ({
    control,
    disabled,
}: LanguagesInputProps) => (
    <Controller
        control={control}
        name="languagesSpoken"
        rules={{ required: true }}
        render={({
            field: { onChange, onBlur, value, name },
            fieldState: { error },
        }) => (
            <InputWrapper
                fullWidth
                required
                label="Languages Spoken"
                errorMessage={
                    error?.type
                        ? 'At least one language selection is required'
                        : undefined
                }
            >
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
            </InputWrapper>
        )}
    />
);
