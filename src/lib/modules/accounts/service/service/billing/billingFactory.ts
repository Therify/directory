import { AccountsServiceParams } from '../params';
import { CancelPlan } from './cancel-plan';
import { HandleGroupPracticePlanPayment } from './handle-group-practice-plan-payment';
import { HandlePlanChange } from './handle-plan-change';
import { RenewPlan } from './renew-plan';

export const factory = (context: AccountsServiceParams) => ({
    handleGroupPracticePlanPayment:
        HandleGroupPracticePlanPayment.factory(context),
    handlePlanChange: HandlePlanChange.factory(context),
    cancelPlan: CancelPlan.factory(context),
    renewPlan: RenewPlan.factory(context),
});
