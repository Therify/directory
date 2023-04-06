import { type ProviderProfile } from '../providerProfile';

export function getLicensedStates(providerProfile: ProviderProfile): string[] {
    return Array.from(
        new Set(
            providerProfile.credentials.flatMap((credential) => {
                return credential.state;
            })
        )
    );
}
