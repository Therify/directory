import { HandleCoachingSessionPayment } from '@/lib/modules/accounts/features/billing';
import { HandleCoachingSessionPaymentTransaction } from './definition';

interface CreateInvoiceEntityFactory {
    (
        params: HandleCoachingSessionPayment.Input
    ): HandleCoachingSessionPaymentTransaction['handleInvoiceEntity'];
}
export const factory: CreateInvoiceEntityFactory = ({
    invoiceId,
    invoiceStatus,
    invoiceTotal,
    invoiceAmountDue,
    invoiceAmountPaid,
    invoiceAmountRemaining,
    invoicePdf,
    invoiceNumber,
}) => ({
    async commit({ prisma }, { getMemberEntity: { id: memberId } }) {
        const currentInvoice = await prisma.stripeInvoice.findFirst({
            where: {
                invoiceId,
            },
            select: {
                id: true,
                status: true,
                total: true,
                amountDue: true,
                amountPaid: true,
                amountRemaining: true,
                invoicePdf: true,
            },
        });
        if (currentInvoice?.id) {
            const { id, ...previousValues } = currentInvoice;
            await prisma.stripeInvoice.update({
                where: {
                    id,
                },
                data: {
                    status: invoiceStatus,
                    total: invoiceTotal,
                    amountDue: invoiceAmountDue,
                    amountPaid: invoiceAmountPaid,
                    amountRemaining: invoiceAmountRemaining,
                    invoicePdf: invoicePdf,
                },
            });
            return {
                invoiceId: id,
                previousValues,
            };
        }
        const newInvoice = await prisma.stripeInvoice.create({
            data: {
                status: invoiceStatus,
                invoiceId,
                userId: memberId,
                total: invoiceTotal,
                amountDue: invoiceAmountDue,
                amountPaid: invoiceAmountPaid,
                amountRemaining: invoiceAmountRemaining,
                invoicePdf: invoicePdf,
                invoiceNumber,
            },
        });
        return {
            invoiceId: newInvoice.id,
            previousValues: null,
        };
    },
    async rollback(
        { prisma },
        { handleInvoiceEntity: { invoiceId, previousValues } }
    ) {
        if (previousValues) {
            return await prisma.stripeInvoice.update({
                where: { id: invoiceId },
                data: previousValues,
            });
        }
        return await prisma.stripeInvoice.delete({
            where: { id: invoiceId },
        });
    },
});
