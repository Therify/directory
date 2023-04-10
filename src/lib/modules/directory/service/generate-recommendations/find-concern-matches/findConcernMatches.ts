import { ProviderProfile } from '@/lib/shared/types';
import { SelfAssessment } from '@/lib/shared/types/self-assessment';

export function findConcernMatches(
    selfAssessment: SelfAssessment.SelfAssessment,
    providerProfiles: ProviderProfile.ProviderProfile[]
): ProviderProfile.ProviderProfile[] {
    return providerProfiles.filter((providerProfile) => {
        return providerProfile.specialties.some((specialty) => {
            return selfAssessment.concerns.some((userConcern) => {
                return userConcern === specialty;
            });
        });
    });
}
