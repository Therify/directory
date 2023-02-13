import * as z from 'zod';

export const ENTRIES = ['Available', 'Unavailable', 'Wait-List'] as const;

export const MAP = {
    AVAILABLE: 'Available',
    UNAVAILABLE: 'Unavailable',
    WAIT_LIST: 'Wait-List',
} as const;

export const schema = z.enum(ENTRIES);

export type ProviderAvailability = z.infer<typeof schema>;

export const validate = (value: unknown): ProviderAvailability => {
    return schema.parse(value);
};

export const isValid = (value: unknown): value is ProviderAvailability => {
    try {
        validate(value);
        return true;
    } catch {
        return false;
    }
};
