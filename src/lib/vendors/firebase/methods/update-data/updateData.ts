import { ref, update } from 'firebase/database';
import { processError } from '../../errors';
import { FirebaseFactoryParams } from '../../factoryParams';
import { FirebaseIntent } from '../../intents';
/**
 * Updates a child node at a path with the given value
 * @param path
 * @param value
 * @returns
 */
export const updateDataFactory =
    ({ database }: FirebaseFactoryParams) =>
    async (path: string, values: Record<string, unknown>) => {
        try {
            return await update(ref(database, path), {
                ...values,
                updatedAt: new Date().toISOString(),
            });
        } catch (error) {
            throw processError(FirebaseIntent.UpdateData, error);
        }
    };
