import { ProviderProfile } from '@/lib/shared/types';
import { MemberProfile } from '@/lib/shared/types/member-profile';
import { findLocationMatches } from '../find-location-matches/findLocationMatches';
import { findInsuranceMatches } from '../find-insurance-matches/findInsuranceMatches';
import { RecommendedProviderProfile } from '@/lib/shared/types/provider-profile/recommended-provider-profile';

export function findEligibleProviders(
    memberProfile: MemberProfile.Type,
    providerProfiles: ProviderProfile.ProviderProfile[]
): {
    recommendations: RecommendedProviderProfile.RecommendedProviderProfile[];
} {
    const eligibleProviders = [findLocationMatches, findInsuranceMatches]
        .reduce(
            (profiles, predicate) => predicate(memberProfile, profiles),
            providerProfiles
        )
        .map((profile) => ({
            ...profile,
            score: 0,
        }));
    return {
        recommendations: eligibleProviders,
    };
}
