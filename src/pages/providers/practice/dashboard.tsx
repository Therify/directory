import { withPageAuthRequired } from '@auth0/nextjs-auth0';
import { H1 } from '@/lib/shared/components/ui';
import { URL_PATHS } from '@/lib/sitemap';
import { RBAC } from '@/lib/shared/utils';
import { ProvidersService } from '@/lib/modules/providers/service';
import { ProviderDashboardProps } from '@/lib/modules/providers/service/dashboard/get-dashboard-props/getDashboardProps';
import { PracticeAdminNavigationPage } from '@/lib/shared/components/features/pages/PracticeAdminNavigationPage';
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
