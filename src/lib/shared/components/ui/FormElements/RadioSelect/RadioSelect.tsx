import { Box, FormControl, InputLabel as MuiInputLabel } from '@mui/material';
import { styled, SxProps, Theme, useTheme } from '@mui/material/styles';
import { SelectOption } from '../Select';
import { Radio } from '../Toggle';

interface RadioSelectProps {
    id: string;
    options: SelectOption[];
    onChange?: (value: string) => void;
    value?: string;
    label: string;
    required?: boolean;
    fullWidth?: boolean;
    wrapperSx?: SxProps<Theme>;
    labelSx?: SxProps<Theme>;
    disabled?: boolean;
}

export const RadioSelect = ({
    id,
    onChange,
    value,
    options,
    disabled,
    label,
    required,
    fullWidth,
    labelSx,
    wrapperSx,
}: RadioSelectProps) => {
    const theme = useTheme();

    return (
        <FormControl
            fullWidth={fullWidth}
            sx={{ marginBottom: theme.spacing(4), ...wrapperSx }}
        >
            <InputLabel
                id={`${id}-label`}
                shrink
                sx={{
                    fontSize: 14,
                    position: 'relative',
                    color: theme.palette.grey[600],
                    transform: 'none',
                    ...labelSx,
                }}
            >
                {label}{' '}
                {required && (
                    <span style={{ color: theme.palette.error.main }}>*</span>
                )}
            </InputLabel>

            <OptionsWrapper>
                {options.map((option) => (
                    <Radio
                        key={option.value}
                        id={option.id}
                        disabled={disabled ?? option.disabled}
                        displayText={option.displayText}
                        value={option.value}
                        checked={!!value && option.value === value}
                        onChange={() => onChange?.(option.value)}
                    />
                ))}
            </OptionsWrapper>
        </FormControl>
    );
};

const InputLabel = styled(MuiInputLabel)(({ theme }) => ({
    ...theme.typography.body2,
    fontWeight: 500,
    color: theme.palette.text.primary,
    fontSize: '1.125rem !important',
    '&.Mui-focused, &.MuiFormLabel-root': {
        color: theme.palette.text.primary + ' !important',
    },
}));

const OptionsWrapper = styled(Box)(({ theme }) => ({
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'flex-start',
    marginTop: theme.spacing(6),
    '& label span.MuiRadio-root': {
        padding: theme.spacing(1, 2, 1, 0),
    },
}));
