import { ProvidersService } from '@/lib/modules/providers/service';
import { PracticeClientsPageProps } from '@/lib/modules/providers/service/page-props/get-practice-clients-page-props/getPracticeClientsPageProps';
import { PracticeAdminNavigationPage } from '@/lib/shared/components/features/pages/PracticeAdminNavigationPage';
import { PracticeClientListPage } from '@/lib/shared/components/features/pages/PracticeClientListPage/PracticeClientListPage';
import { RBAC } from '@/lib/shared/utils';
import { withPageAuthRequired } from '@auth0/nextjs-auth0';

export const getServerSideProps = RBAC.requireProviderAuth(
    withPageAuthRequired({
        getServerSideProps:
            ProvidersService.pageProps.getPracticeClientsPageProps,
    })
);

export default function PracticeClientsPage({
    connectionRequests = [],
    user,
}: PracticeClientsPageProps) {
    console.log('connectionRequests', connectionRequests);
    return (
        <PracticeAdminNavigationPage
            user={user}
            currentPath={'/providers/practice/clients'}
        >
            <PracticeClientListPage
                connectionRequests={connectionRequests}
                user={user}
            />
        </PracticeAdminNavigationPage>
    );
}
