import { ListingStatus } from '@prisma/client';

import { CreateProviderProfileForPracticeTransaction } from './definition';

export const step: CreateProviderProfileForPracticeTransaction['createDirectoryListing'] =
    {
        async commit(
            { prisma },
            {
                validateSeatAvailabilityForPractice: { practiceId },
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
