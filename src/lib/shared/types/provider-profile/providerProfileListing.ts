import * as z from 'zod';
import * as Pronoun from '../pronoun';
import {
    DirectoryListingSchema,
    PracticeProviderInvitationSchema,
    ProviderProfileSchema,
} from '../../schema';
import { ProviderCredential } from '../provider-credential';
import { AcceptedInsurance } from '../accepted-insurance';

export const schema = ProviderProfileSchema.pick({
    id: true,
    firstName: true,
    lastName: true,
    maximumRate: true,
    minimumRate: true,
    createdAt: true,
    updatedAt: true,
    profileImageUrl: true,
    offersInPerson: true,
    offersVirtual: true,
    specialties: true,
})
    .extend({
        pronouns: Pronoun.schema,
        credentials: ProviderCredential.schema.array(),
        acceptedInsurances: AcceptedInsurance.schema.array(),
        invitation: PracticeProviderInvitationSchema.nullable(),
        directoryListing: DirectoryListingSchema,
    })
    .omit({
        createdAt: true,
        updatedAt: true,
    });

export type ProviderProfile = z.infer<typeof schema>;

export const validate = (value: unknown): ProviderProfile => {
    return schema.parse(value);
};

export const isValid = (value: unknown): value is ProviderProfile => {
    try {
        validate(value);
        return true;
    } catch {
        return false;
    }
};
