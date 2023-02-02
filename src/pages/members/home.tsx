import { useRouter } from 'next/router';
import { withPageAuthRequired } from '@auth0/nextjs-auth0';
import { H1 } from '@/components/ui';
import { TopNavigationPage } from '@/components/features/pages';
import {
    MEMBER_MAIN_MENU,
    MEMBER_SECONDARY_MENU,
    MEMBER_MOBILE_MENU,
    URL_PATHS,
} from '@/lib/sitemap';
import { useTherifyUser } from '@/lib/hooks';
import { RBAC } from '@/lib/utils';
import { useSelfAssessments } from '@/lib/hooks/use-self-assessments';

export const getServerSideProps = RBAC.requireMemberAuth(
    withPageAuthRequired()
);

export default function MemberHomePage() {
    const { user, isLoading } = useTherifyUser();
    const { selfAssessments, isLoading: isLoadingAssessments } =
        useSelfAssessments(user?.userId);
    const router = useRouter();
    console.log({ selfAssessments });
    return (
        <TopNavigationPage
            currentPath={URL_PATHS.MEMBERS.HOME}
            onNavigate={router.push}
            user={user}
            primaryMenu={[...MEMBER_MAIN_MENU]}
            secondaryMenu={[...MEMBER_SECONDARY_MENU]}
            mobileMenu={[...MEMBER_MOBILE_MENU]}
            isLoadingUser={isLoading}
        >
            <H1>Member Home</H1>
        </TopNavigationPage>
    );
}
