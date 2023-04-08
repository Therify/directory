import * as z from 'zod';

export const schema = z.object({
    hasStripeConnectAccess: z.boolean(),
});

export type Type = z.infer<typeof schema>;

export const defaultFlags: Type = {
    hasStripeConnectAccess: false,
};

export const isValid = (flags: unknown): boolean => {
    const { success } = schema.safeParse(flags);
    return success;
};

export const validate = (flags: unknown): Type => {
    try {
        return schema.parse(flags);
    } catch (error) {
        console.error('Invalid flags', error);
        return defaultFlags;
    }
};
