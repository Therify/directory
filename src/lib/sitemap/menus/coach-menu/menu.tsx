import {
    // DASHBOARD,
    CLIENTS,
    PROFILE_EDITOR,
} from './links';
import { ACCOUNT, LOGOUT } from '../accountLinks';

export const COACH_MAIN_MENU = [
    // DASHBOARD,
    CLIENTS,
    PROFILE_EDITOR,
] as const;

export const COACH_SECONDARY_MENU = [
    // { ...ACCOUNT, icon: undefined },
    LOGOUT,
] as const;

export const COACH_MOBILE_MENU = [
    ...COACH_MAIN_MENU,
    // ACCOUNT
] as const;
