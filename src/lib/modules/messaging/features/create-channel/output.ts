import * as z from 'zod';

export const schema = z.object({
    /**
     * If the channel is undefined, it means the provider does not support messaging
     */
    channelId: z.string().optional(),
});

export type Output = z.infer<typeof schema>;

export const validate = (value: unknown): Output => {
    return schema.parse(value);
};

export const isValid = (value: unknown): value is Output => {
    try {
        validate(value);
        return true;
    } catch {
        return false;
    }
};
