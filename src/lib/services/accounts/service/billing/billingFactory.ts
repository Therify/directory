import { AccountsServiceParams } from '../params';
import { HandleGroupPracticePlanPayment } from './handle-group-practice-plan-payment';
import { HandlePlanChange } from './handle-plan-change';

export const factory = (context: AccountsServiceParams) => ({
    handleGroupPracticePlanPayment:
        HandleGroupPracticePlanPayment.factory(context),
    handlePlanChange: HandlePlanChange.factory(context),
});
