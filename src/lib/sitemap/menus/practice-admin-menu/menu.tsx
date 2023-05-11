import {
    //  DASHBOARD,
    CLIENTS,
    PROFILES,
} from './links';
import { ACCOUNT, LOGOUT } from '../accountLinks';

export const PRACTICE_ADMIN_MAIN_MENU = [
    // DASHBOARD,
    CLIENTS,
    PROFILES,
] as const;

export const PRACTICE_ADMIN_SECONDARY_MENU = [
    // { ...ACCOUNT, icon: undefined },
    LOGOUT,
] as const;

export const PRACTICE_ADMIN_MOBILE_MENU = [
    ...PRACTICE_ADMIN_MAIN_MENU,
] as const;
