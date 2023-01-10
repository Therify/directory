import { styled, Theme } from '@mui/material/styles';
import { MuiSpan } from '../../utils/MuiTypography';

export const OVERLINE_SIZE = {
    SMALL: 'small',
    MEDIUM: 'medium',
    LARGE: 'large',
} as const;

export type OverlineSize = typeof OVERLINE_SIZE[keyof typeof OVERLINE_SIZE];

interface OverlineProps {
    size?: OverlineSize;
}

const getOverlineStyle = ({
    size,
    theme,
}: {
    size: OverlineSize;
    theme: Theme;
}) => {
    switch (size) {
        case OVERLINE_SIZE.SMALL:
            return theme.typography.overlineSmall;
        case OVERLINE_SIZE.LARGE:
            return theme.typography.overlineLarge;
        case OVERLINE_SIZE.MEDIUM:
        default:
            return theme.typography.overline;
    }
};
export const Overline = styled(MuiSpan)<OverlineProps>(
    ({ theme, size = OVERLINE_SIZE.MEDIUM }) => {
        return {
            ...getOverlineStyle({ size, theme }),
        };
    }
);
