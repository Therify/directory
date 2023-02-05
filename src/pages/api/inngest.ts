import { serve } from 'inngest/next';
import demoFn from '@/lib/vendors/inngest/demo';
import getDirectoryApplicationFn from '@/lib/vendors/inngest/getDirectoryApplication';
import processDirectoryApplicationFn from '@/lib/vendors/inngest/processApplication';
const APP_NAME = 'therify-directory' as const;

export default serve(APP_NAME, [
    demoFn,
    getDirectoryApplicationFn,
    processDirectoryApplicationFn,
]);
