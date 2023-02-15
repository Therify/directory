import { Control, Controller } from 'react-hook-form';
import { Issue } from '@/lib/shared/types';
import { Autocomplete, TextField } from '@mui/material';
import { InputWrapper } from '@/lib/shared/components/ui';
import { RegisterMember } from '@/lib/modules/registration/features';

type Entry = typeof Issue.ENTRIES[number];

interface ConcernsInputProps {
    control: Control<RegisterMember.Input>;
    disabled?: boolean;
}

export const ConcernsInput = ({ control, disabled }: ConcernsInputProps) => (
    <Controller
        control={control}
        name="concerns"
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
                    label="Your Concerns"
                    sx={{
                        marginLeft: '0 !important',
                    }}
                    errorMessage={
                        error?.type
                            ? 'At least one selection is required'
                            : undefined
                    }
                >
                    <Autocomplete
                        multiple
                        options={Issue.ENTRIES}
                        onChange={(_, value) => onChange(value)}
                        {...{
                            onBlur,
                            name,
                            value,
                            disabled,
                        }}
                        renderInput={(params) => (
                            <TextField {...params} label="Your Concerns" />
                        )}
                    />
                </InputWrapper>
            );
        }}
    />
);
