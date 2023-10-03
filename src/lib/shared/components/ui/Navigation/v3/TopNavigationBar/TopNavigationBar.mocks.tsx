import { TherifyUser } from '@/lib/shared/types';
import { NAVIGATION_ICON } from '@/lib/sitemap';
import { TopNavigationBarProps } from './TopNavigationBar';

export const mockTopNavigationBarProps: TopNavigationBarProps = {
    currentPath: '/',
    primaryMenu: [
        { displayName: 'Home', path: '/' },
        { displayName: 'About', path: '/about' },
        { displayName: 'FAQ', path: '/faq' },
    ],
    secondaryMenu: [
        {
            displayName: 'Settings',
            path: '/settings',
            icon: NAVIGATION_ICON.SETTINGS,
        },
        {
            displayName: 'Care Details',
            path: '/care-details',
            icon: NAVIGATION_ICON.INFO,
        },
    ],
    onShowNotifications: () => alert('show notifications'),
    notificationCount: 0,
    unreadMessagesCount: 0,
    toggleMobileMenu: () => alert('open mobile menu'),
    onNavigate: (path: string) => alert('Navigate to: ' + path),
    user: {} as TherifyUser.TherifyUser,
    isLoadingUser: false,
};
