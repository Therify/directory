import { HandleMembershipPlanPayment } from '@/lib/modules/accounts/features/billing';
import { TransactionV1 } from '@/lib/shared/utils/transaction';
import { AccountsServiceParams } from '../../params';
import {
    GetAccount,
    handleMembershipPlanPaymentTransactionDefinition,
    CreatePlanEntity,
    CreateInvoiceEntity,
} from './transaction';

export const factory =
    (context: AccountsServiceParams) =>
    async (params: HandleMembershipPlanPayment.Input) => {
        return await TransactionV1.executeTransaction(
            handleMembershipPlanPaymentTransactionDefinition,
            { ...context },
            {
                getAccount: GetAccount.factory(params),
                createPlanEntity: CreatePlanEntity.factory(params),
                createInvoiceEntity: CreateInvoiceEntity.factory(params),
            },
            true
        );
    };
