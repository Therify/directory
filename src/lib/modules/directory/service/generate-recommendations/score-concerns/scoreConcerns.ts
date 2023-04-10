import { RecommendedProviderProfile } from '@/lib/shared/types/provider-profile/recommended-provider-profile';
import { SelfAssessment } from '@/lib/shared/types/self-assessment';

export function scoreConcerns(
    selfAssessment: SelfAssessment.SelfAssessment,
    providerProfiles: RecommendedProviderProfile.RecommendedProviderProfile[]
): RecommendedProviderProfile.RecommendedProviderProfile[] {
    return providerProfiles.map((providerProfile) => {
        const score = providerProfile.specialties.reduce((score, specialty) => {
            return selfAssessment.concerns.some((userConcern) => {
                return userConcern === specialty;
            })
                ? score + 1
                : score;
        }, 0);

        return {
            ...providerProfile,
            score,
        };
    });
}
