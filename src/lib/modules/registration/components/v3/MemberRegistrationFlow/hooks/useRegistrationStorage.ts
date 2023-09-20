import { RegisterMember } from '@/lib/modules/registration/features/v3';

const MEMBER_DETAILS_STORAGE_KEY =
    'therify-registration-memberDetails-v3' as const;

type SafeMemberDetails = {
    user: Pick<
        RegisterMember.Input['user'],
        'givenName' | 'surname' | 'emailAddress' | 'dateOfBirth' | 'phoneNumber'
    >;
    profile: Pick<
        RegisterMember.Input['profile'],
        'state' | 'insurance' | 'gender' | 'ethnicity'
    >;
};
export const useRegistrationStorage = () => {
    const storeMemberDetails = ({ user, profile }: RegisterMember.Input) => {
        if (typeof window === 'undefined') {
            return;
        }
        const savedMemberDetails: SafeMemberDetails = {
            user: {
                givenName: user.givenName,
                surname: user.surname,
                emailAddress: user.emailAddress,
                dateOfBirth: user.dateOfBirth,
                phoneNumber: user.phoneNumber,
            },
            profile: {
                state: profile.state,
                insurance: profile.insurance,
                gender: profile.gender,
                ethnicity: profile.ethnicity,
            },
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
