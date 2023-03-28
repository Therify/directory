import { AccountsServiceParams } from '../params';
import { CancelPlan } from './cancel-plan';
import { HandleGroupPracticePlanPayment } from './handle-group-practice-plan-payment';
import { HandlePlanChange } from './handle-plan-change';
import { RenewPlan } from './renew-plan';
import { HandleStripeConnectOnboarding } from './handle-stripe-connect-onboarding';
import { CreateStripeConnectLoginUrl } from './create-stripe-connect-login-url';
import { CreateCoachingSessionCheckout } from './create-coaching-session-checkout';

export const factory = (context: AccountsServiceParams) => ({
    handleGroupPracticePlanPayment:
        HandleGroupPracticePlanPayment.factory(context),
    handlePlanChange: HandlePlanChange.factory(context),
    cancelPlan: CancelPlan.factory(context),
    renewPlan: RenewPlan.factory(context),
    handleStripeConnectOnboarding:
        HandleStripeConnectOnboarding.factory(context),
    createStripeConnectLoginUrl: CreateStripeConnectLoginUrl.factory(context),
    createCoachingSessionCheckout:
        CreateCoachingSessionCheckout.factory(context),
});
