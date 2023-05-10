import { Theme, styled } from '@mui/material/styles';
import { Box, Link } from '@mui/material';
import { Paragraph } from '../Typography/Paragraph';
import { ArrowCircleRightRounded } from '@mui/icons-material';

export interface BannerProps {
    message: string;
    color?: 'primary' | 'secondary' | 'success' | 'error' | 'warning' | 'info';
    linkUrl?: string;
    linkText?: string;
}

export const TEST_IDS = {
    LINK: 'link',
    ARROW_ICON: 'arrow-icon',
} as const;

export const Banner = ({ message, color, linkUrl, linkText }: BannerProps) => {
    return (
        <BannerContainer color={color}>
            <Paragraph noMargin>{message}</Paragraph>
            {linkUrl && (
                <Link href={linkUrl} data-testid={TEST_IDS.LINK}>
                    {linkText ?? (
                        <ArrowCircleRightRounded
                            data-testid={TEST_IDS.ARROW_ICON}
                        />
                    )}
                </Link>
            )}
        </BannerContainer>
    );
};

const BannerContainer = styled(Box, {
    shouldForwardProp: (prop) => prop !== 'color',
})<{ color: BannerProps['color'] }>(({ theme, color: colorInput }) => {
    const { color, background } = getColor(colorInput, theme);
    return {
        width: '100%',
        height: '70px',
        padding: theme.spacing(4, 8),
        textAlign: 'center',
        color,
        background,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        '& a': {
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color,
            textDecorationColor: color,
            padding: theme.spacing(2),
        },
    };
});

function getColor(color: BannerProps['color'], { palette }: Theme) {
    switch (color) {
        case 'secondary':
            return {
                background: palette.secondary.main,
                color: palette.secondary.contrastText,
            };
        case 'error':
            return {
                background: palette.error.main,
                color: palette.error.contrastText,
            };
        case 'info':
            return {
                background: palette.info.main,
                color: palette.info.contrastText,
            };
        case 'warning':
            return {
                background: palette.warning.main,
                color: palette.warning.contrastText,
            };
        case 'success':
            return {
                background: palette.success.main,
                color: palette.success.contrastText,
            };
        case 'primary':
        default:
            return {
                background: palette.primary.main,
                color: palette.primary.contrastText,
            };
    }
}
