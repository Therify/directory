import * as z from 'zod';

export const schema = z.object({
    invitationLink: z.string(),
    practiceName: z.string(),
});

export type ProviderInvitationEmailProps = z.infer<typeof schema>;

export const validate = (value: unknown): ProviderInvitationEmailProps => {
    return schema.parse(value);
};

export const isValid = (
    value: unknown
): value is ProviderInvitationEmailProps => {
    try {
        validate(value);
        return true;
    } catch {
        return false;
    }
};
