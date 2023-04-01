import { CreateCoachingSessionCheckout } from '@/lib/modules/accounts/features/billing';
import { AccountsServiceParams } from '../../params';
import crypto from 'crypto';

const THERIFY_COACHING_FEE_IN_CENTS = 2000;
export const factory =
    ({ prisma, stripe, streamChat }: AccountsServiceParams) =>
    async ({
        memberId,
        providerId,
    }: CreateCoachingSessionCheckout.Input): Promise<{
        invoiceId: Exclude<
            CreateCoachingSessionCheckout.Output['invoiceId'],
            null
        >;
    }> => {
        const provider = await prisma.user.findUniqueOrThrow({
            where: {
                id: providerId,
            },
            select: {
                stripeConnectAccountId: true,
                providerProfile: {
                    select: {
                        givenName: true,
                        surname: true,
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
        const uuid = crypto.randomUUID();
        const shortUuid = uuid.substring(0, 8);
        const invoice = await stripe.createInvoice({
            customerId: member.stripeCustomerId,
            priceId: provider.providerProfile.stripeSessionPriceId,
            quantity: 1,
            connectedAccountData: {
                stripeConnectAccountId: provider.stripeConnectAccountId,
                applicationFeeInCents: THERIFY_COACHING_FEE_IN_CENTS,
                receiptEmail: member.emailAddress,
            },
            lineItemDescription: `Coaching session with ${provider.providerProfile.givenName} ${provider.providerProfile.surname}`,
            daysUntilDue: 1,
            metadata: {
                priceId: provider.providerProfile.stripeSessionPriceId,
                referenceId: shortUuid,
                coachId: providerId,
                memberId: memberId,
            },
        });

        await stripe.sendInvoice(invoice.id);

        return {
            invoiceId: invoice.id,
        };
    };
