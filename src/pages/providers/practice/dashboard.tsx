import { useRouter } from 'next/router';
import { withPageAuthRequired } from '@auth0/nextjs-auth0';
import { H1 } from '@/components/ui';
import { SideNavigationPage } from '@/components/features/pages';
import {
    PRACTICE_ADMIN_MAIN_MENU,
    PRACTICE_ADMIN_SECONDARY_MENU,
    PRACTICE_ADMIN_MOBILE_MENU,
    URL_PATHS,
} from '@/lib/sitemap';
import { RBAC } from '@/lib/utils';
import { useEffect } from 'react';
import { Role } from '@prisma/client';
import { ProvidersService } from '@/lib/services/providers';
import { ProviderDashboardProps } from '@/lib/services/providers/dashboard/get-dashboard-props/getDashboardProps';

export const getServerSideProps = RBAC.requireProviderAuth(
    withPageAuthRequired({
        getServerSideProps: ProvidersService.getDashboardProps,
    })
);

export default function PracticeDashboardPage({
    user,
}: ProviderDashboardProps) {
    const router = useRouter();
    return (
        <SideNavigationPage
            currentPath={URL_PATHS.PROVIDERS.PRACTICE.DASHBOARD}
            onNavigate={router.push}
            user={user}
            primaryMenu={[...PRACTICE_ADMIN_MAIN_MENU]}
            secondaryMenu={[...PRACTICE_ADMIN_SECONDARY_MENU]}
            mobileMenu={[...PRACTICE_ADMIN_MOBILE_MENU]}
            isLoadingUser={false}
        >
            <H1>Practice Dashboard</H1>
        </SideNavigationPage>
    );
}
