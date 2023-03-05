import { FirebaseFactoryParams } from '../../../factoryParams';
import { readDataFactory } from '../../read-data';
import { USER_PRESENCE_PATH } from '../constants';

export const readPresenceFactory =
    (params: FirebaseFactoryParams) => async (userId: string) => {
        const readData = readDataFactory(params);
        return await readData(`${USER_PRESENCE_PATH}/${userId}`);
    };
