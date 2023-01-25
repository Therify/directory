import { TopNavigationBarProps } from './TopNavigationBar';

const topNavigationBarProps: TopNavigationBarProps = {
    currentPath: '/',
    navigationLinks: [
        { displayName: 'Home', path: '/' },
        { displayName: 'About', path: '/about' },
        { displayName: 'FAQ', path: '/faq' },
    ],
    user: {},
};

export const mockTopNavigationBarProps = {
    topNavigationBarProps,
};
