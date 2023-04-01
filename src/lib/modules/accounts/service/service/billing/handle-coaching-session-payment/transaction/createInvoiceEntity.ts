import { HandleCoachingSessionPayment } from '@/lib/modules/accounts/features/billing';
import { HandleCoachingSessionPaymentTransaction } from './definition';

interface CreateInvoiceEntityFactory {
    (
        params: HandleCoachingSessionPayment.Input
    ): HandleCoachingSessionPaymentTransaction['createInvoiceEntity'];
}
export const factory: CreateInvoiceEntityFactory = ({
    invoiceId,
    invoiceStatus,
    invoiceTotal,
    invoiceAmountDue,
    invoiceAmountPaid,
    invoiceAmountRemaining,
    invoicePdf,
}) => ({
    async commit({ prisma }, { getMemberEntity: { id: memberId } }) {
        const invoice = await prisma.stripeInvoice.create({
            data: {
                status: invoiceStatus,
                invoiceId,
                userId: memberId,
                total: invoiceTotal,
                amountDue: invoiceAmountDue,
                amountPaid: invoiceAmountPaid,
                amountRemaining: invoiceAmountRemaining,
                invoicePdf: invoicePdf,
            },
        });
        return {
            invoiceId: invoice.id,
        };
    },
    async rollback({ prisma }, { createInvoiceEntity: { invoiceId } }) {
        return await prisma.stripeInvoice.delete({
            where: { id: invoiceId },
        });
    },
});
