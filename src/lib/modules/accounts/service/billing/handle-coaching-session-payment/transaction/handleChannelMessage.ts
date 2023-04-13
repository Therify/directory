import { HandleCoachingSessionPayment } from '@/lib/modules/accounts/features/billing';
import { HandleCoachingSessionPaymentTransaction } from './definition';

interface HandleChannelMessageFactory {
    (
        params: HandleCoachingSessionPayment.Input
    ): HandleCoachingSessionPaymentTransaction['handleChannelMessage'];
}

export const factory: HandleChannelMessageFactory = ({ invoiceNumber }) => ({
    async commit(
        { prisma, streamChat },
        {
            getMemberEntity: { id: memberId, givenName: memberName },
            getCoachEntity: { id: providerId },
        }
    ) {
        const channel = await prisma.channel.findFirst({
            where: {
                memberId,
                providerId,
            },
        });
        if (!channel) {
            return { messageDelivered: false };
        }
        try {
            const invoiceNumberText = `Invoice #: ${invoiceNumber}`;
            const { sent } = await streamChat.sendSystemMessageToChannel({
                channelId: channel.id,
                message: `${memberName} has purchased a session! 

${invoiceNumber ? invoiceNumberText : ''}`.trim(),
            });
            return { messageDelivered: sent };
        } catch (e) {
            // We dont want to reverse the transaction if message fails to send, but we do want to know about the error
            console.error(e);
            return { messageDelivered: false };
        }
    },
    async rollback() {
        return;
    },
});
