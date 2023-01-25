import { API_PATHS } from './urls/api';
import { AUTHENTICATION_PATHS } from './urls/authentication';
import { MEMBER_PATHS } from './urls/members';
import { PROVIDERS_PATHS } from './urls/providers';

export const URL_PATHS = {
    API: API_PATHS,
    AUTH: AUTHENTICATION_PATHS,
    PROVIDERS: PROVIDERS_PATHS,
    MEMBERS: MEMBER_PATHS,
} as const;
