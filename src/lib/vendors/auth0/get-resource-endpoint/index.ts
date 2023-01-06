import { withAuth0Configuration } from '../configuration';
import { generateGetResourceEndpoint } from './getResourceEndpoint';

export const getResourceEndpoint = withAuth0Configuration((CONFIG) => {
    return generateGetResourceEndpoint(CONFIG);
});
