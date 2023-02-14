import { ProvidersServiceParams } from '../../params';
import {
    GetPractice,
    transactionDefinition,
    ValidateSeatAvailability,
    CreateInvitation,
    ValidateUniqueEmail,
} from './transaction';
import { TransactionV1 } from '@/lib/shared/utils';
import { CreatePracticeProviderInvitation } from '@/lib/modules/providers/features/invitations';

export function factory(context: ProvidersServiceParams) {
    return async function (params: CreatePracticeProviderInvitation.Input) {
        return await TransactionV1.executeTransaction(
            transactionDefinition,
            { ...context },
            {
                validateSeatAvailability:
                    ValidateSeatAvailability.factory(params),
                validateUniqueEmail: ValidateUniqueEmail.factory(params),
                getPractice: GetPractice.factory(params),
                createInvitation: CreateInvitation.factory(params),
            },
            true
        );
    };
}
