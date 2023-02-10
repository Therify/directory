import { VendorInngest } from './inngest';

const FUNCTION_NAME = 'demo' as const;
const FUNCTION_URL = `test/${FUNCTION_NAME}` as const;

export default VendorInngest.createStepFunction(
    FUNCTION_NAME,
    FUNCTION_URL,
    ({ event, tools }) => {
        tools.sleep(1000);
        return { event, body: 'Hello World' };
    }
);
