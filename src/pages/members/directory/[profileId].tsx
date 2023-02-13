import { ProviderProfile } from '@/lib/modules/directory/components/ProviderProfile';
import { MemberNavigationPage } from '@/lib/shared/components/features/pages/MemberNavigationPage';
import { membersService } from '@/lib/modules/members/service';
import { DirectoryProfilePageProps } from '@/lib/modules/members/service/get-directory-profile-props/getDirectoryProfileProps';
import { URL_PATHS } from '@/lib/sitemap/urlPaths';
import { RBAC } from '@/lib/shared/utils';
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
            <ProviderProfile
                {...providerProfile}
                member={user}
                providerHasBeenSelected
            />
        </MemberNavigationPage>
    );
}

export const getServerSideProps = RBAC.requireMemberAuth(
    withPageAuthRequired({
        getServerSideProps: membersService.getDirectoryProfilePageProps,
    })
);
