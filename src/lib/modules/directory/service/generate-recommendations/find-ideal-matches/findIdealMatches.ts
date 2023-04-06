import { ProviderProfile } from '@/lib/shared/types';
import { SelfAssessment } from '@/lib/shared/types/self-assessment';
import { findConcernMatches } from '../find-concern-matches';
import { findEthnicMatches } from '../find-ethnic-matches';
import { findGenderMatches } from '../find-gender-matches';
import { findLGBTQProviders } from '../find-lgbtq-providers/findLGBTQProviders';

export function findIdealMatches(
    selfAssessment: SelfAssessment.SelfAssessment,
    providerProfiles: ProviderProfile.ProviderProfile[]
): ProviderProfile.ProviderProfile[] {
    return [
        findEthnicMatches,
        findGenderMatches,
        findConcernMatches,
        findLGBTQProviders,
    ].reduce((profiles, predicate) => {
        return predicate(selfAssessment, profiles);
    }, providerProfiles);
}
