import { RecommendedProviderProfile } from '@/lib/shared/types/provider-profile/recommended-provider-profile';
import { SelfAssessment } from '@/lib/shared/types/self-assessment';

export function findEthnicMatches(
    {
        preferences: { ethnicity: ethnicPreference },
    }: SelfAssessment.SelfAssessment,
    providerProfiles: RecommendedProviderProfile.RecommendedProviderProfile[]
): RecommendedProviderProfile.RecommendedProviderProfile[] {
    const { isRequired, selection } = ethnicPreference;
    if (!isRequired) return providerProfiles;
    return providerProfiles.filter((profile) => {
        return profile.ethnicity.includes(selection);
    });
}
