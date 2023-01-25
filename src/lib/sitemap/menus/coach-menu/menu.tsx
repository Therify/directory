import { DASHBOARD, CLIENTS, PROFILE_EDITOR } from './links';
import { ACCOUNT, BILLING_AND_SUBSCRIPTION, LOGOUT } from '../accountLinks';

export const COACH_MAIN_MENU = [DASHBOARD, CLIENTS] as const;

export const COACH_SECONDARY_MENU = [
    ACCOUNT,
    BILLING_AND_SUBSCRIPTION,
    LOGOUT,
] as const;

export const COACH_MOBILE_MENU = [
    DASHBOARD,
    PROFILE_EDITOR,
    CLIENTS,
    ACCOUNT,
] as const;
