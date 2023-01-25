import { TopNavigationBarProps } from './TopNavigationBar';

export const mockTopNavigationBarProps: TopNavigationBarProps = {
    currentPath: '/',
    navigationLinks: [
        { displayName: 'Home', path: '/' },
        { displayName: 'About', path: '/about' },
        { displayName: 'FAQ', path: '/faq' },
    ],
    user: {
        accountId: 'test-id',
        avatarUrl: undefined,
        userId: 'test-id',
        roles: ['provider_therapist'],
        email: 'test@therify.co',
        plan: null,
    },
};
