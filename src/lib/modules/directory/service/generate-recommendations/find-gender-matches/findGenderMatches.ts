import { ProviderProfile } from '@/lib/shared/types';
import { SelfAssessment } from '@/lib/shared/types/self-assessment';

export function findGenderMatches(
    {
        preferences: { gender: genderPreference },
    }: SelfAssessment.SelfAssessment,
    providerProfiles: ProviderProfile.ProviderProfile[]
): ProviderProfile.ProviderProfile[] {
    const { isRequired, selection } = genderPreference;
    const shouldReturnAllProfiles = !isRequired || selection === "Don't care";
    if (shouldReturnAllProfiles) return providerProfiles;
    return providerProfiles.filter((providerProfile) => {
        return providerProfile.gender === selection;
    });
}
