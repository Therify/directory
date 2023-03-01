import { CONTENT_PATHS } from './content';

export const MEMBER_PATHS = {
    REGISTER: '/members/register',
    REGISTER_SUCCESS: '/members/register/success',
    HOME: './members/home',
    FAVORITES: '/members/favorites',
    DIRECTORY: '/members/directory',
    CHAT: '/members/chat',
    CONTENT: CONTENT_PATHS,
} as const;
