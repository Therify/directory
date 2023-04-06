import { generateRandomMemberProfile } from '@/lib/shared/types/member-profile/generate-random-member-profile';
import { findEligibleProviders } from './findEligibleProviders';
import { generateRandomProfile } from '@/lib/shared/types/provider-profile/generate-random-profile/generateRandomProfile';
import { generateRandomCredential } from '@/lib/shared/types/provider-credential/generate-random-credential/generateRandomCredential';
import { generateRandomAcceptedInsurance } from '@/lib/shared/types/accepted-insurance/generate-random-accepted-insurance/generateRandomAcceptedInsurance';

describe('findEligibleProviders', () => {
    it('identifies providers in the members state and who accept their insurance', function () {
        const memberProfile = generateRandomMemberProfile({
            insurance: 'Aetna',
            state: 'Alaska',
            country: 'US',
        });
        const profileA = generateRandomProfile({
            designation: 'therapist',
            credentials: [
                generateRandomCredential({
                    country: 'US',
                    state: 'Alaska',
                }),
            ],
            acceptedInsurances: [
                generateRandomAcceptedInsurance({
                    state: 'Alaska',
                    country: 'US',
                    insurances: ['Aetna', 'Beacon'],
                }),
            ],
        });
        const profileB = generateRandomProfile({
            designation: 'therapist',
            credentials: [
                generateRandomCredential({
                    country: 'US',
                    state: 'Alaska',
                }),
            ],
            acceptedInsurances: [],
        });
        const { therapists } = findEligibleProviders(memberProfile, [
            profileA,
            profileB,
        ]);
        expect(therapists).toEqual([profileA]);
    });
    test('a member who does not have insurance should be eligible for all providers in their state', function () {
        const memberProfile = generateRandomMemberProfile({
            insurance: "I don't have insurance",
            state: 'Alaska',
            country: 'US',
        });
        const profileA = generateRandomProfile({
            designation: 'therapist',
            credentials: [
                generateRandomCredential({
                    country: 'US',
                    state: 'Alaska',
                }),
            ],
            acceptedInsurances: [
                generateRandomAcceptedInsurance({
                    state: 'Alaska',
                    country: 'US',
                    insurances: ['Aetna', 'Beacon'],
                }),
            ],
        });
        const profileB = generateRandomProfile({
            designation: 'therapist',
            credentials: [
                generateRandomCredential({
                    country: 'US',
                    state: 'Alaska',
                }),
            ],
            acceptedInsurances: [],
        });
        const { therapists } = findEligibleProviders(memberProfile, [
            profileA,
            profileB,
        ]);
        expect(therapists.length).toEqual(2);
    });
});
