import { useRouter } from 'next/router';
import { withPageAuthRequired } from '@auth0/nextjs-auth0';
import { H1 } from '@/lib/shared/components/ui';
import {
    COACH_MAIN_MENU,
    COACH_SECONDARY_MENU,
    COACH_MOBILE_MENU,
    URL_PATHS,
} from '@/lib/sitemap';
import { SideNavigationPage } from '@/lib/shared/components/features/pages';
import { RBAC } from '@/lib/shared/utils';
import { ProvidersService } from '@/lib/modules/providers/service';
import { ProviderTherifyUserPageProps } from '@/lib/modules/providers/service/page-props/get-therify-user-props';

export const getServerSideProps = RBAC.requireCoachAuth(
    withPageAuthRequired({
        getServerSideProps: ProvidersService.pageProps.getTherifyUserPageProps,
    })
);

export default function TherapistDashboardPage({
    user,
}: ProviderTherifyUserPageProps) {
    const router = useRouter();
    return (
        <SideNavigationPage
            currentPath={URL_PATHS.PROVIDERS.COACH.DASHBOARD}
            onNavigate={router.push}
            user={user}
            primaryMenu={[...COACH_MAIN_MENU]}
            secondaryMenu={[...COACH_SECONDARY_MENU]}
            mobileMenu={[...COACH_MOBILE_MENU]}
        >
            <H1>Coach Dashboard</H1>
        </SideNavigationPage>
    );
}
