import { Database, ref, onValue, onDisconnect, set } from 'firebase/database';
import { USER_PRESENCE_PATH } from '../constants';

export const establishPresence = (uid: string, database: Database) => {
    const userStatusDatabaseRef = ref(database, `${USER_PRESENCE_PATH}/${uid}`);

    const isOfflineForDatabase = {
        status: 'offline',
    };

    const isOnlineForDatabase = {
        status: 'online',
    };

    return onValue(ref(database, '.info/connected'), function (snapshot) {
        // If we're not currently connected, don't do anything.
        if (snapshot.val() == false) {
            return;
        }

        // If we are currently connected, then use the 'onDisconnect()'
        // method to add a set which will only trigger once this
        // client has disconnected by closing the app,
        // losing internet, or any other means.
        onDisconnect(userStatusDatabaseRef)
            .set({
                ...isOfflineForDatabase,
                last_changed: new Date().toISOString(),
            })
            .then(function () {
                // The promise returned from .onDisconnect().set() will
                // resolve as soon as the server acknowledges the onDisconnect()
                // request, NOT once we've actually disconnected:
                // https://firebase.google.com/docs/reference/js/firebase.database.OnDisconnect

                // We can now safely set ourselves as 'online' knowing that the
                // server will mark us as offline once we lose connection.
                set(userStatusDatabaseRef, {
                    ...isOnlineForDatabase,
                    last_changed: new Date().toISOString(),
                });
            });
    });
};
