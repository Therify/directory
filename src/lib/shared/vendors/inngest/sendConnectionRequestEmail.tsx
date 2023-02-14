import sendMail from '@/emails';
import { ReferralEmailProps } from '@/emails/schema';
import ReferralEmail from '@/emails/ReferralEmail';
import { VendorInngest } from './inngest';

export const NAME = 'Send Referral Email' as const;
export const EVENT_NAME = 'directory.send-referral-email' as const;

export const inngestFunction = VendorInngest.createFunction(
    NAME,
    EVENT_NAME,
    async function ({ event }) {
        const referralRequestProps = ReferralEmailProps.validate(
            event.data.props
        );
        await sendMail({
            to: [event.data.to],
            subject: event.data.subject,
            component: <ReferralEmail {...referralRequestProps} />,
        });
    }
);
