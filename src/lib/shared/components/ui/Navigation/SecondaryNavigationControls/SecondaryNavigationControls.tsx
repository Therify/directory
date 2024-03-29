import {
    NotificationsOutlined as NotificationsIcon,
    MenuRounded as MenuIcon,
} from '@mui/icons-material';
import { Box } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import { IconButtonWithBadge } from '../../IconButtonWithBadge';
import { BUTTON_TYPE, Button } from '../../Button';
import { FloatingMenu } from '../FloatingMenu';
import { Avatar } from '../../Avatar';
import { NavigationLink, URL_PATHS } from '@/lib/sitemap';
import { TherifyUser } from '@/lib/shared/types/therify-user';

interface SecondaryNavigationControlsProps {
    onShowNotifications?: () => void;
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
    SECONDARY_MENU: 'secondary-menu',
    ACTION_BUTTONS: 'action-buttons',
} as const;

export const SecondaryNavigationControls = ({
    onShowNotifications,
    notificationCount,
    unreadMessagesCount,
    isMobileWidth,
    toggleMobileMenu,
    currentPath,
    menu,
    onNavigate,
    user,
    isLoadingUser,
    withTherifyWebsiteLink,
}: SecondaryNavigationControlsProps) => {
    const theme = useTheme();
    if (isLoadingUser || !user) {
        return null;
    }
    return (
        <Box display="flex">
            {!isMobileWidth && user && withTherifyWebsiteLink && (
                <Button
                    type={BUTTON_TYPE.TEXT}
                    onClick={() =>
                        onNavigate(URL_PATHS.EXTERNAL.THERIFY_CO.HOME)
                    }
                    style={{ color: theme.palette.text.primary }}
                >
                    Therify Website
                </Button>
            )}

            {user && (
                <IconButtonWithBadge
                    data-testid={TEST_IDS.NOTIFICATIONS_ICON}
                    onClick={onShowNotifications}
                    aria-label={`${notificationCount ?? 0} Notifications`}
                    badgeCount={notificationCount}
                    icon={<NotificationsIcon />}
                />
            )}

            <Box paddingLeft={2}>
                {isMobileWidth ? (
                    <IconButtonWithBadge
                        data-testid={TEST_IDS.MENU_ICON}
                        onClick={toggleMobileMenu}
                        badgeCount={unreadMessagesCount}
                        icon={<MenuIcon fontSize="large" />}
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
