import { HandleCoachingSessionPayment } from '@/lib/modules/accounts/features/billing';
import { TransactionV1 } from '@/lib/shared/utils/transaction';
import { AccountsServiceParams } from '../../params';
import {
    handleCoachingSessionPaymentTransactionDefinition,
    GetMemberEntity,
    GetCoachEntity,
    HandleChannelMessage,
    HandleInvoiceEntity,
    HandleSessionInvoiceEntity,
} from './transaction';

export const factory =
    (context: AccountsServiceParams) =>
    async (params: HandleCoachingSessionPayment.Input) => {
        return await TransactionV1.executeTransaction(
            handleCoachingSessionPaymentTransactionDefinition,
            { ...context },
            {
                getCoachEntity: GetCoachEntity.factory(params),
                getMemberEntity: GetMemberEntity.factory(params),
                handleInvoiceEntity: HandleInvoiceEntity.factory(params),
                handleSessionInvoiceEntity:
                    HandleSessionInvoiceEntity.factory(params),
                handleChannelMessage: HandleChannelMessage.factory(params),
            },
            true
        );
    };
