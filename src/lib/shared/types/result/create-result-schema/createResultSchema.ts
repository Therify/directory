import { z } from 'zod';
import { successSchema, failureSchema } from '../result';

/**
 *
 * @param payloadSchema - The schema of the payload of the result
 * @returns
 */
export function createResultSchema<T extends z.ZodTypeAny>(payloadSchema: T) {
    return z.union([
        successSchema.extend({
            payload: payloadSchema,
        }),
        failureSchema,
    ]);
}
