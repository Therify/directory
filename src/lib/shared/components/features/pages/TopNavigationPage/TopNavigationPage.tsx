import { useState } from 'react';
import { Box } from '@mui/material';
import { LogoutRounded as LogoutIcon } from '@mui/icons-material';
import { styled, useTheme } from '@mui/material/styles';
import { NavigationLink, URL_PATHS } from '@/lib/sitemap';
import { TherifyUser } from '@/lib/shared/types';
import { usePlanMonitoring, useFeatureFlags } from '@/lib/shared/hooks';
import {
    Banner,
    BannerProps,
    Button,
    BUTTON_TYPE,
    TopNavigationLayout,
    NavigationDrawer,
    MarketingSiteDrawer,
    TopNavigationBar,
} from '@/lib/shared/components/ui';
import { NotificationDrawer } from '../../../../../modules/notifications/components/ui';
import { useInAppNotificationDrawer } from '../../../../../modules/notifications/components/hooks';

export interface TopNavigationPageProps {
    primaryMenu: NavigationLink[];
    secondaryMenu: NavigationLink[];
    mobileMenu: NavigationLink[];
    currentPath: string;
    onNavigate: (path: string) => void;
    user: TherifyUser.TherifyUser | null;
    isLoadingUser: boolean;
    chatNotifications?: { [pathToChat: string]: number };
    children?: React.ReactNode;
}
/**
 * @deprecated Use role-based navigation page navigation components instead except for in role-based navigation page components themselves
 */
export const TopNavigationPage = ({
    primaryMenu,
    secondaryMenu,
    mobileMenu,
    currentPath,
    onNavigate,
    user,
    isLoadingUser,
    chatNotifications,
    children,
}: TopNavigationPageProps) => {
    const { hasAccess } = usePlanMonitoring(user);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const theme = useTheme();
    const { flags } = useFeatureFlags(user ?? undefined);
    const {
        drawer: notificationDrawer,
        notifications,
        unreadCount,
        clearActionlessNotifications,
        handleAction,
        getNotificationsMapForMenu,
    } = useInAppNotificationDrawer();

    const notificationsMap = {
        ...getNotificationsMapForMenu(hasAccess ? mobileMenu : secondaryMenu),
        ...chatNotifications,
    };
    const unreadMessagesCount = Object.values(chatNotifications ?? {}).reduce(
        (acc, count) => acc + count,
        0
    );
    return (
        <TopNavigationLayout
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
            navigationSlot={
                user && (
                    <TopNavigationBar
                        currentPath={currentPath}
                        primaryMenu={hasAccess ? primaryMenu : []}
                        secondaryMenu={secondaryMenu}
                        onNavigate={onNavigate}
                        onShowNotifications={notificationDrawer.open}
                        notificationCount={unreadCount}
                        unreadMessagesCount={unreadMessagesCount}
                        toggleMobileMenu={() =>
                            setIsMobileMenuOpen(!isMobileMenuOpen)
                        }
                        notificationsMap={notificationsMap}
                        user={user}
                        isLoadingUser={isLoadingUser}
                    />
                )
            }
        >
            {children}
            {user ? (
                <NavigationDrawer
                    user={user}
                    currentPath={currentPath}
                    isOpen={isMobileMenuOpen}
                    onClose={() => setIsMobileMenuOpen(false)}
                    navigationMenu={hasAccess ? mobileMenu : secondaryMenu}
                    notificationsMap={notificationsMap}
                    onNavigate={(path) => {
                        onNavigate(path);
                        setIsMobileMenuOpen(false);
                    }}
                >
                    <Box
                        display="flex"
                        justifyContent="flex-end"
                        flexDirection="column"
                        marginTop={theme.spacing(8)}
                    >
                        <LogoutButton
                            type={BUTTON_TYPE.OUTLINED}
                            onClick={() => onNavigate(URL_PATHS.AUTH.LOGOUT)}
                            startIcon={<LogoutIcon />}
                        >
                            Logout
                        </LogoutButton>
                    </Box>
                </NavigationDrawer>
            ) : (
                <MarketingSiteDrawer
                    isOpen={isMobileMenuOpen}
                    onClose={() => setIsMobileMenuOpen(false)}
                >
                    <Box
                        display="flex"
                        justifyContent="flex-end"
                        flexDirection="column"
                        marginTop={theme.spacing(8)}
                    >
                        <Button
                            type={BUTTON_TYPE.OUTLINED}
                            onClick={() =>
                                onNavigate(URL_PATHS.MEMBERS.REGISTER)
                            }
                            style={{ marginBottom: theme.spacing(4) }}
                        >
                            Sign up free
                        </Button>
                        <Button
                            onClick={() => onNavigate(URL_PATHS.DIRECTORY.ROOT)}
                        >
                            Find providers
                        </Button>
                    </Box>
                </MarketingSiteDrawer>
            )}
            {user && (
                <NotificationDrawer
                    isOpen={notificationDrawer.isOpen}
                    notifications={notifications}
                    onClose={() => {
                        notificationDrawer.close();
                        clearActionlessNotifications();
                    }}
                    onNotificationClicked={handleAction}
                />
            )}
        </TopNavigationLayout>
    );
};

const LogoutButton = styled(Button)(({ theme }) => ({
    color: theme.palette.text.primary,
    border: `1px solid ${theme.palette.text.primary}`,
    backgroundColor: 'transparent',
    width: '100%',
    '&:hover': {
        backgroundColor: theme.palette.primary.main,
        color: theme.palette.primary.contrastText,
    },
}));
