import { HandleAccountOnboarding } from '@/lib/modules/onboarding/features';

import { HandleAccountOnboardingTransaction } from './definition';

export const factory = ({
    seatCount,
}: HandleAccountOnboarding.Input): HandleAccountOnboardingTransaction['handleRegistrationCode'] => ({
    async commit({ prisma }, { handleAccountEntity: { accountId } }) {
        const currentRegistrationCode = await prisma.registrationCode.findFirst(
            {
                where: {
                    accountId,
                },
            }
        );
        if (!currentRegistrationCode && seatCount > 1) {
            const registrationCode = await prisma.registrationCode.create({
                data: {
                    accountId,
                },
            });
            return {
                registrationCode: registrationCode.id,
                created: true,
            };
        }

        return {
            registrationCode: currentRegistrationCode?.id,
            created: false,
        };
    },
    async rollback(
        { prisma },
        { handleRegistrationCode: { registrationCode, created } }
    ) {
        if (created) {
            return prisma.registrationCode.delete({
                where: {
                    id: registrationCode,
                },
            });
        }
    },
});
