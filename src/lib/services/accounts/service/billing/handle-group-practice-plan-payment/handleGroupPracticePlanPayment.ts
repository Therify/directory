import { HandleGroupPracticePlanPayment } from '@/lib/features/accounts/billing';
import { executeTransaction } from '@/lib/utils/transaction/transaction.v1';
import { AccountsServiceParams } from '../../params';
import {
    GetTherifyIdentifiers,
    handleGroupPracticePlanPaymentTransactionDefinition,
    CreatePlanEntity,
    CreateInvoiceEntity,
} from './transaction';

export const factory =
    (context: AccountsServiceParams) =>
    async (params: HandleGroupPracticePlanPayment.Input) => {
        return await executeTransaction(
            handleGroupPracticePlanPaymentTransactionDefinition,
            { ...context },
            {
                getTherifyIdentifiers: GetTherifyIdentifiers.factory(params),
                createPlanEntity: CreatePlanEntity.factory(params),
                createInvoiceEntity: CreateInvoiceEntity.factory(params),
            },
            true
        );
    };
