import * as z from 'zod';

export const schema = z.object({
    title: z.string(),
    body: z.string(),
    imageUrl: z.string().optional(),
    isViewed: z.boolean().default(false),
    action: z
        .object({
            type: z.enum(['navigate']),
            target: z.string(),
        })
        .optional(),
});
export const persistedSchema = schema.merge(
    z.object({
        id: z.string(),
        createdAt: z.string(),
        updatedAt: z.string(),
    })
);

export type Type = z.infer<typeof schema>;
export type PersitedType = z.infer<typeof persistedSchema>;

export const validate = (value: unknown): Type => {
    return schema.parse(value);
};

export const isValid = (value: unknown): value is Type => {
    try {
        validate(value);
        return true;
    } catch {
        return false;
    }
};

export const validatePersisted = (value: unknown): PersitedType => {
    return persistedSchema.parse(value);
};

export const isValidPersisted = (value: unknown): value is PersitedType => {
    try {
        validatePersisted(value);
        return true;
    } catch {
        return false;
    }
};
