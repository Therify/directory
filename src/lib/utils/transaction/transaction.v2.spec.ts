import { z } from 'zod';
import { v4 as uuid } from 'uuid';
import { generateTransaction } from './transaction.v2';

interface User {
    name: string;
}

class UserService {
    constructor(
        private store: Map<string, User & { id: string }> = new Map()
    ) {}
    addUser(user: User): User & { id: string } {
        const userId = uuid();
        const persistedUser = { ...user, id: userId };
        this.store.set(userId, persistedUser);
        return persistedUser;
    }
    listUsers(): (User & { id: string })[] {
        return Array.from(this.store.values());
    }
    deleteUser(id: string) {
        this.store.delete(id);
    }
    findById(id: string): (User & { id: string }) | undefined {
        return this.store.get(id);
    }
}

class StripeService {
    constructor(private store: Map<string, string> = new Map()) {}
    async createCustomerId(uniqueCustomerId: string): Promise<string> {
        const id = uuid();
        this.store.set(uniqueCustomerId, id);
        return id;
    }
    async deleteCustomer(uniqueCustomerId: string): Promise<void> {
        this.store.delete(uniqueCustomerId);
        return;
    }
    async getCustomerId(uniqueCustomerId: string): Promise<string | undefined> {
        return this.store.get(uniqueCustomerId);
    }
}

describe('GenerateTransaction', function () {
    // Define the input schema
    const inputSchema = z.object({
        name: z.string(),
    });
    const outputsSchema = {
        createUser: z.object({
            id: z.string(),
        }),
        createStripeUser: z.object({
            stripeUserId: z.string(),
        }),
    };
    const context = {
        userService: new UserService(),
        stripeService: new StripeService(),
    };
    const createUserTransaction = generateTransaction({
        inputSchema,
        outputsSchema,
        context,
        transactions: {
            createUser: {
                async commit(input, context) {
                    return context.userService.addUser(input);
                },
                async rollback(_, context, { createUser: { id: userId } }) {
                    context.userService.deleteUser(userId);
                },
            },
            createStripeUser: {
                async commit(
                    _,
                    { stripeService },
                    { createUser: { id: userId } }
                ) {
                    const result = await stripeService.createCustomerId(userId);
                    return {
                        stripeUserId: result,
                    };
                },
                async rollback(
                    _,
                    { stripeService },
                    { createUser: { id: userId } }
                ) {
                    await stripeService.deleteCustomer(userId);
                },
            },
        },
    });
    it('returns a callable function', function () {
        expect(createUserTransaction).toBeInstanceOf(Function);
    });
    it('when the transaction is successful, it returns the outputs', async function () {
        const result = await createUserTransaction({
            name: 'John Doe',
        });
        expect(result).toMatchObject({
            createUser: {
                id: expect.any(String),
            },
            createStripeUser: {
                stripeUserId: expect.any(String),
            },
        });
    });
    test('if the transaction fails, it rolls back all the changes', async function () {
        class FailingStripeService extends StripeService {
            // @ts-ignore
            async createCustomerId() {
                throw new Error('Failed');
            }
        }
        const failingStripeService = new FailingStripeService();
        const failingContext = {
            userService: new UserService(),
            stripeService: failingStripeService,
        };
        const failingCreateUserTransaction = generateTransaction({
            inputSchema,
            outputsSchema,
            context: failingContext,
            transactions: {
                createUser: {
                    async commit(input, context) {
                        return context.userService.addUser(input);
                    },
                    async rollback(_, context, { createUser: { id: userId } }) {
                        console.debug('ROLLING BACK', userId);
                        context.userService.deleteUser(userId);
                    },
                },
                createStripeUser: {
                    async commit(_, { stripeService }) {
                        // should fail
                        await stripeService.createCustomerId();
                        return {
                            stripeUserId: '',
                        };
                    },
                    async rollback(
                        _,
                        { stripeService },
                        { createUser: { id: userId } }
                    ) {
                        await stripeService.deleteCustomer(userId);
                    },
                },
            },
        });
        await failingCreateUserTransaction({
            name: 'John Doe',
        });
        const users = failingContext.userService.listUsers();
        expect(users).toHaveLength(0);
    });
});
