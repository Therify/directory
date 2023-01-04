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
        try {
            const createUserParams = inputSchema.parse(input);
            const user = await auth0.createUser({
                ...createUserParams,
                connection,
            });
            return user;
        } catch (error) {
            console.log(`Error in ${CONTEXT_DEFINITION.identifier}`);
            if (error instanceof ZodError) {
                console.info('ZodError', error);
                throw error;
            }
            throw error;
        }
    };
};
