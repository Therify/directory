import { generateWithConfig } from '@/lib/shared/utils';
import { get } from 'env-var';

export const KNOCK_API_KEY = 'KNOCK_API_KEY' as const;
// We may want this for production
// export const KNOCK_SIGNING_KEY = 'KNOCK_SIGNING_KEY' as const;

export interface KnockConfiguration {
    KNOCK_API_KEY: string;
    // KNOCK_SIGNING_KEY: string;
}

export const getKnockConfiguration = (
    overrides: Partial<KnockConfiguration> = {}
) => {
    return {
        [KNOCK_API_KEY]: get(KNOCK_API_KEY).required().asString(),
        // [KNOCK_SIGNING_KEY]: get(KNOCK_SIGNING_KEY).required().asString(),
        ...overrides,
    };
};

export const withKnockConfiguration = generateWithConfig(getKnockConfiguration);
