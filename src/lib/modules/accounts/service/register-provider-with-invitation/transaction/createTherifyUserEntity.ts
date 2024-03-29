import { RegisterProviderWithInvitation } from '@/lib/modules/registration/features';
import type { RegisterProviderWithInvitationTransaction } from './definition';

interface CreateTherifyUserEntityFactory {
    (
        params: RegisterProviderWithInvitation.Input
    ): RegisterProviderWithInvitationTransaction['createTherifyUserEntity'];
}

export const factory: CreateTherifyUserEntityFactory = ({
    emailAddress,
    givenName,
    surname,
    dateOfBirth,
    hasAcceptedTermsAndConditions,
    role,
}) => {
    return {
        async commit(
            { prisma },
            { createAuth0User: { auth0UserId: auth0Id } }
        ) {
            if (hasAcceptedTermsAndConditions !== true)
                throw new Error(
                    'Terms and conditions must be accepted to register.'
                );

            const createdUser = await prisma.user.create({
                data: {
                    id: auth0Id,
                    emailAddress,
                    givenName,
                    surname,
                    dateOfBirth,
                    hasAcceptedTermsAndConditions,
                    roles: [role],
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
