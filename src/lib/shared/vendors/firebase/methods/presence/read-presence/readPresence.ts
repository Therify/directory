import { FirebaseFactoryParams } from '../../../factoryParams';
import { readDataFactory } from '../../read-data';
import { USER_PRESENCE_PATH } from '../constants';
type UserPresence = {
    status: 'online' | 'offline';
    last_changed: string | null;
};
export const readPresenceFactory =
    (params: FirebaseFactoryParams) =>
    async (userId: string): Promise<UserPresence> => {
        const readData = readDataFactory(params);
        const presence = (await readData(
            `${USER_PRESENCE_PATH}/${userId}`
        )) as { status: 'online' | 'offline'; last_changed: string };
        return {
            status: presence?.status === 'online' ? 'online' : 'offline',
            last_changed: presence?.last_changed ?? null,
        };
    };
