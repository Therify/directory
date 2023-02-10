import { RegisterMember } from '@/lib/modules/registration/features';

const MEMBER_DETAILS_STORAGE_KEY =
    'therify-registration-memberDetails' as const;

type SafeMemberDetails = Pick<
    RegisterMember.Input,
    'givenName' | 'surname' | 'emailAddress' | 'dateOfBirth'
>;
export const useRegistrationStorage = () => {
    const storeMemberDetails = (memberDetails: RegisterMember.Input) => {
        if (typeof window === 'undefined') {
            return;
        }
        const savedMemberDetails: SafeMemberDetails = {
            givenName: memberDetails.givenName,
            surname: memberDetails.surname,
            emailAddress: memberDetails.emailAddress,
            dateOfBirth: memberDetails.dateOfBirth,
        };
        try {
            localStorage.setItem(
                MEMBER_DETAILS_STORAGE_KEY,
                JSON.stringify(savedMemberDetails)
            );
        } catch (e) {
            console.error('Error storing member details', e);
        }
    };
    const getStoredMemberDetails = (): SafeMemberDetails | undefined => {
        if (typeof window === 'undefined') {
            return;
        }
        const memberDetails = localStorage.getItem(MEMBER_DETAILS_STORAGE_KEY);
        if (!memberDetails) return undefined;
        try {
            return JSON.parse(memberDetails);
        } catch (e) {
            return undefined;
        }
    };

    const clearRegistrationStorage = () => {
        if (typeof window === 'undefined') {
            return;
        }
        localStorage.removeItem(MEMBER_DETAILS_STORAGE_KEY);
    };

    return {
        storeMemberDetails,
        getStoredMemberDetails,
        clearRegistrationStorage,
    };
};
