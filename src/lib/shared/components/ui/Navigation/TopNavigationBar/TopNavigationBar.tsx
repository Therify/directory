import { TherifyUser } from '@/lib/shared/types/therify-user';
import { NavigationLink } from '@/lib/sitemap';
import { Avatar, useMediaQuery } from '@mui/material';
import { styled, useTheme } from '@mui/material/styles';
import Link from 'next/link';
import { TopBar } from '../../TopBar';
import { SecondaryNavigationControls } from '../SecondaryNavigationControls';
import { isActivePath } from '../utils';

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
        <TopBar
            leftSlot={
                <DesktopLinkContainer data-testid={TEST_IDS.DESKTOP_MENU}>
                    {primaryMenu.map((link) => {
                        const isPathActive = isActivePath(
                            link.path,
                            currentPath
                        );
                        return (
                            <LinkItem key={link.path}>
                                <Link
                                    href={link.path}
                                    target={
                                        link.path.startsWith('http')
                                            ? '_blank'
                                            : undefined
                                    }
                                >
                                    {link.displayName}
                                    {isPathActive && (
                                        <ActiveTab
                                            data-testid={TEST_IDS.ACTIVE_TAB}
                                        />
                                    )}
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
                    onShowNotifications={onShowNotifications}
                    notificationCount={notificationCount}
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

const DesktopLinkContainer = styled('ul')(({ theme }) => ({
    display: 'none',
    flex: 1,
    listStyle: 'none',
    paddingLeft: theme.spacing(6),
    [theme.breakpoints.up('md')]: {
        display: 'flex',
    },
}));

const LinkItem = styled('li')(({ theme }) => ({
    '& a': {
        position: 'relative',
        ...theme.typography.body1,
        display: 'flex',
        alignItems: 'center',
        fontWeight: 500,
        margin: 0,
        padding: theme.spacing(4, 5),
        color: theme.palette.text.primary,
        textDecoration: 'none',
        borderRadius: theme.shape.borderRadius,
        '&:hover': {
            backgroundColor: theme.palette.action.hover,
            '& span': {
                width: '100%',
                left: 0,
            },
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

const ActiveTab = styled('span')(({ theme }) => ({
    position: 'absolute',
    display: 'block',
    backgroundColor: theme.palette.primary.main,
    borderRadius: '2px',
    bottom: 0,
    left: theme.spacing(4),
    height: '4px',
    width: `calc(100% - ${theme.spacing(8)})`,
    transition: '0.2s ease-in-out',
    margin: 'auto',
}));
