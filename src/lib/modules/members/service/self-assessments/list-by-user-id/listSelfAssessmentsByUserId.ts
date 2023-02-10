import { ListSelfAssessmentsByUserId } from '@/lib/modules/members/features';
import { SelfAssessment } from '@/lib/shared/types';
import { Role } from '@prisma/client';
import { MembersServiceParams } from '../../params';

export const factory =
    ({ prisma }: MembersServiceParams) =>
    async ({
        userId,
        options,
    }: ListSelfAssessmentsByUserId.Input): Promise<{
        selfAssessments: ListSelfAssessmentsByUserId.Output['selfAssessments'];
    }> => {
        const { roles, selfAssessments } = await prisma.user.findUniqueOrThrow({
            where: {
                id: userId,
            },
            select: {
                roles: true,
                selfAssessments: {
                    orderBy: {
                        createdAt: 'desc',
                    },
                    skip: options?.skip,
                    take: options?.take ?? 1,
                },
            },
        });
        if (!roles.includes(Role.member)) {
            throw new Error('User is not a member.');
        }

        return {
            selfAssessments: selfAssessments.map(SelfAssessment.validate),
        };
    };
