import { TherifyUser } from '@/lib/shared/types/therify-user';
import { NavigationLink } from '@/lib/sitemap';
import { Avatar, useMediaQuery } from '@mui/material';
import { styled, useTheme } from '@mui/material/styles';
import Link from 'next/link';
import { TopBar as BaseTopBar } from '../../../TopBar';
import { SecondaryNavigationControls } from '../SecondaryNavigationControls';
import { isActivePath } from '../../utils';

export interface TopNavigationBarProps {
    primaryMenu: NavigationLink[];
    secondaryMenu: NavigationLink[];
    currentPath: string;
    onShowNotifications?: () => void;
    notificationCount?: number;
    toggleMobileMenu: () => void;
    onNavigate: (path: string) => void;
    user?: TherifyUser.TherifyUser;
    isLoadingUser: boolean;
    withTherifyWebsiteLink?: boolean;
    notificationsMap?: Record<string, number>;
    unreadMessagesCount?: number;
}
export const TEST_IDS = {
    DESKTOP_MENU: 'desktop-menu',
    ACTIVE_TAB: 'active-tab',
};

export const TopNavigationBar = ({
    currentPath,
    primaryMenu,
    secondaryMenu,
    onShowNotifications,
    notificationCount,
    unreadMessagesCount,
    toggleMobileMenu,
    onNavigate,
    user,
    isLoadingUser,
    notificationsMap,
    withTherifyWebsiteLink,
}: TopNavigationBarProps) => {
    const theme = useTheme();
    const isMobileWidth = useMediaQuery(theme.breakpoints.down('md'));

    return (
        <Topbar
            leftSlot={
                <DesktopLinkContainer data-testid={TEST_IDS.DESKTOP_MENU}>
                    {primaryMenu.map((link) => {
                        const isPathActive = isActivePath(
                            link.path,
                            currentPath
                        );
                        return (
                            <LinkItem key={link.path} isActive={isPathActive}>
                                <Link
                                    href={link.path}
                                    target={
                                        link.path.startsWith('http')
                                            ? '_blank'
                                            : undefined
                                    }
                                >
                                    {link.displayName}
                                    {(notificationsMap?.[link.path] ?? 0) >
                                        0 && (
                                        <NotificationCount>
                                            {notificationsMap?.[link.path]}
                                        </NotificationCount>
                                    )}
                                </Link>
                            </LinkItem>
                        );
                    })}
                </DesktopLinkContainer>
            }
            rightSlot={
                <SecondaryNavigationControls
                    onNotificationsClick={onShowNotifications}
                    notificationCount={notificationCount}
                    unreadMessagesCount={unreadMessagesCount}
                    isMobileWidth={isMobileWidth}
                    toggleMobileMenu={toggleMobileMenu}
                    currentPath={currentPath}
                    menu={secondaryMenu}
                    onNavigate={onNavigate}
                    user={user}
                    isLoadingUser={isLoadingUser}
                    withTherifyWebsiteLink={withTherifyWebsiteLink}
                />
            }
        />
    );
};

const Topbar = styled(BaseTopBar)(({ theme }) => ({
    borderBottom: '0px !important',
    boxShadow: '0px 0px 10px rgba(0, 0, 0, 0.1)',
}));

const DesktopLinkContainer = styled('ul')(({ theme }) => ({
    display: 'none',
    flex: 1,
    listStyle: 'none',
    paddingLeft: theme.spacing(6),
    [theme.breakpoints.up('md')]: {
        display: 'flex',
    },
}));

const LinkItem = styled('li', {
    shouldForwardProp: (prop) => prop !== 'isActive',
})<{ isActive: boolean }>(({ theme, isActive }) => ({
    '& a': {
        position: 'relative',
        ...theme.typography.body1,
        display: 'flex',
        alignItems: 'center',
        fontWeight: 500,
        margin: 0,
        padding: theme.spacing(4, 5),
        textDecoration: 'none',
        borderRadius: theme.shape.borderRadius,
        color: isActive ? theme.palette.text.primary : theme.palette.grey[500],
        '&:hover': {
            color: theme.palette.grey[200],
        },
    },
}));

const NotificationCount = styled(Avatar)(({ theme }) => ({
    backgroundColor: theme.palette.error.main,
    color: theme.palette.error.contrastText,
    fontSize: '.75rem',
    height: theme.spacing(6),
    width: theme.spacing(6),
    marginLeft: theme.spacing(2),
}));
