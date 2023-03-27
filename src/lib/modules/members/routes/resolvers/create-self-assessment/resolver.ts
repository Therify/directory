import { Context } from '@/lib/server/context';
import { ProcedureResolver } from '@trpc/server/dist/declarations/src/internals/procedure';
import { CreateSelfAssessment } from '../../../features';

export const resolve: ProcedureResolver<
    Context,
    CreateSelfAssessment.Input,
    CreateSelfAssessment.Output
> = async ({ ctx, input }) => {
    return ctx.members.createSelfAssessment(input);
};
