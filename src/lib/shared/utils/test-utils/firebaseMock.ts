export const firebase = () => {
    const app = {
        initializeApp: (options: unknown, name?: string) => {},
    };
    const auth = {
        getAuth: (app: unknown) => {},
        onAuthStateChanged: (callback: unknown) => {},
    };
    const database = {
        getDatabase: (app: unknown) => {},
    };
    return {
        auth,
        database,
        app,
    };
};
