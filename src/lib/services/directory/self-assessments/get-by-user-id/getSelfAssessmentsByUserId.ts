import { GetSelfAssessmentsByUserId } from '@/lib/features/members';
import { Role } from '@prisma/client';
import { DirectoryServiceParams } from '../../params';

export const factory =
    ({ prisma }: DirectoryServiceParams) =>
    async ({
        userId,
        options,
    }: GetSelfAssessmentsByUserId.Input): Promise<{
        selfAssessments: GetSelfAssessmentsByUserId.Output['selfAssessments'];
    }> => {
        const { roles, selfAssessments } = await prisma.user.findUniqueOrThrow({
            where: {
                id: userId,
            },
            select: {
                roles: true,
                selfAssessments: {
                    skip: options?.skip,
                    take: options?.take ?? 10,
                },
            },
        });
        if (!roles.includes(Role.member)) {
            throw new Error('User is not a member.');
        }

        return {
            selfAssessments:
                // TODO: FIX THIS
                selfAssessments as GetSelfAssessmentsByUserId.Output['selfAssessments'],
        };
    };
