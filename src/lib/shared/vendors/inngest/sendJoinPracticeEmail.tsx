import sendMail from '@/emails';
import { JoinPracticeEmailProps } from '@/emails/schema';
import InvitationEmail from '@/emails/JoinPractice';
import { VendorInngest } from './inngest';

export const NAME = 'Send Join Practice Email' as const;
export const EVENT_NAME = 'provider.send-invitation-email' as const;

export const inngestFunction = VendorInngest.createFunction(
    NAME,
    EVENT_NAME,
    async function ({ event }) {
        const referralRequestProps = JoinPracticeEmailProps.validate(
            event.data.props
        );
        await sendMail({
            to: [event.data.to],
            subject: event.data.subject,
            component: <InvitationEmail {...referralRequestProps} />,
        });
    }
);
