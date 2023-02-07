import { CreateProviderProfileForPractice } from '@/lib/features/provider-profiles';
import { ListingStatus } from '@prisma/client';

import { CreateProviderProfileForPracticeTransaction } from './definition';

export const factory: (
    input: CreateProviderProfileForPractice.Input
) => CreateProviderProfileForPracticeTransaction['createDirectoryListing'] = ({
    profile,
}) => {
    return {
        async commit(
            { prisma },
            {
                getPractice: { practiceId },
                createProviderProfile: { profileId },
            }
        ) {
            const { id: listingId } = await prisma.directoryListing.create({
                data: {
                    practiceId,
                    profileId,
                    status: ListingStatus.unlisted,
                },
            });

            return {
                listingId,
            };
        },
        rollback({ prisma }, { createDirectoryListing: { listingId: id } }) {
            return prisma.directoryListing.delete({
                where: { id },
            });
        },
    };
};
