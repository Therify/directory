import { HandleGroupPracticePlanPayment } from '@/lib/features/accounts/billing';
import { HandleGroupPracticePlanPaymentTransaction } from './definition';

interface CreateInvoiceEntityFactory {
    (
        params: HandleGroupPracticePlanPayment.Input
    ): HandleGroupPracticePlanPaymentTransaction['createInvoiceEntity'];
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
    async commit(
        { prisma },
        {
            createPlanEntity: { planId },
            getTherifyIdentifiers: { therifyUserId },
        }
    ) {
        const invoice = await prisma.stripeInvoice.create({
            data: {
                planId,
                status: invoiceStatus,
                invoiceId,
                userId: therifyUserId,
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
