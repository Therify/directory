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

export const Paragraph = styled(MuiParagraph, {
    shouldForwardProp: (prop) =>
        prop !== 'italic' && prop !== 'bold' && prop !== 'noMargin',
})<ParagraphProps>(
    ({
        theme,
        size = PARAGRAPH_SIZE.MEDIUM,
        italic,
        bold,
        fontWeight = PARAGRAPH_FONT_WEIGHT.NORMAL,
        textDecoration,
        noMargin,
    }) => {
        return {
            ...getParagraphStyle({ size, theme }),
            fontStyle: italic ? 'italic' : undefined,
            textDecoration: textDecoration ?? 'none',
            fontWeight: bold ? 'bold' : fontWeight,
            ...(noMargin ? { margin: 0 } : {}),
        };
    }
);
