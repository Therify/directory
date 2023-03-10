import { RegisterProvider } from '@/lib/modules/registration/features';
import { AccountsServiceParams as Context } from '../params';
import { TransactionV1 } from '@/lib/shared/utils';

import {
    transactionDefinition,
    CreateTherifyUser,
    CreateAuth0User,
    AssignAuth0Roles,
    CreateStripeCustomer,
    UpdateUserEntity,
} from './transaction';

export function factory(context: Context) {
    return async function registerProvider(params: RegisterProvider.Input) {
        return await TransactionV1.executeTransaction(
            transactionDefinition,
            { ...context },
            {
                createAuth0User: CreateAuth0User.factory(params),
                assignAuth0Roles: AssignAuth0Roles.factory(params.role),
                createTherifyUserEntity: CreateTherifyUser.factory(params),
                createStripeCustomer: CreateStripeCustomer.factory(params),
                updateUserEntity: UpdateUserEntity.step,
            },
            true
        );
    };
}
