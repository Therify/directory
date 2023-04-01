import { StripeInvoice } from '@/lib/shared/vendors/stripe';
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
        const { user: provider } =
            await prisma.providerProfile.findUniqueOrThrow({
                where: {
                    stripeSessionPriceId: priceId,
                },
                select: {
                    user: true,
                },
            });

        const member = await prisma.user.findUniqueOrThrow({
            where: {
                stripeCustomerId: customerId,
            },
            select: {
                emailAddress: true,
                id: true,
            },
        });

        if (!provider?.id || !member.id) {
            return { sentMessage: false };
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
            const referenceText = `Reference # ${referenceId}`;
            try {
                await streamChat.sendSystemMessageToChannel({
                    channelId: channel.id,
                    message:
                        `Therify Session invoice has been sent sent to ${member.emailAddress}. Please check your email for payment instructions.
                    
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
