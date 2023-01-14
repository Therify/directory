import { RegisterProvider } from '@/lib/features/registration';
import { AccountsServiceParams as Context } from '../params';
import { TransactionV1 } from '@/lib/utils';

import {
    transactionDefinition,
    CreateTherifyUser,
    CreateAuth0User,
    CreateStripeCustomer,
    UpdateUserEntity,
} from './transaction';

export function factory(context: Context) {
    return async function registerProvider(params: RegisterProvider.Input) {
        console.log({ params });
        return await TransactionV1.executeTransaction(
            transactionDefinition,
            { ...context },
            {
                createAuth0User: CreateAuth0User.factory(params),
                createTherifyUserEntity: CreateTherifyUser.factory(params),
                createStripeCustomer: CreateStripeCustomer.factory(params),
                updateUserEntity: UpdateUserEntity.step,
            },
            true
        );
    };
}
