import { TherifyUser } from '@/lib/shared/types/therify-user';
import { NavigationLink } from '@/lib/sitemap';
import { useMediaQuery } from '@mui/material';
import { styled, useTheme } from '@mui/material/styles';
import Link from 'next/link';
import { TopBar } from '../../../TopBar';
import { SecondaryNavigationControls } from '../SecondaryNavigationControls';
import { isActivePath } from '../../utils';

export interface TopNavigationBarProps {
    primaryMenu: NavigationLink[];
    secondaryMenu: NavigationLink[];
    currentPath: string;
    onShowNotifications: () => void;
    notificationCount: number;
    toggleMobileMenu: () => void;
    onNavigate: (path: string) => void;
    user?: TherifyUser.TherifyUser;
    isLoadingUser: boolean;
    unreadMessagesCount: number;
}
export const TEST_IDS = {
    DESKTOP_MENU: 'desktop-menu',
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
}: TopNavigationBarProps) => {
    const theme = useTheme();
    const isMobileWidth = useMediaQuery(theme.breakpoints.down('md'));

    return (
        <TopBar
            v3
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
                                        link.path.startsWith('http') ||
                                        link.isExternal
                                            ? '_blank'
                                            : undefined
                                    }
                                >
                                    {link.displayName}
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
