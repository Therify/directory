import { Components, Theme } from '@mui/material';
import { colors } from '.';
import { primary, secondary, shades } from './colors';

export const components: Components<Theme> = {
    MuiFilledInput: {
        defaultProps: {
            margin: 'dense',
            size: 'small',
        },
    },
    MuiSelect: {
        defaultProps: {
            margin: 'dense',
            size: 'small',
        },
    },
    MuiButtonBase: {
        defaultProps: {
            disableRipple: true,
        },
    },
    MuiButton: {
        defaultProps: {
            disableFocusRipple: true,
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
                    color: shades[0],
                    background: primary[100],
                },
            },
            outlinedPrimary: {
                ':disabled': {
                    color: primary[100],
                    borderColor: primary[100],
                },
            },
            textPrimary: {
                ':disabled': {
                    color: primary[100],
                },
            },
            containedSecondary: {
                ':disabled': {
                    color: shades[0],
                    background: secondary.blue[100],
                },
            },
            outlinedSecondary: {
                ':disabled': {
                    color: secondary.blue[100],
                    borderColor: secondary.blue[100],
                },
            },
            textSecondary: {
                ':disabled': {
                    color: secondary.blue[100],
                },
            },
        },
    },
};
