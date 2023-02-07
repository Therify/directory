import { withPageAuthRequired } from '@auth0/nextjs-auth0';
import { H1 } from '@/components/ui';
import { RBAC } from '@/lib/utils';
import { membersService } from '@/lib/services/members';
import { MemberHomePageProps } from '@/lib/services/members/get-home-page-props/getHomePageProps';
import { MemberNavigationPage } from '@/components/features/pages/MemberNavigationPage';
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
