import { HandlePlanChange } from '@/lib/modules/accounts/features/billing';
import { isValidTherifyPriceId } from '@/lib/shared/types';
import { NodeEnvironment } from '@/lib/shared/types/nodeEnvironment';
import { HandlePlanChangeTransaction } from './definition';

interface ValidatePriceIdFactory {
    (
        params: HandlePlanChange.Input
    ): HandlePlanChangeTransaction['validatePriceId'];
}

export const factory: ValidatePriceIdFactory = ({ newStripePriceId }) => ({
    async commit() {
        const isValid = isValidTherifyPriceId(
            newStripePriceId,
            process.env.NEXT_PUBLIC_VERCEL_ENV as NodeEnvironment
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
