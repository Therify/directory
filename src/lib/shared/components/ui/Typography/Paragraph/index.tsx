import { styled, Theme } from '@mui/material/styles';
import { MuiParagraph } from '../utils/MuiTypography';

export const PARAGRAPH_SIZE = {
    SMALL: 'small',
    MEDIUM: 'medium',
    LARGE: 'large',
} as const;

export type ParagraphSize = typeof PARAGRAPH_SIZE[keyof typeof PARAGRAPH_SIZE];

export const PARAGRAPH_FONT_WEIGHT = {
    BOLD: 'bold',
    NORMAL: 'normal',
    MEDIUM: 'medium',
} as const;

export type ParagraphFontWeight =
    typeof PARAGRAPH_FONT_WEIGHT[keyof typeof PARAGRAPH_FONT_WEIGHT];

export const PARAGRAPH_TEXT_DECORATION = {
    UNDERLINE: 'underline',
    LINE_THROUGH: 'line-through',
} as const;

export type ParagraphTextDecoration =
    typeof PARAGRAPH_TEXT_DECORATION[keyof typeof PARAGRAPH_TEXT_DECORATION];

interface ParagraphProps {
    size?: ParagraphSize;
    italic?: boolean;
    bold?: boolean;
    fontWeight?: ParagraphFontWeight;
    textDecoration?: ParagraphTextDecoration;
    noMargin?: boolean;
    color?:
        | 'error'
        | 'success'
        | 'inherit'
        | 'primary'
        | 'warning'
        | 'secondary'
        | 'info'
        | 'text-primary'
        | 'text-secondary';
}

const getParagraphStyle = ({
    size,
    theme,
}: {
    size: ParagraphSize;
    theme: Theme;
}) => {
    switch (size) {
        case PARAGRAPH_SIZE.SMALL:
            return theme.typography.body1;
        case PARAGRAPH_SIZE.LARGE:
            return theme.typography.body3;
        case PARAGRAPH_SIZE.MEDIUM:
        default:
            return theme.typography.body2;
    }
};

const getColor = (color: ParagraphProps['color'], theme: Theme) => {
    switch (color) {
        case 'text-primary':
            return theme.palette.text.primary;
        case 'text-secondary':
            return theme.palette.text.secondary;
        case 'error':
            return theme.palette.error.main;
        case 'success':
            return theme.palette.success.main;
        case 'warning':
            return theme.palette.warning.main;
        case 'info':
            return theme.palette.info.main;
        case 'primary':
            return theme.palette.primary.main;
        case 'secondary':
            return theme.palette.secondary.main;
        case 'inherit':
        default:
            return 'inherit';
    }
};

export const Paragraph = styled(MuiParagraph, {
    shouldForwardProp: (prop) =>
        prop !== 'italic' &&
        prop !== 'bold' &&
        prop !== 'noMargin' &&
        prop !== 'color',
})<ParagraphProps>(
    ({
        theme,
        size = PARAGRAPH_SIZE.MEDIUM,
        italic,
        bold,
        fontWeight = PARAGRAPH_FONT_WEIGHT.NORMAL,
        textDecoration,
        noMargin,
        color,
    }) => {
        return {
            ...getParagraphStyle({ size, theme }),
            fontStyle: italic ? 'italic' : undefined,
            textDecoration: textDecoration ?? 'none',
            fontWeight: bold ? 'bold' : fontWeight,
            color: color ? getColor(color, theme) : undefined,
            ...(noMargin ? { margin: 0 } : {}),
        };
    }
);
