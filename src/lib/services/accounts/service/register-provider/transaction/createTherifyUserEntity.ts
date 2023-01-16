import { RegisterProvider } from '@/lib/features/registration';
import { Role } from '@prisma/client';
import type { RegisterProviderTransaction } from './definition';

interface CreateTherifyUserEntityFactory {
    (
        params: RegisterProvider.Input
    ): RegisterProviderTransaction['createTherifyUserEntity'];
}

export const factory: CreateTherifyUserEntityFactory = ({
    emailAddress,
    givenName,
    surname,
    dateOfBirth,
    hasAcceptedTermsAndConditions,
}) => {
    return {
        async commit(
            { prisma },
            { createAuth0User: { auth0UserId: auth0Id } }
        ) {
            if (hasAcceptedTermsAndConditions !== true)
                throw new Error(
                    'Terms and conditions must be accepted to register a user.'
                );

            const createdUser = await prisma.user.create({
                data: {
                    emailAddress,
                    givenName,
                    surname,
                    dateOfBirth,
                    hasAcceptedTermsAndConditions,
                    auth0Id,
                    // TODO: How do we know coach vs therapist?
                    role: Role.provider_therapist,
                },
            });
            return {
                therifyUserId: createdUser.id,
            };
        },
        rollback({ prisma }, { createTherifyUserEntity: { therifyUserId } }) {
            return prisma.user.delete({
                where: {
                    id: therifyUserId,
                },
            });
        },
    };
};
