import { findLocationMatches } from './findLocationMatches';
import { generateRandomMemberProfile } from '@/lib/shared/types/member-profile/generate-random-member-profile';
import { generateRandomCredential } from '@/lib/shared/types/provider-credential/generate-random-credential/generateRandomCredential';
import { generateRandomProfile } from '@/lib/shared/types/provider-profile/generate-random-profile/generateRandomProfile';

describe('findLocationMatches', () => {
    it("identifies providers who are licensed in the member's state", () => {
        const memberProfile = generateRandomMemberProfile({
            country: 'US',
            state: 'Alabama',
        });
        const profileA = generateRandomProfile({
            designation: 'therapist',
            credentials: [
                generateRandomCredential({
                    state: 'Alabama',
                    country: 'US',
                }),
            ],
        });
        const profileB = generateRandomProfile({
            designation: 'therapist',
            credentials: [],
        });
        const matches = findLocationMatches(memberProfile, [
            profileA,
            profileB,
        ]);
        expect(matches).toEqual([profileA]);
    });
    test('coaches are recommended regarldess of credentialling', () => {
        const memberProfile = generateRandomMemberProfile({
            country: 'US',
            state: 'Alabama',
        });
        const profileA = generateRandomProfile({
            designation: 'therapist',
            credentials: [
                generateRandomCredential({
                    state: 'Alabama',
                    country: 'US',
                }),
            ],
        });
        const profileB = generateRandomProfile({
            designation: 'coach',
            credentials: [],
        });
        const matches = findLocationMatches(memberProfile, [
            profileA,
            profileB,
        ]);
        expect(matches).toEqual([profileA, profileB]);
    });
});
