import { notificationsService } from '@/lib/modules/notifications/service';
import { StripeInvoice } from '@/lib/shared/vendors/stripe';
import { URL_PATHS } from '@/lib/sitemap';
import { AccountsServiceParams } from '../../params';

export const factory =
    ({ prisma, streamChat }: AccountsServiceParams) =>
    async ({
        customerId,
        priceId,
        invoice,
    }: {
        invoice: StripeInvoice.Type;
        customerId: string;
        priceId: string;
    }): Promise<{
        sentMessage: boolean;
    }> => {
        const {
            user: provider,
            givenName: providerGivenName,
            surname: providerSurname,
        } = await prisma.providerProfile.findUniqueOrThrow({
            where: {
                stripeSessionPriceId: priceId,
            },
            select: {
                user: true,
                givenName: true,
                surname: true,
            },
        });

        const member = await prisma.user.findUniqueOrThrow({
            where: {
                stripeCustomerId: customerId,
            },
            select: {
                givenName: true,
                surname: true,
                emailAddress: true,
                id: true,
            },
        });

        if (!provider?.id || !member.id) {
            return { sentMessage: false };
        }
        try {
            await notificationsService.inApp.create({
                targetUserId: member.id,
                notification: {
                    title: `${providerGivenName} ${providerSurname} has sent you a session invoice!`,
                    body: `Check your Stripe customer dashboard to manage your session payments.`,
                    action: {
                        type: 'navigate',
                        target: URL_PATHS.MEMBERS.ACCOUNT.BILLING_AND_PAYMENTS,
                    },
                },
            });
        } catch (e) {
            console.error(e);
        }
        const channel = await prisma.channel.findFirst({
            where: {
                providerId: provider.id,
                memberId: member.id,
            },
        });
        if (!channel) {
            return { sentMessage: false };
        }

        if (channel.id) {
            const referenceId = invoice.metadata.referenceId;
            const referenceText = `Reference #: ${referenceId}`;
            try {
                await streamChat.sendSystemMessageToChannel({
                    channelId: channel.id,
                    message:
                        `A session invoice has been issued to ${member.givenName} ${member.surname}. ${member.givenName} can pay the invoice by visiting their billing and payments page or by checking their email.
                    
${referenceText}`.trim(),
                });
                return { sentMessage: true };
            } catch (e) {
                console.error(e);
                return { sentMessage: false };
            }
        }

        return {
            sentMessage: false,
        };
    };
