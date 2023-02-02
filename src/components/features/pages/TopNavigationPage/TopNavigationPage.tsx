import { useState } from 'react';
import { Box } from '@mui/material';
import { LogoutRounded as LogoutIcon } from '@mui/icons-material';
import { styled, useTheme } from '@mui/material/styles';
import { NavigationLink, URL_PATHS } from '@/lib/sitemap';
import { TherifyUser } from '@/lib/hooks';
import {
    Button,
    BUTTON_TYPE,
    TopNavigationLayout,
    NavigationDrawer,
    MarketingSiteDrawer,
    TopNavigationBar,
} from '@/components/ui';
import { NotificationDrawer } from '../../in-app-notifications/ui';
import { useInAppNotificationDrawer } from '../../in-app-notifications/hooks';

interface TopNavigationPageProps {
    primaryMenu: NavigationLink[];
    secondaryMenu: NavigationLink[];
    mobileMenu: NavigationLink[];
    currentPath: string;
    onNavigate: (path: string) => void;
    user?: TherifyUser;
    isLoadingUser: boolean;
    children?: React.ReactNode;
}
export const TopNavigationPage = ({
    primaryMenu,
    secondaryMenu,
    mobileMenu,
    currentPath,
    onNavigate,
    user,
    isLoadingUser,
    children,
}: TopNavigationPageProps) => {
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
        <TopNavigationLayout
            navigationSlot={
                user && (
                    <TopNavigationBar
                        currentPath={currentPath}
                        primaryMenu={primaryMenu}
                        secondaryMenu={secondaryMenu}
                        onNavigate={onNavigate}
                        onShowNotifications={notificationDrawer.open}
                        notificationCount={unreadCount}
                        toggleMobileMenu={() =>
                            setIsMobileMenuOpen(!isMobileMenuOpen)
                        }
                        user={user}
                        isLoadingUser={isLoadingUser}
                        withTherifyWebsiteLink
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
                    navigationMenu={mobileMenu}
                    notificationsMap={getNotificationsMapForMenu(mobileMenu)}
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
                    onClearNotifications={() => {
                        //TODO: clear notifications
                        console.log('clearing notifications');
                    }}
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
