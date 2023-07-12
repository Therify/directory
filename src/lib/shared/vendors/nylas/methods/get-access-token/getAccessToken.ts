import { FactoryParams } from '../factoryParams';
import { Input, Output } from './schema';

export const factory =
    ({ nylas }: FactoryParams) =>
    async ({ token }: Input): Promise<Output> => {
        const { accessToken } = await nylas.exchangeCodeForToken(token);
        return { accessToken };
    };
