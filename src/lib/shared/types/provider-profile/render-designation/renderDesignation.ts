import type { ProviderProfile } from '../providerProfile';

/**
 * Renders the designation of the provider in human readable format
 * @param providerProfile - Provider profile object
 * @returns
 */
export function renderDesignation({
    designation,
}: Pick<ProviderProfile, 'designation'>): string {
    return designation === 'coach' ? 'Mental Health Coach' : 'Therapist';
}
