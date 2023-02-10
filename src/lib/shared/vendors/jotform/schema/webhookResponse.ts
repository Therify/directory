import * as z from 'zod';

export const schema = z.object({
    formID: z.string(),
    submissionID: z.string(),
    webhookURL: z.string(),
    ip: z.string(),
    pretty: z.string(),
    username: z.string(),
    rawRequest: z.string(),
    type: z.string(),
});

export type WebhookResponse = z.infer<typeof schema>;

export const validate = (value: unknown): WebhookResponse => {
    return schema.parse(value);
};

export const isValid = (value: unknown): value is WebhookResponse => {
    try {
        validate(value);
        return true;
    } catch {
        return false;
    }
};
