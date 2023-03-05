import { ref, set } from 'firebase/database';
import { FirebaseFactoryParams } from '../../../factoryParams';
import { USER_PRESENCE_PATH } from '../constants';

export const setPresenceFactory =
    ({ database }: FirebaseFactoryParams) =>
    async (
        userId: string,
        status: 'online' | 'offline'
    ): Promise<{ success: boolean }> => {
        await set(ref(database, `${USER_PRESENCE_PATH}/${userId}`), {
            status,
            last_changed: new Date().toISOString(),
        });
        return { success: true };
    };
