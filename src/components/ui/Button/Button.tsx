import { default as MuiButton } from '@mui/material/Button';
import CircularProgress from '@mui/material/CircularProgress';
import { ButtonProps as MuiButtonProps } from '@mui/material/Button';
import { styled, Theme, useTheme } from '@mui/material/styles';

export const BUTTON_COLORS = {
    PRIMARY: 'primary',
    SECONDARY: 'secondary',
    ERROR: 'error',
    WARNING: 'warning',
    INFO: 'info',
    SUCCESS: 'success',
} as const;

export const BUTTON_VARIANT = {
    FILLED: 'contained',
    OUTLINED: 'outlined',
    TEXT: 'text',
} as const;

export const BUTTON_SIZE: Record<string, ButtonProps['size']> = {
    SMALL: 'small',
    MEDIUM: 'medium',
    LARGE: 'large',
} as const;

export interface ButtonProps extends MuiButtonProps {
    isLoading?: boolean;
    LeftIcon?: React.ReactNode;
    RightIcon?: React.ReactNode;
}

const ButtonLoadingIndicator = ({
    size,
    theme,
}: {
    size: ButtonProps['size'];
    theme: Theme;
}) => {
    const { fontSize } = getSize(size, theme);
    return (
        <CircularProgress
            style={{
                color: theme.palette.primary.contrastText,
                fontSize,
            }}
        />
    );
};

export default function Button({
    color = 'primary',
    variant = 'contained',
    isLoading = false,
    LeftIcon,
    RightIcon,
    size,
    ...props
}: ButtonProps) {
    const theme = useTheme();
    return (
        <StyledButton
            {...props}
            size={size}
            color={color}
            variant={variant}
            startIcon={LeftIcon}
            endIcon={RightIcon}
        >
            {isLoading ? (
                <ButtonLoadingIndicator theme={theme} size={size} />
            ) : (
                props.children
            )}
        </StyledButton>
    );
}

const getSize = (size: ButtonProps['size'], theme: Theme) => {
    switch (size) {
        case 'small':
            return {
                padding: theme.spacing(0.5, 1.5),
                fontSize: theme.typography.pxToRem(12),
            };
        case 'large':
            return {
                padding: theme.spacing(1.5, 3),
                fontSize: theme.typography.pxToRem(16),
            };
        default:
            return {
                padding: theme.spacing(1, 2.5),
                fontSize: theme.typography.pxToRem(14),
            };
    }
};

const StyledButton = styled(MuiButton)<ButtonProps>(({ theme, size }) => ({
    ...getSize(size, theme),
})) as typeof MuiButton;
