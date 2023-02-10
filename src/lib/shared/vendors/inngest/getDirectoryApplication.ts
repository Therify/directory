import { VendorInngest } from './inngest';
import { vendorJotForm } from '../jotform';

const PROVIDER_APPLICATION_FORM_ID = '230176637181153' as const;

export default VendorInngest.createFunction(
    'therify-directory-get-applications',
    'directory.get-applications',
    async function (event) {
        const { content: submissions } = await vendorJotForm.getFormSubmissions(
            PROVIDER_APPLICATION_FORM_ID
        );
        for (const submission of submissions) {
            await VendorInngest.send('directory.process-application', {
                data: submission,
            });
        }
        return {
            data: {
                submissions,
            },
        };
    }
);
