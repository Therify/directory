import { Control, Controller } from 'react-hook-form';
import { Modality } from '@/lib/types';
import { Autocomplete, TextField } from '@mui/material';
import { ProviderProfile } from '@/lib/types/providerProfile';

type ModalityServed = typeof Modality.ENTRIES[number];

interface ModalitiesServedInputProps {
    control: Control<ProviderProfile>;
    defaultValue?: string[];
    disabled?: boolean;
}

export const ModalititesServedInput = ({
    control,
    defaultValue,
    disabled,
}: ModalitiesServedInputProps) => (
    <Controller
        control={control}
        name="ageGroups"
        defaultValue={defaultValue as ModalityServed[]}
        rules={{
            required: true,
        }}
        render={({ field: { onChange, onBlur, value, name } }) => (
            <Autocomplete
                multiple
                options={Modality.ENTRIES}
                {...{
                    onChange,
                    onBlur,
                    name,
                    disabled,
                    value,
                }}
                renderInput={(params) => (
                    <TextField {...params} label="Modalities" />
                )}
            />
        )}
    />
);
