import { HandlePlanChange } from '@/lib/features/accounts/billing';
import { TransactionV1 } from '@/lib/utils/transaction';
import { AccountsServiceParams } from '../../params';

import {
    handlePlanChangeTransactionDefinition,
    ValidatePriceId,
    GetPlanDetails,
    UpdatePlanEntity,
    CreateStripeInvoiceEntity,
} from './transaction';

export const factory =
    (context: AccountsServiceParams) =>
    async (params: HandlePlanChange.Input) => {
        return await TransactionV1.executeTransaction(
            handlePlanChangeTransactionDefinition,
            { ...context },
            {
                validatePriceId: ValidatePriceId.factory(params),
                getPlanDetails: GetPlanDetails.factory(params),
                updatePlanEntity: UpdatePlanEntity.factory(params),
                createStripeInvoiceEntity:
                    CreateStripeInvoiceEntity.factory(params),
            },
            true
        );
    };
