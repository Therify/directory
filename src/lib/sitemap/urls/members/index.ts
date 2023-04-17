import { ACCOUNT_PATHS } from './account';
import { CONTENT_PATHS } from './content';
import { ONBOARDING_PATHS } from './onboarding';

export const MEMBER_PATHS = {
    REGISTER: '/members/register',
    REGISTER_SUCCESS: '/members/register/success',
    HOME: './members/home',
    FAVORITES: '/members/favorites',
    DIRECTORY: '/members/directory',
    CARE: '/members/care',
    CHAT: '/members/chat',
    CONTENT: CONTENT_PATHS,
    ACCOUNT: ACCOUNT_PATHS,
    ONBOARDING: ONBOARDING_PATHS,
} as const;
