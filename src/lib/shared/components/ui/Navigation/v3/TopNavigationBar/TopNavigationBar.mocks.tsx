import { TherifyUser } from '@/lib/shared/types';
import { TopNavigationBarProps } from './TopNavigationBar';

export const mockTopNavigationBarProps: TopNavigationBarProps = {
    currentPath: '/',
    primaryMenu: [
        { displayName: 'Home', path: '/' },
        { displayName: 'About', path: '/about' },
        { displayName: 'FAQ', path: '/faq' },
    ],
    secondaryMenu: [
        { displayName: 'Settings', path: '/settings' },
        { displayName: 'Billing', path: '/billing' },
    ],
    onShowNotifications: () => alert('show notifications'),
    notificationCount: 0,
    toggleMobileMenu: () => alert('open mobile menu'),
    onNavigate: (path: string) => alert('Navigate to: ' + path),
    user: {} as TherifyUser.TherifyUser,
    isLoadingUser: false,
};
