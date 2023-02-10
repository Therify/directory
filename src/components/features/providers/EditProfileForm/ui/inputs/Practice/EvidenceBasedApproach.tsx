import { Control, Controller } from 'react-hook-form';
import { EvidenceBasedApproach } from '@/lib/types';
import { Autocomplete, TextField } from '@mui/material';
import { ProviderProfile } from '@/lib/types/providerProfile';
import { InputWrapper } from '@/components/ui';

type EvidenceBasedApproach = typeof EvidenceBasedApproach.ENTRIES[number];

interface EvidenceBasedApproachInputProps {
    control: Control<ProviderProfile>;
    disabled?: boolean;
}

export const EvidenceBasedApproachInput = ({
    control,
    disabled,
}: EvidenceBasedApproachInputProps) => (
    <Controller
        control={control}
        name="evidenceBasedPractices"
        rules={{ required: true }}
        render={({
            field: { onChange, onBlur, value, name },
            fieldState: { error },
        }) => (
            <InputWrapper
                fullWidth
                required
                label="Evidence Based Approaches"
                errorMessage={
                    error?.type
                        ? 'At least one selection is required'
                        : undefined
                }
            >
                <Autocomplete
                    multiple
                    options={EvidenceBasedApproach.ENTRIES}
                    onChange={(_, value) => onChange(value)}
                    {...{
                        onBlur,
                        name,
                        disabled,
                        value,
                    }}
                    renderInput={(params) => (
                        <TextField
                            {...params}
                            label="Evidence Based Approaches"
                        />
                    )}
                />
            </InputWrapper>
        )}
    />
);
