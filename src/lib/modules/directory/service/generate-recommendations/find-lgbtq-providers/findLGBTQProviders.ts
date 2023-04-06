import { CommunitiesServed } from '@/lib/shared/types';
import type { ProviderProfile } from '@/lib/shared/types/provider-profile';
import type { SelfAssessment } from '@/lib/shared/types/self-assessment';

export function findLGBTQProviders(
    selfAssessment: SelfAssessment.SelfAssessment,
    providerProfiles: ProviderProfile.ProviderProfile[]
): ProviderProfile.ProviderProfile[] {
    const { isRequired } = selfAssessment.preferences.lgbtq;

    return !isRequired && !selfAssessment.isLGBTQ
        ? providerProfiles
        : providerProfiles.filter((providerProfile) => {
              const isAllied = [
                  'Queer Allied',
                  'Non-Binary Allied',
                  'Intersex Allied',
                  'Gay Allied',
                  'Lesbian Allied',
                  'Transgender Allied',
              ].some((queerCommunity) => {
                  return providerProfile.communitiesServed.includes(
                      queerCommunity as CommunitiesServed.CommunitiesServed
                  );
              });
              const isQueer = providerProfile.gender === 'Non-binary';
              return isAllied || isQueer;
          });
}
