import nodeFetch from 'node-fetch';
import { Auth0Configuration } from '../configuration';
import { getResourceEndpoint } from '../get-resource-endpoint';
import { AccessTokenSchema } from '../schema/entities';

export interface TokenProvider {
    retrieveToken: {
        (): Promise<string>;
    };
    clearToken: {
        (): void;
    };
}

interface GenerateTokenProviderParams extends Auth0Configuration {}

interface GenerateTokenProvider {
    (params: GenerateTokenProviderParams): TokenProvider;
}

export const generateTokenProvider: GenerateTokenProvider = ({
    AUTH0_CLIENT_ID,
    AUTH0_CLIENT_SECRET,
    AUTH0_DOMAIN,
}) => {
    let TOKEN: string | undefined;
    let EXPIRES_AT: Date | undefined;
    const oauthEndpoint = getResourceEndpoint('OAUTH_TOKEN');
    const requestParams = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            domain: AUTH0_DOMAIN,
            client_id: AUTH0_CLIENT_ID,
            client_secret: AUTH0_CLIENT_SECRET,
            grant_type: 'client_credentials',
            audience: `https://${AUTH0_DOMAIN}/api/v2/`,
        }),
    };
    return {
        async retrieveToken() {
            const NOW = new Date();
            // Handle expired token
            if (EXPIRES_AT && EXPIRES_AT < NOW) {
                console.log('Token expired');
                console.log('Retrieving new token');
                const response = await nodeFetch(oauthEndpoint, requestParams);
                const result = await response.json();
                const { access_token, expires_in } =
                    AccessTokenSchema.parse(result);
                TOKEN = access_token;
                EXPIRES_AT = new Date(Date.now() + expires_in);
                return TOKEN;
            }
            if (!TOKEN) {
                console.log('No token');
                console.log('Retrieving new token');
                const response = await nodeFetch(oauthEndpoint, requestParams);
                const result = await response.json();
                const { access_token, expires_in } =
                    AccessTokenSchema.parse(result);
                TOKEN = access_token;
                EXPIRES_AT = new Date(Date.now() + expires_in);
                return TOKEN;
            }
            // Handle valid token
            return TOKEN;
        },
        clearToken() {
            TOKEN = undefined;
            EXPIRES_AT = undefined;
        },
    };
};
