import { HOME, CONTENT_LIBRARY, FAVORITES, DIRECTORY } from './links';
import { ACCOUNT, LOGOUT } from '../accountLinks';

export const MEMBER_MAIN_MENU = [
    // HOME,
    FAVORITES,
    DIRECTORY,
    CONTENT_LIBRARY,
] as const;

export const MEMBER_SECONDARY_MENU = [
    // { ...ACCOUNT, icon: undefined },
    LOGOUT,
] as const;

export const MEMBER_MOBILE_MENU = [
    ...MEMBER_MAIN_MENU,
    // ACCOUNT
] as const;
