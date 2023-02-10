import { PaletteOptions } from '@mui/material';
import {
    error,
    neutral,
    primary,
    secondary,
    shades,
    success,
    warning,
} from './colors';

export const palette: PaletteOptions = {
    primary: {
        light: primary[300],
        main: primary[400],
        dark: primary[500],
        contrastText: shades[0],
    },
    secondary: {
        main: secondary.blue[300],
        dark: secondary.blue[400],
        light: secondary.blue[50],
        contrastText: shades[0],
    },
    error: {
        main: error[400],
        dark: error[600],
        contrastText: shades[0],
    },
    warning: {
        main: warning[400],
        dark: warning[500],
        contrastText: shades[0],
    },
    success: {
        main: success[400],
        dark: success[500],
        contrastText: shades[0],
    },
    info: {
        main: neutral.black[400],
        dark: neutral.black[500],
        contrastText: shades[0],
    },
    text: {
        primary: shades[100],
        secondary: neutral.black[600],
    },
    divider: neutral.black[100],
    grey: neutral.black,
    background: {
        default: neutral.brown[50],
        paper: shades[0],
    },
};
