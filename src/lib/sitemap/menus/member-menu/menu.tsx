import {
    HOME,
    CONTENT_LIBRARY,
    FAVORITES,
    DIRECTORY,
    THERIFY_WEBSITE,
    CHAT,
    CARE,
    BILLING_AND_PAYMENTS,
    ACCOUNT_SETTINGS,
    CARE_DETAILS,
} from './links';
import { LOGOUT } from '../accountLinks';
import { NAVIGATION_ICON } from '../../types';

export const MEMBER_MAIN_MENU = [
    DIRECTORY,
    FAVORITES,
    CARE,
    CONTENT_LIBRARY,
] as const;

export const MEMBER_SECONDARY_MENU = [
    { ...BILLING_AND_PAYMENTS, icon: undefined },
    { ...THERIFY_WEBSITE, icon: undefined },
    LOGOUT,
] as const;

export const MEMBER_MOBILE_MENU = [
    ...MEMBER_MAIN_MENU,
    BILLING_AND_PAYMENTS,
    THERIFY_WEBSITE,
] as const;

// V3 Menus
export const MEMBER_MAIN_MENU_V3 = [
    HOME,
    CARE,
    { ...CONTENT_LIBRARY, displayName: 'Content' },
] as const;

export const MEMBER_SECONDARY_MENU_V3 = [
    ACCOUNT_SETTINGS,
    CARE_DETAILS,
    { ...LOGOUT, icon: NAVIGATION_ICON.LOGOUT },
] as const;

export const MEMBER_MOBILE_MENU_V3 = [
    ...MEMBER_MAIN_MENU_V3,
    ACCOUNT_SETTINGS,
    CARE_DETAILS,
] as const;

export const getMemberMenu = (hasChatEnabled: boolean) => [
    ...MEMBER_MAIN_MENU,
    ...(hasChatEnabled ? [CHAT] : []),
];

export const getMemberMobileMenu = (hasChatEnabled: boolean) => [
    ...MEMBER_MOBILE_MENU,
    ...(hasChatEnabled ? [CHAT] : []),
];
