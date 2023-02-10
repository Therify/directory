import { ZodError } from 'zod';
import { FirebaseIntent } from '../intents';
import { schema as firebaseErrorErrorSchema } from './schema';
import { UnknownError } from './unknownError';
import { FirebaseUnparsableError } from './unparsableError';
import { processPushDataError } from '../methods/push-data/errors';
import { processUpdateDataError } from '../methods/update-data/errors';
import { processReadDataError } from '../methods/read-data/errors';
import { processSetDataError } from '../methods/set-data/errors';

export function processError(intent: FirebaseIntent, error: unknown) {
    try {
        const processedError = firebaseErrorErrorSchema.parse(error);
        switch (intent) {
            case FirebaseIntent.ReadData:
                return processReadDataError(processedError);
            case FirebaseIntent.SetData:
                return processSetDataError(processedError);
            case FirebaseIntent.PushData:
                return processPushDataError(processedError);
            case FirebaseIntent.UpdateData:
                return processUpdateDataError(processedError);
            default:
                const message = `An error occurred with an unrecognized Firebase Vendor intent: ${intent}`;
                return new UnknownError({
                    code:
                        processedError.code ?? 'UNKNOWN_FIREBASE_INTENT_ERROR',
                    intent,
                    message,
                });
        }
    } catch (error) {
        if (error instanceof ZodError) {
            return new FirebaseUnparsableError({
                message: error.message,
                intent,
            });
        }
        return new FirebaseUnparsableError({
            message: 'Unable to parse error result',
            intent,
        });
    }
}
