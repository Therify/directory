import { HandleReimbursementSubmission } from '@/lib/modules/accounts/features/billing';
import { TransactionV1 } from '@/lib/shared/utils/transaction';
import { AccountsServiceParams } from '../../params';
import {
    handleReimbursementSubmissionDefinition,
    ClaimSession,
    GetMemberDetails,
    GetProviderDetails,
} from './transaction';

export const factory =
    (context: AccountsServiceParams) =>
    async (params: HandleReimbursementSubmission.Input) => {
        return await TransactionV1.executeTransaction(
            handleReimbursementSubmissionDefinition,
            { ...context },
            {
                getMemberDetails: GetMemberDetails.factory(params),
                getProviderDetails: GetProviderDetails.factory(params),
                claimSession: ClaimSession.factory(params),
            },
            true
        );
    };
