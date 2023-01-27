import { FirebaseIntent } from '../intents';

export class FirebaseUnparsableError extends Error {
    public readonly intent: FirebaseIntent;
    constructor({
        message,
        intent,
    }: {
        message: string;
        intent: FirebaseIntent;
    }) {
        super(message);
        this.name = 'FirebaseUnparsableError';
        this.intent = intent;
    }
}
