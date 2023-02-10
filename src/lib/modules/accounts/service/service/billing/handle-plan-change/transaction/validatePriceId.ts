import { HandlePlanChange } from '@/lib/modules/accounts/features/billing';
import { isValidPriceId } from '@/lib/shared/types';
import { HandlePlanChangeTransaction } from './definition';

interface ValidatePriceIdFactory {
    (
        params: HandlePlanChange.Input
    ): HandlePlanChangeTransaction['validatePriceId'];
}

export const factory: ValidatePriceIdFactory = ({ newStripePriceId }) => ({
    async commit() {
        const isValid = isValidPriceId(newStripePriceId, process.env.NODE_ENV);
        if (!isValid) {
            throw new Error('Invalid price id.');
        }
        return;
    },
    async rollback() {
        return;
    },
});
