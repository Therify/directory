import { ref, get, child } from 'firebase/database';
import { processError } from '../../errors';
import { FirebaseFactoryParams } from '../../factoryParams';
import { FirebaseIntent } from '../../intents';
/**
 * Reads snapshot at path
 * @param path
 * @returns snapshot
 */
export const readDataFactory =
    ({ database }: FirebaseFactoryParams) =>
    async (path: string): Promise<unknown> => {
        try {
            const snapshot = await get(child(ref(database), path));
            return snapshot.val();
        } catch (error) {
            throw processError(FirebaseIntent.ReadData, error);
        }
    };
