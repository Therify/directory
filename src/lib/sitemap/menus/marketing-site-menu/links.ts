import { NavigationLink, NAVIGATION_ICON } from '../../types';
import { URL_PATHS } from '../../urlPaths';

export const FOR_PROVIDERS: NavigationLink = {
    displayName: 'For Providers',
    path: URL_PATHS.EXTERNAL.THERIFY_CO.FOR_PROVIDERS,
} as const;

export const FOR_EMPLOYERS: NavigationLink = {
    displayName: 'For Employers',
    path: URL_PATHS.EXTERNAL.THERIFY_CO.FOR_EMPLOYERS,
} as const;

export const ABOUT: NavigationLink = {
    displayName: 'About',
    path: URL_PATHS.EXTERNAL.THERIFY_CO.ABOUT,
} as const;
