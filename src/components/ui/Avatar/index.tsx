import { PersonRounded as PersonIcon } from '@mui/icons-material';
import { Avatar as MuiAvatar } from '@mui/material';
import { useTheme, SxProps, Theme } from '@mui/material/styles';
import { colors } from '../../themes/therify-design-system';

export const AVATAR_SIZE = {
    EXTRA_SMALL: 6,
    SMALL: 8,
    MEDIUM: 10,
    LARGE: 12,
    XLARGE: 14,
    XXLARGE: 16,
    HUGE: 24,
    XHUGE: 32,
    XXHuge: 55,
} as const;

export type AvatarSize = typeof AVATAR_SIZE[keyof typeof AVATAR_SIZE];

export const AVATAR_COLOR = {
    PRIMARY: 'primary',
    SECONDARY_ORANGE: 'orange',
    SECONDARY_BLUE: 'blue',
    SECONDARY_PURPLE: 'purple',
    SECONDARY_PINK: 'pink',
    SECONDARY_PEACH: 'peach',
} as const;

export type AvatarColor = typeof AVATAR_COLOR[keyof typeof AVATAR_COLOR];

interface AvatarProps {
    src?: string;
    alt?: string;
    size?: AvatarSize;
    color?: AvatarColor;
    sx?: SxProps<Theme>;
    hideIcon?: boolean;
}

export const TEST_IDS = {
    AVATAR: 'avatar',
    ICON: 'avatar-icon',
};

export const Avatar = ({
    src,
    alt,
    size = AVATAR_SIZE.MEDIUM,
    color = AVATAR_COLOR.PRIMARY,
    hideIcon,
    sx,
}: AvatarProps) => {
    const theme = useTheme();
    const palette = getColorPalette(color);
    return (
        <MuiAvatar
            data-testid={TEST_IDS.AVATAR}
            src={src}
            alt={alt ?? 'user avatar'}
            sx={{
                width: theme.spacing(size),
                height: theme.spacing(size),
                backgroundColor: palette[50],
                ...sx,
            }}
        >
            {!src && !hideIcon && (
                <PersonIcon
                    data-testid={TEST_IDS.ICON}
                    sx={{
                        fill: palette[600],
                        width: '70%',
                        height: '70%',
                    }}
                />
            )}
        </MuiAvatar>
    );
};

export const AVATAR_COLOR_MAP = {
    [AVATAR_COLOR.PRIMARY]: colors.primary,
    [AVATAR_COLOR.SECONDARY_ORANGE]: colors.secondary.orange,
    [AVATAR_COLOR.SECONDARY_BLUE]: colors.secondary.blue,
    [AVATAR_COLOR.SECONDARY_PURPLE]: colors.secondary.purple,
    [AVATAR_COLOR.SECONDARY_PINK]: colors.secondary.pink,
    [AVATAR_COLOR.SECONDARY_PEACH]: colors.secondary.peach,
};

const getColorPalette = (color: AvatarColor) => {
    return AVATAR_COLOR_MAP[color];
};
