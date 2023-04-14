import { NodeEnvironment } from '@/lib/shared/types';

const CONFIGS = {
    ACCOUNT_ADMIN: 'account_admin',
    PRACTICE_ADMIN: 'practice_admin',
} as const;

type Config = (typeof CONFIGS)[keyof typeof CONFIGS];
type Configuration = {
    [CONFIGS.ACCOUNT_ADMIN]: {
        CONFIGURATION_ID: string;
    };
    [CONFIGS.PRACTICE_ADMIN]: {
        CONFIGURATION_ID: string;
    };
};

export const DEVELOPMENT_CONFIGURATIONS: Configuration = {
    [CONFIGS.ACCOUNT_ADMIN]: {
        CONFIGURATION_ID: 'bpc_1MwenYAllox7wzg5g6iEXMJD',
    },
    [CONFIGS.PRACTICE_ADMIN]: {
        CONFIGURATION_ID: '',
    },
} as const;

export const PRODUCTION_CONFIGURATIONS: Configuration = {
    [CONFIGS.ACCOUNT_ADMIN]: {
        CONFIGURATION_ID: '',
    },
    [CONFIGS.PRACTICE_ADMIN]: {
        CONFIGURATION_ID: '',
    },
} as const;

export const CONFIGURATIONS_BY_ENVIRONMENT: Record<
    'development' | 'production',
    Configuration
> = {
    development: DEVELOPMENT_CONFIGURATIONS,
    production: PRODUCTION_CONFIGURATIONS,
} as const;

export const getConfigsByEnvironment = (environment: NodeEnvironment) => {
    if (environment === 'production') {
        return CONFIGURATIONS_BY_ENVIRONMENT['production'];
    }
    return CONFIGURATIONS_BY_ENVIRONMENT['development'];
};

/**
 * Get the billing portal configuration ID for a given config and environment
 * @param config - The config type to get the ID for
 * @param environment - The environment to get the IDs for
 * @returns config id
 */
export function getConfigByEnvironment(
    config: Config,
    environment: NodeEnvironment = 'development'
): Configuration[Config] {
    const configuration = getConfigsByEnvironment(environment);
    return configuration[config];
}
