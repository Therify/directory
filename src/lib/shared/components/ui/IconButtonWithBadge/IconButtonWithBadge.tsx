import { Badge as MuiBadge, BadgeProps } from '@mui/material';
import { styled } from '@mui/material/styles';
import { ReactNode } from 'react';
import { IconButton, BUTTON_TYPE } from '../Button';

interface IconButtonWithBadgeProps {
    icon: ReactNode;
    onClick?: () => void;
    badgeCount?: number;
    'aria-label'?: string;
    maxValue?: number;
    showZero?: boolean;
    hideBadgeCount?: boolean;
    'data-testid'?: string;
}

export const IconButtonWithBadge = ({
    icon,
    onClick,
    badgeCount,
    maxValue,
    showZero,
    hideBadgeCount,
    ...props
}: IconButtonWithBadgeProps) => {
    return (
        <IconButton
            data-testid={props['data-testid']}
            aria-label={props['aria-label']}
            type={BUTTON_TYPE.TEXT}
            onClick={onClick}
        >
            <Badge
                showZero={showZero}
                isSingleDigit={(badgeCount ?? 0) < 10}
                badgeContent={hideBadgeCount ? undefined : badgeCount}
                color="error"
                max={maxValue ?? 9}
            >
                {icon}
            </Badge>
        </IconButton>
    );
};

const Badge = styled(MuiBadge, {
    shouldForwardProp: (prop) => prop !== 'isSingleDigit',
})<BadgeProps & { isSingleDigit: boolean }>(({ theme, isSingleDigit }) => ({
    color: theme.palette.text.primary,
    '& .MuiBadge-badge': {
        // left: 0,
        width: isSingleDigit ? '20px' : undefined,
        minWidth: '20px',
        transform: 'scale(1) translate(-40%, -30%);',
        transformOrigin: '',
    },
}));
