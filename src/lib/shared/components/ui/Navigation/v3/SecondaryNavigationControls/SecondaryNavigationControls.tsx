import {
    NotificationsOutlined as NotificationsIcon,
    MenuRounded as MenuIcon,
    MailOutline as MailIcon,
} from '@mui/icons-material';
import { Box, CircularProgress } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import { IconButtonWithBadge } from '../../../IconButtonWithBadge';
import { BUTTON_TYPE, Button } from '../../../Button';
import { FloatingMenu } from '../../FloatingMenu';
import { Avatar } from '../../../Avatar';
import { NavigationLink, URL_PATHS } from '@/lib/sitemap';
import { TherifyUser } from '@/lib/shared/types/therify-user';

interface SecondaryNavigationControlsProps {
    onNotificationsClick?: () => void;
    onMessagesClick?: () => void;
    notificationCount?: number;
    unreadMessagesCount?: number;
    isMobileWidth: boolean;
    toggleMobileMenu: () => void;
    currentPath: string;
    menu: NavigationLink[];
    onNavigate: (path: string) => void;
    user?: TherifyUser.TherifyUser;
    isLoadingUser: boolean;
    withTherifyWebsiteLink?: boolean;
}
export const TEST_IDS = {
    MENU_ICON: 'menu-icon',
    NOTIFICATIONS_ICON: 'notifications-icon',
    MESSAGES_ICON: 'messages-icon',
    SECONDARY_MENU: 'secondary-menu',
    ACTION_BUTTONS: 'action-buttons',
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
    const theme = useTheme();
    if (isLoadingUser) {
        return (
            <CircularProgress
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
        <Box display="flex">
            {/* TODO: handle covered sessions count here */}
            {user && !isMobileWidth && (
                <IconButtonWithBadge
                    data-testid={TEST_IDS.MESSAGES_ICON}
                    onClick={onMessagesClick}
                    aria-label={`${unreadMessagesCount ?? 0} new messages`}
                    badgeCount={unreadMessagesCount}
                    // hideBadgeCount
                    icon={<MailIcon />}
                />
            )}
            {user && (
                <IconButtonWithBadge
                    data-testid={TEST_IDS.NOTIFICATIONS_ICON}
                    onClick={onNotificationsClick}
                    aria-label={`${notificationCount ?? 0} new notifications`}
                    badgeCount={notificationCount}
                    // hideBadgeCount
                    icon={<NotificationsIcon />}
                />
            )}

            <Box paddingLeft={2}>
                {isMobileWidth ? (
                    <MobileMenuLauncher
                        onClick={toggleMobileMenu}
                        menuBadgeCount={unreadMessagesCount}
                    />
                ) : (
                    <DesktopControls
                        user={user}
                        menu={menu}
                        onNavigate={onNavigate}
                        currentPath={currentPath}
                    />
                )}
            </Box>
        </Box>
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
        data-testid={TEST_IDS.MENU_ICON}
        onClick={onClick}
        badgeCount={menuBadgeCount}
        hideBadgeCount
        icon={<MenuIcon fontSize="large" />}
    />
);

const DesktopControls = ({
    user,
    menu,
    onNavigate,
    currentPath,
}: {
    menu: SecondaryNavigationControlsProps['menu'];
    onNavigate: SecondaryNavigationControlsProps['onNavigate'];
    user: SecondaryNavigationControlsProps['user'];
    currentPath: SecondaryNavigationControlsProps['currentPath'];
}) => {
    if (user) {
        return (
            <FloatingMenu
                data-testid={TEST_IDS.SECONDARY_MENU}
                currentPath={currentPath}
                navigationMenu={menu}
                onNavigate={onNavigate}
                menuLauncher={<Avatar src={user?.avatarUrl} />}
            />
        );
    }

    return <ActionButtons onNavigate={onNavigate} />;
};

const ActionButtons = ({
    onNavigate,
}: {
    onNavigate: SecondaryNavigationControlsProps['onNavigate'];
}) => {
    const theme = useTheme();
    return (
        <Box display="flex" data-testid={TEST_IDS.ACTION_BUTTONS}>
            <Button
                type={BUTTON_TYPE.TEXT}
                onClick={() => onNavigate(URL_PATHS.AUTH.LOGIN)}
                style={{ color: theme.palette.text.primary }}
            >
                Login
            </Button>
            <Button
                type={BUTTON_TYPE.OUTLINED}
                onClick={() => onNavigate(URL_PATHS.MEMBERS.REGISTER)}
                style={{ marginLeft: theme.spacing(5) }}
            >
                Sign up free
            </Button>
            <Button
                onClick={() => onNavigate(URL_PATHS.DIRECTORY.ROOT)}
                style={{ marginLeft: theme.spacing(5) }}
            >
                Find providers
            </Button>
        </Box>
    );
};
