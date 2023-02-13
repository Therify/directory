import * as z from 'zod';
import { ProviderProfile } from '../../provider-profile';

export const schema = ProviderProfile.schema
    .pick({
        id: true,
        givenName: true,
        surname: true,
        minimumRate: true,
        maximumRate: true,
        credentials: true,
        profileImageUrl: true,
    })
    .transform((value) => {
        const rate = value.maximumRate
            ? `${value.minimumRate} - ${value.maximumRate}`
            : `${value.minimumRate}`;
        return {
            id: value.id,
            profileImageUrl: value.profileImageUrl,
            providerName: `${value.givenName} ${value.surname}`,
            licenses: Array.from(
                new Set(value.credentials.map((credential) => credential.type))
            ),
            rate,
        };
    });

export type DirectoryProfileCard = z.infer<typeof schema>;

export const validate = (value: unknown): DirectoryProfileCard => {
    return schema.parse(value);
};

export const isValid = (value: unknown): value is DirectoryProfileCard => {
    try {
        validate(value);
        return true;
    } catch {
        return false;
    }
};
