import { API_PATHS } from './api';
import { AUTHENTICATION_PATHS } from './authentication';
import { PROVIDERS_PATHS } from './providers';

export const URL_PATHS = {
    API: API_PATHS,
    AUTH: AUTHENTICATION_PATHS,
    PROVIDERS: PROVIDERS_PATHS,
} as const;
