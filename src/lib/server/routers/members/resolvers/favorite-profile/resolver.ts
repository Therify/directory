import { FavoriteProfile } from '@/lib/features/members';
import { Context } from '@/lib/server/context';
import { ProcedureResolver } from '@trpc/server/dist/declarations/src/internals/procedure';

export const resolve: ProcedureResolver<
    Context,
    FavoriteProfile.Input,
    FavoriteProfile.Output
> = async ({ input, ctx }) => {
    return await ctx.members.favoriteProfile(input);
};
