import { CancelPlan } from '@/lib/modules/accounts/features/billing';
import { TransactionV1 } from '@/lib/shared/utils';
import { AccountsServiceParams } from '../../params';

import {
    cancelPlanTransactionDefinition,
    CancelPlanEntity,
    FindPlanEntity,
} from './transaction';

export const factory =
    (context: AccountsServiceParams) => async (params: CancelPlan.Input) => {
        return await TransactionV1.executeTransaction(
            cancelPlanTransactionDefinition,
            { ...context },
            {
                findPlanEntity: FindPlanEntity.factory(params),
                cancelPlanEntity: CancelPlanEntity.step,
            },
            true
        );
    };
