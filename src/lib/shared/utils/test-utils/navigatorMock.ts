export const navigatorMock = (function () {
    return {
        clipboard: {
            writeText: jest.fn(),
        },
    };
})();
