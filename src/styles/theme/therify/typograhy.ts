import { ThemeOptions } from '@mui/material';
import { TypographyStyleOptions } from '@mui/material/styles/createTypography';

interface TherifyHeadings {
    displayLarge: TypographyStyleOptions;
    displayMedium: TypographyStyleOptions;
    displaySmall: TypographyStyleOptions;
}

interface TherifyCaptions {
    captionSmall: TypographyStyleOptions;
}

interface TherifySubtitles {
    subtitle3: TypographyStyleOptions;
    subtitle4: TypographyStyleOptions;
}
interface TherifyOverline {
    overlineLarge: TypographyStyleOptions;
    overlineSmall: TypographyStyleOptions;
}

interface TherifyBody {
    body3: TypographyStyleOptions;
}

interface TherifyDisplay {
    displayMedium: TypographyStyleOptions;
    displaySmall: TypographyStyleOptions;
    displayLarge: TypographyStyleOptions;
}
type TherifyTypography = TherifyHeadings &
    TherifyCaptions &
    TherifySubtitles &
    TherifyOverline &
    TherifyBody &
    TherifyDisplay;

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

export const TYPOGRAPHY: ThemeOptions['typography'] & TherifyTypography = {
    // fontFamily: BODY_FONTS,
    fontSize: 16,
    displayLarge: {
        fontFamily: HEADER_FONTS,
        fontWeight: 'bold',
        fontSize: '6rem',
        lineHeight: '7.125rem',
    },
    displayMedium: {
        fontFamily: HEADER_FONTS,
        fontWeight: 'bold',
        fontSize: '5rem',
        lineHeight: '5.375rem',
    },
    displaySmall: {
        fontFamily: HEADER_FONTS,
        fontWeight: 'bold',
        fontSize: '4rem',
        lineHeight: '4.75rem',
    },
    h1: {
        fontFamily: HEADER_FONTS,
        // Mobile font size
        fontSize: '2.5rem',
        lineHeight: '2.688rem',
        fontWeight: 'bold',
        marginBottom: '1.5rem',
        // '@media (min-width:600px)': {
        //     fontSize: '3rem',
        //     lineHeight: '3.563rem',
        // },
    },
    h2: {
        fontFamily: HEADER_FONTS,
        fontSize: '2.25rem',
        lineHeight: '2.688rem',
        fontWeight: 'bold',
        marginBottom: '1.125rem',
        // '@media (min-width:600px)': {
        //     fontSize: '2.5rem',
        // },
    },
    h3: {
        fontFamily: HEADER_FONTS,
        fontSize: '2rem',
        lineHeight: '2.375rem',
        fontWeight: 'bold',
        marginBottom: '1rem',
    },
    h4: {
        fontFamily: HEADER_FONTS,
        fontSize: '1.75rem',
        lineHeight: '2.063rem',
        fontWeight: 'bold',
        marginBottom: '0.875rem',
    },
    h5: {
        fontFamily: HEADER_FONTS,
        fontSize: '1.625rem',
        lineHeight: '1.938rem',
        fontWeight: 'bold',
        marginBottom: '0.75rem',
    },
    h6: {
        fontFamily: HEADER_FONTS,
        fontSize: '1.5rem',
        lineHeight: '1.813rem',
        fontWeight: 'bold',
    },
    body1: {
        fontFamily: BODY_FONTS,
        fontSize: '1rem',
        lineHeight: '1.625rem',
        fontWeight: 400,
    },
    body2: {
        fontFamily: BODY_FONTS,
        fontSize: '1.125rem',
        lineHeight: '1.75rem',
        fontWeight: 400,
    },
    body3: {
        fontFamily: BODY_FONTS,
        fontSize: '1.375rem',
        lineHeight: '2rem',
        fontWeight: 400,
    },
    subtitle1: {
        fontFamily: BODY_FONTS,
        fontSize: '1.375rem',
        lineHeight: '2rem',
        fontWeight: 400,
        marginBottom: '0.5rem',
    },
    subtitle2: {
        fontFamily: BODY_FONTS,
        fontSize: '1.625rem',
        lineHeight: '2.25rem',
        fontWeight: 400,
        marginBottom: '1.5rem',
    },
    subtitle3: {
        fontFamily: BODY_FONTS,
        fontSize: '1.875rem',
        lineHeight: '2.5rem',
        fontWeight: 400,
        marginBottom: '1.5rem',
    },
    subtitle4: {
        fontFamily: BODY_FONTS,
        fontSize: '2.25rem',
        lineHeight: '2.875rem',
        fontWeight: 400,
        marginBottom: '1.5rem',
    },
    caption: {
        fontFamily: BODY_FONTS,
        fontSize: '0.875rem',
        lineHeight: '1rem',
    },
    captionSmall: {
        fontFamily: BODY_FONTS,
        fontSize: '0.75rem',
        lineHeight: '1rem',
    },
    overline: {
        textTransform: 'uppercase',
        fontFamily: BODY_FONTS,
        fontSize: '0.875rem',
        letterSpacing: '10%',
        fontWeight: 'bold',
    },
    overlineSmall: {
        textTransform: 'uppercase',
        fontFamily: BODY_FONTS,
        fontSize: '0.875rem',
        letterSpacing: '10%',
        fontWeight: 'bold',
    },
    overlineLarge: {
        textTransform: 'uppercase',
        fontFamily: BODY_FONTS,
        fontSize: '0.875rem',
        letterSpacing: '10%',
        fontWeight: 'bold',
    },
};
