import { findConcernMatches } from './findConcernMatches';
import { generateRandomProfile } from '@/lib/shared/types/provider-profile/generate-random-profile/generateRandomProfile';
import { generateRandomSelfAssessment } from '@/lib/shared/types/self-assessment/generate-random-self-assessment';

describe('findConcernMatches', () => {
    const selfAssessment = generateRandomSelfAssessment({
        concerns: ['ADHD', 'Addiction'],
    });
    const profileA = generateRandomProfile({
        specialties: ['ADHD', 'Addiction'],
    });
    const profileB = generateRandomProfile({
        specialties: ['Depression'],
    });
    it('should find matched based on specified concerns', () => {
        const matches = findConcernMatches(selfAssessment, [
            profileA,
            profileB,
        ]);
        expect(matches).toEqual([profileA]);
    });
});
