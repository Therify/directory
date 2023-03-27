import { membersService } from '@/lib/modules/members/service';
import { CarePageProps } from '@/lib/modules/members/service/get-care-page-props/getCarePageProps';
import { MemberNavigationPage } from '@/lib/shared/components/features/pages';
import { RBAC } from '@/lib/shared/utils';

export const getServerSideProps = RBAC.requireMemberAuth(
    membersService.getCarePageProps
);

export default function CarePage({ user }: CarePageProps) {
    return (
        <MemberNavigationPage user={user} currentPath="/members/care">
            <div>
                <h1>Care Page</h1>
            </div>
        </MemberNavigationPage>
    );
}
