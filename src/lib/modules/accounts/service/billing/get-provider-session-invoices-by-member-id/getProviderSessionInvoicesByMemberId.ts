import { GetProviderSessionInvoicesByMemberId } from '@/lib/modules/accounts/features/billing';
import { AccountsServiceParams } from '../../params';

export const factory =
    ({ prisma }: AccountsServiceParams) =>
    async ({
        memberId,
        providerId,
        status,
    }: GetProviderSessionInvoicesByMemberId.Input): Promise<
        Pick<GetProviderSessionInvoicesByMemberId.Output, 'invoices'>
    > => {
        const sessionInvoices = await prisma.sessionInvoice.findMany({
            where: {
                providerId,
                memberId,
                status,
            },
            include: {
                member: {
                    select: {
                        emailAddress: true,
                        id: true,
                        givenName: true,
                        surname: true,
                    },
                },
            },
        });
        return {
            invoices: sessionInvoices.sort(
                (a, b) =>
                    (b.dateOfSession?.getTime() ?? 0) -
                    (a.dateOfSession?.getTime() ?? 0)
            ),
        };
    };
