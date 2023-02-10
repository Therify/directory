import { CreateProviderProfileForPractice } from '@/lib/modules/provider-profiles/features';

import { CreateProviderProfileForPracticeTransaction } from './definition';

export const factory: (
    input: CreateProviderProfileForPractice.Input
) => CreateProviderProfileForPracticeTransaction['createProviderProfile'] = ({
    profile,
}) => {
    return {
        async commit({ prisma }) {
            const { id: profileId } = await prisma.providerProfile.create({
                data: { ...profile },
            });

            return {
                profileId,
            };
        },
        rollback({ prisma }, { createProviderProfile: { profileId } }) {
            return prisma.providerProfile.delete({
                where: { id: profileId },
            });
        },
    };
};
