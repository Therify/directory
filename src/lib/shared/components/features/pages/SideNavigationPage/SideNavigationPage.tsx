import { useState } from 'react';
import { List, Box } from '@mui/material';
import { styled, useTheme } from '@mui/material/styles';
import {
    Banner,
    Button,
    BUTTON_TYPE,
    BannerProps,
} from '@/lib/shared/components/ui';
import { ActionNavListItem } from '@/lib/shared/components/ui/Navigation/NavigationMenu';
import { NavigationLink, URL_PATHS } from '@/lib/sitemap';
import { usePlanMonitoring, useFeatureFlags } from '@/lib/shared/hooks';
import { TherifyUser } from '@/lib/shared/types';
import {
    SideNavigationLayout,
    NavigationDrawer,
    SecondaryTopBar,
    SideNavigationBar,
} from '@/lib/shared/components/ui';

import { NotificationDrawer } from '@/lib/modules/notifications/components/ui';
import { useInAppNotifications } from '@/lib/modules/notifications/components/hooks';

export interface SideNavigationPageProps {
    primaryMenu: NavigationLink[];
    secondaryMenu: NavigationLink[];
    mobileMenu: NavigationLink[];
    currentPath: string;
    onNavigate: (path: string) => void;
    user?: TherifyUser.TherifyUser;
    actionLink?: NavigationLink;
    isLoadingUser?: boolean;
    chatNotifications?: { [pathToChat: string]: number };
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
    chatNotifications,
    children,
}: SideNavigationPageProps) => {
    const { hasAccess } = usePlanMonitoring(user);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const theme = useTheme();
    const { flags } = useFeatureFlags(user);
    const {
        display: notificationDrawer,
        notifications,
        unreadCount: unreadNotificationsCount,
        clearActionlessNotifications,
        handleAction,
        getNotificationsMapForMenu,
    } = useInAppNotifications();
    const inAppNotificationsMap = getNotificationsMapForMenu(
        hasAccess ? primaryMenu : []
    );
    const notificationMap = {
        ...inAppNotificationsMap,
        ...(chatNotifications ?? {}),
    };
    const unreadMessagesCount = Object.values(chatNotifications ?? {}).reduce(
        (acc, count) => acc + count,
        0
    );
    return (
        <SideNavigationLayout
            bannerSlot={
                flags.bannerContent.message && (
                    <Banner
                        message={flags.bannerContent.message}
                        color={
                            flags.bannerContent.color as BannerProps['color']
                        }
                        linkText={flags.bannerContent.linkText}
                        linkUrl={flags.bannerContent.linkUrl}
                    />
                )
            }
            topbarSlot={
                <SecondaryTopBar
                    menu={secondaryMenu}
                    currentPath={currentPath}
                    onNavigate={onNavigate}
                    unreadMessagesCount={unreadMessagesCount}
                    notificationCount={unreadNotificationsCount}
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
                    navigationMenu={hasAccess ? primaryMenu : []}
                    onNavigate={onNavigate}
                    actionLink={actionLink}
                    notificationMap={notificationMap}
                />
            }
        >
            {children}
            <NavigationDrawer
                user={user!}
                currentPath={currentPath}
                isOpen={isMobileMenuOpen}
                onClose={() => setIsMobileMenuOpen(false)}
                navigationMenu={hasAccess ? mobileMenu : secondaryMenu}
                notificationsMap={notificationMap}
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
