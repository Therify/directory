import { ThemeOptions } from '@mui/material';

/**
 * Override the default MuiButton component
 */
const MUI_BUTTON: ThemeOptions['components'] = {
    MuiButton: {
        defaultProps: {
            disableRipple: true,
            disableElevation: true,
            color: 'info',
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
