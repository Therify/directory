import { Input, inputSchema, Output } from './schema';
import { AccountsServiceParams } from '../params';
import { ZodError } from 'zod';
import { Prisma } from '@prisma/client';

interface CreateUserFactory {
    (params: AccountsServiceParams): {
        (input: Input): Promise<Output>;
    };
}

export const factory: CreateUserFactory = ({ prisma }) => {
    return async function createUser(input) {
        try {
            inputSchema.parse(input);
            const user = await prisma.user.create({
                data: {
                    ...input,
                },
            });
            return user;
        } catch (error) {
            if (error instanceof ZodError) {
                throw new Error('Invalid input');
            }
            if (error instanceof Prisma.PrismaClientKnownRequestError) {
                if (error.code === 'P2002') {
                    throw new Error(
                        'Unique constraint failed on the fields: (`email`)'
                    );
                }
            }
            throw error;
        }
    };
};
