import { ThemeOptions } from '@mui/material';

export const LIGHT_PALETTE: ThemeOptions['palette'] = {
    mode: 'light',
    primary: {
        main: '#D3A176',
        light: '#F2E4D8',
        dark: '#B08662',
        contrastText: '#fff',
    },
    secondary: {
        main: '#58737D',
        light: '#C8D6DC',
        dark: '#3B4D54',
    },
    success: {
        main: '#67AC71',
        light: '#C2DEC6',
        dark: '#3E6744',
        contrastText: '#fff',
    },
    error: {
        main: '#E08C7B',
        light: '#F8E5E2',
        dark: '#C77261',
        contrastText: '#fff',
    },
    warning: {
        main: '#E6C475',
        light: '#F5E7C8',
        dark: '#8A7646',
        contrastText: '#fff',
    },
    info: {
        main: '#817CAA',
        light: '#CDC9EE',
        dark: '#565371',
    },
} as const;
