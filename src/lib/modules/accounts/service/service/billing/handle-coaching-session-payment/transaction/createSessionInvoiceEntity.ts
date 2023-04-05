import { HandleCoachingSessionPayment } from '@/lib/modules/accounts/features/billing';
import { HandleCoachingSessionPaymentTransaction } from './definition';

interface CreateSessionInvoiceEntityFactory {
    (
        params: HandleCoachingSessionPayment.Input
    ): HandleCoachingSessionPaymentTransaction['createSessionInvoiceEntity'];
}
export const factory: CreateSessionInvoiceEntityFactory = ({
    dateOfSession,
    invoiceStatus,
}) => ({
    async commit(
        { prisma },
        {
            getMemberEntity: { id: memberId },
            getCoachEntity: { id: providerId },
            createInvoiceEntity: { invoiceId },
        }
    ) {
        const sessionInvoice = await prisma.sessionInvoice.create({
            data: {
                status: invoiceStatus,
                invoiceId,
                memberId,
                providerId,
                dateOfSession,
            },
        });
        return {
            sessionInvoiceId: sessionInvoice.id,
        };
    },
    async rollback(
        { prisma },
        { createSessionInvoiceEntity: { sessionInvoiceId } }
    ) {
        return await prisma.stripeInvoice.delete({
            where: { id: sessionInvoiceId },
        });
    },
});
