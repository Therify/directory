import { ReactNode } from 'react';
import {
    FormControl,
    Input as MuiInput,
    InputLabel as MuiInputLabel,
    InputLabelProps,
    InputProps as MuiInputProps,
} from '@mui/material';
import { styled, useTheme, SxProps, Theme } from '@mui/material/styles';
import { Caption, CAPTION_SIZE } from '../../Typography';

interface InputBaseProps {
    errorMessage?: string;
    successMessage?: string;
    helperText?: string;
    label?: string;
    id?: string;
    required?: boolean;
    variant?: 'default' | 'white';
    wrapperSx?: SxProps<Theme>;
}

export type InputProps = InputBaseProps & MuiInputProps;

export const TEST_IDS = {
    INPUT: 'input',
    LABEL: 'label',
    HELPER_TEXT: 'helper-text',
};

export const Input = ({
    errorMessage,
    successMessage,
    helperText,
    label,
    id,
    required,
    variant = 'default',
    wrapperSx,
    ...inputProps
}: InputProps) => {
    const theme = useTheme();
    const errorColor = errorMessage ? theme.palette.error.main : undefined;
    const successColor = successMessage
        ? theme.palette.success.main
        : undefined;
    return (
        <FormControl
            variant="standard"
            fullWidth={inputProps.fullWidth}
            sx={{ marginBottom: theme.spacing(4), ...wrapperSx }}
        >
            {label && (
                <InputLabel
                    data-testid={TEST_IDS.LABEL}
                    id={id}
                    required={required}
                >
                    {label}
                </InputLabel>
            )}
            <StyledInput
                id={id}
                data-testid={TEST_IDS.INPUT}
                color="info"
                name={inputProps.name ?? id}
                isError={!!errorMessage}
                isSuccess={!!successMessage}
                disableUnderline
                whiteBg={variant === 'white'}
                required={required}
                {...inputProps}
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
        </FormControl>
    );
};
export const InputLabel = ({
    id,
    children,
    required,
    shrink = true,
    ...props
}: {
    id?: string;
    children: ReactNode;
    required?: boolean;
} & InputLabelProps) => {
    const theme = useTheme();
    return (
        <MuiInputLabel
            {...props}
            data-testid={TEST_IDS.LABEL}
            htmlFor={id}
            shrink={shrink}
            style={{
                fontSize: theme.typography.caption.fontSize,
                position: 'relative',
                color: theme.palette.grey[600],
                transform: 'none',
            }}
        >
            {children}{' '}
            {required && (
                <span style={{ color: theme.palette.error.main }}>*</span>
            )}
        </MuiInputLabel>
    );
};

export const StyledInput = styled(MuiInput, {
    shouldForwardProp: (prop) =>
        'isSuccess' !== prop && 'isError' !== prop && 'whiteBg' !== prop,
})<{ isSuccess: boolean; isError: boolean; whiteBg: boolean }>(
    ({ isError, isSuccess, whiteBg, theme }) => {
        const errorColor = isError ? theme.palette.error.main : undefined;
        const successColor = isSuccess ? theme.palette.success.main : undefined;
        return {
            width: '100%',
            borderRadius: theme.shape.borderRadius,
            backgroundColor: whiteBg
                ? theme.palette.background.paper
                : theme.palette.grey[50],
            border: `1px solid`,
            borderColor: errorColor ?? successColor ?? theme.palette.grey[200],
            lineHeight: 1,
            '&.Mui-focused': {
                border: '1px solid',
                borderColor: `${theme.palette.grey[200]} !important`,
            },
            '&:hover': {
                border: `1px solid ${theme.palette.grey[100]}`,
            },
            'label + &': {
                marginTop: theme.spacing(4),
            },
            '& .MuiInputBase-input': {
                color: theme.palette.grey[800],
                position: 'relative',
                fontSize: 16,
                padding: theme.spacing(3, 4),
                width: '100%',
            },
        };
    }
);
