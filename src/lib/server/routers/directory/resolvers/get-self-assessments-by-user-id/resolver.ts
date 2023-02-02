import { Context } from '@/lib/server/context';
import { GetSelfAssessmentsByUserId } from '@/lib/features/members';
import { ProcedureResolver } from '@trpc/server/dist/declarations/src/internals/procedure';

export const resolve: ProcedureResolver<
    Context,
    GetSelfAssessmentsByUserId.Input,
    GetSelfAssessmentsByUserId.Output
> = async function resolveGetSelfAssessmentsByUserId({
    input,
    ctx,
}): Promise<GetSelfAssessmentsByUserId.Output> {
    try {
        const { selfAssessments } =
            await ctx.directory.selfAssessments.getByUserId(input);
        return {
            selfAssessments,
            errors: [],
        };
    } catch (error) {
        let errorMessage = 'There was a problem getting your self assessments.';
        if (error instanceof Error) {
            errorMessage = error.message;
        }
        return {
            selfAssessments: [],
            errors: [errorMessage],
        };
    }
};
