import { useContext, useState, useRef, useEffect } from 'react';
import { useRouter } from 'next/router';
import { ProviderNavigationPage } from '@/lib/shared/components/features/pages';
import { URL_PATHS } from '@/lib/sitemap';
import { RBAC } from '@/lib/shared/utils';
import { withPageAuthRequired } from '@auth0/nextjs-auth0';
import { ProvidersService } from '@/lib/modules/providers/service';
import { ProviderClientDetailsPageProps } from '@/lib/modules/providers/service/page-props/get-client-details-page-props';
import {
    ClientDetails,
    ReimbursementModal,
} from '@/lib/modules/providers/components/Clients';
import { CenteredContainer, Modal } from '@/lib/shared/components/ui';
import { format } from 'date-fns';
import { CircularProgress } from '@mui/material';
import { ProfileType, SessionInvoiceStatus } from '@prisma/client';
import { Alerts } from '@/lib/modules/alerts/context';
import { MoneyOff } from '@mui/icons-material';
import {
    useSessionInvoicing,
    OnVoidInvoiceCallback,
} from '@/lib/modules/accounts/components/hooks';
import { trpc } from '@/lib/shared/utils/trpc';
import { useFeatureFlags } from '@/lib/shared/hooks';

export const getServerSideProps = RBAC.requireCoachAuth(
    withPageAuthRequired({
        getServerSideProps:
            ProvidersService.pageProps.getClientDetailsPageProps,
    })
);

export default function ClientDetailsPage({
    user,
    connectionRequest: ssConnectionRequest,
    invoices: ssInvoices,
}: ProviderClientDetailsPageProps) {
    const { createAlert } = useContext(Alerts.Context);
    const { flags } = useFeatureFlags(user);
    const router = useRouter();
    const [invoices, setInvoices] =
        useState<ProviderClientDetailsPageProps['invoices']>(ssInvoices);
    const [invoiceToVoid, setInvoiceToVoid] = useState<
        ProviderClientDetailsPageProps['invoices'][number] | null
    >(null);
    const [isReimbursementModalOpen, setIsReimbursementModalOpen] =
        useState(false);
    const {
        onInvoiceClient,
        ConfirmationUi: CreateInvoiceConfirmationModal,
        onVoidInvoice,
        isVoidingInvoice,
    } = useSessionInvoicing(user?.userId);
    const timeoutRef = useRef<number>();
    const [isInRefetchTimeout, setIsInRefetchTimeout] = useState(false);

    const voidInvoiceCallback: OnVoidInvoiceCallback = (result, error) => {
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
    const refreshWindow = () => {
        if (typeof window !== 'undefined') window.location.reload();
    };
    useEffect(() => {
        if (flags.didFlagsLoad && !flags.canAccessClientDetailsPage) {
            router.push(URL_PATHS.PROVIDERS.COACH.CLIENTS);
        }
    }, [flags.canAccessClientDetailsPage, flags.didFlagsLoad, router]);
    const {
        data: refetchedConnectionRequestResult,
        isLoading,
        refetch: refetchConnectionRequest,
    } = trpc.useQuery(
        [
            'directory.get-connection-request',
            {
                memberId: ssConnectionRequest?.member.id ?? '',
                providerId: user?.userId ?? '',
            },
        ],
        { refetchOnWindowFocus: false, enabled: false }
    );
    const { connectionRequest: refetchedConnectionRequest } =
        refetchedConnectionRequestResult ?? {};
    const connectionRequest = refetchedConnectionRequest ?? ssConnectionRequest;
    if (!user || !flags.canAccessClientDetailsPage) return null;
    return (
        <ProviderNavigationPage
            currentPath={URL_PATHS.PROVIDERS.COACH.CLIENTS}
            user={user}
        >
            <ClientDetails
                isLoading={isLoading || isInRefetchTimeout}
                provider={user}
                connectionRequest={connectionRequest}
                invoices={invoices}
                onBack={router.back}
                onCreateInvoice={
                    user.stripeConnectAccountId
                        ? () => {
                              if (!connectionRequest) return;
                              onInvoiceClient(
                                  {
                                      memberId: connectionRequest.member.id,
                                      givenName:
                                          connectionRequest.member.givenName,
                                  },
                                  refreshWindow
                              );
                          }
                        : undefined
                }
                onVoidInvoice={(invoice) => setInvoiceToVoid(invoice)}
                onReimbursement={() => {
                    setIsReimbursementModalOpen(true);
                }}
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
                        if (!user || !connectionRequest || !invoiceToVoid)
                            return;
                        onVoidInvoice(
                            {
                                sessionInvoiceId: invoiceToVoid.id,
                                memberId: connectionRequest.member.id,
                                providerId: user.userId,
                            },
                            voidInvoiceCallback
                        );
                    }}
                />
            )}
            <CreateInvoiceConfirmationModal />
            {isReimbursementModalOpen && (
                <ReimbursementModal
                    designation={ProfileType.coach}
                    connectionRequest={connectionRequest}
                    onClose={() => setIsReimbursementModalOpen(false)}
                    onSubmitCallback={() => {
                        window.clearTimeout(timeoutRef.current);
                        setIsInRefetchTimeout(true);
                        timeoutRef.current = window.setTimeout(() => {
                            refetchConnectionRequest();
                            setIsInRefetchTimeout(false);
                        }, 5000);
                    }}
                />
            )}
        </ProviderNavigationPage>
    );
}
