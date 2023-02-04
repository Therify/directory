import * as JotFormClient from './client';
import { withJotFormConfiguration } from './configuration';

export const vendorJotForm = withJotFormConfiguration((CONFIG) => {
    return JotFormClient.createInstance(CONFIG.JOTFORM_API_KEY);
});

export type VendorJotForm = typeof vendorJotForm;
