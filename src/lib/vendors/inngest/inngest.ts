import { Inngest } from 'inngest';

export const APP_NAME = 'therify-directory' as const;

export const VendorInngest = new Inngest({ name: APP_NAME });
