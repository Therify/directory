import { CreateProviderProfileForPractice } from '@/lib/modules/providers/features/profiles';
import { InvitationStatus, PlanStatus } from '@prisma/client';
import { isAfter } from 'date-fns';
import { CreateProviderProfileForPracticeTransaction } from './definition';

export const factory: (
    input: CreateProviderProfileForPractice.Input
) => CreateProviderProfileForPracticeTransaction['validateSeatAvailabilityForPractice'] = ({
    userId: practiceOwnerId,
}) => {
    return {
        async commit({ prisma }) {
            // Seats at a practice are taken up by either a provider profile or
            // an unaccepted invitation that does NOT have a profile id assigned.
            // This is because a "seat" is 1:1 with a profile, but an invitation without
            // a profile id assigned represents the intention for a profile to be
            // created when accepted. Therefore, an invitation with no profileId
            // should take a seat until that invitation is accepted (which creates the profile) or
            // status becomes rejected or expired.
            const { managedPractice } = await prisma.user.findUniqueOrThrow({
                where: { id: practiceOwnerId },
                select: {
                    managedPractice: {
                        select: {
                            id: true,
                            plans: {
                                orderBy: {
                                    createdAt: 'desc',
                                },
                                take: 1,
                                select: {
                                    billingUserId: true,
                                    seats: true,
                                    status: true,
                                    endDate: true,
                                },
                            },
                        },
                    },
                },
            });
            if (!managedPractice)
                throw new Error('User is not a practice admin');
            const [plan] = managedPractice.plans ?? [];
            if (!plan) throw new Error('No plan found for practice.');
            if (plan.billingUserId !== practiceOwnerId)
                throw new Error('User is not a practice admin.');

            const activeStatuses: PlanStatus[] = [
                PlanStatus.active,
                PlanStatus.trialing,
            ];
            if (!activeStatuses.includes(plan.status))
                throw new Error('Plan is not active');
            if (isAfter(new Date(), plan.endDate))
                throw new Error('Plan has expired');

            const invitationsCount =
                await prisma.practiceProviderInvitation.count({
                    where: {
                        practice: {
                            practiceOwnerId,
                        },
                        status: {
                            in: [
                                InvitationStatus.pending,
                                InvitationStatus.accepted,
                            ],
                        },
                        profileId: null,
                    },
                });
            const profilesCount = await prisma.practiceProfile.count({
                where: {
                    practice: {
                        practiceOwnerId,
                    },
                },
            });

            if (invitationsCount + profilesCount >= plan.seats) {
                throw new Error(
                    'No seats available. Please upgrade your plan to create a new profile.'
                );
            }
            return {
                practiceId: managedPractice.id,
            };
        },
        rollback() {},
    };
};
