import { VendorInngest } from './inngest';

export default VendorInngest.createFunction(
    'therify-directory-track-profile-view',
    'directory.track-profile-view',
    async function (event) {
        console.log('trackProfileView', event);
    }
);
