import { HandlePlanChange } from '@/lib/modules/accounts/features/billing';
import { TransactionV1 } from '@/lib/shared/utils/transaction';
import { AccountsServiceParams } from '../../params';
import {
    handlePlanChangeTransactionDefinition,
    ValidatePriceId,
    GetTherifyUserDetails,
    InvalidatePreviousPlans,
    CreateNewPlanEntity,
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
                getTherifyUserDetails: GetTherifyUserDetails.factory(params),
                invalidatePreviousPlans: InvalidatePreviousPlans.step,
                createNewPlanEntity: CreateNewPlanEntity.factory(params),
                createStripeInvoiceEntity:
                    CreateStripeInvoiceEntity.factory(params),
            },
            true
        );
    };
