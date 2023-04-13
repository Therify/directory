import { ONBOARDING_PATHS } from './onboarding';

export const ACCOUNT_OWNER_PATHS = {
    REGISTER: '/accounts/register',
    REGISTER_SUCCESS: '/accounts/register/success',
    ONBOARDING: ONBOARDING_PATHS,
} as const;
