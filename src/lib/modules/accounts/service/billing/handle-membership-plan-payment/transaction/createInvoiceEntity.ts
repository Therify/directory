import { HandleMembershipPlanPayment } from '@/lib/modules/accounts/features/billing';
import { HandleMembershipPlanPaymentTransaction } from './definition';

interface CreateInvoiceEntityFactory {
    (
        params: HandleMembershipPlanPayment.Input
    ): HandleMembershipPlanPaymentTransaction['createInvoiceEntity'];
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
        { createPlanEntity: { planId }, getAccount: { accountOwnerId } }
    ) {
        const invoice = await prisma.stripeInvoice.create({
            data: {
                planId,
                status: invoiceStatus,
                invoiceId,
                userId: accountOwnerId,
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
