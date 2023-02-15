import { ProvidersServiceParams } from '../../params';
import { TransactionV1 } from '@/lib/shared/utils';
import {
    transactionDefinition,
    CreateDirectoryListing,
    CreateProviderProfile,
    CreatePracticeProfile,
    ValidateSeatAvailabilityForPractice,
} from './transaction';
import { CreateProviderProfileForPractice } from '@/lib/modules/providers/features/profiles';

export function factory(context: ProvidersServiceParams) {
    return async function (params: CreateProviderProfileForPractice.Input) {
        return await TransactionV1.executeTransaction(
            transactionDefinition,
            { ...context },
            {
                validateSeatAvailabilityForPractice:
                    ValidateSeatAvailabilityForPractice.factory(params),
                createProviderProfile: CreateProviderProfile.factory(params),
                createDirectoryListing: CreateDirectoryListing.step,
                createPracticeProfile: CreatePracticeProfile.step,
            },
            true
        );
    };
}
