import { withPageAuthRequired } from '@auth0/nextjs-auth0';
import { H1 } from '@/components/ui';
import { URL_PATHS } from '@/lib/sitemap';
import { RBAC } from '@/lib/utils';
import { ProvidersService } from '@/lib/services/providers';
import { ProviderDashboardProps } from '@/lib/services/providers/dashboard/get-dashboard-props/getDashboardProps';
import { PracticeAdminNavigationPage } from '@/components/features/pages/PracticeAdminNavigationPage';
import Box from '@mui/material/Box';

export const getServerSideProps = RBAC.requireProviderAuth(
    withPageAuthRequired({
        getServerSideProps: ProvidersService.getDashboardProps,
    })
);

export default function PracticeAdminDashboardPage({
    user,
}: ProviderDashboardProps) {
    return (
        <PracticeAdminNavigationPage
            currentPath={URL_PATHS.PROVIDERS.PRACTICE.DASHBOARD}
            user={user}
        >
            <Box sx={{ padding: 4 }}>
                <H1>Practice Dashboard</H1>
            </Box>
        </PracticeAdminNavigationPage>
    );
}
