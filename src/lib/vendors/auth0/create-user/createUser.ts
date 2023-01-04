import { ZodError } from 'zod';
import { VENDOR_ID } from '../constant';
import { BaseAuth0FactoryParams } from '../types';
import { Input, inputSchema, Output } from './schema';

export const INTENT = 'create-user' as const;
export const CONTEXT_DEFINITION = {
    vendor: VENDOR_ID,
    identifier: `${VENDOR_ID}:${INTENT}`,
    description: 'Create a user',
    intent: INTENT,
} as const;

interface CreateUserFactoryParams extends BaseAuth0FactoryParams {
    connection: string;
}

interface CreateUserFactory {
    (params: CreateUserFactoryParams): {
        (input: Input): Promise<Output>;
    };
}

export const factory: CreateUserFactory = ({ auth0, connection }) => {
    return async function createUser(input) {
        return new Promise((resolve, reject) => {
            auth0.createUser(
                {
                    ...input,
                    connection,
                },
                (error, user) => {
                    if (error) {
                        reject(error);
                    }
                    resolve(user);
                }
            );
        });
    };
};
