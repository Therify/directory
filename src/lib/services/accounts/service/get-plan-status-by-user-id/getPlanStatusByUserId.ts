import { GetPlanStatus } from '@/lib/features/users';
import { AccountsServiceParams } from '../params';

export const factory =
    ({ prisma }: AccountsServiceParams) =>
    async (
        input: GetPlanStatus.Input
    ): Promise<{
        status: GetPlanStatus.Output['status'];
    }> => {
        const { plans } = await prisma.user.findUniqueOrThrow({
            where: {
                auth0Id: input.auth0Id,
            },
            select: {
                plans: true,
            },
        });
        // sort plans newest to oldest
        const [newestPlan] = plans.sort((a, b) => {
            if (a.createdAt > b.createdAt) return -1;
            if (a.createdAt < b.createdAt) return 1;
            return 0;
        });

        return {
            status: newestPlan?.status ?? null,
        };
    };
