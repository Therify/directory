import { withAuth0Configuration } from '../configuration';
import { generateTokenProvider } from './tokenProvider';
export type { TokenProvider } from './tokenProvider';

export const tokenProvider = withAuth0Configuration((CONFIG) =>
    generateTokenProvider(CONFIG)
);
