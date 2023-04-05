import { SelfAssessment } from '@/lib/shared/types/self-assessment';
import { fromForm } from '@/lib/shared/types/self-assessment/from-form';
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
    return async function createSelfAssessment({
        userId,
        selfAssessmentSubmission,
    }) {
        const parsedSelfAssessment = fromForm(selfAssessmentSubmission);
        try {
            const newSelfAssessment = await prisma.selfAssessment.create({
                data: {
                    userId,
                    ...parsedSelfAssessment,
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
