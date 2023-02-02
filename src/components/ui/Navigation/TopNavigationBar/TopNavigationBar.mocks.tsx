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
    onShowNotifications: () => console.log('show notifications'),
    notificationCount: 0,
    toggleMobileMenu: () => console.log('toggle mobile menu'),
    onNavigate: (path: string) => console.log('Navigate to: ', path),
    user: undefined,
    isLoadingUser: false,
};
