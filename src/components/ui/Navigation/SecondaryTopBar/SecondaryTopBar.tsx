import { useMediaQuery } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import { NavigationLink } from '@/lib/sitemap';
import { TherifyUser } from '@/lib/hooks';
import { TopBar } from '../../TopBar';
import { SecondaryNavigationControls } from '../SecondaryNavigationControls';

export const SecondaryTopBar = ({
    currentPath,
    user,
    menu,
    onNavigate,
    onShowNotifications,
    notificationCount,
    toggleMobileMenu,
    isLoadingUser,
}: {
    user?: TherifyUser;
    currentPath: string;
    menu: NavigationLink[];
    notificationCount?: number;
    toggleMobileMenu: () => void;
    onNavigate: (path: string) => void;
    onShowNotifications?: () => void;
    isLoadingUser: boolean;
}) => {
    const theme = useTheme();
    const isMobileWidth = useMediaQuery(theme.breakpoints.down('md'));
    return (
        <TopBar
            rightSlot={
                <SecondaryNavigationControls
                    onShowNotifications={onShowNotifications}
                    notificationCount={notificationCount}
                    isMobileWidth={isMobileWidth}
                    toggleMobileMenu={toggleMobileMenu}
                    currentPath={currentPath}
                    menu={menu}
                    onNavigate={onNavigate}
                    user={user}
                    isLoadingUser={isLoadingUser}
                />
            }
        />
    );
};
