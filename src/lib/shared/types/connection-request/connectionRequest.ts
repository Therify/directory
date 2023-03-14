import * as z from 'zod';
import { ENTRIES as STATES } from '../address/united-states/state';
import { ConnectionRequestSchema, PlanSchema } from '../../schema';
import { ProviderProfile } from '../provider-profile';
import { convertNestedDatesToISOString } from '../../utils';
import { ENTRIES as INSURANCE_PROVIDERS } from '../insuranceProvider';

export const schema = z.object({
    connectionStatus: ConnectionRequestSchema.shape.connectionStatus,
    connectionMessage: ConnectionRequestSchema.shape.connectionMessage,
    createdAt: z.string(),
    updatedAt: z.string(),
    member: z.object({
        id: z.string(),
        givenName: z.string(),
        surname: z.string(),
        emailAddress: z.string(),
        memberProfile: z.object({
            insurance: z.enum(INSURANCE_PROVIDERS),
            concerns: z.array(z.string()),
            goals: z.array(z.string()),
            state: z.enum(STATES),
        }),
        account: z.object({
            name: z.string(),
        }),
        plan: z
            .object({
                startDate: z.string(),
                endDate: z.string(),
                status: PlanSchema.shape.status,
                coveredSessions: z.number(),
            })
            .nullable(),
    }),
    providerProfile: z.object({
        id: z.string(),
        givenName: ProviderProfile.schema.shape.givenName,
        surname: ProviderProfile.schema.shape.surname,
        practice: z.object({
            name: z.string(),
            email: z.string(),
            id: z.string(),
        }),
    }),
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
