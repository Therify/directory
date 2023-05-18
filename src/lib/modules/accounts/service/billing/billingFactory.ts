import { AccountsServiceParams } from '../params';
import { CancelPlan } from './cancel-plan';
import { HandlePlanChange } from './handle-plan-change';
import { RenewPlan } from './renew-plan';
import { HandleStripeConnectOnboarding } from './handle-stripe-connect-onboarding';
import { CreateStripeConnectLoginUrl } from './create-stripe-connect-login-url';
import { CreateCoachingSessionInvoice } from './create-coaching-session-invoice';
import { HandleCoachingSessionPayment } from './handle-coaching-session-payment';
import { HandleInvoiceSent } from './handle-invoice-sent';
import { HandleCoachingSessionInvoiceUpdated } from './handle-coaching-session-invoice-updated';
import { HandleReimbursementSubmission } from './handle-reimbursement-submission';
import { HandleMembershipPlanPayment } from './handle-membership-plan-payment';
import { GetProviderSessionInvoicesByMemberId } from './get-provider-session-invoices-by-member-id';
import { VoidCoachingSessionInvoice } from './void-coaching-session-invoice';
import { HandleRawReimbursementSubmission } from './handle-raw-reimbursement-submission';

export const factory = (context: AccountsServiceParams) => ({
    handleCoachingSessionPayment: HandleCoachingSessionPayment.factory(context),
    handleCoachingSessionInvoiceUpdated:
        HandleCoachingSessionInvoiceUpdated.factory(context),
    handleInvoiceSent: HandleInvoiceSent.factory(context),
    voidCoachingSessionInvoice: VoidCoachingSessionInvoice.factory(context),
    handleMembershipPlanPayment: HandleMembershipPlanPayment.factory(context),
    handlePlanChange: HandlePlanChange.factory(context),
    cancelPlan: CancelPlan.factory(context),
    renewPlan: RenewPlan.factory(context),
    handleStripeConnectOnboarding:
        HandleStripeConnectOnboarding.factory(context),
    createStripeConnectLoginUrl: CreateStripeConnectLoginUrl.factory(context),
    createCoachingSessionInvoice: CreateCoachingSessionInvoice.factory(context),
    getProviderSessionInvoicesByMemberId:
        GetProviderSessionInvoicesByMemberId.factory(context),
    handleReimbursementSubmission:
        HandleReimbursementSubmission.factory(context),
    handleRawReimbursementSubmission:
        HandleRawReimbursementSubmission.factory(context),
});
