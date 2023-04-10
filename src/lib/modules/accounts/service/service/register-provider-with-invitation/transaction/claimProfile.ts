import type { RegisterProviderWithInvitationTransaction } from './definition';

export const step: RegisterProviderWithInvitationTransaction['claimProfile'] = {
    async commit(
        { prisma },
        {
            getInvitation: { profileId },
            createTherifyUserEntity: { therifyUserId },
        }
    ) {
        if (profileId === null) {
            return {
                profileClaimed: false,
            };
        }
        const profile = await prisma.providerProfile.findUnique({
            where: {
                id: profileId,
            },
            select: {
                userId: true,
            },
        });
        if (profile === null) throw new Error('Profile not found.');
        if (profile.userId !== null) {
            throw new Error('Profile is already claimed.');
        }

        await prisma.providerProfile.update({
            where: {
                id: profileId,
            },
            data: {
                userId: therifyUserId,
            },
        });
        return {
            profileClaimed: true,
        };
    },
    rollback(
        { prisma },
        { getInvitation: { profileId }, claimProfile: { profileClaimed } }
    ) {
        if (profileId && profileClaimed) {
            return prisma.providerProfile.update({
                where: {
                    id: profileId,
                },
                data: {
                    userId: null,
                },
            });
        }
    },
};
