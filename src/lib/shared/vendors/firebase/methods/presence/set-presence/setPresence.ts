import { ref, set } from 'firebase/database';
import { FirebaseFactoryParams } from '../../../factoryParams';
import { USER_PRESENCE_PATH } from '../constants';

/**
 * Sets a user's presence as online or offline
 * @param userId the signed-in user's id
 * @param status online or offline
 * @param path the url path the user is currently on
 * @returns `success: true` or throws
 */
export const setPresenceFactory =
    ({ database }: FirebaseFactoryParams) =>
    async (
        userId: string,
        status: 'online' | 'offline',
        path?: string
    ): Promise<{ success: true }> => {
        await set(ref(database, `${USER_PRESENCE_PATH}/${userId}`), {
            status,
            updatedAt: new Date().toISOString(),
            ...(path ? { path } : {}),
        });
        return { success: true };
    };
