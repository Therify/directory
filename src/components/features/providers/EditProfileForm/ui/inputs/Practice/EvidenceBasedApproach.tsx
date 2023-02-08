import { Control, Controller } from 'react-hook-form';
import { EvidenceBasedApproach } from '@/lib/types';
import { Autocomplete, TextField } from '@mui/material';
import { ProviderProfile } from '@/lib/types/providerProfile';

type EvidenceBasedApproach = typeof EvidenceBasedApproach.ENTRIES[number];

interface EvidenceBasedApproachInputProps {
    control: Control<ProviderProfile>;
    defaultValue?: string[];
    disabled?: boolean;
}

export const EvidenceBasedApproachInput = ({
    control,
    defaultValue,
    disabled,
}: EvidenceBasedApproachInputProps) => (
    <Controller
        control={control}
        name="evidenceBasedPractices"
        defaultValue={defaultValue as EvidenceBasedApproach[]}
        rules={{
            required: true,
        }}
        render={({ field: { onChange, onBlur, value, name } }) => (
            <Autocomplete
                multiple
                options={EvidenceBasedApproach.ENTRIES}
                {...{
                    onChange,
                    onBlur,
                    name,
                    disabled,
                    value,
                }}
                renderInput={(params) => (
                    <TextField {...params} label="Evidence Based Approaches" />
                )}
            />
        )}
    />
);
