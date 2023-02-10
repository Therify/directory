import { CreateProviderProfileForPractice } from '@/lib/modules/provider-profiles/features';
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
            const {
                practiceId: listingPracticeId,
                providerProfileId: listingProfileId,
            } = await prisma.directoryListing.create({
                data: {
                    practiceId,
                    providerProfileId: profileId,
                    status: ListingStatus.unlisted,
                },
            });

            return {
                listingPracticeId,
                listingProfileId,
            };
        },
        rollback({ prisma }, { createDirectoryListing: { listingProfileId } }) {
            return prisma.directoryListing.delete({
                where: {
                    providerProfileId: listingProfileId,
                },
            });
        },
    };
};
