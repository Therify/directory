import { RegisterProviderWithInvitation } from '@/lib/modules/registration/features';
import { AccountsServiceParams as Context } from '../params';
import { TransactionV1 } from '@/lib/shared/utils';

import {
    transactionDefinition,
    GetInvitation,
    CreateAuth0User,
    AssignAuth0Roles,
    CreateTherifyUser,
    CreatePracticeProvider,
    ClaimProfile,
    AcceptInvitation,
    UpdateUserEntity,
    CreateStripeCustomer,
} from './transaction';

export function factory(context: Context) {
    return async function registerProvider(
        params: RegisterProviderWithInvitation.Input
    ) {
        return await TransactionV1.executeTransaction(
            transactionDefinition,
            { ...context },
            {
                getInvitation: GetInvitation.factory(params),
                createAuth0User: CreateAuth0User.factory(params),
                assignAuth0Roles: AssignAuth0Roles.factory(params.role),
                createTherifyUserEntity: CreateTherifyUser.factory(params),
                createStripeCustomer: CreateStripeCustomer.factory(params),
                updateUserEntity: UpdateUserEntity.step,
                createPracticeProvider: CreatePracticeProvider.factory(params),
                claimProfile: ClaimProfile.step,
                acceptInvitation: AcceptInvitation.factory(params),
            },
            true
        );
    };
}
