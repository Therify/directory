import * as z from 'zod';
import { ConnectionRequestSchema, PlanSchema } from '../../schema';
import { ProviderProfile } from '../provider-profile';
import { convertNestedDatesToISOString } from '../../utils';
import { ENTRIES as INSURANCE_PROVIDERS } from '../insuranceProvider';
import { CANADA, UNITED_STATES } from '../address';

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
        memberProfile: z.discriminatedUnion('country', [
            z.object({
                insurance: z.enum(INSURANCE_PROVIDERS),
                concerns: z.array(z.string()),
                goals: z.array(z.string()),
                state: z.enum(CANADA.PROVINCE.ENTRIES),
                country: z.literal(CANADA.COUNTRY.CODE),
            }),
            z.object({
                insurance: z.enum(INSURANCE_PROVIDERS),
                concerns: z.array(z.string()),
                goals: z.array(z.string()),
                state: z.enum(UNITED_STATES.STATE.ENTRIES),
                country: z.literal(UNITED_STATES.COUNTRY.CODE),
            }),
        ]),
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
        contactEmail: ProviderProfile.schema.shape.contactEmail,
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
