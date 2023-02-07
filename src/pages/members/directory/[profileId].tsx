import { ProviderProfile } from '@/components/features/directory/ProviderProfile';
import { MemberNavigationPage } from '@/components/features/pages/MemberNavigationPage';
import { membersService } from '@/lib/services/members';
import { DirectoryProfilePageProps } from '@/lib/services/members/get-directory-profile-props/getDirectoryProfileProps';
import { URL_PATHS } from '@/lib/sitemap/urlPaths';
import { RBAC } from '@/lib/utils';
import { withPageAuthRequired } from '@auth0/nextjs-auth0';

export default function ProviderProfilePage({
    providerProfile,
    user,
}: DirectoryProfilePageProps) {
    return (
        <MemberNavigationPage
            user={user}
            currentPath={URL_PATHS.MEMBERS.DIRECTORY}
        >
            <ProviderProfile {...providerProfile} />
        </MemberNavigationPage>
    );
}

export const getServerSideProps = RBAC.requireMemberAuth(
    withPageAuthRequired({
        getServerSideProps: membersService.getDirectoryProfilePageProps,
    })
);
