import { styled, Theme } from '@mui/material/styles';
import { MuiH2 } from '../utils/MuiTypography';

export const SUBHEAD_SIZE = {
    EXTRA_SMALL: 'extra-small',
    SMALL: 'small',
    MEDIUM: 'medium',
    LARGE: 'large',
} as const;

export type SubheadSize = typeof SUBHEAD_SIZE[keyof typeof SUBHEAD_SIZE];

interface SubheadProps {
    size?: SubheadSize;
}

const getSubheadStyle = ({
    size,
    theme,
}: {
    size: SubheadSize;
    theme: Theme;
}) => {
    switch (size) {
        case SUBHEAD_SIZE.EXTRA_SMALL:
            return theme.typography.subtitle1;
        case SUBHEAD_SIZE.SMALL:
            return theme.typography.subtitle2;
        case SUBHEAD_SIZE.LARGE:
            return theme.typography.subtitle4;
        case SUBHEAD_SIZE.MEDIUM:
        default:
            return theme.typography.subtitle3;
    }
};
export const Subhead = styled(MuiH2)<SubheadProps>(
    ({ theme, size = SUBHEAD_SIZE.MEDIUM }) => {
        return {
            ...getSubheadStyle({ size, theme }),
        };
    }
);
