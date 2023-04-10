import { ProviderProfile } from '@/lib/shared/types';
import { SelfAssessment } from '@/lib/shared/types/self-assessment';
import { findConcernMatches } from '../find-concern-matches';
import { findEthnicMatches } from '../find-ethnic-matches';
import { findGenderMatches } from '../find-gender-matches';
import { findLGBTQProviders } from '../find-lgbtq-providers/findLGBTQProviders';
import { RecommendedProviderProfile } from '@/lib/shared/types/provider-profile/recommended-provider-profile';
import { scoreConcerns } from '../score-concerns';

export function findIdealMatches(
    selfAssessment: SelfAssessment.SelfAssessment,
    providerProfiles: RecommendedProviderProfile.RecommendedProviderProfile[]
): RecommendedProviderProfile.RecommendedProviderProfile[] {
    return [
        findEthnicMatches,
        findGenderMatches,
        scoreConcerns,
        findLGBTQProviders,
    ].reduce((profiles, predicate) => {
        return predicate(selfAssessment, profiles);
    }, providerProfiles);
}
