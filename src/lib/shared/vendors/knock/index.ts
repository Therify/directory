import { Knock } from '@knocklabs/node';
import { withKnockConfiguration } from './configuration';
import { SendNewMessageEmail } from './methods';

export { KnockRecipient } from './schema/knock-recipient';

export const vendorKnock = withKnockConfiguration((CONFIG) => {
    const knock = new Knock(CONFIG.KNOCK_API_KEY);
    return {
        sendNewMessageEmail: SendNewMessageEmail.factory({
            knock,
        }),
    };
});

export type VendorKnock = typeof vendorKnock;
