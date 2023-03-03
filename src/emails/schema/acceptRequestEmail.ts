import * as z from 'zod';

export const schema = z.object({
    providerName: z.string(),
    memberName: z.string(),
});

export type AcceptRequestEmailProps = z.infer<typeof schema>;

export const validate = (value: unknown): AcceptRequestEmailProps => {
    return schema.parse(value);
};

export const isValid = (value: unknown): value is AcceptRequestEmailProps => {
    try {
        validate(value);
        return true;
    } catch {
        return false;
    }
};
