import { ThemeOptions } from '@mui/material';
import {
    PRIMARY,
    SECONDARY,
    ERROR,
    WARNING,
    SHADES,
    SUCCESS,
    NEUTRAL,
} from './colors';

export const LIGHT_PALETTE: ThemeOptions['palette'] = {
    mode: 'light',
    primary: {
        light: PRIMARY[300],
        main: PRIMARY[400],
        dark: PRIMARY[500],
        contrastText: SHADES[0],
    },
    secondary: {
        main: SECONDARY.BLUE[300],
        dark: SECONDARY.BLUE[400],
        light: SECONDARY.BLUE[50],
        contrastText: SHADES[0],
    },
    error: {
        main: ERROR[400],
        dark: ERROR[600],
        contrastText: SHADES[0],
    },
    warning: {
        main: WARNING[400],
        dark: WARNING[500],
        contrastText: SHADES[0],
    },
    success: {
        main: SUCCESS[400],
        dark: SUCCESS[500],
        contrastText: SHADES[0],
    },
    info: {
        main: NEUTRAL.BLACK[400],
        dark: NEUTRAL.BLACK[500],
        contrastText: SHADES[0],
    },
    text: {
        primary: SHADES[100],
        secondary: NEUTRAL.BLACK[600],
    },
    divider: NEUTRAL.BLACK[100],
    grey: NEUTRAL.BLACK,
    background: {
        default: NEUTRAL.BROWN[50],
        paper: SHADES[0],
    },
} as const;
