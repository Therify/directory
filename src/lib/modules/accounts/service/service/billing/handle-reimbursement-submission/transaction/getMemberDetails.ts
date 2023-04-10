import { HandleReimbursementSubmission } from '@/lib/modules/accounts/features/billing';
import { HandleReimbursementSubmissionTransaction } from './definition';

interface GetTherifyUserDetailsFactory {
    (
        params: HandleReimbursementSubmission.Input
    ): HandleReimbursementSubmissionTransaction['getMemberDetails'];
}
export const factory: GetTherifyUserDetailsFactory = ({
    memberId,
    dateOfSession: dateOfSessionString,
}) => ({
    async commit({ prisma }) {
        const dateOfSession = new Date(dateOfSessionString);
        const { id, account } = await prisma.user.findUniqueOrThrow({
            where: { id: memberId },
            select: {
                id: true,
                account: {
                    select: {
                        plans: {
                            orderBy: {
                                createdAt: 'desc',
                            },
                            take: 1,
                            where: {
                                startDate: {
                                    lte: dateOfSession,
                                },
                                endDate: {
                                    gte: dateOfSession,
                                },
                            },
                        },
                    },
                },
            },
        });
        const plan = account?.plans[0];
        if (!plan)
            throw new Error('Failed to connect user to a plan for date range');
        return {
            memberId: id,
            planId: plan.id,
            dateOfSession: dateOfSession,
        };
    },
    async rollback() {
        return;
    },
});
