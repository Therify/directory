import { Auth0Configuration } from '../../configuration';

export const ENDPOINTS = {
    USERS: '/api/v2/users',
    USER: '/api/v2/users/{id}',
    USER_ROLES: '/api/v2/users/{id}/roles',
    EMAIL_VERIFICATION: '/api/v2/jobs/verification-email',
    JOB_STATUS: '/api/v2/jobs/{id}',
    OAUTH_TOKEN: '/oauth/token',
} as const;

export type Resource = keyof typeof ENDPOINTS;
export type Endpoints = (typeof ENDPOINTS)[keyof typeof ENDPOINTS];

export const getResourceEndpointFactory = ({
    AUTH0_BACKEND_DOMAIN,
}: Pick<Auth0Configuration, 'AUTH0_BACKEND_DOMAIN'>) => {
    /**
     * Returns the endpoint for a given resource. If an id is provided, the endpoint will be replaced with the id.
     * @param resource - The resource to get the endpoint for
     * @param id - The id of the resource
     * @returns
     */
    return function getResourceEndpoint(
        resource: Resource,
        id?: string
    ): string {
        const formattedEndpoint = id
            ? ENDPOINTS[resource].replace('{id}', id)
            : ENDPOINTS[resource];
        return `https://${AUTH0_BACKEND_DOMAIN}${formattedEndpoint}`;
    };
};
