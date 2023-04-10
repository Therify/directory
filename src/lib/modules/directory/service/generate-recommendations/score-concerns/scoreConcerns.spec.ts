import { generateRandomSelfAssessment } from '@/lib/shared/types/self-assessment/generate-random-self-assessment';
import { scoreConcerns } from './scoreConcerns';
import { generateRandomProfile } from '@/lib/shared/types/provider-profile/generate-random-profile/generateRandomProfile';

describe('Scoring concerns', () => {
    it('for every concern that matches a specialty, add 1 to the score', () => {
        const selfAssessment = generateRandomSelfAssessment({
            concerns: ['Depression', 'Anxiety'],
        });
        const providerProfile = generateRandomProfile({
            specialties: ['Depression', 'Anxiety'],
        });
        const [scoredProviderProfile] = scoreConcerns(selfAssessment, [
            { ...providerProfile, score: 0 },
        ]);
        expect(scoredProviderProfile.score).toBe(2);
    });
});
