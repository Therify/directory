import { CreateStripeBillingPortalSession } from '@/lib/modules/accounts/features/billing';
import { AccountsServiceParams } from '../../params';

export const factory =
    ({ prisma, stripe }: AccountsServiceParams) =>
    async ({
        userId,
        returnUrl,
    }: CreateStripeBillingPortalSession.Input): Promise<{
        billingPortalUrl: string;
    }> => {
        const { stripeCustomerId } = await prisma.user.findFirstOrThrow({
            where: {
                id: userId,
            },
            select: {
                stripeCustomerId: true,
            },
        });
        if (!stripeCustomerId) {
            throw new Error('User does not have a stripe customer id');
        }
        const { billingPortalUrl } = await stripe.createBillingPortalSession({
            customerId: stripeCustomerId,
            returnUrl,
        });
        return {
            billingPortalUrl,
        };
    };
