import {
    // DASHBOARD,
    CLIENTS,
    PROFILE_EDITOR,
} from './links';
import { ACCOUNT, BILLING_AND_SUBSCRIPTION, LOGOUT } from '../accountLinks';

export const COACH_MAIN_MENU = [
    // DASHBOARD,
    CLIENTS,
    PROFILE_EDITOR,
] as const;

export const COACH_SECONDARY_MENU = [
    // { ...ACCOUNT, icon: undefined },
    // BILLING_AND_SUBSCRIPTION,
    LOGOUT,
] as const;

export const COACH_MOBILE_MENU = [
    ...COACH_MAIN_MENU,
    // ACCOUNT
] as const;
