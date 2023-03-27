import { SelfAssessment } from '@/lib/shared/types/self-assessment';
import { CreateSelfAssessment } from '../../features';
import { MembersServiceParams } from '../params';

interface CreateSelfAssessmentParams extends MembersServiceParams {}

interface CreateSelfAssessmentFactory {
    (params: CreateSelfAssessmentParams): {
        (
            input: CreateSelfAssessment.Input
        ): Promise<CreateSelfAssessment.Output>;
    };
}

export const factory: CreateSelfAssessmentFactory = ({ prisma }) => {
    return async function createSelfAssessment({ userId, ...input }) {
        try {
            const newSelfAssessment = await prisma.selfAssessment.create({
                data: {
                    userId,
                    ...input,
                },
            });
            const selfAssessment = SelfAssessment.validate(newSelfAssessment);
            return {
                success: true,
                payload: selfAssessment,
            };
        } catch (error) {
            return {
                success: false,
                error: error,
            };
        }
    };
};
