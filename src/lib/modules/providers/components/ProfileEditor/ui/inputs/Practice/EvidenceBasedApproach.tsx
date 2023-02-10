import { Control, Controller } from 'react-hook-form';
import { ProviderProfile, EvidenceBasedApproach } from '@/lib/shared/types';
import { Autocomplete, TextField } from '@mui/material';
import { InputWrapper } from '@/lib/shared/components/ui';

type EvidenceBasedApproach = typeof EvidenceBasedApproach.ENTRIES[number];

interface EvidenceBasedApproachInputProps {
    control: Control<ProviderProfile.ProviderProfile>;
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
