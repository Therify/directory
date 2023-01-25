import { DASHBOARD, CLIENTS, PROFILE_EDITOR } from './links';
import { ACCOUNT, BILLING_AND_SUBSCRIPTION, LOGOUT } from '../accountLinks';

export const THERAPIST_MAIN_MENU = [
    DASHBOARD,
    PROFILE_EDITOR,
    CLIENTS,
] as const;

export const THERAPIST_SECONDARY_MENU = [
    ACCOUNT,
    BILLING_AND_SUBSCRIPTION,
    LOGOUT,
] as const;

export const THERAPIST_MOBILE_MENU = [
    DASHBOARD,
    PROFILE_EDITOR,
    CLIENTS,
    ACCOUNT,
] as const;
