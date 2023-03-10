import { ProvidersServiceParams } from '../../params';
import { ListPracticeProfilesByUserId } from '@/lib/modules/providers/features/profiles';
import { ProviderProfileListing } from '@/lib/shared/types';
import { InvitationStatus } from '@prisma/client';

export function factory({ prisma }: ProvidersServiceParams) {
    return async function ({
        userId,
    }: ListPracticeProfilesByUserId.Input): Promise<{
        profiles: ListPracticeProfilesByUserId.Output['profiles'];
    }> {
        const practice = await prisma.practice.findUnique({
            where: {
                practiceOwnerId: userId,
            },
            select: {
                id: true,
            },
        });
        if (!practice) throw new Error('User is not a practice admin');

        const rawProfiles = await prisma.providerProfile.findMany({
            where: {
                practiceProfile: {
                    practiceId: practice.id,
                },
            },
            include: {
                directoryListing: true,
                // Latest pending or accepted invitation
                invitations: {
                    orderBy: {
                        createdAt: 'desc',
                    },
                    take: 1,
                    where: {
                        status: {
                            in: [
                                InvitationStatus.pending,
                                InvitationStatus.accepted,
                            ],
                        },
                    },
                    select: {
                        id: true,
                        status: true,
                        recipientEmail: true,
                        expiresAt: true,
                    },
                },
            },
        });
        const profiles = rawProfiles.map(
            ({ invitations, createdAt, updatedAt, ...profile }) => {
                const [invitation] = invitations;

                return ProviderProfileListing.validate({
                    ...profile,
                    invitation: invitation
                        ? {
                              ...invitation,
                              expiresAt:
                                  invitation.expiresAt?.toISOString() ?? null,
                          }
                        : null,
                    createdAt: createdAt.toISOString(),
                    updatedAt: updatedAt.toISOString(),
                });
            }
        );
        return {
            profiles: JSON.parse(JSON.stringify(profiles)),
        };
    };
}
