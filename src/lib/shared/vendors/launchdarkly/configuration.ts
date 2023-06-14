import { generateWithConfig } from '@/lib/shared/utils';
import { get } from 'env-var';

const LAUNCHDARKLY_SDK_KEY = 'LAUNCHDARKLY_SDK_KEY' as const;

export interface LaunchDarklyConfiguration {
    LAUNCHDARKLY_SDK_KEY: string;
}

export const getLaunchDarklyConfiguration = (
    overrides: Partial<LaunchDarklyConfiguration> = {}
): LaunchDarklyConfiguration => ({
    LAUNCHDARKLY_SDK_KEY: get(LAUNCHDARKLY_SDK_KEY).required().asString(),
    ...overrides,
});

export const withLaunchDarklyConfiguration = generateWithConfig(
    getLaunchDarklyConfiguration
);
