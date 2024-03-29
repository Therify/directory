import { NavigationLink, NAVIGATION_ICON } from '../../types';
import { URL_PATHS } from '../../urlPaths';

export const DASHBOARD: NavigationLink = {
    icon: NAVIGATION_ICON.DASHBOARD,
    displayName: 'Dashbaord',
    path: URL_PATHS.PROVIDERS.COACH.DASHBOARD,
} as const;

export const CLIENTS: NavigationLink = {
    icon: NAVIGATION_ICON.CLIENTS,
    displayName: 'Clients',
    path: URL_PATHS.PROVIDERS.COACH.CLIENTS,
} as const;

export const PROFILE_EDITOR: NavigationLink = {
    icon: NAVIGATION_ICON.PROFILE_EDITOR,
    displayName: 'Profile',
    path: URL_PATHS.PROVIDERS.COACH.PROFILES,
} as const;

export const CHAT: NavigationLink = {
    icon: NAVIGATION_ICON.CHAT,
    displayName: 'Messaging',
    path: URL_PATHS.PROVIDERS.COACH.CHAT,
};

export const PAYMENTS: NavigationLink = {
    icon: NAVIGATION_ICON.PAYMENTS,
    displayName: 'Payments',
    path: URL_PATHS.PROVIDERS.COACH.PAYMENTS,
};
