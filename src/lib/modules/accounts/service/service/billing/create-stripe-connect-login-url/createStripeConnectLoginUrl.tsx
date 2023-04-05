import { CreateStripeConnectLoginUrl } from '@/lib/modules/accounts/features/billing';
import { AccountsServiceParams } from '../../params';

export const factory =
    ({ stripe, prisma }: AccountsServiceParams) =>
    async ({ userId }: CreateStripeConnectLoginUrl.Input): Promise<string> => {
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
