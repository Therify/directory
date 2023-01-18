import { CreatePractice } from '@/lib/features/onboarding';
import { AccountsServiceParams as Context } from '../params';
import { TransactionV1 } from '@/lib/utils';

import {
    transactionDefinition,
    CreatePracticeEntity,
    CreateStripeCheckoutSession,
    GetUserDetails,
} from './transaction';

export function factory(context: Context) {
    return async function registerProvider(params: CreatePractice.Input) {
        return await TransactionV1.executeTransaction(
            transactionDefinition,
            { ...context },
            {
                getUserDetails: GetUserDetails.factory(params),
                createPracticeEntity: CreatePracticeEntity.factory(params),
                createStripeCheckoutSession:
                    CreateStripeCheckoutSession.factory(params),
            },
            true
        );
    };
}
