import { CreateProviderProfileForPractice } from '@/lib/features/provider-profiles';
import { ProvidersServiceParams } from '../../params';
import { TransactionV1 } from '@/lib/utils';
import {
    transactionDefinition,
    CreateDirectoryListing,
    CreatePracticeProviderInvitation,
    CreateProviderProfile,
    GetPractice,
} from './transaction';

export function factory(context: ProvidersServiceParams) {
    return async function registerProvider(
        params: CreateProviderProfileForPractice.Input
    ) {
        return await TransactionV1.executeTransaction(
            transactionDefinition,
            { ...context },
            {
                getPractice: GetPractice.factory(params),
                createProviderProfile: CreateProviderProfile.factory(params),
                createDirectoryListing: CreateDirectoryListing.factory(params),
                createPracticeProviderInvitation:
                    CreatePracticeProviderInvitation.factory(params),
            },
            true
        );
    };
}
