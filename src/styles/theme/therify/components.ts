import { ThemeOptions } from '@mui/material/styles';
import { PRIMARY, SECONDARY, SHADES } from './colors';

/**
 * Override the default MuiButton component
 */
const MUI_BUTTON: ThemeOptions['components'] = {
    MuiButtonBase: {
        defaultProps: {
            disableRipple: true,
        },
    },
    MuiButton: {
        defaultProps: {
            disableRipple: true,
            disableElevation: true,
        },
        styleOverrides: {
            root: {
                fontWeight: 500,
                borderRadius: '6px',
                textTransform: 'none',
            },
            containedPrimary: {
                ':disabled': {
                    color: SHADES[0],
                    background: PRIMARY[100],
                },
            },
            outlinedPrimary: {
                ':disabled': {
                    color: PRIMARY[100],
                    borderColor: PRIMARY[100],
                },
            },
            textPrimary: {
                ':disabled': {
                    color: PRIMARY[100],
                },
            },
            containedSecondary: {
                ':disabled': {
                    color: SHADES[0],
                    background: SECONDARY.BLUE[100],
                },
            },
            outlinedSecondary: {
                ':disabled': {
                    color: SECONDARY.BLUE[100],
                    borderColor: SECONDARY.BLUE[100],
                },
            },
            textSecondary: {
                ':disabled': {
                    color: SECONDARY.BLUE[100],
                },
            },
        },
    },
};

/**
 * Component Theme Overrides
 * @see https://mui.com/customization/components/
 */
export const COMPONENTS: ThemeOptions['components'] = {
    ...MUI_BUTTON,
};
