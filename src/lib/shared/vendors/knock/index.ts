import { Knock } from '@knocklabs/node';
import { withKnockConfiguration } from './configuration';
import { SendUnreadChatMessagesEmail } from './methods';

export const vendorKnock = withKnockConfiguration((CONFIG) => {
    const knock = new Knock(CONFIG.KNOCK_API_KEY);
    return {
        sendUnreadChatMessagesEmail: SendUnreadChatMessagesEmail.factory({
            knock,
        }),
    };
});

export type VendorKnock = typeof vendorKnock;
