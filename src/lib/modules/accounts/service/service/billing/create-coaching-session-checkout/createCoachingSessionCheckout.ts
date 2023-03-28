import { CreateCoachingSessionCheckout } from '@/lib/modules/accounts/features/billing';
import { AccountsServiceParams } from '../../params';

const THERIFY_COACHING_FEE_IN_CENTS = 2000;
export const factory =
    ({ prisma, stripe }: AccountsServiceParams) =>
    async ({
        memberId,
        providerId,
    }: CreateCoachingSessionCheckout.Input): Promise<{
        checkoutUrl: CreateCoachingSessionCheckout.Output['checkoutUrl'];
    }> => {
        const provider = await prisma.user.findUniqueOrThrow({
            where: {
                id: providerId,
            },
            select: {
                stripeConnectAccountId: true,
                providerProfile: {
                    select: {
                        stripeSessionPriceId: true,
                    },
                },
            },
        });

        const member = await prisma.user.findUniqueOrThrow({
            where: {
                id: memberId,
            },
            select: {
                emailAddress: true,
                stripeCustomerId: true,
            },
        });

        if (!provider.providerProfile?.stripeSessionPriceId) {
            throw new Error('Provider does not have a session price id');
        }
        if (provider.stripeConnectAccountId === null) {
            throw new Error(
                'Provider does not have a stripe connect account id'
            );
        }
        if (member.stripeCustomerId === null) {
            throw new Error('Member does not have a stripe customer id');
        }
        const session = await stripe.createCheckoutSession({
            checkoutMode: 'payment',
            customerId: member.stripeCustomerId,
            priceId: provider.providerProfile.stripeSessionPriceId,
            quantity: 1,
            successUrl: 'http://localhost:3000/success',
            cancelUrl: 'http://localhost:3000/cancel',
            allowPromotionCodes: true,
            connectedAccountData: {
                stripeConnectAccountId: provider.stripeConnectAccountId,
                applicationFeeInCents: THERIFY_COACHING_FEE_IN_CENTS,
                receiptEmail: member.emailAddress,
            },
        });
        if (session.url === null) {
            throw new Error('No Stripe session url was retrurned.');
        }
        return {
            checkoutUrl: session.url,
        };
    };
