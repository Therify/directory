import { ref, onValue } from 'firebase/database';
import { FirebaseFactoryParams } from '../../factoryParams';
/**
 * Subscribes callback to listen for changes at path
 * REMEMBER TO UNSUBSCRIPBE WHEN YOU ARE DONE LISTENING!
 * @param path
 * @param callback
 * @returns unsubscribe function
 */
export const addListenerFactory =
    ({ database }: FirebaseFactoryParams) =>
    (path: string, callback: (data: Record<string, unknown>) => void) => {
        return onValue(ref(database, path), (snapshot) => {
            callback(snapshot.val());
        });
    };
