import { VendorInngest } from './inngest';
import sendMail from '@/emails';
import WelcomeEmail from '@/emails/Welcome';

const FUNCTION_NAME = 'send-email' as const;
const FUNCTION_URL = `test/${FUNCTION_NAME}` as const;

export default VendorInngest.createStepFunction(
    FUNCTION_NAME,
    FUNCTION_URL,
    async ({ event, tools }) => {
        await sendMail({
            subject: 'Welcome to Therify',
            to: 'warren@therify.co',
            component: <WelcomeEmail />,
        });
        return { event, body: 'Hello World' };
    }
);
