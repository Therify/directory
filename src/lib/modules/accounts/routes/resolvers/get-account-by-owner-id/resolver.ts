import { Context } from '@/lib/server/context';
import { RegisterAccountOwner } from '@/lib/modules/registration/features';
import { ProcedureResolver } from '@trpc/server/dist/declarations/src/internals/procedure';
import { GetAccountByOwnerId } from '../../../features';

export const resolve: ProcedureResolver<
    Context,
    GetAccountByOwnerId.Input,
    GetAccountByOwnerId.Output
> = async function resolve({
    input,
    ctx,
}): Promise<GetAccountByOwnerId.Output> {
    return await ctx.accounts.getAccountByOwnerId(input);
};
