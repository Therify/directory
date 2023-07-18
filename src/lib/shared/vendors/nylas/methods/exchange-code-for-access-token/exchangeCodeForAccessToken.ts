import { FactoryParams } from '../factoryParams';
import { Input, Output } from './schema';

export const factory =
    ({ nylas }: FactoryParams) =>
    async ({ code }: Input): Promise<Output> => {
        const { accessToken, emailAddress } = await nylas.exchangeCodeForToken(
            code
        );

        return { accessToken, emailAddress };
    };
