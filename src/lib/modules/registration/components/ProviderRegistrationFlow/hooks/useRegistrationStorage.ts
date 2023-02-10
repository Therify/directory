import { RegisterProvider } from '@/lib/modules/registration/features';

const PROVIDER_DETAILS_STORAGE_KEY =
    'therify-registration-providerDetails' as const;

type SafeProviderDetails = Pick<
    RegisterProvider.Input,
    'givenName' | 'surname' | 'emailAddress' | 'dateOfBirth'
>;
export const useRegistrationStorage = () => {
    const storeProviderDetails = (providerDetails: RegisterProvider.Input) => {
        if (typeof window === 'undefined') {
            return;
        }
        const savedProviderDetails: SafeProviderDetails = {
            givenName: providerDetails.givenName,
            surname: providerDetails.surname,
            emailAddress: providerDetails.emailAddress,
            dateOfBirth: providerDetails.dateOfBirth,
        };
        try {
            localStorage.setItem(
                PROVIDER_DETAILS_STORAGE_KEY,
                JSON.stringify(savedProviderDetails)
            );
        } catch (e) {
            console.error('Error storing provider details', e);
        }
    };
    const getStoredProviderDetails = (): SafeProviderDetails | undefined => {
        if (typeof window === 'undefined') {
            return;
        }
        const providerDetails = localStorage.getItem(
            PROVIDER_DETAILS_STORAGE_KEY
        );
        if (!providerDetails) return undefined;
        try {
            return JSON.parse(providerDetails);
        } catch (e) {
            return undefined;
        }
    };

    const clearRegistrationStorage = () => {
        if (typeof window === 'undefined') {
            return;
        }
        localStorage.removeItem(PROVIDER_DETAILS_STORAGE_KEY);
    };

    return {
        storeProviderDetails,
        getStoredProviderDetails,
        clearRegistrationStorage,
    };
};
