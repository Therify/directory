import { VoidCoachingSessionInvoice } from '@/lib/modules/accounts/features/billing';
import { AccountsServiceParams } from '../../params';
import { SessionInvoiceStatus } from '@prisma/client';

export const factory =
    ({ prisma, stripe }: AccountsServiceParams) =>
    async ({
        memberId,
        providerId,
        sessionInvoiceId,
    }: VoidCoachingSessionInvoice.Input): Promise<{
        voided: true;
    }> => {
        const { status, invoice: stripeInvoice } =
            await prisma.sessionInvoice.findFirstOrThrow({
                where: {
                    id: sessionInvoiceId,
                    providerId,
                    memberId,
                },
                include: {
                    invoice: true,
                },
            });
        if (
            !(
                [
                    SessionInvoiceStatus.draft,
                    SessionInvoiceStatus.open,
                ] as SessionInvoiceStatus[]
            ).includes(status)
        ) {
            throw new Error(
                "Session invoice cannot be voided in it's current state"
            );
        }

        const { voided } = await stripe.voidInvoice(stripeInvoice.invoiceId);
        return {
            voided,
        };
    };
