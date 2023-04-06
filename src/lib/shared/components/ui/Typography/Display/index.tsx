import { styled, Theme } from '@mui/material/styles';
import {
    MuiH1,
    MuiH2,
    MuiH3,
    MuiH4,
    MuiH5,
    MuiH6,
} from '../utils/MuiTypography';
import { PropsWithChildren, useMemo } from 'react';

export const DISPLAY_SIZE = {
    SMALL: 'small',
    MEDIUM: 'medium',
    LARGE: 'large',
} as const;

export type DisplaySize = (typeof DISPLAY_SIZE)[keyof typeof DISPLAY_SIZE];

export const DISPLAY_ELEMENT = {
    H1: 'h1',
    H2: 'h2',
    H3: 'h3',
    H4: 'h4',
    H5: 'h5',
    H6: 'h6',
} as const;

export type DisplayElement =
    (typeof DISPLAY_ELEMENT)[keyof typeof DISPLAY_ELEMENT];

interface DisplayProps {
    size?: DisplaySize;
}

const getDisplayStyle = ({
    size,
    theme: { typography },
}: {
    size: DisplaySize;
    theme: Theme;
}) => {
    switch (size) {
        case DISPLAY_SIZE.SMALL:
            return { ...typography.displaySmall };
        case DISPLAY_SIZE.LARGE:
            return { ...typography.displayLarge };
        case DISPLAY_SIZE.MEDIUM:
        default:
            return { ...typography.display };
    }
};

export const DISPLAY_ELEMENT_MAP = {
    [DISPLAY_ELEMENT.H1]: MuiH1,
    [DISPLAY_ELEMENT.H2]: MuiH2,
    [DISPLAY_ELEMENT.H3]: MuiH3,
    [DISPLAY_ELEMENT.H4]: MuiH4,
    [DISPLAY_ELEMENT.H5]: MuiH5,
    [DISPLAY_ELEMENT.H6]: MuiH6,
} as const;

const getDisplayElement = (as: DisplayElement) => DISPLAY_ELEMENT_MAP[as];

export const Display = ({
    as = DISPLAY_ELEMENT.H1,
    size = DISPLAY_SIZE.MEDIUM,
    children,
    ...props
}: PropsWithChildren<DisplayProps> & {
    as?: DisplayElement;
}) => {
    const DisplayComponent = useMemo(
        () =>
            styled(getDisplayElement(as))(({ theme }) =>
                getDisplayStyle({
                    theme,
                    size,
                })
            ),
        [as, size]
    );
    return <DisplayComponent {...props}>{children}</DisplayComponent>;
};
