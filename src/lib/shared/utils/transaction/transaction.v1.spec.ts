import { executeTransaction } from './transaction.v1';
import * as z from 'zod';

// #region Setup
interface TestUser {
    id: number;
    name: string;
}
class AuthService {
    private id = 0;
    private users: Map<number, TestUser> = new Map();
    delete(id: number) {
        this.users.delete(id);
    }
    createUser(name: string) {
        const nextId = this.id++;
        const newUser = { id: nextId, name };
        this.users.set(nextId, newUser);
        return newUser;
    }
    listUsers() {
        return Array.from(this.users.values());
    }
    clear() {
        this.users = new Map();
    }
}
interface TestEvent {
    id: number;
    eventName: string;
}
class AnalyticsService {
    private id = 0;
    private events: Map<number, TestEvent> = new Map();
    logEvent(eventName: string) {
        const nextId = this.id++;
        const newEvent = { id: nextId, eventName };
        this.events.set(nextId, newEvent);
        return newEvent;
    }
    listEvents() {
        return Array.from(this.events.values());
    }
    delete(id: number) {
        this.events.delete(id);
    }
    clear() {
        this.events = new Map();
    }
}
const auth = new AuthService();
const analytics = new AnalyticsService();
// #endregion

describe('Performing Transactions', function () {
    afterEach(function () {
        auth.clear();
        analytics.clear();
    });
    test('transactions perform a sequence of `steps` and returns a `result`', async function () {
        const resultsSchema = z.object({
            createUser: z.object({
                id: z.number(),
                name: z.string(),
            }),
            reportAnalytics: z.object({
                id: z.number(),
                eventName: z.string(),
            }),
        });
        const result = await executeTransaction(
            resultsSchema,
            {
                auth,
                analytics,
            },
            {
                createUser: {
                    commit({ auth }) {
                        return auth.createUser('Warren');
                    },
                    rollback({ auth }, { createUser: { id } }) {
                        auth.delete(id);
                    },
                },
                reportAnalytics: {
                    commit({ analytics }) {
                        return analytics.logEvent('Cool');
                    },
                    rollback(context, { reportAnalytics: { id } }) {
                        context.analytics.delete(id);
                    },
                },
            }
        );
        if (result.isOk()) {
            expect([
                auth.listUsers().length,
                analytics.listEvents().length,
            ]).toStrictEqual([1, 1]);
        }
    });
    test('transactions clean themselves up using the `rollback` methods defined', async function () {
        const result = await executeTransaction(
            z.object({
                createUser: z.object({
                    id: z.number(),
                    name: z.string(),
                }),
                trackEvent: z.object({
                    id: z.number(),
                    eventName: z.string(),
                }),
                explode: z.null(),
            }),
            {
                auth,
                analytics,
            },
            {
                createUser: {
                    commit({ auth }) {
                        return auth.createUser('Warren');
                    },
                    rollback({ auth }, { createUser: { id } }) {
                        auth.delete(id);
                    },
                },
                trackEvent: {
                    commit({ analytics }, { createUser: { id } }) {
                        const event = analytics.logEvent(`User Created: ${id}`);
                        return event;
                    },
                    rollback({ analytics }, { trackEvent: { id: eventId } }) {
                        console.log(`Deleting event ${eventId}`);
                        analytics.delete(eventId);
                    },
                },
                explode: {
                    commit() {
                        throw 'Error';
                    },
                    rollback() {
                        return;
                    },
                },
            }
        );
        if (result.isErr()) {
            expect([
                analytics.listEvents().length,
                auth.listUsers().length,
            ]).toStrictEqual([0, 0]);
            result.mapErr(([errorTitle]) => {
                expect(errorTitle).toBe('explode');
            });
        }
    });
});
