import { CreateStripeConnectLoginUrl } from '@/lib/modules/accounts/features/billing';
import { URL_PATHS } from '@/lib/sitemap';
import { AccountsServiceParams } from '../../params';

export const factory =
    ({ stripe, prisma }: AccountsServiceParams) =>
    async ({ userId }: CreateStripeConnectLoginUrl.Input): Promise<string> => {
        console.log('createStripeConnectLoginUrl', { userId });
        const { stripeConnectAccountId } = await prisma.user.findUniqueOrThrow({
            where: { id: userId },
            select: { stripeConnectAccountId: true },
        });

        if (!stripeConnectAccountId) {
            throw new Error('No Stripe account id found for user.');
        }
        return await stripe.createStripeConnectLoginLink(
            stripeConnectAccountId
        );
    };
