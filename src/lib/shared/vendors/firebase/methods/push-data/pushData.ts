import { ref, push, update } from 'firebase/database';
import { processError } from '../../errors';
import { FirebaseFactoryParams } from '../../factoryParams';
import { FirebaseIntent } from '../../intents';
/**
 * Adds data to a collection at path
 * @param path
 * @param data
 * @returns
 * @example
 * pushData('users/' + user_id, { name: 'John' })
 */
export const pushDataFactory =
    ({ database }: FirebaseFactoryParams) =>
    async (path: string, data: Record<string, unknown>) => {
        try {
            const id = push(ref(database, path)).key;
            if (!id) throw new Error('No id returned from push');
            return await update(ref(database, path), {
                [id]: {
                    ...data,
                    id,
                    createdAt: new Date().toISOString(),
                    updatedAt: new Date().toISOString(),
                },
            });
        } catch (error) {
            throw processError(FirebaseIntent.PushData, error);
        }
    };
