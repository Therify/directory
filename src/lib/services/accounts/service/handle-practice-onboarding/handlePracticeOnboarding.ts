import { HandlePracticeOnboarding } from '@/lib/features/onboarding';
import { AccountsServiceParams as Context } from '../params';
import { TransactionV1 } from '@/lib/utils';

import {
    transactionDefinition,
    HandlePracticeEntity,
    CreateStripeCheckoutSession,
    DefendAgainstDuplicatePlans,
    GetUserDetails,
} from './transaction';

export function factory(context: Context) {
    return async function registerProvider(
        params: HandlePracticeOnboarding.Input
    ) {
        return await TransactionV1.executeTransaction(
            transactionDefinition,
            { ...context },
            {
                getUserDetails: GetUserDetails.factory(params),
                defendAgainstDuplicatePlans:
                    DefendAgainstDuplicatePlans.factory(params),
                handlePracticeEntity: HandlePracticeEntity.factory(params),
                createStripeCheckoutSession:
                    CreateStripeCheckoutSession.factory(params),
            },
            true
        );
    };
}
