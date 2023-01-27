import { FirebaseIntent } from '../intents';

export class UnknownError extends Error {
    public readonly intent: FirebaseIntent;
    public readonly code: string;
    constructor({
        code,
        message,
        intent,
    }: {
        code: string;
        message: string;
        intent: FirebaseIntent;
    }) {
        super(message);
        this.name = 'FirebaseUnknownError';
        this.intent = intent;
        this.code = code;
    }
}
