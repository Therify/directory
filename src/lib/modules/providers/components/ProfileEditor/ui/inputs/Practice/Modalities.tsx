import { Control, Controller } from 'react-hook-form';
import { Modality, ProviderProfile } from '@/lib/shared/types';
import { Autocomplete, TextField } from '@mui/material';
import { InputWrapper } from '@/lib/shared/components/ui';

interface ModalitiesServedInputProps {
    control: Control<ProviderProfile.ProviderProfile>;
    disabled?: boolean;
}

export const ModalititesServedInput = ({
    control,
    disabled,
}: ModalitiesServedInputProps) => (
    <Controller
        control={control}
        name="modalities"
        rules={{ required: true }}
        render={({
            field: { onChange, onBlur, value, name },
            fieldState: { error },
        }) => (
            <InputWrapper
                fullWidth
                required
                label="Modalities"
                errorMessage={
                    error?.type
                        ? 'At least one modality is required'
                        : undefined
                }
            >
                <Autocomplete
                    multiple
                    options={Modality.ENTRIES}
                    onChange={(_, value) => onChange(value)}
                    {...{
                        onBlur,
                        name,
                        disabled,
                        value,
                    }}
                    renderInput={(params) => (
                        <TextField {...params} label="Modalities" />
                    )}
                />
            </InputWrapper>
        )}
    />
);
