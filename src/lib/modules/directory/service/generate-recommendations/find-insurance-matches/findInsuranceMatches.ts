import type { Type as MemberProfile } from '@/lib/shared/types/member-profile/memberProfile';
import type { ProviderProfile } from '@/lib/shared/types/provider-profile/providerProfile';
import { getAcceptedInsurances } from '@/lib/shared/types/provider-profile/get-accepted-insurances';

/**
 * Finds providers who accept the member's insurance
 * @param memberProfile - The member's profile
 * @param providerProfiles - The list of provider profiles
 * @returns
 */
export function findInsuranceMatches(
    { insurance }: MemberProfile,
    providerProfiles: ProviderProfile[]
): ProviderProfile[] {
    if (insurance === "I don't have insurance") return providerProfiles;
    return providerProfiles.filter((providerProfile) => {
        const acceptedInsurances = getAcceptedInsurances(providerProfile);
        return acceptedInsurances.includes(insurance);
    });
}
