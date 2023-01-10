import { TextField, Box } from '@mui/material';
import { styled, useTheme, SxProps, Theme } from '@mui/material/styles';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import {
    DesktopDatePicker,
    MobileDatePicker,
    DatePickerProps as MuiDatePickerProps,
} from '@mui/x-date-pickers';
import { Caption, CaptionSize, CAPTION_SIZE } from '../../Typography';

interface DatePickerBaseProps {
    mobile?: boolean;
    inputFormat?: string;
    onChange: (date: Date | null) => void;
    value: Date | null;
    label?: React.ReactNode;
    errorMessage?: string;
    successMessage?: string;
    helperText?: string;
    required?: boolean;
    autoComplete?: string;
    sx?: SxProps<Theme>;
    onBlur?: (event: React.FocusEvent<HTMLInputElement>) => void;
}
type DatePickerProps = DatePickerBaseProps &
    Omit<MuiDatePickerProps<Date | null, Date>, 'renderInput'>;

export const TEST_IDS = {
    REQUIRED_INDICATOR: 'required-indicator',
    HELPER_TEXT: 'helper-text',
} as const;

export const DatePicker = ({
    mobile,
    label,
    value,
    onChange,
    errorMessage,
    successMessage,
    helperText,
    required,
    inputFormat = 'MM/dd/yyyy',
    autoComplete,
    onBlur,
    sx,
    ...datePickerProps
}: DatePickerProps) => {
    const theme = useTheme();
    const handleChange = (newValue: Date | null) => {
        onChange(newValue);
    };
    const errorColor = errorMessage ? theme.palette.error.main : undefined;
    const successColor = successMessage
        ? theme.palette.success.main
        : undefined;
    const Picker = mobile ? MobileDatePicker : DesktopDatePicker;
    return (
        <LocalizationProvider dateAdapter={AdapterDateFns}>
            <Box marginBottom={theme.spacing(4)} sx={sx}>
                <Picker
                    label={
                        <>
                            {label}{' '}
                            {required && (
                                <Required
                                    data-testid={TEST_IDS.REQUIRED_INDICATOR}
                                >
                                    *
                                </Required>
                            )}
                        </>
                    }
                    inputFormat={inputFormat}
                    value={value}
                    onChange={(date) => handleChange(date)}
                    renderInput={(params) => (
                        <Input
                            onBlur={onBlur}
                            autoComplete={autoComplete}
                            isError={Boolean(errorMessage)}
                            isSuccess={Boolean(successMessage)}
                            {...params}
                        />
                    )}
                    {...datePickerProps}
                />

                {(errorMessage || successMessage || helperText) && (
                    <Caption
                        data-testid={TEST_IDS.HELPER_TEXT}
                        size={CAPTION_SIZE.SMALL}
                        style={{
                            marginTop: theme.spacing(3),
                            color:
                                errorColor ??
                                successColor ??
                                theme.palette.grey[500],
                        }}
                    >
                        {errorMessage ?? successMessage ?? helperText}
                    </Caption>
                )}
            </Box>
        </LocalizationProvider>
    );
};

const Required = styled('span')(({ theme }) => ({
    color: theme.palette.error.main,
}));

const Input = styled(TextField, {
    shouldForwardProp: (prop) => 'isSuccess' !== prop && 'isError' !== prop,
})<{ isSuccess?: boolean; isError?: boolean }>(
    ({ isError, isSuccess, theme }) => {
        const errorColor = isError ? theme.palette.error.main : undefined;
        const successColor = isSuccess ? theme.palette.success.main : undefined;
        return {
            width: '100%',
            '& label': {
                transform: 'none',
                position: 'relative',
                fontSize: '.875rem',
                color: theme.palette.grey[600],
                '&.Mui-focused, &.Mui-error': {
                    color: theme.palette.grey[600],
                },
                '&.Mui-error + .MuiInputBase-root': {
                    borderColor: theme.palette.error.main,
                },
            },
            '& .MuiInputBase-root': {
                lineHeight: 1,
                marginTop: theme.spacing(4),
                borderRadius: theme.shape.borderRadius,
                border: `1px solid`,
                borderColor:
                    errorColor ?? successColor ?? theme.palette.grey[200],
                backgroundColor: theme.palette.grey[50],
                color: theme.palette.grey[800],
                position: 'relative',
                fontSize: 16,
                padding: theme.spacing(3, 4),
                width: '100%',
                '& fieldset': {
                    display: 'none',
                },
                '&.Mui-focused': {
                    border: '1px solid',
                    borderColor: `${theme.palette.grey[200]} !important`,
                },
                '& input': {
                    padding: 0,
                },
                '&:hover': {
                    borderColor: theme.palette.grey[100],
                },
                '&::placeholder': {
                    color: theme.palette.grey[500],
                    display: 'block',
                },
            },
        };
    }
);
