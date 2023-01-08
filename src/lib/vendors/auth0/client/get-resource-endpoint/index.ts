import { withAuth0Configuration } from '../../configuration';
import { getResourceEndpointFactory } from './getResourceEndpoint';

export const getResourceEndpoint = withAuth0Configuration((CONFIG) => {
    const getResourceEndpoint = getResourceEndpointFactory(CONFIG);
    return getResourceEndpoint;
});
