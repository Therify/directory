import { styled, Theme } from '@mui/material/styles';
import { MuiParagraph } from '../../utils/MuiTypography';

export const CAPTION_SIZE = {
    SMALL: 'small',
    NORMAL: 'normal',
} as const;

export type CaptionSize = (typeof CAPTION_SIZE)[keyof typeof CAPTION_SIZE];

interface CaptionProps {
    size?: CaptionSize;
    italic?: boolean;
    secondary?: boolean;
}

const getCaptionStyle = ({
    size,
    theme,
}: {
    size: CaptionSize;
    theme: Theme;
}) => {
    switch (size) {
        case 'small':
            return theme.typography.captionSmall;
        case 'normal':
        default:
            return theme.typography.caption;
    }
};
export const Caption = styled(MuiParagraph, {
    shouldForwardProp: (prop) =>
        'italic' !== prop && 'size' !== prop && 'secondary' !== prop,
})<CaptionProps>(({ theme, size = CAPTION_SIZE.NORMAL, italic, secondary }) => {
    return {
        ...getCaptionStyle({ size, theme }),
        fontStyle: italic ? 'italic' : undefined,
        color: secondary ? theme.palette.text.secondary : undefined,
    };
});
