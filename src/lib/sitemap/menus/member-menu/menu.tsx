import {
    HOME,
    CONTENT_LIBRARY,
    FAVORITES,
    DIRECTORY,
    THERIFY_WEBSITE,
    CHAT,
} from './links';
import { ACCOUNT, LOGOUT } from '../accountLinks';

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
