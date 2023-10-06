import {
    HOME,
    CONTENT_LIBRARY,
    FAVORITES,
    DIRECTORY,
    THERIFY_WEBSITE,
    CHAT,
    CARE,
    BILLING_AND_PAYMENTS,
} from './links';
import { LOGOUT } from '../accountLinks';

export const MEMBER_MAIN_MENU = [
    // HOME,
    DIRECTORY,
    FAVORITES,
    CARE,
    CONTENT_LIBRARY,
] as const;

export const MEMBER_SECONDARY_MENU = [
    // { ...ACCOUNT, icon: undefined },
    { ...BILLING_AND_PAYMENTS, icon: undefined },
    { ...THERIFY_WEBSITE, icon: undefined },
    LOGOUT,
] as const;

export const MEMBER_MOBILE_MENU = [
    ...MEMBER_MAIN_MENU,
    BILLING_AND_PAYMENTS,
    THERIFY_WEBSITE,
    // ACCOUNT
] as const;

// V3 Menus
export const MEMBER_MAIN_MENU_V3 = [
    HOME,
    CARE,
    { ...CONTENT_LIBRARY, displayName: 'Content' },
] as const;

export const getMemberMenu = (
    hasChatEnabled: boolean,
    version?: 'v3' | 'v2'
) => {
    if (version === 'v3') return [...MEMBER_MAIN_MENU_V3];
    return [...MEMBER_MAIN_MENU, ...(hasChatEnabled ? [CHAT] : [])];
};

export const getMemberMobileMenu = (hasChatEnabled: boolean) => [
    ...MEMBER_MOBILE_MENU,
    ...(hasChatEnabled ? [CHAT] : []),
    // ACCOUNT
];
