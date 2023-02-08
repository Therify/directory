import { generateWithConfig } from '@/lib/utils';
import { get } from 'env-var';

export const COURIER_AUTH_TOKEN = 'COURIER_AUTH_TOKEN' as const;

export interface CourierConfiguration {
    COURIER_AUTH_TOKEN: string;
}

export const getCourierConfiguration = (
    overrides: Partial<CourierConfiguration> = {}
): CourierConfiguration => {
    return {
        [COURIER_AUTH_TOKEN]: get(COURIER_AUTH_TOKEN).required().asString(),
        ...overrides,
    };
};

export const withCourierConfiguration = generateWithConfig(
    getCourierConfiguration
);
