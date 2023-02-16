import { MemberNavigationPage } from '@/lib/shared/components/features/pages/MemberNavigationPage';
import { membersService } from '@/lib/modules/members/service';
import { URL_PATHS } from '@/lib/sitemap/urlPaths';
import { RBAC } from '@/lib/shared/utils';
import { withPageAuthRequired } from '@auth0/nextjs-auth0';
import { styled } from '@mui/material/styles';
import React from 'react';
import { MemberTherifyUserPageProps } from '@/lib/modules/members/service/get-therify-user-props';
import { CenteredContainer, H1 } from '@/lib/shared/components/ui';

export const getServerSideProps = RBAC.requireMemberAuth(
    withPageAuthRequired({
        getServerSideProps: membersService.getTherifyUserPageProps,
    })
);

export default function ContentLibrary({ user }: MemberTherifyUserPageProps) {
    return (
        <MemberNavigationPage
            currentPath={URL_PATHS.MEMBERS.CONTENT.LIBRARY}
            user={user}
        >
            <CenteredContainer fillSpace>
                <H1>Coming soon</H1>
            </CenteredContainer>
        </MemberNavigationPage>
    );
}
