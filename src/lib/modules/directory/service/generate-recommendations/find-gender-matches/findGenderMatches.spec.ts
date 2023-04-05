import { findGenderMatches } from './findGenderMatches';
import { generateRandomSelfAssessment } from '@/lib/shared/types/self-assessment/generate-random-self-assessment';
import { generateRandomProfile } from '@/lib/shared/types/provider-profile/generate-random-profile/generateRandomProfile';

describe('findGenderMatches', () => {
    it('identifies matches from a collection of provider profiles', () => {
        const selfAssessment = generateRandomSelfAssessment({
            preferences: {
                ...generateRandomSelfAssessment().preferences,
                gender: {
                    type: 'gender',
                    selection: 'Non-binary',
                    isRequired: true,
                },
            },
        });
        const profileA = generateRandomProfile({
            gender: 'Non-binary',
        });
        const profileB = generateRandomProfile({
            gender: 'Male',
        });
        const matches = findGenderMatches(selfAssessment, [profileA, profileB]);
        expect(matches.map((match) => match.gender)).toEqual(['Non-binary']);
    });
});
