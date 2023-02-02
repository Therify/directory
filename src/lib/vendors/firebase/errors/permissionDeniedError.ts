import { FirebaseIntent } from '../intents';

export class PermissionDeniedError extends Error {
    public readonly intent: FirebaseIntent;
    public readonly code: string;
    constructor({
        message,
        intent,
    }: {
        message: string;
        intent: FirebaseIntent;
    }) {
        super(message);
        this.intent = intent;
        this.code = 'PERMISSION_DENIED';
    }
}
