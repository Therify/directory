import { Context } from '@/lib/server/context';
import { ListSelfAssessmentsByUserId } from '@/lib/features/members';
import { ProcedureResolver } from '@trpc/server/dist/declarations/src/internals/procedure';

export const resolve: ProcedureResolver<
    Context,
    ListSelfAssessmentsByUserId.Input,
    ListSelfAssessmentsByUserId.Output
> = async function resolveListSelfAssessmentsByUserId({
    input,
    ctx,
}): Promise<ListSelfAssessmentsByUserId.Output> {
    try {
        const { selfAssessments } =
            await ctx.members.selfAssessments.listByUserId(input);
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
