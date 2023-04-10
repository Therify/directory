import { ProviderProfile } from '@/lib/shared/types';
import { RecommendedProviderProfile } from '@/lib/shared/types/provider-profile/recommended-provider-profile';
import { SelfAssessment } from '@/lib/shared/types/self-assessment';

export function findGenderMatches(
    {
        preferences: { gender: genderPreference },
    }: SelfAssessment.SelfAssessment,
    providerProfiles: RecommendedProviderProfile.RecommendedProviderProfile[]
): RecommendedProviderProfile.RecommendedProviderProfile[] {
    const { isRequired, selection } = genderPreference;
    const shouldReturnAllProfiles = !isRequired || selection === "Don't care";
    if (shouldReturnAllProfiles) return providerProfiles;
    return providerProfiles.filter((providerProfile) => {
        return providerProfile.gender === selection;
    });
}
