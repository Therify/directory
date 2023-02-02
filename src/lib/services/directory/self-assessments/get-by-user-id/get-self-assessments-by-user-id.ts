import { GetSelfAssessmentsByUserId } from '@/lib/features/members';
import { DirectoryServiceParams } from '../../params';

export const factory =
    ({ prisma }: DirectoryServiceParams) =>
    async ({
        userId,
    }: GetSelfAssessmentsByUserId.Input): Promise<{
        selfAssessments: GetSelfAssessmentsByUserId.Output['selfAssessments'];
    }> => {
        const selfAssessments = await prisma.selfAssessment.findMany({
            where: {
                userId,
            },
            orderBy: {
                createdAt: 'desc',
            },
        });

        return {
            selfAssessments:
                // TODO: FIX THIS
                selfAssessments as GetSelfAssessmentsByUserId.Output['selfAssessments'],
        };
    };
