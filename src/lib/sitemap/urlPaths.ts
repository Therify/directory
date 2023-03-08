import { API_PATHS } from './urls/api';
import { AUTHENTICATION_PATHS } from './urls/authentication';
import { MEMBER_PATHS } from './urls/members';
import { DIRECTORY_PATHS } from './urls/directory';
import { PROVIDERS_PATHS } from './urls/providers';
import { EXTERNAL_URLS } from './urls/external';

export const URL_PATHS = {
    API: API_PATHS,
    AUTH: AUTHENTICATION_PATHS,
    PROVIDERS: PROVIDERS_PATHS,
    MEMBERS: MEMBER_PATHS,
    DIRECTORY: DIRECTORY_PATHS,
    EXTERNAL: EXTERNAL_URLS,
    404: '/404',
    ROOT: '/',
    ACCESS_COUNTDOWN: '/access-countdown',
} as const;
