import { withPageAuthRequired } from '@auth0/nextjs-auth0';
import { URL_PATHS } from '@/lib/sitemap';
import { ProvidersService } from '@/lib/modules/providers/service';
import { RBAC } from '@/lib/shared/utils';
import { ProviderNavigationPage } from '@/lib/shared/components/features/pages/ProviderNavigationPage';
import { ProviderClientsPageProps } from '@/lib/modules/providers/service/page-props/get-clients-page-props/getProviderClientsPageProps';
import { ProviderClientListPage } from '@/lib/shared/components/features/pages/ProviderClientListPage/ProviderClientListPage';
import { ConnectionRequest } from '@/lib/shared/types';
import { ProfileType } from '@prisma/client';

export const getServerSideProps = RBAC.requireTherapistAuth(
    withPageAuthRequired({
        getServerSideProps:
            ProvidersService.pageProps.getProviderClientsPageProps,
    })
);

export default function TherapistClientsPage({
    user,
    connectionRequests,
}: ProviderClientsPageProps) {
    return (
        <ProviderNavigationPage
            currentPath={URL_PATHS.PROVIDERS.THERAPIST.CLIENTS}
            user={user}
        >
            <ProviderClientListPage
                designation={ProfileType.therapist}
                connectionRequests={
                    connectionRequests
                        ? ([
                              ...connectionRequests,
                              {
                                  ...connectionRequests[0],
                                  connectionStatus: 'accepted',
                              },
                              {
                                  ...connectionRequests[0],
                                  connectionStatus: 'denied',
                              },
                              ...connectionRequests,
                          ] as ConnectionRequest.Type[])
                        : []
                }
            />
        </ProviderNavigationPage>
    );
}
