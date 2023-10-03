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
    'data-testid'?: string;
    v3?: boolean;
}

export const IconButtonWithBadge = ({
    icon,
    onClick,
    badgeCount,
    maxValue,
    showZero,
    v3,
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
                v3={!!v3}
                showZero={showZero}
                isSingleDigit={(badgeCount ?? 0) < 10}
                badgeContent={badgeCount}
                variant={v3 ? 'dot' : undefined}
                color="error"
                max={maxValue ?? 9}
                anchorOrigin={
                    v3
                        ? {
                              vertical: 'top',
                              horizontal: 'right',
                          }
                        : undefined
                }
            >
                {icon}
            </Badge>
        </IconButton>
    );
};

const Badge = styled(MuiBadge, {
    shouldForwardProp: (prop) =>
        !['v3', 'isSingleDigit'].includes(prop as string),
})<BadgeProps & { isSingleDigit: boolean; v3: boolean }>(
    ({ theme, isSingleDigit, v3 }) => ({
        color: theme.palette.text.primary,
        '& .MuiBadge-badge': {
            transformOrigin: '',
            ...(v3
                ? {
                      border: `2px solid ${theme.palette.background.paper}`,
                      width: '12px',
                      height: '12px',
                      borderRadius: '50%',
                      right: '3px',
                      top: '4px',
                  }
                : {
                      transform: 'scale(1) translate(-40%, -30%);',
                      left: 0,
                      minWidth: '20px',
                      width: isSingleDigit ? '20px' : undefined,
                  }),
        },
    })
);
