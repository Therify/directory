import { generateWithConfig } from '@/lib/shared/utils';
import { get } from 'env-var';

export const NYLAS_CLIENT_ID = 'NYLAS_CLIENT_ID' as const;
export const NYLAS_CLIENT_SECRET = 'NYLAS_CLIENT_SECRET' as const;
export const NYLAS_API_SERVER = 'NYLAS_API_SERVER' as const;
export const APPLICATION_URL = 'APPLICATION_URL' as const;

export interface NylasConfiguration {
    NYLAS_CLIENT_ID: string;
    NYLAS_CLIENT_SECRET: string;
    NYLAS_API_SERVER: string;
    APPLICATION_URL: string;
}

export const getNylasConfiguration = (
    overrides: Partial<NylasConfiguration> = {}
) => {
    return {
        [NYLAS_CLIENT_ID]: get(NYLAS_CLIENT_ID).required().asString(),
        [NYLAS_CLIENT_SECRET]: get(NYLAS_CLIENT_SECRET).required().asString(),
        [NYLAS_API_SERVER]: get(NYLAS_API_SERVER).required().asString(),
        [APPLICATION_URL]: get(APPLICATION_URL).required().asString(),
        ...overrides,
    };
};

export const withNylasConfiguration = generateWithConfig(getNylasConfiguration);
