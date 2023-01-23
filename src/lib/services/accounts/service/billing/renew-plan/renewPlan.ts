import { RenewPlan } from '@/lib/features/accounts/billing';
import { executeTransaction } from '@/lib/utils/transaction/transaction.v1';
import { AccountsServiceParams } from '../../params';
import {
    renewPlanTransactionDefinition,
    FindPlanEntity,
    RenewPlanEntity,
} from './transaction';

export const factory =
    (context: AccountsServiceParams) => async (params: RenewPlan.Input) => {
        return await executeTransaction(
            renewPlanTransactionDefinition,
            { ...context },
            {
                findPlanEntity: FindPlanEntity.factory(params),
                renewPlanEntity: RenewPlanEntity.step,
            },
            true
        );
    };
