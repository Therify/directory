import { serve } from 'inngest/next';
import demoFn from '@/lib/shared/vendors/inngest/demo';
import getDirectoryApplicationFn from '@/lib/shared/vendors/inngest/getDirectoryApplication';
import processDirectoryApplicationFn from '@/lib/shared/vendors/inngest/processApplication';
import sendWelcomeEmailFn from '@/lib/shared/vendors/inngest/sendWelcomeEmail';
import { SendConnectionRequestEmail } from '@/lib/shared/vendors/inngest';
const APP_NAME = 'therify-directory' as const;

export default serve(
    APP_NAME,
    [
        demoFn,
        getDirectoryApplicationFn,
        processDirectoryApplicationFn,
        sendWelcomeEmailFn,
        SendConnectionRequestEmail.inngestFunction,
    ],
    {
        signingKey: process.env.INNGEST_SIGNING_KEY,
    }
);
