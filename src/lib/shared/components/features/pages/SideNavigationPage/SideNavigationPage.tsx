import { useState } from 'react';
import { List, Box } from '@mui/material';
import { styled, useTheme } from '@mui/material/styles';
import { Button, BUTTON_TYPE } from '@/lib/shared/components/ui';
import { ActionNavListItem } from '@/lib/shared/components/ui/Navigation/NavigationMenu';
import { NavigationLink, URL_PATHS } from '@/lib/sitemap';
import { usePlanMonitoring } from '@/lib/shared/hooks';
import { TherifyUser } from '@/lib/shared/types';
import {
    SideNavigationLayout,
    NavigationDrawer,
    SecondaryTopBar,
    SideNavigationBar,
} from '@/lib/shared/components/ui';

import { NotificationDrawer } from '@/lib/modules/notifications/components/ui';
import { useInAppNotificationDrawer } from '@/lib/modules/notifications/components/hooks';

export interface SideNavigationPageProps {
    primaryMenu: NavigationLink[];
    secondaryMenu: NavigationLink[];
    mobileMenu: NavigationLink[];
    currentPath: string;
    onNavigate: (path: string) => void;
    user?: TherifyUser.TherifyUser;
    actionLink?: NavigationLink;
    isLoadingUser?: boolean;
    children?: React.ReactNode;
}
/**
 * @deprecated Use role-based navigation page navigation components instead except for in role-based navigation page components themselves
 */
export const SideNavigationPage = ({
    primaryMenu,
    secondaryMenu,
    mobileMenu,
    currentPath,
    onNavigate,
    user,
    actionLink,
    isLoadingUser = false,
    children,
}: SideNavigationPageProps) => {
    usePlanMonitoring(user);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const theme = useTheme();
    const {
        drawer: notificationDrawer,
        notifications,
        unreadCount,
        clearActionlessNotifications,
        handleAction,
        getNotificationsMapForMenu,
    } = useInAppNotificationDrawer();
    return (
        <SideNavigationLayout
            topbarSlot={
                <SecondaryTopBar
                    menu={secondaryMenu}
                    currentPath={currentPath}
                    onNavigate={onNavigate}
                    notificationCount={unreadCount}
                    onShowNotifications={notificationDrawer.open}
                    user={user}
                    isLoadingUser={isLoadingUser}
                    toggleMobileMenu={() =>
                        setIsMobileMenuOpen(!isMobileMenuOpen)
                    }
                />
            }
            navigationSlot={
                <SideNavigationBar
                    currentPath={currentPath}
                    navigationMenu={primaryMenu}
                    onNavigate={onNavigate}
                    actionLink={actionLink}
                    notificationMap={getNotificationsMapForMenu(primaryMenu)}
                />
            }
        >
            {children}
            <NavigationDrawer
                user={user!}
                currentPath={currentPath}
                isOpen={isMobileMenuOpen}
                onClose={() => setIsMobileMenuOpen(false)}
                navigationMenu={mobileMenu}
                notificationsMap={getNotificationsMapForMenu(mobileMenu)}
                onNavigate={(path) => {
                    onNavigate(path);
                    setIsMobileMenuOpen(false);
                }}
            >
                {actionLink && (
                    <List
                        style={{ width: '100%', margin: theme.spacing(10, 0) }}
                    >
                        <ActionNavListItem
                            link={actionLink}
                            onItemClicked={() => onNavigate(actionLink.path)}
                        />
                    </List>
                )}
                <Box display="flex" justifyContent="flex-end">
                    <LogoutButton
                        type={BUTTON_TYPE.OUTLINED}
                        onClick={() => onNavigate(URL_PATHS.AUTH.LOGOUT)}
                    >
                        Logout
                    </LogoutButton>
                </Box>
            </NavigationDrawer>
            {user && (
                <NotificationDrawer
                    isOpen={notificationDrawer.isOpen}
                    notifications={notifications}
                    onClose={() => {
                        notificationDrawer.close();
                        clearActionlessNotifications();
                    }}
                    onNotificationClicked={handleAction}
                    onClearNotifications={() => {
                        console.log('clearing notifications');
                    }}
                />
            )}
        </SideNavigationLayout>
    );
};

const LogoutButton = styled(Button)(({ theme }) => ({
    color: theme.palette.text.primary,
    border: `1px solid ${theme.palette.text.primary}`,
    backgroundColor: 'transparent',
    '&:hover': {
        backgroundColor: theme.palette.primary.main,
        color: theme.palette.primary.contrastText,
    },
}));
