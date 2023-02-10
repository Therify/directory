import { Control, Controller } from 'react-hook-form';
import { Ethnicity, ProviderProfile } from '@/lib/types';
import { Autocomplete, TextField } from '@mui/material';
import { InputWrapper } from '@/components/ui';

type Ethnicities = typeof Ethnicity.ENTRIES[number];

interface EthnicitiesInputProps {
    control: Control<ProviderProfile.ProviderProfile>;
    disabled?: boolean;
}

export const EthnicitiesInput = ({
    control,
    disabled,
}: EthnicitiesInputProps) => (
    <Controller
        control={control}
        name="ethnicity"
        rules={{
            required: true,
        }}
        render={({
            field: { onChange, onBlur, value, name },
            fieldState: { error },
        }) => {
            return (
                <InputWrapper
                    fullWidth
                    required
                    label="Your ethnicity"
                    errorMessage={
                        error?.type
                            ? 'At least one selection is required'
                            : undefined
                    }
                >
                    <Autocomplete
                        multiple
                        options={Ethnicity.ENTRIES}
                        onChange={(_, value) => onChange(value)}
                        {...{
                            onBlur,
                            name,
                            value,
                            disabled,
                        }}
                        renderInput={(params) => (
                            <TextField {...params} label="Your Ethnicity" />
                        )}
                    />
                </InputWrapper>
            );
        }}
    />
);
