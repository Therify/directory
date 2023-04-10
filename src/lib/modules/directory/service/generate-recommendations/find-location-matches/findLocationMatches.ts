import type { ProviderProfile } from '@/lib/shared/types/provider-profile/providerProfile';
import type { Type as MemberProfile } from '@/lib/shared/types/member-profile/memberProfile';
import { getLicensedStates } from '@/lib/shared/types/provider-profile/get-licensed-states';

/**
 * Finds all provider profiles that match the member's state
 * @note This function does not consider the member's country
 * @param memberProfile - the member profile
 * @param profiles - the list of provider profiles
 * @returns
 */
export function findLocationMatches(
    { state }: MemberProfile,
    profiles: ProviderProfile[]
): ProviderProfile[] {
    return profiles.filter((profile) => {
        if (profile.designation === 'coach') return true;
        const licensedStates = getLicensedStates(profile);
        return licensedStates.includes(state);
    });
}
