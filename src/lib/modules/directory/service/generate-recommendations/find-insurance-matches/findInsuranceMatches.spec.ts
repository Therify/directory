import { generateRandomAcceptedInsurance } from '@/lib/shared/types/accepted-insurance/generate-random-accepted-insurance/generateRandomAcceptedInsurance';
import { findInsuranceMatches } from './findInsuranceMatches';
import { generateRandomMemberProfile } from '@/lib/shared/types/member-profile/generate-random-member-profile';
import { generateRandomProfile } from '@/lib/shared/types/provider-profile/generate-random-profile/generateRandomProfile';

describe('findInsuranceMatches', () => {
    it('if a member has an insurance provider, it should return a list of providers that match that insurance provider', () => {
        const member = generateRandomMemberProfile({
            insurance: 'Aetna',
        });
        const profileA = generateRandomProfile({
            acceptedInsurances: [
                generateRandomAcceptedInsurance({
                    country: 'US',
                    state: 'Alaska',
                    insurances: ['Aetna', 'BlueCross Blue Shield'],
                }),
            ],
        });
        const profileB = generateRandomProfile({
            acceptedInsurances: [
                generateRandomAcceptedInsurance({
                    country: 'US',
                    state: 'Alaska',
                    insurances: ['BlueCross Blue Shield'],
                }),
            ],
        });
        const matches = findInsuranceMatches(member, [profileA, profileB]);
        expect(matches).toEqual([profileA]);
    });
    test('if a member doest not have insurance, it should return all providers', () => {
        const member = generateRandomMemberProfile({
            insurance: "I don't have insurance",
        });
        const profileA = generateRandomProfile({
            acceptedInsurances: [
                generateRandomAcceptedInsurance({
                    country: 'US',
                    state: 'Alaska',
                    insurances: ['Aetna', 'BlueCross Blue Shield'],
                }),
            ],
        });
        const profileB = generateRandomProfile({
            acceptedInsurances: [
                generateRandomAcceptedInsurance({
                    country: 'US',
                    state: 'Alaska',
                    insurances: ['BlueCross Blue Shield'],
                }),
            ],
        });
        const matches = findInsuranceMatches(member, [profileA, profileB]);
        expect(matches).toEqual([profileA, profileB]);
    });
});
