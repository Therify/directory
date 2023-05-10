import { NavigationLink, NAVIGATION_ICON } from '../types';
import { URL_PATHS } from '../urlPaths';

export const ACCOUNT: NavigationLink = {
    icon: NAVIGATION_ICON.ACCOUNT,
    displayName: 'Account',
    path: URL_PATHS.PROVIDERS.ACCOUNT.ACCOUNT_EDITOR,
} as const;

export const LOGOUT: NavigationLink = {
    displayName: 'Logout',
    path: URL_PATHS.AUTH.LOGOUT,
} as const;

export const LOGIN: NavigationLink = {
    displayName: 'Login',
    path: URL_PATHS.AUTH.LOGIN,
} as const;
