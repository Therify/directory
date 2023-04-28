import { useContext, useState } from 'react';
import { useRouter } from 'next/router';
import { ProviderNavigationPage } from '@/lib/shared/components/features/pages';
import { URL_PATHS } from '@/lib/sitemap';
import { RBAC } from '@/lib/shared/utils';
import { withPageAuthRequired } from '@auth0/nextjs-auth0';
import { ProvidersService } from '@/lib/modules/providers/service';
import { ProviderClientDetailsPageProps } from '@/lib/modules/providers/service/page-props/get-client-details-page-props';
import { ClientDetails } from '@/lib/modules/providers/components/Clients';
import { CenteredContainer, Modal } from '@/lib/shared/components/ui';
import { format } from 'date-fns';
import { CircularProgress } from '@mui/material';
import { SessionInvoiceStatus } from '@prisma/client';
import { Alerts } from '@/lib/modules/alerts/context';
import { MoneyOff } from '@mui/icons-material';
import {
    useSessionInvoicing,
    OnVoidInvoiceCallback,
} from '@/lib/modules/accounts/components/hooks';

export const getServerSideProps = RBAC.requireCoachAuth(
    withPageAuthRequired({
        getServerSideProps:
            ProvidersService.pageProps.getClientDetailsPageProps,
    })
);

export default function ClientDetailsPage({
    user,
    memberDetails,
    invoices: ssInvoices,
}: ProviderClientDetailsPageProps) {
    const { createAlert } = useContext(Alerts.Context);
    const router = useRouter();
    const [invoices, setInvoices] =
        useState<ProviderClientDetailsPageProps['invoices']>(ssInvoices);
    const [invoiceToVoid, setInvoiceToVoid] = useState<
        ProviderClientDetailsPageProps['invoices'][number] | null
    >(null);

    const {
        onInvoiceClient,
        ConfirmationUi: CreateInvoiceConfirmationModal,
        onVoidInvoice,
        isVoidingInvoice,
    } = useSessionInvoicing(user?.userId);

    const handleVoidSuccess: OnVoidInvoiceCallback = (result, error) => {
        console.log('handleVoidSuccess', { result, error });
        if (error) {
            createAlert({
                title: error.message,
                type: 'error',
            });
            return;
        }
        const { voided, errors } = result;
        if (voided) {
            setInvoices(
                invoices.map((invoice) => {
                    if (invoice.id === invoiceToVoid?.id) {
                        return {
                            ...invoice,
                            status: SessionInvoiceStatus.void,
                        };
                    }
                    return invoice;
                })
            );
            setInvoiceToVoid(null);
            createAlert({
                title: 'Invoice voided successfully',
                type: 'success',
            });
            return;
        }

        const [errorMessage] = errors;
        createAlert({
            title: errorMessage ?? 'Error voiding invoice',
            type: 'error',
        });
    };
    if (!user) return null;
    return (
        <ProviderNavigationPage
            currentPath={URL_PATHS.PROVIDERS.COACH.CLIENTS}
            user={user}
        >
            <ClientDetails
                provider={user}
                memberDetails={memberDetails}
                invoices={invoices}
                onBack={router.back}
                onCreateInvoice={() =>
                    onInvoiceClient({
                        memberId: memberDetails.id,
                        givenName: memberDetails.givenName,
                    })
                }
                onVoidInvoice={(invoice) => setInvoiceToVoid(invoice)}
            />
            {invoiceToVoid && (
                <Modal
                    isOpen
                    title={
                        invoiceToVoid.dateOfSession
                            ? `Session on ${format(
                                  new Date(invoiceToVoid.dateOfSession),
                                  'MMMM dd, yyyy'
                              )}`
                            : 'Void Invoice'
                    }
                    message="Are you sure you want to void this invoice? It will no longer be possible to collect payment for this charge."
                    showCloseButton={false}
                    fullWidthButtons
                    onClose={() => setInvoiceToVoid(null)}
                    postBodySlot={
                        isVoidingInvoice ? (
                            <CenteredContainer fillSpace>
                                <CircularProgress />
                            </CenteredContainer>
                        ) : null
                    }
                    secondaryButtonText="Cancel"
                    secondaryButtonOnClick={() => setInvoiceToVoid(null)}
                    secondaryButtonDisabled={isVoidingInvoice}
                    primaryButtonText="Void"
                    primaryButtonEndIcon={<MoneyOff />}
                    primaryButtonDisabled={isVoidingInvoice}
                    primaryButtonOnClick={() => {
                        onVoidInvoice(
                            {
                                sessionInvoiceId: invoiceToVoid.id,
                                memberId: memberDetails.id,
                                providerId: user.userId,
                            },
                            handleVoidSuccess
                        );
                    }}
                />
            )}
            <CreateInvoiceConfirmationModal />
        </ProviderNavigationPage>
    );
}
