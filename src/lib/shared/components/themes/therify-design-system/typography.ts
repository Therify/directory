import { TypographyOptions } from '@mui/material/styles/createTypography';
import { createTheme } from '@mui/material/styles';

const DOCUMENT_FONT_FAMILY = ['Roboto', '-apple-system', 'sans-serif'] as const;
const HEADING_DISPLAY_FONT_FAMILY = ['P22 Mackinac', 'Georgia'] as const;

declare module '@mui/material/styles' {
    interface TypographyVariants {
        captionSmall: React.CSSProperties;
        overlineLarge: React.CSSProperties;
        overlineSmall: React.CSSProperties;
        subtitle3: React.CSSProperties;
        subtitle4: React.CSSProperties;
        body3: React.CSSProperties;
        display: React.CSSProperties;
        displaySmall: React.CSSProperties;
        displayLarge: React.CSSProperties;
    }

    // allow configuration using `createTheme`
    interface TypographyVariantsOptions {
        captionSmall?: React.CSSProperties;
        overlineLarge?: React.CSSProperties;
        overlineSmall?: React.CSSProperties;
        subtitle3?: React.CSSProperties;
        subtitle4?: React.CSSProperties;
        body3?: React.CSSProperties;
        display?: React.CSSProperties;
        displaySmall?: React.CSSProperties;
        displayLarge?: React.CSSProperties;
    }
}

// Update the Typography's variant prop options
declare module '@mui/material/Typography' {
    interface TypographyPropsVariantOverrides {
        captionSmall: true;
        overlineLarge: true;
        overlineSmall: true;
        subtitle3: true;
        subtitle4: true;
        body3: true;
        display: true;
        displayLarge: true;
        displaySmall: true;
    }
}

export const typography: TypographyOptions = {
    fontFamily: DOCUMENT_FONT_FAMILY.join(', '),
    fontSize: 16,
    display: {
        fontFamily: HEADING_DISPLAY_FONT_FAMILY.join(', '),
        fontWeight: 'bold',
        fontSize: '5rem',
        lineHeight: '5.375rem',
    },
    displaySmall: {
        fontFamily: HEADING_DISPLAY_FONT_FAMILY.join(', '),
        fontWeight: 'bold',
        fontSize: '4rem',
        lineHeight: '4.75rem',
    },
    displayLarge: {
        fontFamily: HEADING_DISPLAY_FONT_FAMILY.join(', '),
        fontWeight: 'bold',
        fontSize: '6rem',
        lineHeight: '7.125rem',
    },
    h1: {
        fontFamily: HEADING_DISPLAY_FONT_FAMILY.join(', '),
        fontSize: '3rem',
        lineHeight: '3.563rem',
        fontWeight: 'bold',
        marginBottom: '1.5rem',
        // TODO: Handle mobile size changes from design system
    },
    h2: {
        fontFamily: HEADING_DISPLAY_FONT_FAMILY.join(', '),
        fontSize: '2.25rem',
        lineHeight: '2.688rem',
        fontWeight: 'bold',
        marginBottom: '1.125rem',
    },
    h3: {
        fontFamily: HEADING_DISPLAY_FONT_FAMILY.join(', '),
        lineHeight: '2.063rem',
        fontSize: '1.71rem',
        fontWeight: 'bold',
        marginBottom: '1rem',
    },
    h4: {
        fontFamily: HEADING_DISPLAY_FONT_FAMILY.join(', '),
        fontSize: '1.75rem',
        lineHeight: '2.063rem',
        fontWeight: 'bold',
        marginBottom: '0.875rem',
    },
    h5: {
        fontFamily: HEADING_DISPLAY_FONT_FAMILY.join(', '),
        fontSize: '1.625rem',
        lineHeight: '1.938rem',
        fontWeight: 'bold',
        marginBottom: '0.75rem',
    },
    h6: {
        fontFamily: HEADING_DISPLAY_FONT_FAMILY.join(', '),
        fontSize: '1.5rem',
        lineHeight: '1.813rem',
        fontWeight: 'bold',
    },
    subtitle1: {
        // Extra Small Subhead
        fontFamily: DOCUMENT_FONT_FAMILY.join(', '),
        fontSize: '1.375rem',
        lineHeight: '2rem',
        fontWeight: 400,
        marginBottom: '0.5rem',
    },
    subtitle2: {
        // Small Subhead
        fontFamily: DOCUMENT_FONT_FAMILY.join(', '),
        fontSize: '1.625rem',
        lineHeight: '2.25rem',
        fontWeight: 400,
        marginBottom: '1.5rem',
    },
    subtitle3: {
        // Medium Subhead
        fontFamily: DOCUMENT_FONT_FAMILY.join(', '),
        fontSize: '1.875rem',
        lineHeight: '2.5rem',
        fontWeight: 400,
        marginBottom: '1.5rem',
    },
    subtitle4: {
        // Large Subhead
        fontFamily: DOCUMENT_FONT_FAMILY.join(', '),
        fontSize: '2.25rem',
        lineHeight: '2.875rem',
        fontWeight: 400,
        marginBottom: '1.5rem',
    },
    body1: {
        // Small Paragraph
        fontFamily: DOCUMENT_FONT_FAMILY.join(', '),
        fontSize: '1rem',
        lineHeight: '1.625rem',
        fontWeight: 400,
        [createTheme().breakpoints.up('md')]: {
            fontSize: '1.125rem',
            color: '#000000',
        },
    },
    body2: {
        // Medium Paragraph
        fontFamily: DOCUMENT_FONT_FAMILY.join(', '),
        fontSize: '1rem',
        lineHeight: '1.75rem',
        fontWeight: 400,
        [createTheme().breakpoints.up('md')]: {
            fontSize: '1.125rem',
            color: '#000000',
        },
    },
    body3: {
        // Large Paragraph
        fontFamily: DOCUMENT_FONT_FAMILY.join(', '),
        fontSize: '1.375rem',
        lineHeight: '2rem',
        fontWeight: 400,
    },
    caption: {
        fontFamily: DOCUMENT_FONT_FAMILY.join(', '),
        fontSize: '0.875rem',
        lineHeight: '1rem',
    },
    captionSmall: {
        fontFamily: DOCUMENT_FONT_FAMILY.join(', '),
        fontSize: '0.75rem',
        lineHeight: '1rem',
    },
    overline: {
        textTransform: 'uppercase',
        fontFamily: DOCUMENT_FONT_FAMILY.join(', '),
        fontSize: '0.875rem',
        letterSpacing: '10%',
        fontWeight: 'bold',
    },
    overlineSmall: {
        textTransform: 'uppercase',
        fontFamily: DOCUMENT_FONT_FAMILY.join(', '),
        fontSize: '0.875rem',
        letterSpacing: '10%',
        fontWeight: 'bold',
    },
    overlineLarge: {
        textTransform: 'uppercase',
        fontFamily: DOCUMENT_FONT_FAMILY.join(', '),
        fontSize: '0.875rem',
        letterSpacing: '10%',
        fontWeight: 'bold',
    },
};
