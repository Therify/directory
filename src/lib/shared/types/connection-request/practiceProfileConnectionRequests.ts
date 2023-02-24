import * as z from 'zod';
import { convertNestedDatesToISOString } from '../../utils';
import { schema as connectionRequestSchema } from './connectionRequest';

const profileConnectionRequests = z.object({
    providerProfile: connectionRequestSchema.shape.providerProfile.omit({
        practice: true,
    }),
    connectionRequests: connectionRequestSchema
        .omit({ providerProfile: true })
        .array(),
});
export const schema = z.object({
    practice: connectionRequestSchema.shape.providerProfile.shape.practice,
    profileConnectionRequests: profileConnectionRequests.array(),
});

export type Type = z.infer<typeof schema>;

export const validate = (value: unknown): Type => {
    return schema.parse(convertNestedDatesToISOString(value));
};

export const isValid = (value: unknown): value is Type => {
    try {
        validate(value);
        return true;
    } catch {
        return false;
    }
};
