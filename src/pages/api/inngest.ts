import { serve } from 'inngest/next';
import demoFn from '@/lib/vendors/inngest/demo';
const APP_NAME = 'therify-directory' as const;

export default serve(APP_NAME, [demoFn]);
