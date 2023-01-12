import { RegisterProvider } from '@/lib/features/registration';
import { AccountsServiceParams as Context } from '../params';
import { TransactionV1 } from '@/lib/utils';

import {
    transactionDefinition,
    CreateTherifyUser,
    CaptureAuthProviderCredentials,
    CreateAuth0User,
    CreateStripeCustomer,
    CreateStripeCheckoutSession,
    CreateUserBillingProviderEntity,
} from './transaction';

export function registerProviderFactory(context: Context) {
    return async function registerProvider(params: RegisterProvider.Input) {
        return await TransactionV1.executeTransaction(
            transactionDefinition,
            { ...context },
            {
                createTherifyUserEntity: CreateTherifyUser.factory(params),
                createAuth0User: CreateAuth0User.factory(params),
                captureAuthProviderCredentials:
                    CaptureAuthProviderCredentials.step,
                createStripeCustomer: CreateStripeCustomer.factory(params),
                createUserBillingProviderIdEntity:
                    CreateUserBillingProviderEntity.step,
                createStripeCheckoutSession:
                    CreateStripeCheckoutSession.factory(params),
            }
        );
    };
}
