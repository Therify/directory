import { findLGBTQProviders } from './findLGBTQProviders';
import { generateRandomSelfAssessment } from '@/lib/shared/types/self-assessment/generate-random-self-assessment';
import { generateRandomProfile } from '@/lib/shared/types/provider-profile/generate-random-profile/generateRandomProfile';

describe('findLGBTQProviders', () => {
    it('identifies matches from a collection of provider profiles', () => {
        const selfAssessment = generateRandomSelfAssessment({
            isLGBTQ: true,
            preferences: {
                ...generateRandomSelfAssessment().preferences,
                lgbtq: {
                    type: 'lgbtq',
                    isRequired: true,
                },
            },
        });
        const profileA = generateRandomProfile({
            gender: 'Non-binary',
        });
        const profileB = generateRandomProfile({
            communitiesServed: ['Queer Allied'],
        });
        const profileC = generateRandomProfile({
            gender: 'Male',
            communitiesServed: ['Blind Allied'],
        });
        const matches = findLGBTQProviders(selfAssessment, [
            profileA,
            profileB,
            profileC,
        ]);
        expect(matches.length).toEqual(2);
    });
});
