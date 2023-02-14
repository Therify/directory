import { CreatePracticeProviderInvitation } from '@/lib/modules/providers/features/invitations';
import { InvitationStatus, PlanStatus } from '@prisma/client';
import { isAfter } from 'date-fns';
import { CreatePracticeProviderInvitationTransaction } from './definition';

export const factory: (
    input: CreatePracticeProviderInvitation.Input
) => CreatePracticeProviderInvitationTransaction['validateSeatAvailability'] = ({
    senderId,
    profileId,
}) => {
    return {
        async commit({ prisma }) {
            const { plans } = await prisma.user.findUniqueOrThrow({
                where: { id: senderId },
                select: {
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
            });
            const [plan] = plans;
            if (!plan) throw new Error('No plan found for user.');
            if (plan.billingUserId !== senderId)
                throw new Error('User is not a practice admin.');

            const activeStatuses: PlanStatus[] = [
                PlanStatus.active,
                PlanStatus.trialing,
            ];
            if (!activeStatuses.includes(plan.status))
                throw new Error('Plan is not active');
            if (isAfter(new Date(), plan.endDate))
                throw new Error('Plan has expired');

            if (!profileId) return;
            // Active/Pending invitations without a profileId count towards the seat limit
            // because they represent the intent for the recipient to create a profile and take a seat.
            const invitationsCount =
                await prisma.practiceProviderInvitation.count({
                    where: {
                        practice: {
                            userId: senderId,
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
                        userId: senderId,
                    },
                },
            });

            if (invitationsCount + profilesCount >= plan.seats) {
                throw new Error(
                    'No seats available. Please upgrade your plan to invite a provider.'
                );
            }
        },
        rollback() {},
    };
};
