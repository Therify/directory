import { ProviderProfile } from '@/lib/shared/types';
import { MemberProfile } from '@/lib/shared/types/member-profile';
import { findLocationMatches } from '../find-location-matches/findLocationMatches';
import { findInsuranceMatches } from '../find-insurance-matches/findInsuranceMatches';

export function findEligibleProviders(
    memberProfile: MemberProfile.Type,
    providerProfiles: ProviderProfile.ProviderProfile[]
): {
    coaches: ProviderProfile.ProviderProfile[];
    therapists: ProviderProfile.ProviderProfile[];
} {
    const therapists = providerProfiles.filter(
        (providerProfile) => providerProfile.designation === 'therapist'
    );
    const eligibleTherapists = [
        findLocationMatches,
        findInsuranceMatches,
    ].reduce(
        (profiles, predicate) => predicate(memberProfile, profiles),
        therapists
    );
    return {
        coaches: providerProfiles.filter(
            (providerProfile) => providerProfile.designation === 'coach'
        ),
        therapists: eligibleTherapists,
    };
}
