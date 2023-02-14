import * as z from 'zod';
import * as Pronoun from '../pronoun';
import {
    DirectoryListingSchema,
    PracticeProviderInvitationSchema,
    ProviderProfileSchema,
} from '../../schema';
import { ProviderCredential } from '../provider-credential';
import { AcceptedInsurance } from '../accepted-insurance';
import { InvitationStatus } from '@prisma/client';

export const schema = ProviderProfileSchema.pick({
    id: true,
    givenName: true,
    surname: true,
    maximumRate: true,
    minimumRate: true,
    createdAt: true,
    updatedAt: true,
    profileImageUrl: true,
    offersInPerson: true,
    offersVirtual: true,
    specialties: true,
}).extend({
    pronouns: Pronoun.schema,
    credentials: ProviderCredential.schema.array(),
    acceptedInsurances: AcceptedInsurance.schema.array(),
    invitation: PracticeProviderInvitationSchema.omit({
        createdAt: true,
        updatedAt: true,
    })
        .extend({
            status: z.enum([
                InvitationStatus.accepted,
                InvitationStatus.pending,
            ]),
        })
        .nullable(),
    directoryListing: DirectoryListingSchema.omit({
        createdAt: true,
        updatedAt: true,
    }),
    createdAt: z.string(),
    updatedAt: z.string(),
});

export type Type = z.infer<typeof schema>;

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
