import {
    Button as MuiButton,
    ButtonProps as MuiButtonProps,
    CircularProgress,
} from '@mui/material';
import { Theme, useTheme } from '@mui/material/styles';
import React from 'react';

export const BUTTON_TYPE = {
    CONTAINED: 'contained',
    OUTLINED: 'outlined',
    TEXT: 'text',
} as const;

export type ButtonType = typeof BUTTON_TYPE[keyof typeof BUTTON_TYPE];

export const BUTTON_SIZE = {
    SMALL: 'small',
    MEDIUM: 'medium',
    LARGE: 'large',
    XLARGE: 'xlarge',
} as const;

export type ButtonSize = typeof BUTTON_SIZE[keyof typeof BUTTON_SIZE];

export const TEST_IDS = {
    LOGIN_LOADER: 'login-loader',
} as const;

export type ButtonProps = Omit<MuiButtonProps, 'type' | 'size' | 'variant'> & {
    size?: ButtonSize;
    isLoading?: boolean;
    loadingSlot?: React.ReactNode;
    type?: ButtonType;
    htmlButtonType?: MuiButtonProps['type'];
};

const getSizeStyles = ({ spacing }: Theme, size?: ButtonSize) => {
    switch (size) {
        case 'xlarge':
            return {
                fontSize: '1.375rem',
                padding: spacing(5, 9),
            };
        case 'large':
            return {
                fontSize: '1.125rem',
                padding: spacing(4, 8),
            };
        case 'medium':
            return {
                fontSize: '1rem',
                padding: spacing(4, 6),
            };
        case 'small':
        default:
            return {
                fontSize: '1rem',
                padding: spacing(3, 4),
            };
    }
};

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
    (
        {
            color = 'primary',
            size,
            isLoading,
            loadingSlot,
            children,
            type,
            style,
            htmlButtonType = 'button',
            ...props
        },
        ref
    ) => {
        const theme = useTheme();
        return (
            <MuiButton
                {...props}
                variant={type ?? BUTTON_TYPE.CONTAINED}
                color={color}
                ref={ref}
                type={htmlButtonType}
                style={{
                    ...getSizeStyles(theme, size ?? BUTTON_SIZE.MEDIUM),
                    lineHeight: 1,
                    ...style,
                }}
            >
                {isLoading ? (
                    // eslint-disable-next-line react/jsx-no-useless-fragment
                    <>{loadingSlot ?? <DefaultLoadingSlot theme={theme} />}</>
                ) : (
                    // eslint-disable-next-line react/jsx-no-useless-fragment
                    <>{children}</>
                )}
            </MuiButton>
        );
    }
);
Button.displayName = 'Button';

// export const Button = ({
//     color = 'primary',
//     size,
//     isLoading,
//     loadingSlot,
//     children,
//     type,
//     style,
//     htmlButtonType = 'button',
//     ...props
// }: ButtonProps) => {
//     const theme = useTheme();
//     return (
//         <MuiButton
//             {...props}
//             variant={type ?? BUTTON_TYPE.CONTAINED}
//             color={color}
//             type={htmlButtonType}
//             style={{
//                 ...getSizeStyles(theme, size ?? BUTTON_SIZE.MEDIUM),
//                 lineHeight: 1,
//                 ...style,
//             }}
//         >
//             {isLoading ? (
//                 // eslint-disable-next-line react/jsx-no-useless-fragment
//                 <>{loadingSlot ?? <DefaultLoadingSlot theme={theme} />}</>
//             ) : (
//                 // eslint-disable-next-line react/jsx-no-useless-fragment
//                 <>{children}</>
//             )}
//         </MuiButton>
//     );
// };

const DefaultLoadingSlot = ({ theme }: { theme: Theme }) => (
    <CircularProgress
        size={theme.typography.button.fontSize}
        // TODO: Test this
        data-testid={TEST_IDS.LOGIN_LOADER}
        style={{
            color: theme.palette.primary.contrastText,
        }}
    />
);

const getSquareButtonSize = ({ spacing }: Theme, size?: ButtonSize) => {
    switch (size) {
        case BUTTON_SIZE.SMALL:
            return spacing(2);
        case BUTTON_SIZE.LARGE:
            return spacing(4);
        case BUTTON_SIZE.XLARGE:
            return spacing(5);
        case BUTTON_SIZE.MEDIUM:
        default:
            return spacing(3);
    }
};

export type IconButtonProps = ButtonProps & {
    withBoxShadow?: boolean;
};

export const IconButton = ({
    type,
    size,
    children,
    style,
    isLoading,
    loadingSlot,
    withBoxShadow,
    ...props
}: IconButtonProps) => {
    const theme = useTheme();
    const squareSize = getSquareButtonSize(theme, size);
    return (
        <MuiButton
            {...props}
            variant={type ?? BUTTON_TYPE.CONTAINED}
            style={{
                minWidth: squareSize,
                padding: squareSize,
                boxShadow: withBoxShadow ? theme.shadows[3] : undefined,
                ...style,
            }}
        >
            {isLoading ? (
                // eslint-disable-next-line react/jsx-no-useless-fragment
                <>{loadingSlot ?? <DefaultLoadingSlot theme={theme} />}</>
            ) : (
                // eslint-disable-next-line react/jsx-no-useless-fragment
                <>{children}</>
            )}
        </MuiButton>
    );
};
