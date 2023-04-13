import { HandleAccountOnboarding } from '@/lib/modules/onboarding/features';
import { AccountsServiceParams as Context } from '../params';
import { TransactionV1 } from '@/lib/shared/utils';

import {
    transactionDefinition,
    HandleAccountEntity,
    CreateStripeCheckoutSession,
    DefendAgainstDuplicatePlans,
    GetUserDetails,
    HandleRegistrationCode,
} from './transaction';

export function factory(context: Context) {
    return async function registerProvider(
        params: HandleAccountOnboarding.Input
    ) {
        return await TransactionV1.executeTransaction(
            transactionDefinition,
            { ...context },
            {
                getUserDetails: GetUserDetails.factory(params),
                handleAccountEntity: HandleAccountEntity.factory(params),
                defendAgainstDuplicatePlans:
                    DefendAgainstDuplicatePlans.factory(params),
                handleRegistrationCode: HandleRegistrationCode.factory(params),
                createStripeCheckoutSession:
                    CreateStripeCheckoutSession.factory(params),
            },
            true
        );
    };
}
