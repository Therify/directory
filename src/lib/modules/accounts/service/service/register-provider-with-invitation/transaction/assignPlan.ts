import { RegisterProviderWithInvitation } from '@/lib/modules/registration/features';
import type { RegisterProviderWithInitationTransaction } from './definition';

interface CreateTherifyUserEntityFactory {
    (
        params: RegisterProviderWithInvitation.Input
    ): RegisterProviderWithInitationTransaction['assignPlan'];
}

export const factory: CreateTherifyUserEntityFactory = ({ invitationId }) => {
    return {
        async commit({ prisma }) {
            // TODO: Implement this transaction
            return {
                planId: '',
            };
        },
        rollback({ prisma }, { acceptInvitation: { invitationAccepted } }) {
            // TODO: Implement this rollback
        },
    };
};
