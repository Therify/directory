import { RegisterProviderWithInvitation } from '@/lib/modules/registration/features';
import { InvitationStatus } from '@prisma/client';
import { isAfter } from 'date-fns';
import type { RegisterProviderWithInvitationTransaction } from './definition';

interface CreateTherifyUserEntityFactory {
    (
        params: RegisterProviderWithInvitation.Input
    ): RegisterProviderWithInvitationTransaction['getInvitation'];
}

export const factory: CreateTherifyUserEntityFactory = ({ invitationId }) => {
    return {
        async commit({ prisma }) {
            const { expiresAt, status, practiceId, profileId } =
                await prisma.practiceProviderInvitation.findUniqueOrThrow({
                    where: {
                        id: invitationId,
                    },
                    select: {
                        practiceId: true,
                        profileId: true,
                        status: true,
                        expiresAt: true,
                    },
                });

            if (status !== InvitationStatus.pending) {
                throw new Error(
                    `Invitation is ${
                        status === InvitationStatus.accepted
                            ? 'already accepted'
                            : status
                    }.`
                );
            }
            if (expiresAt && isAfter(new Date(), expiresAt)) {
                await prisma.practiceProviderInvitation.update({
                    where: {
                        id: invitationId,
                    },
                    data: {
                        status: InvitationStatus.expired,
                    },
                });
                throw new Error('Your invitation has expired.');
            }
            return {
                profileId,
                practiceId,
            };
        },
        rollback() {},
    };
};
