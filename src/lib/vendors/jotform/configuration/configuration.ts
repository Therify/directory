import { generateWithConfig } from '@/lib/utils';
import { get } from 'env-var';

export const JOTFORM_API_KEY = 'JOTFORM_API_KEY' as const;

interface JotFormConfiguration {
    JOTFORM_API_KEY: string;
}

export function getJotFormConfiguration(): JotFormConfiguration {
    return {
        [JOTFORM_API_KEY]: get(JOTFORM_API_KEY).required().asString(),
    };
}

export const withJotFormConfiguration = generateWithConfig(
    getJotFormConfiguration
);
