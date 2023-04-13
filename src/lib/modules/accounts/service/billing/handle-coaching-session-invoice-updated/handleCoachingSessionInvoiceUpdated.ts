import { StripeInvoice } from '@/lib/shared/vendors/stripe';
import { AccountsServiceParams } from '../../params';

export const factory =
    ({ prisma }: AccountsServiceParams) =>
    async ({
        customerId,
        priceId,
        invoice,
    }: {
        invoice: StripeInvoice.Type;
        customerId: string;
        priceId: string;
    }): Promise<{
        sessionInvoiceId: string;
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
                id: true,
            },
        });

        if (!provider?.id || !member.id) {
            throw new Error(
                `Could not find ${provider?.id ? 'member' : 'provider'}`
            );
        }

        let invoiceEntity = await prisma.stripeInvoice.findFirst({
            where: {
                invoiceId: invoice.id,
            },
        });
        if (invoiceEntity) {
            invoiceEntity = await prisma.stripeInvoice.update({
                where: {
                    id: invoiceEntity.id,
                },
                data: {
                    status: invoice.status,
                    invoiceId: invoice.id,
                    userId: member.id,
                    total: invoice.total,
                    amountDue: invoice.amount_due,
                    amountPaid: invoice.amount_paid,
                    amountRemaining: invoice.amount_remaining,
                    invoicePdf: invoice.invoicePdf,
                    invoiceNumber: invoice.number,
                },
            });
        } else {
            invoiceEntity = await prisma.stripeInvoice.create({
                data: {
                    status: invoice.status,
                    invoiceId: invoice.id,
                    userId: member.id,
                    total: invoice.total,
                    amountDue: invoice.amount_due,
                    amountPaid: invoice.amount_paid,
                    amountRemaining: invoice.amount_remaining,
                    invoicePdf: invoice.invoicePdf,
                    invoiceNumber: invoice.number,
                },
            });
        }

        let sessionInvoice = await prisma.sessionInvoice.findFirst({
            where: {
                invoiceId: invoiceEntity.id,
            },
        });
        if (sessionInvoice) {
            sessionInvoice = await prisma.sessionInvoice.update({
                where: {
                    id: sessionInvoice.id,
                },
                data: {
                    status: invoice.status,
                    invoiceId: invoiceEntity.id,
                    memberId: member.id,
                    providerId: provider.id,
                    dateOfSession: invoice.metadata.dateOfSession
                        ? new Date(invoice.metadata.dateOfSession)
                        : undefined,
                },
            });
        } else {
            sessionInvoice = await prisma.sessionInvoice.create({
                data: {
                    status: invoice.status,
                    invoiceId: invoiceEntity.id,
                    memberId: member.id,
                    providerId: provider.id,
                    dateOfSession: invoice.metadata.dateOfSession
                        ? new Date(invoice.metadata.dateOfSession)
                        : undefined,
                },
            });
        }

        return {
            sessionInvoiceId: sessionInvoice.id,
        };
    };
