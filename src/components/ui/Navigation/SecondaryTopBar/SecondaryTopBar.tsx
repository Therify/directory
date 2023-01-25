import React, { PropsWithChildren } from 'react';
import {
    NotificationsOutlined as NotificationsIcon,
    MenuRounded as MenuIcon,
} from '@mui/icons-material';
import { Box, useMediaQuery } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import { TopBar } from '../../TopBar';
import { IconWithBadge } from '../../IconWithBadge';
import { BUTTON_TYPE, IconButton } from '../../Button';
import { FloatingMenu } from '../FloatingMenu';
import { Avatar } from '../../Avatar';
import { NavigationLink } from '@/lib/sitemap';
import { TherifyUser } from '@/lib/hooks';

export const SecondaryTopBar = ({
    currentPath,
    user,
    menu,
    onNavigate,
    onShowNotifications,
    notificationCount,
    toggleMobileMenu,
}: {
    user?: TherifyUser;
    currentPath: string;
    menu: NavigationLink[];
    notificationCount?: number;
    toggleMobileMenu: () => void;
    onNavigate: (path: string) => void;
    onShowNotifications?: () => void;
}) => {
    const theme = useTheme();
    const isMobileWidth = useMediaQuery(theme.breakpoints.down('md'));
    return (
        <TopBar
            rightSlot={
                <Box display="flex">
                    <IconWithBadge
                        onClick={onShowNotifications}
                        aria-label={`${notificationCount} Notifications`}
                        badgeCount={notificationCount}
                        icon={<NotificationsIcon />}
                    />

                    <Box paddingLeft={2}>
                        {isMobileWidth ? (
                            <IconButton
                                color="info"
                                type={BUTTON_TYPE.TEXT}
                                onClick={toggleMobileMenu}
                                style={{
                                    color: theme.palette.text.primary,
                                }}
                            >
                                <MenuIcon fontSize="large" />
                            </IconButton>
                        ) : (
                            <FloatingMenu
                                currentPath={currentPath}
                                navigationMenu={menu}
                                onNavigate={onNavigate}
                                menuLauncher={<Avatar src={user?.avatarUrl} />}
                            />
                        )}
                    </Box>
                </Box>
            }
        />
    );
};
