/**
 * This file contains the role IDs for the different roles in the application.
 */

export const ROLES = {
    PROVIDER_COACH: 'provider_coach',
    PROVIDER_THERAPIST: 'provider_therapist',
    MEMBER: 'member',
} as const;

export type Role = typeof ROLES[keyof typeof ROLES];

export const DEVELOPMENT_ROLE_IDS: Record<Role, string> = {
    [ROLES.PROVIDER_COACH]: 'rol_T8VOm2u51wqS9416',
    [ROLES.PROVIDER_THERAPIST]: 'rol_Q5c1eazH8inTeFfT',
    [ROLES.MEMBER]: 'rol_XvAIKC4g5d6B9v7Y',
} as const;

export const PRODUCTION_ROLE_IDS: Record<Role, string> = {
    [ROLES.PROVIDER_COACH]: 'rol_nKnoFcFN8W2dDZZd',
    [ROLES.PROVIDER_THERAPIST]: 'rol_8HwHJ0QZ1j8K7Cqf',
    [ROLES.MEMBER]: 'rol_Bj8KcmEAWxLWRj5L',
} as const;

export const ROLES_BY_ENVIRONMENT: Record<
    'development' | 'production',
    Record<Role, string>
> = {
    development: DEVELOPMENT_ROLE_IDS,
    production: PRODUCTION_ROLE_IDS,
} as const;

/**
 * Get the role ID for a given role and environment
 * @param role - The role to get the ID for
 * @param environment - The environment to get the ID for
 * @returns
 */
export function getRoleByEnvironment(
    role: Role,
    environment: 'development' | 'test' | 'production' = 'development'
) {
    if (environment !== 'production')
        return ROLES_BY_ENVIRONMENT['development'][role];
    return ROLES_BY_ENVIRONMENT['production'][role];
}
