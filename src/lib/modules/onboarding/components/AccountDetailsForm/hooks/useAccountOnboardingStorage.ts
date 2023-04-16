import { HandleAccountOnboarding } from '@/lib/modules/onboarding/features';

const STORAGE_KEY = 'therify-onboarding-account-details' as const;
export type SafeAccountDetails = Pick<
    HandleAccountOnboarding.Input,
    'billingCycle' | 'name' | 'seatCount' | 'coveredSessions' | 'planType'
>;

export const useAccountOnboardingStorage = () => {
    const storeAccountDetails = (details: HandleAccountOnboarding.Input) => {
        if (typeof window === 'undefined') {
            return;
        }
        const safeDetails: SafeAccountDetails = {
            name: details.name,
            seatCount: details.seatCount,
            billingCycle: details.billingCycle,
            coveredSessions: details.coveredSessions,
            planType: details.planType,
        };
        const cleanedDetails = Object.entries(safeDetails).reduce<
            Partial<SafeAccountDetails>
        >((acc, [key, value]) => {
            if (value !== null && Boolean(value)) {
                return {
                    ...acc,
                    [key]: value,
                };
            }
            return acc;
        }, {});
        try {
            localStorage.setItem(STORAGE_KEY, JSON.stringify(cleanedDetails));
        } catch (e) {
            console.error('Error storing provider details', e);
        }
    };
    const getStoredAccountDetails =
        (): Partial<HandleAccountOnboarding.Input> => {
            if (typeof window === 'undefined') {
                return {};
            }
            const accountDetails = localStorage.getItem(STORAGE_KEY);
            if (!accountDetails) return {};
            try {
                return JSON.parse(accountDetails);
            } catch (e) {
                return {};
            }
        };

    const clearStorage = () => {
        if (typeof window === 'undefined') {
            return;
        }
        localStorage.removeItem(STORAGE_KEY);
    };

    return {
        storeAccountDetails,
        getStoredAccountDetails,
        clearStorage,
    };
};
