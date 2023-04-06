import { findEthnicMatches } from './findEthnicMatches';
import { generateRandomProfile } from '@/lib/shared/types/provider-profile/generate-random-profile/generateRandomProfile';
import { generateRandomSelfAssessment } from '@/lib/shared/types/self-assessment/generate-random-self-assessment';

describe('findEthnicMatches', () => {
    const selfAssessment = generateRandomSelfAssessment({
        preferences: {
            ...generateRandomSelfAssessment().preferences,
            ethnicity: {
                type: 'ethnic',
                selection: 'South Asian',
                isRequired: true,
            },
        },
    });
    const profileA = generateRandomProfile({
        ethnicity: ['South Asian'],
    });
    const profileB = generateRandomProfile({
        ethnicity: ['Black or African American'],
    });
    it('should find matched based on specified concerns', () => {
        const matches = findEthnicMatches(selfAssessment, [profileA, profileB]);
        expect(matches).toEqual([profileA]);
    });
});
