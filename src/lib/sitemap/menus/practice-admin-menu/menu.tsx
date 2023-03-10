import {
    //  DASHBOARD,
    CLIENTS,
    PROFILES,
} from './links';
import { ACCOUNT, BILLING_AND_SUBSCRIPTION, LOGOUT } from '../accountLinks';

export const PRACTICE_ADMIN_MAIN_MENU = [
    // DASHBOARD,
    CLIENTS,
    PROFILES,
] as const;

export const PRACTICE_ADMIN_SECONDARY_MENU = [
    // { ...ACCOUNT, icon: undefined },
    BILLING_AND_SUBSCRIPTION,
    LOGOUT,
] as const;

export const PRACTICE_ADMIN_MOBILE_MENU = [
    ...PRACTICE_ADMIN_MAIN_MENU,
    { ...ACCOUNT, path: BILLING_AND_SUBSCRIPTION.path },
] as const;
