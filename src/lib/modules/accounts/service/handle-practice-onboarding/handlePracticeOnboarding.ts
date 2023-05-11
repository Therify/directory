import { HandlePracticeOnboarding } from '@/lib/modules/onboarding/features';
import { AccountsServiceParams as Context } from '../params';
import { TransactionV1 } from '@/lib/shared/utils';

import {
    transactionDefinition,
    HandlePracticeEntity,
    DefendAgainstDuplicatePlans,
    GetUserDetails,
    CreatePlan,
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
                handlePracticeEntity: HandlePracticeEntity.factory(params),
                defendAgainstDuplicatePlans:
                    DefendAgainstDuplicatePlans.factory(params),
                createPlan: CreatePlan.factory(params),
            },
            true
        );
    };
}
