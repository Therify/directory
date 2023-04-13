import { HandleStripeConnectOnboarding } from '@/lib/modules/accounts/features/billing';
import { TransactionV1 } from '@/lib/shared/utils/transaction';
import { AccountsServiceParams } from '../../params';
import {
    AddStripeConnectAccountToUser,
    GetTherifyUserDetails,
    CreateStripeConnectAccount,
    CreateOnbordingUrl,
    CreateCoachProduct,
    AddCoachPriceIdtoProfile,
    handleStripeConnectOnboardingTransactionDefinition,
} from './transaction';

export const factory =
    (context: AccountsServiceParams) =>
    async (params: HandleStripeConnectOnboarding.Input) => {
        return await TransactionV1.executeTransaction(
            handleStripeConnectOnboardingTransactionDefinition,
            { ...context },
            {
                getUserDetails: GetTherifyUserDetails.factory(params),
                createStripeConnectAccount:
                    CreateStripeConnectAccount.factory(params),
                addStripeConnectAccountToUser:
                    AddStripeConnectAccountToUser.factory(params),
                createCoachProduct: CreateCoachProduct.factory(params),
                addCoachPriceIdToProfile: AddCoachPriceIdtoProfile.step,
                createOnbordingUrl: CreateOnbordingUrl.factory(params),
            },
            true
        );
    };
