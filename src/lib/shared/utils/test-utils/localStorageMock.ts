export const localStorageMock = (function () {
    let store: Record<string, string> = {};
    return {
        getItem: function (key: string): string | null {
            return store[key] ?? null;
        },
        setItem: function (key: string, value: string | number | boolean) {
            store[key] = value.toString();
        },
        clear: function () {
            store = {};
        },
        removeItem: function (key: string) {
            delete store[key];
        },
    };
})();
