import { HandleCoachingSessionPayment } from '@/lib/modules/accounts/features/billing';
import { HandleCoachingSessionPaymentTransaction } from './definition';

interface CreateSessionInvoiceEntityFactory {
    (
        params: HandleCoachingSessionPayment.Input
    ): HandleCoachingSessionPaymentTransaction['handleSessionInvoiceEntity'];
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
            handleInvoiceEntity: { invoiceId },
        }
    ) {
        const sessionInvoice = await prisma.sessionInvoice.findFirst({
            where: {
                invoiceId,
                memberId,
                providerId,
            },
            select: {
                id: true,
                status: true,
                invoiceId: true,
                memberId: true,
                providerId: true,
                dateOfSession: true,
            },
        });
        if (sessionInvoice?.id) {
            const { id, status } = sessionInvoice;
            await prisma.sessionInvoice.update({
                where: {
                    id,
                },
                data: {
                    status: invoiceStatus,
                },
            });
            return {
                sessionInvoiceId: id,
                previousValues: {
                    status,
                },
            };
        }
        const newSessionInvoice = await prisma.sessionInvoice.create({
            data: {
                status: invoiceStatus,
                invoiceId,
                memberId,
                providerId,
                dateOfSession,
            },
        });
        return {
            sessionInvoiceId: newSessionInvoice.id,
            previousValues: null,
        };
    },
    async rollback(
        { prisma },
        { handleSessionInvoiceEntity: { sessionInvoiceId, previousValues } }
    ) {
        if (previousValues) {
            return await prisma.sessionInvoice.update({
                where: { id: sessionInvoiceId },
                data: {
                    status: previousValues.status,
                },
            });
        }
        return await prisma.stripeInvoice.delete({
            where: { id: sessionInvoiceId },
        });
    },
});
