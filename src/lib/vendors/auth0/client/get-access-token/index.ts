import { withAuth0Configuration } from '../../configuration';
import { generateGetAccessToken } from './getAccessToken';

export const { getAccessToken, clearAccessToken } = withAuth0Configuration(
    (CONFIG) => {
        return generateGetAccessToken(CONFIG);
    }
);
