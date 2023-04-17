import {
    RegisterAccountOwner,
    RegisterMember,
} from '@/lib/modules/registration/features';

const ACCOUNT_OWNER_STORAGE_KEY =
    'therify-registration-accountOwnerDetails' as const;

type SafeAccountOwnerDetails = Pick<
    RegisterAccountOwner.Input,
    | 'givenName'
    | 'surname'
    | 'emailAddress'
    | 'dateOfBirth'
    | 'state'
    | 'country'
>;
export const useRegistrationStorage = () => {
    const storeAccountOwnerDetails = (
        accountOwnerDetails: RegisterAccountOwner.Input
    ) => {
        if (typeof window === 'undefined') {
            return;
        }
        const savedAccountOwnerDetails: SafeAccountOwnerDetails = {
            givenName: accountOwnerDetails.givenName,
            surname: accountOwnerDetails.surname,
            emailAddress: accountOwnerDetails.emailAddress,
            dateOfBirth: accountOwnerDetails.dateOfBirth,
            state: accountOwnerDetails.state,
            country: accountOwnerDetails.country,
        };
        try {
            localStorage.setItem(
                ACCOUNT_OWNER_STORAGE_KEY,
                JSON.stringify(savedAccountOwnerDetails)
            );
        } catch (e) {
            console.error('Error storing accountOwner details', e);
        }
    };
    const getStoredAccountOwnerDetails = ():
        | SafeAccountOwnerDetails
        | undefined => {
        if (typeof window === 'undefined') {
            return;
        }
        const accountOwnerDetails = localStorage.getItem(
            ACCOUNT_OWNER_STORAGE_KEY
        );
        if (!accountOwnerDetails) return undefined;
        try {
            return JSON.parse(accountOwnerDetails);
        } catch (e) {
            return undefined;
        }
    };

    const clearRegistrationStorage = () => {
        if (typeof window === 'undefined') {
            return;
        }
        localStorage.removeItem(ACCOUNT_OWNER_STORAGE_KEY);
    };

    return {
        storeAccountOwnerDetails,
        getStoredAccountOwnerDetails,
        clearRegistrationStorage,
    };
};
