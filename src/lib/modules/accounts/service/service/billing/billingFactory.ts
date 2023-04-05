import { AccountsServiceParams } from '../params';
import { CancelPlan } from './cancel-plan';
import { HandleGroupPracticePlanPayment } from './handle-group-practice-plan-payment';
import { HandlePlanChange } from './handle-plan-change';
import { RenewPlan } from './renew-plan';
import { HandleStripeConnectOnboarding } from './handle-stripe-connect-onboarding';
import { CreateStripeConnectLoginUrl } from './create-stripe-connect-login-url';
import { CreateCoachingSessionInvoice } from './create-coaching-session-invoice';
import { HandleCoachingSessionPayment } from './handle-coaching-session-payment';
import { HandleInvoiceSent } from './handle-invoice-sent';
import { HandleCoachingSessionInvoiceUpdated } from './handle-coaching-session-invoice-updated';

export const factory = (context: AccountsServiceParams) => ({
    handleCoachingSessionPayment: HandleCoachingSessionPayment.factory(context),
    handleCoachingSessionInvoiceUpdated:
        HandleCoachingSessionInvoiceUpdated.factory(context),
    handleInvoiceSent: HandleInvoiceSent.factory(context),
    handleGroupPracticePlanPayment:
        HandleGroupPracticePlanPayment.factory(context),
    handlePlanChange: HandlePlanChange.factory(context),
    cancelPlan: CancelPlan.factory(context),
    renewPlan: RenewPlan.factory(context),
    handleStripeConnectOnboarding:
        HandleStripeConnectOnboarding.factory(context),
    createStripeConnectLoginUrl: CreateStripeConnectLoginUrl.factory(context),
    createCoachingSessionInvoice: CreateCoachingSessionInvoice.factory(context),
});
