import { RegisterProviderWithInvitation } from '@/lib/modules/registration/features';
import { InvitationStatus } from '@prisma/client';
import { isAfter } from 'date-fns';
import type { RegisterProviderWithInvitationTransaction } from './definition';

interface CreateTherifyUserEntityFactory {
    (
        params: RegisterProviderWithInvitation.Input
    ): RegisterProviderWithInvitationTransaction['acceptInvitation'];
}

export const factory: CreateTherifyUserEntityFactory = ({ invitationId }) => {
    return {
        async commit({ prisma }) {
            await prisma.practiceProviderInvitation.update({
                where: {
                    id: invitationId,
                },
                data: {
                    status: InvitationStatus.accepted,
                },
            });
            return {
                invitationAccepted: true,
            };
        },
        rollback({ prisma }, { acceptInvitation: { invitationAccepted } }) {
            if (invitationAccepted) {
                return prisma.practiceProviderInvitation.update({
                    where: {
                        id: invitationId,
                    },
                    data: {
                        status: InvitationStatus.pending,
                    },
                });
            }
        },
    };
};
