import {
    HOME,
    CONTENT_LIBRARY,
    FAVORITES,
    DIRECTORY,
    THERIFY_WEBSITE,
    CHAT,
} from './links';
import { LOGOUT } from '../accountLinks';
import { NavigationLink } from '../../types';

export const MEMBER_MAIN_MENU = [
    // HOME,
    DIRECTORY,
    FAVORITES,
    CONTENT_LIBRARY,
] as const;

export const MEMBER_SECONDARY_MENU = [
    // { ...ACCOUNT, icon: undefined },
    { ...THERIFY_WEBSITE, icon: undefined },
    LOGOUT,
] as const;

export const MEMBER_MOBILE_MENU = [
    ...MEMBER_MAIN_MENU,
    THERIFY_WEBSITE,
    // ACCOUNT
] as const;

export const getMemberMenu = (hasChatEnabled: boolean) => [
    ...MEMBER_MAIN_MENU,
    ...(hasChatEnabled ? [CHAT] : []),
];

export const getMemberMobileMenu = (hasChatEnabled: boolean) => [
    ...MEMBER_MAIN_MENU,
    ...(hasChatEnabled ? [CHAT] : []),
    THERIFY_WEBSITE,
    // ACCOUNT
];
