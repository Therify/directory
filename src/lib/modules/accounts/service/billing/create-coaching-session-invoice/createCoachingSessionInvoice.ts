import { CreateCoachingSessionInvoice } from '@/lib/modules/accounts/features/billing';
import { AccountsServiceParams } from '../../params';
import { format, isValid } from 'date-fns';
import { Role } from '@prisma/client';

const THERIFY_COACHING_FEE_IN_CENTS = 2000;
export const factory =
    ({ prisma, stripe }: AccountsServiceParams) =>
    async ({
        memberId,
        providerId,
        dateOfSession,
    }: CreateCoachingSessionInvoice.Input): Promise<{
        invoiceId: Exclude<
            CreateCoachingSessionInvoice.Output['invoiceId'],
            null
        >;
    }> => {
        const provider = await prisma.user.findUniqueOrThrow({
            where: {
                id: providerId,
            },
            select: {
                stripeConnectAccountId: true,
                roles: true,
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
                roles: true,
                emailAddress: true,
                stripeCustomerId: true,
            },
        });
        if (!provider.roles.includes(Role.provider_coach)) {
            throw new Error('Provider is not a coach');
        }
        if (!member.roles.includes(Role.member)) {
            throw new Error('The intended recipient is not a member');
        }
        if (!provider.providerProfile?.stripeSessionPriceId) {
            throw new Error('Provider does not have a session price id');
        }
        if (!provider.stripeConnectAccountId) {
            throw new Error(
                'Provider does not have a stripe connect account id'
            );
        }
        if (!member.stripeCustomerId) {
            throw new Error('Member does not have a stripe customer id');
        }
        const sessionDate = isValid(new Date(dateOfSession))
            ? format(new Date(dateOfSession), 'MM/dd/yyyy')
            : null;
        const sessionDateMessage = sessionDate ? ` on ${sessionDate}` : '';
        const invoice = await stripe.createInvoice({
            customerId: member.stripeCustomerId,
            collectionMethod: 'send_invoice',
            daysUntilDue: 1,
            shouldSendEmail: true,
            priceId: provider.providerProfile.stripeSessionPriceId,
            quantity: 1,
            connectedAccountData: {
                stripeConnectAccountId: provider.stripeConnectAccountId,
                applicationFeeInCents: THERIFY_COACHING_FEE_IN_CENTS,
                receiptEmail: member.emailAddress,
            },
            lineItemDescription: `Coaching session with ${provider.providerProfile.givenName} ${provider.providerProfile.surname}${sessionDateMessage}`,
            metadata: {
                priceId: provider.providerProfile.stripeSessionPriceId,
                coachId: providerId,
                memberId: memberId,
                dateOfSession,
            },
        });

        return {
            invoiceId: invoice.id,
        };
    };
