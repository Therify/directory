import { HandlePlanChange } from '@/lib/modules/accounts/features/billing';
import { isValidPriceId } from '@/lib/shared/types';
import { NodeEnvironment } from '@/lib/shared/types/nodeEnvironment';
import { HandlePlanChangeTransaction } from './definition';

interface ValidatePriceIdFactory {
    (
        params: HandlePlanChange.Input
    ): HandlePlanChangeTransaction['validatePriceId'];
}

export const factory: ValidatePriceIdFactory = ({ newStripePriceId }) => ({
    async commit() {
        const isValid = isValidPriceId(
            newStripePriceId,
            process.env.VERCEL_ENV as NodeEnvironment
        );
        if (!isValid) {
            throw new Error('Invalid price id.');
        }
        return;
    },
    async rollback() {
        return;
    },
});
