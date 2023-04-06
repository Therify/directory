import { ProviderProfile } from '@/lib/shared/types/provider-profile';
import { SelfAssessment } from '@/lib/shared/types/self-assessment';

export function findEthnicMatches(
    {
        preferences: { ethnicity: ethnicPreference },
    }: SelfAssessment.SelfAssessment,
    providerProfiles: ProviderProfile.ProviderProfile[]
): ProviderProfile.ProviderProfile[] {
    const { isRequired, selection } = ethnicPreference;
    if (!isRequired) return providerProfiles;
    return providerProfiles.filter((profile) => {
        return profile.ethnicity.includes(selection);
    });
}
