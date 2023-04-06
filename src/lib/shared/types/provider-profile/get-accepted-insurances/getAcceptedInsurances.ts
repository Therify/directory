import { InsuranceProvider } from '../..';
import { ProviderProfile } from '../providerProfile';

export function getAcceptedInsurances(
    providerProfile: ProviderProfile
): InsuranceProvider.InsuranceProvider[] {
    return Array.from(
        new Set(
            providerProfile.acceptedInsurances.flatMap(
                ({ insurances }) => insurances
            )
        )
    );
}
