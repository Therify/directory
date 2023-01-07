import { ThemeOptions } from '@mui/material';
import { TypographyStyleOptions } from '@mui/material/styles/createTypography';

interface TherifyHeadings {
    displayLarge: TypographyStyleOptions;
    displayMedium: TypographyStyleOptions;
    displaySmall: TypographyStyleOptions;
}

const HEADER_FONTS = ['P22Mackinac', 'Roboto', 'sans-serif'].join(',');
const BODY_FONTS = [
    'Roboto',
    '--apple-system',
    'BlinkMacSystemFont',
    '"Segoe UI"',
    'Oxygen',
    'Ubuntu',
    'Cantarell',
    '"Fira Sans"',
    '"Droid Sans"',
    '"Helvetica Neue"',
    'sans-serif',
].join(',');

export const TYPOGRAPHY: ThemeOptions['typography'] & TherifyHeadings = {
    fontFamily: BODY_FONTS,
    displayLarge: {
        fontFamily: HEADER_FONTS,
        fontSize: '6rem',
    },
    displayMedium: {
        fontFamily: HEADER_FONTS,
        fontSize: '4.5rem',
    },
    displaySmall: {
        fontFamily: HEADER_FONTS,
        fontSize: '4rem',
    },
    h1: {
        fontFamily: HEADER_FONTS,
        // Mobile font size
        fontSize: '2.5rem',
        lineHeight: '2.688rem',
        '@media (min-width:600px)': {
            fontSize: '3rem',
            lineHeight: '3.563rem',
        },
    },
    h2: {
        fontFamily: HEADER_FONTS,
        fontSize: '2rem',
        '@media (min-width:600px)': {
            fontSize: '2.5rem',
        },
    },
    h3: {
        fontFamily: HEADER_FONTS,
        fontSize: '1.75rem',
    },
    h4: {
        fontFamily: HEADER_FONTS,
        fontSize: '1.5rem',
    },
    h5: {
        fontFamily: HEADER_FONTS,
        fontSize: '1.25rem',
    },
    h6: {
        fontFamily: HEADER_FONTS,
        fontSize: '1.125rem',
    },
    body1: {
        fontFamily: BODY_FONTS,
        fontSize: '1.125rem',
    },
    body2: {
        fontFamily: BODY_FONTS,
        fontSize: '1rem',
    },
    subtitle1: {
        fontFamily: BODY_FONTS,
        fontSize: '1rem',
    },
    subtitle2: {
        fontFamily: BODY_FONTS,
        fontSize: '0.875rem',
    },
    caption: {
        fontFamily: BODY_FONTS,
        fontSize: '0.75rem',
    },
    overline: {
        fontFamily: BODY_FONTS,
        fontWeight: 700,
        fontSize: '0.75rem',
        textTransform: 'uppercase',
    },
};
