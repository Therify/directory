import { Control, Controller } from 'react-hook-form';
import { Ethnicity, Goal, ProviderProfile } from '@/lib/shared/types';
import { Autocomplete, TextField } from '@mui/material';
import { InputWrapper } from '@/lib/shared/components/ui';
import { RegisterMember } from '@/lib/modules/registration/features';

type Goal = (typeof Goal.ENTRIES)[number];

interface GoalInputProps {
    control: Control<RegisterMember.Input>;
    disabled?: boolean;
}

export const GoalsInput = ({ control, disabled }: GoalInputProps) => (
    <Controller
        control={control}
        name="goals"
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
                    label="Your Goals"
                    sx={{
                        marginRight: '0 !important',
                    }}
                    errorMessage={
                        error?.type
                            ? 'At least one selection is required'
                            : undefined
                    }
                >
                    <Autocomplete
                        multiple
                        options={Goal.ENTRIES}
                        onChange={(_, value) => onChange(value)}
                        {...{
                            onBlur,
                            name,
                            value,
                            disabled,
                        }}
                        renderInput={(params) => (
                            <TextField {...params} label="Your Goals" />
                        )}
                    />
                </InputWrapper>
            );
        }}
    />
);
