import { NavigationLink, NAVIGATION_ICON } from '../../types';
import { URL_PATHS } from '../../urlPaths';

export const DASHBOARD: NavigationLink = {
    icon: NAVIGATION_ICON.DASHBOARD,
    displayName: 'Dashbaord',
    path: URL_PATHS.PROVIDERS.PRACTICE.DASHBOARD,
} as const;

export const CLIENTS: NavigationLink = {
    icon: NAVIGATION_ICON.CLIENTS,
    displayName: 'Clients',
    path: URL_PATHS.PROVIDERS.PRACTICE.CLIENTS,
} as const;

export const PROFILES: NavigationLink = {
    icon: NAVIGATION_ICON.PROFILE_EDITOR,
    displayName: 'Profiles',
    path: URL_PATHS.PROVIDERS.PRACTICE.PROFILES,
} as const;
