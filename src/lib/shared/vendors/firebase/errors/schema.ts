import * as z from 'zod';

export const schema = z.object({
    code: z.string().optional(), // For some reason, `firebase.database.get` errors dont have a 'code'
    message: z.string(),
});

export type FirebaseError = z.infer<typeof schema>;

export const validate = (value: unknown): FirebaseError => {
    return schema.parse(value);
};

export const isValid = (value: unknown): value is FirebaseError => {
    try {
        validate(value);
        return true;
    } catch {
        return false;
    }
};
