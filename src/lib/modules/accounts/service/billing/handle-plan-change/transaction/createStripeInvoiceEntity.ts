import { HandlePlanChange } from '@/lib/modules/accounts/features/billing';
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
    async commit(
        { prisma },
        {
            getTherifyUserDetails: { practiceOwnerId },
            createNewPlanEntity: { planId },
        }
    ) {
        const invoice = await prisma.stripeInvoice.create({
            data: {
                planId,
                status: invoiceStatus,
                invoiceId,
                userId: practiceOwnerId,
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
