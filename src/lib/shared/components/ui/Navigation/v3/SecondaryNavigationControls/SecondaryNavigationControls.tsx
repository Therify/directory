import {
    NotificationsOutlined as NotificationsIcon,
    MenuRounded as MenuIcon,
    MailOutline as MailIcon,
} from '@mui/icons-material';
import { Box, CircularProgress } from '@mui/material';
import { styled } from '@mui/material/styles';
import { NavigationLink } from '@/lib/sitemap';
import { TherifyUser } from '@/lib/shared/types/therify-user';
import { IconButtonWithBadge } from '../../../IconButtonWithBadge';
import { FloatingMenu } from '../../FloatingMenu';
import { Avatar } from '../../../Avatar';

interface SecondaryNavigationControlsProps {
    onNotificationsClick: () => void;
    onMessagesClick: () => void;
    notificationCount?: number;
    unreadMessagesCount?: number;
    isMobileWidth: boolean;
    toggleMobileMenu: () => void;
    currentPath: string;
    menu: NavigationLink[];
    onNavigate: (path: string) => void;
    user?: TherifyUser.TherifyUser;
    isLoadingUser: boolean;
}
export const TEST_IDS = {
    MOBILE_MENU_ICON: 'mobile-menu-icon',
    NOTIFICATIONS_ICON: 'notifications-icon',
    MESSAGES_ICON: 'messages-icon',
    SECONDARY_MENU: 'secondary-menu',
    LOADER: 'loader',
} as const;

export const SecondaryNavigationControls = ({
    onNotificationsClick,
    notificationCount,
    onMessagesClick,
    unreadMessagesCount,
    isMobileWidth,
    toggleMobileMenu,
    currentPath,
    menu,
    onNavigate,
    user,
    isLoadingUser,
}: SecondaryNavigationControlsProps) => {
    if (isLoadingUser) {
        return (
            <CircularProgress
                data-testid={TEST_IDS.LOADER}
                sx={{
                    height: 48,
                }}
            />
        );
    }
    if (!user) {
        return null;
    }
    return (
        <Container>
            {/* TODO: handle covered sessions count here */}
            {!isMobileWidth && (
                <IconButtonWithBadge
                    v3
                    data-testid={TEST_IDS.MESSAGES_ICON}
                    onClick={onMessagesClick}
                    aria-label={`${unreadMessagesCount ?? 0} new messages`}
                    badgeCount={unreadMessagesCount}
                    icon={<MailIcon />}
                />
            )}

            <IconButtonWithBadge
                v3
                data-testid={TEST_IDS.NOTIFICATIONS_ICON}
                onClick={onNotificationsClick}
                aria-label={`${notificationCount ?? 0} new notifications`}
                badgeCount={notificationCount}
                icon={<NotificationsIcon />}
            />

            <Box paddingLeft={2}>
                {isMobileWidth ? (
                    <MobileMenuLauncher
                        onClick={toggleMobileMenu}
                        menuBadgeCount={unreadMessagesCount}
                    />
                ) : (
                    <SecondaryMenu
                        user={user}
                        menu={menu}
                        onNavigate={onNavigate}
                        currentPath={currentPath}
                    />
                )}
            </Box>
        </Container>
    );
};

const MobileMenuLauncher = ({
    onClick,
    menuBadgeCount,
}: {
    onClick: SecondaryNavigationControlsProps['toggleMobileMenu'];
    menuBadgeCount?: SecondaryNavigationControlsProps['unreadMessagesCount'];
}) => (
    <IconButtonWithBadge
        v3
        data-testid={TEST_IDS.MOBILE_MENU_ICON}
        onClick={onClick}
        badgeCount={menuBadgeCount}
        icon={<MenuIcon fontSize="large" />}
    />
);

const SecondaryMenu = ({
    user,
    menu,
    onNavigate,
    currentPath,
}: {
    menu: SecondaryNavigationControlsProps['menu'];
    onNavigate: SecondaryNavigationControlsProps['onNavigate'];
    user: Exclude<SecondaryNavigationControlsProps['user'], undefined>;
    currentPath: SecondaryNavigationControlsProps['currentPath'];
}) => {
    return (
        <FloatingMenu
            data-testid={TEST_IDS.SECONDARY_MENU}
            currentPath={currentPath}
            navigationMenu={menu}
            onNavigate={onNavigate}
            menuLauncher={<Avatar src={user.avatarUrl} />}
        />
    );
};

const Container = styled(Box)(({ theme }) => ({
    display: 'flex',
    '& > *': {
        marginLeft: theme.spacing(2),
        '&:first-of-type': {
            marginLeft: 0,
        },
    },
}));
