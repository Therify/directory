import { Scope } from 'nylas/lib/models/connect';
import { FactoryParams } from '../factoryParams';
import { Input, Output } from './schema';

export const factory =
    ({ nylas }: FactoryParams) =>
    async ({ emailAddress, successUrl }: Input): Promise<Output> => {
        const authUrl = nylas.urlForAuthentication({
            loginHint: emailAddress,
            redirectURI: successUrl,
            scopes: [Scope.Calendar],
        });
        return {
            authUrl,
        };
    };
