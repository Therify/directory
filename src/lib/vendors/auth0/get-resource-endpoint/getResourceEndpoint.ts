import { Auth0Configuration } from '../configuration';

export const RESOURCES = {
    OAUTH_TOKEN: '/api/v2/oauth/token',
    USERS: '/api/v2/users',
    USER: '/api/v2/users/:id',
} as const;

export type Resource = keyof typeof RESOURCES;

export interface GetResourceEndpoint {
    (resource: Resource): string;
}

export function generateGetResourceEndpoint({
    AUTH0_DOMAIN,
}: Pick<Auth0Configuration, 'AUTH0_DOMAIN'>): GetResourceEndpoint {
    return function getResourceEndpoint(resource: Resource) {
        return `https://${AUTH0_DOMAIN}${RESOURCES[resource]}`;
    };
}
