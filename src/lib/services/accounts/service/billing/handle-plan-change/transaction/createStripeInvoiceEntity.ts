import { HandlePlanChange } from '@/lib/features/accounts/billing';
import { HandlePlanChangeTransaction } from './definition';

interface CreateStripeInvoiceEntityFactory {
    (
        params: HandlePlanChange.Input
    ): HandlePlanChangeTransaction['createStripeInvoiceEntity'];
}

export const factory: CreateStripeInvoiceEntityFactory = ({
    invoiceId,
    invoiceStatus,
    invoiceTotal,
    invoiceAmountDue,
    invoiceAmountPaid,
    invoiceAmountRemaining,
    invoicePdf,
}) => ({
    async commit({ prisma }, { getPlanDetails: { planId, therifyUserId } }) {
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
    async rollback({ prisma }, { createStripeInvoiceEntity: { invoiceId } }) {
        return prisma.stripeInvoice.delete({
            where: { id: invoiceId },
        });
    },
});
