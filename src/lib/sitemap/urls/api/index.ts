import { ACCOUNTS_PATHS } from './accounts';

export const API_PATHS = {
    ACCOUNTS: ACCOUNTS_PATHS,
    AUTH: {
        LOGOUT: '/api/auth/logout',
    },
} as const;
