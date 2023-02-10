import { ref, set } from 'firebase/database';
import { FirebaseFactoryParams } from '../../factoryParams';

/**
 * Writes data at path
 * @param path
 * @param data
 * @returns
 */
export const setDataFactory =
    ({ database }: FirebaseFactoryParams) =>
    async (path: string, data: Record<string, unknown>) => {
        return await set(ref(database, path), {
            ...data,
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString(),
        });
    };
