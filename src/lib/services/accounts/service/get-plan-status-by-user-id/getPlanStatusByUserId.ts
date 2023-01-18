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
                plans: {
                    orderBy: {
                        createdAt: 'desc',
                    },
                    take: 1,
                    select: {
                        status: true,
                        createdAt: true,
                    },
                },
            },
        });
        const [newestPlan] = plans;

        return {
            status: newestPlan?.status ?? null,
        };
    };
