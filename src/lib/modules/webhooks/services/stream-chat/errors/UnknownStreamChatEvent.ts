export class UnknownStreamChatEventTypeError extends Error {
    constructor(eventType: string) {
        super(`Unknown Stream Chat event type: ${eventType}`);
    }
}
