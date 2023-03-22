import { HandlePracticeOnboarding } from '@/lib/modules/onboarding/features';

const STORAGE_KEY = 'therify-onboarding-practice-details' as const;
export type SafePracticeDetails = Pick<
    HandlePracticeOnboarding.Input,
    | 'name'
    | 'address'
    | 'address2'
    | 'city'
    | 'state'
    | 'country'
    | 'zip'
    | 'phone'
    | 'email'
    | 'website'
    | 'seatCount'
    | 'billingCycle'
>;

export const usePracticeOnboardingStorage = () => {
    const storePracticeDetails = (details: HandlePracticeOnboarding.Input) => {
        if (typeof window === 'undefined') {
            return;
        }
        const safeDetails: SafePracticeDetails = {
            name: details.name,
            address: details.address,
            address2: details.address2,
            city: details.city,
            state: details.state,
            zip: details.zip,
            country: details.country,
            phone: details.phone,
            email: details.email,
            website: details.website,
            seatCount: details.seatCount,
            billingCycle: details.billingCycle,
        };
        const cleanedDetails = Object.entries(safeDetails).reduce<
            Partial<SafePracticeDetails>
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
    const getStoredPracticeDetails =
        (): Partial<HandlePracticeOnboarding.Input> => {
            if (typeof window === 'undefined') {
                return {};
            }
            const practiceDetails = localStorage.getItem(STORAGE_KEY);
            if (!practiceDetails) return {};
            try {
                return JSON.parse(practiceDetails);
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
        storePracticeDetails,
        getStoredPracticeDetails,
        clearStorage,
    };
};
