import { FirebaseFactoryParams } from '../../../factoryParams';
import { readDataFactory } from '../../read-data';
import { USER_PRESENCE_PATH } from '../constants';
type UserPresence = {
    status: 'online' | 'offline';
    // updatedAt: null only occurs on presence that has never been set
    updatedAt: string | null;
    path: string | null;
};
/**
 * Reads a user's presence
 * @param userId the signed-in user's id
 * @param status online or offline
 * @param path the url path the user is currently on
 * @returns `success: true` or throws
 */
export const readPresenceFactory =
    (params: FirebaseFactoryParams) =>
    async (userId: string): Promise<UserPresence> => {
        const readData = readDataFactory(params);
        const presence = (await readData(
            `${USER_PRESENCE_PATH}/${userId}`
        )) as UserPresence;
        return {
            status: presence?.status === 'online' ? 'online' : 'offline',
            updatedAt: presence?.updatedAt ?? null,
            path: presence.path ?? null,
        };
    };
