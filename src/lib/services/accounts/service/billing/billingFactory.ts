import { AccountsServiceParams } from '../params';
import { HandleGroupPracticePlanPayment } from './handle-group-practice-plan-payment';

export const factory = (context: AccountsServiceParams) => ({
    handleGroupPracticePlanPayment:
        HandleGroupPracticePlanPayment.factory(context),
});
