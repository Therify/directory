import { NavigationLink, NAVIGATION_ICON } from '../../types';
import { URL_PATHS } from '../../urlPaths';

export const HOME: NavigationLink = {
    icon: NAVIGATION_ICON.HOME,
    displayName: 'Home',
    path: URL_PATHS.MEMBERS.HOME,
} as const;

export const CARE: NavigationLink = {
    icon: NAVIGATION_ICON.CARE,
    displayName: 'Care',
    path: URL_PATHS.MEMBERS.CARE,
};

export const FAVORITES: NavigationLink = {
    icon: NAVIGATION_ICON.FAVORITES,
    displayName: 'Favorites',
    path: URL_PATHS.MEMBERS.FAVORITES,
} as const;

export const DIRECTORY: NavigationLink = {
    icon: NAVIGATION_ICON.CLIENTS,
    displayName: 'Directory',
    path: URL_PATHS.DIRECTORY.MEMBER_DIRECTORY,
} as const;

export const THERIFY_WEBSITE: NavigationLink = {
    icon: NAVIGATION_ICON.THERIFY_ICON,
    displayName: 'Therify Website',
    path: URL_PATHS.EXTERNAL.THERIFY_CO.HOME,
    isExternal: true,
} as const;

export const CONTENT_LIBRARY: NavigationLink = {
    icon: NAVIGATION_ICON.LIBRARY,
    displayName: 'Library',
    path: URL_PATHS.EXTERNAL.VIMEO.CHANNEL,
    // path: URL_PATHS.MEMBERS.CONTENT.LIBRARY,
} as const;

export const CHAT: NavigationLink = {
    icon: NAVIGATION_ICON.CHAT,
    displayName: 'Messaging',
    path: URL_PATHS.MEMBERS.CHAT,
};

export const BILLING_AND_PAYMENTS: NavigationLink = {
    displayName: 'Billing & Payments',
    path: URL_PATHS.MEMBERS.ACCOUNT.BILLING_AND_PAYMENTS,
};
