import { PrismaClient } from '@prisma/client';

export const getPlanForMember = async (
    { memberId, dateOfSession }: { memberId: string; dateOfSession: Date },
    prisma: PrismaClient
) => {
    const { account } = await prisma.user.findUniqueOrThrow({
        where: { id: memberId },
        select: {
            account: {
                select: {
                    id: true,
                    plans: {
                        where: {
                            startDate: {
                                lte: dateOfSession,
                            },
                            endDate: {
                                gte: dateOfSession,
                            },
                        },
                        take: 1,
                    },
                },
            },
        },
    });
    if (!account)
        throw new Error(
            '[getPlanForMember]: No account found for member: ' + memberId
        );
    const [plan] = account.plans;
    if (!plan)
        throw new Error(
            '[getPlanForMember]: No plan found for account: ' +
                account.id +
                ' for member: ' +
                memberId
        );
    return plan.id;
};
