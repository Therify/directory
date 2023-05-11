import { HandlePracticeOnboarding } from '@/lib/modules/onboarding/features';
import { HandlePracticeOnboardingTransaction } from './definition';
import { addYears } from 'date-fns';
import { PlanStatus } from '@prisma/client';

export const factory =
    ({}: HandlePracticeOnboarding.Input): HandlePracticeOnboardingTransaction['createPlan'] => ({
        async commit(
            { prisma },
            { getUserDetails: { userId }, handlePracticeEntity: { practiceId } }
        ) {
            const { id: planId } = await prisma.plan.create({
                data: {
                    seats: 15,
                    startDate: new Date(),
                    endDate: addYears(new Date(), 500),
                    billingUserId: userId,
                    createdAt: new Date(),
                    updatedAt: new Date(),
                    status: PlanStatus.active,
                    renews: false,
                    practiceId,
                },
            });
            return {
                planId,
            };
        },
        async rollback({ prisma }, { createPlan: { planId } }) {
            return prisma.plan.delete({
                where: {
                    id: planId,
                },
            });
        },
    });
