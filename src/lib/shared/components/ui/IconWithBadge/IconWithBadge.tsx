import { Badge as MuiBadge, BadgeProps } from '@mui/material';
import { styled } from '@mui/material/styles';
import { ReactNode } from 'react';
import { IconButton, BUTTON_TYPE } from '../Button';

interface IconWithBadgeProps {
    icon: ReactNode;
    onClick?: () => void;
    badgeCount?: number;
    'aria-label'?: string;
    maxValue?: number;
    showZero?: boolean;
}

export const IconWithBadge = ({
    icon,
    onClick,
    badgeCount,
    maxValue,
    showZero,
    ...props
}: IconWithBadgeProps) => {
    return (
        // TODO: Move button out
        <IconButton
            aria-label={props['aria-label']}
            type={BUTTON_TYPE.TEXT}
            onClick={onClick}
        >
            <Badge
                showZero={showZero}
                isSingleDigit={(badgeCount ?? 0) < 10}
                badgeContent={badgeCount}
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
        left: 0,
        width: isSingleDigit ? '20px' : undefined,
        minWidth: '20px',
        transform: 'scale(1) translate(-40%, -30%);',
        transformOrigin: '',
    },
}));
