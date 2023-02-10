import { withPageAuthRequired } from '@auth0/nextjs-auth0';
import { H1 } from '@/lib/shared/components/ui';
import { RBAC } from '@/lib/shared/utils';
import { membersService } from '@/lib/modules/members/service';
import { MemberHomePageProps } from '@/lib/modules/members/service/get-home-page-props/getHomePageProps';
import { MemberNavigationPage } from '@/lib/shared/components/features/pages/MemberNavigationPage';
import { URL_PATHS } from '@/lib/sitemap/urlPaths';

export const getServerSideProps = RBAC.requireMemberAuth(
    withPageAuthRequired({
        getServerSideProps: membersService.getHomePageProps,
    })
);

export default function MemberHomePage({ user }: MemberHomePageProps) {
    return (
        <MemberNavigationPage currentPath={URL_PATHS.MEMBERS.HOME} user={user}>
            <H1>Member Home</H1>
        </MemberNavigationPage>
    );
}
