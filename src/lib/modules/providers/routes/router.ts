import * as trpc from '@trpc/server';

import {
    listPracticeProfilesByUserIdResolver,
    getProviderProfileByUserIdResolver,
    createProviderProfileForPracticeResolver,
    getProviderProfileByIdResolver,
    updateProviderProfileResolver,
    deleteProviderProfileResolver,
    createPracticeProviderInvitationResolver,
    updateDirectoryListingResolver,
} from './resolvers';
import { Context } from '@/lib/server/context';
import {
    GetProviderProfileByUserId,
    ListPracticeProfilesByUserId,
    CreateProviderProfileForPractice,
    GetProviderProfileById,
    UpdateProviderProfile,
    DeleteProviderProfile,
    UpdateDirectoryListing,
} from '@/lib/modules/providers/features/profiles';
import {
    CreatePracticeProviderInvitation,
    DeletePracticeProviderInvitation,
} from '@/lib/modules/providers/features/invitations';
import { deletePracticeProviderInvitationResolver } from './resolvers/delete-practice-provider-invitation';

export const router = trpc
    .router<Context>()
    .query(GetProviderProfileByUserId.TRPC_ROUTE, {
        input: GetProviderProfileByUserId.inputSchema,
        output: GetProviderProfileByUserId.outputSchema,
        resolve: getProviderProfileByUserIdResolver,
    })
    .query(GetProviderProfileById.TRPC_ROUTE, {
        input: GetProviderProfileById.inputSchema,
        output: GetProviderProfileById.outputSchema,
        resolve: getProviderProfileByIdResolver,
    })
    .query(ListPracticeProfilesByUserId.TRPC_ROUTE, {
        input: ListPracticeProfilesByUserId.inputSchema,
        output: ListPracticeProfilesByUserId.outputSchema,
        resolve: listPracticeProfilesByUserIdResolver,
    })
    .mutation(CreateProviderProfileForPractice.TRPC_ROUTE, {
        input: CreateProviderProfileForPractice.inputSchema,
        output: CreateProviderProfileForPractice.outputSchema,
        resolve: createProviderProfileForPracticeResolver,
    })
    .mutation(UpdateDirectoryListing.TRPC_ROUTE, {
        input: UpdateDirectoryListing.inputSchema,
        output: UpdateDirectoryListing.outputSchema,
        resolve: updateDirectoryListingResolver,
    })
    .mutation(UpdateProviderProfile.TRPC_ROUTE, {
        input: UpdateProviderProfile.inputSchema,
        output: UpdateProviderProfile.outputSchema,
        resolve: updateProviderProfileResolver,
    })
    .mutation(DeleteProviderProfile.TRPC_ROUTE, {
        input: DeleteProviderProfile.inputSchema,
        output: DeleteProviderProfile.outputSchema,
        resolve: deleteProviderProfileResolver,
    })
    .mutation(CreatePracticeProviderInvitation.TRPC_ROUTE, {
        input: CreatePracticeProviderInvitation.inputSchema,
        output: CreatePracticeProviderInvitation.outputSchema,
        resolve: createPracticeProviderInvitationResolver,
    })
    .mutation(DeletePracticeProviderInvitation.TRPC_ROUTE, {
        input: DeletePracticeProviderInvitation.inputSchema,
        output: DeletePracticeProviderInvitation.outputSchema,
        resolve: deletePracticeProviderInvitationResolver,
    });
