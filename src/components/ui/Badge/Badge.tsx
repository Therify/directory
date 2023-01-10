import { Chip } from '@mui/material';
import { styled, Theme, useTheme } from '@mui/material/styles';
import {
    CSSProperties,
    JSXElementConstructor,
    PropsWithChildren,
    ReactElement,
} from 'react';
import { colors } from '../../themes/therify-design-system';

export const BADGE_SIZE = {
    SMALL: 'small',
    MEDIUM: 'medium',
    LARGE: 'large',
} as const;

export type BadgeSize = typeof BADGE_SIZE[keyof typeof BADGE_SIZE];

export const BADGE_TYPE = {
    CONTAINED: 'contained',
    OUTLINED: 'outlined',
} as const;

export type BadgeType = typeof BADGE_TYPE[keyof typeof BADGE_TYPE];

export const BADGE_COLOR = {
    PRIMARY: 'primary',
    PRIMARY_LIGHT: 'primary-light',
    NEUTRAL: 'neutral',
    NEUTRAL_LIGHT: 'neutral-light',
} as const;

export type BadgeColor = typeof BADGE_COLOR[keyof typeof BADGE_COLOR];

export const TEST_IDS = {
    BADGE: 'badge',
};

interface BadgeProps {
    color?: BadgeColor;
    size?: BadgeSize;
    type?: BadgeType;
    icon?: ReactElement<unknown, string | JSXElementConstructor<unknown>>;
    style?: CSSProperties;
}

const getBadgeSize = (size: BadgeSize, theme: Theme) => {
    switch (size) {
        case BADGE_SIZE.SMALL:
            return {
                fontSize: '0.75rem',
                padding: `${theme.spacing(1)} ${theme.spacing(2)}`,
            };
        case BADGE_SIZE.MEDIUM:
            return {
                fontSize: '0.875rem',
                padding: `${theme.spacing(1)} ${theme.spacing(3)}`,
            };
        case BADGE_SIZE.LARGE:
        default:
            return {
                fontSize: '0.875rem',
                padding: `${theme.spacing(2)} ${theme.spacing(4)}`,
            };
    }
};
const getBadgeColor = ({
    color,
    type,
    theme,
}: {
    color: BadgeColor;
    type: BadgeType;
    theme: Theme;
}) => {
    switch (color) {
        case BADGE_COLOR.PRIMARY:
            return {
                border: `1px solid ${colors.primary[400]}`,
                background:
                    type === BADGE_TYPE.CONTAINED
                        ? theme.palette.primary.main
                        : 'transparent',
                color:
                    type === BADGE_TYPE.CONTAINED
                        ? theme.palette.primary.contrastText
                        : theme.palette.primary.main,
            };
        case BADGE_COLOR.PRIMARY_LIGHT:
            return {
                border: `1px solid ${colors.primary[50]}`,
                background:
                    type === BADGE_TYPE.CONTAINED
                        ? colors.primary[50]
                        : 'transparent',
                color:
                    type === BADGE_TYPE.CONTAINED
                        ? colors.primary[700]
                        : colors.primary[50],
            };
        case BADGE_COLOR.NEUTRAL:
            return {
                border: `1px solid ${colors.shades[100]}`,
                background:
                    type === BADGE_TYPE.CONTAINED
                        ? colors.shades[100]
                        : 'transparent',
                color:
                    type === BADGE_TYPE.CONTAINED
                        ? colors.shades[0]
                        : colors.shades[100],
            };
        case BADGE_COLOR.NEUTRAL_LIGHT:
        default:
            return {
                border: `1px solid ${colors.neutral.black[100]}`,
                background:
                    type === BADGE_TYPE.CONTAINED
                        ? colors.neutral.black[100]
                        : 'transparent',
                color:
                    type === BADGE_TYPE.CONTAINED
                        ? colors.shades[100]
                        : colors.neutral.black[100],
            };
    }
};

export const Badge = ({
    color = BADGE_COLOR.PRIMARY,
    size = BADGE_SIZE.MEDIUM,
    type = BADGE_TYPE.CONTAINED,
    icon,
    style,
    children,
}: PropsWithChildren<BadgeProps>) => {
    const theme = useTheme();
    const colorStyles = getBadgeColor({ color, type, theme });
    const sizeStyles = getBadgeSize(size, theme);

    return (
        <ChipUi
            data-testid={TEST_IDS.BADGE}
            icon={icon}
            label={children}
            iconColor={colorStyles.color}
            iconSize={sizeStyles.fontSize}
            style={{
                ...colorStyles,
                ...sizeStyles,
                ...style,
            }}
        />
    );
};

const ChipUi = styled(Chip, {
    shouldForwardProp: (prop) => 'iconColor' !== prop && 'iconSize' !== prop,
})<{ iconColor: string; iconSize: string }>((props) => ({
    borderRadius: props.theme.shape.borderRadius,
    fontWeight: 500,
    '& .MuiChip-label': {
        padding: 0,
    },
    '& .MuiChip-icon': {
        color: props.iconColor,
        margin: 0,
        marginRight: props.theme.spacing(1),
        fontSize: props.iconSize,
    },
}));
