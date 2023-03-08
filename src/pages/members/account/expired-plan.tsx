import { Box } from '@mui/material';
import { styled } from '@mui/material/styles';
import { isAfter, format } from 'date-fns';
import { useTheme } from '@mui/material/styles';
import { WarningRounded } from '@mui/icons-material';
import { useRouter } from 'next/router';
import {
    Paragraph,
    H3,
    Alert,
    CenteredContainer,
    Button,
} from '@/lib/shared/components/ui';
import { withPageAuthRequired } from '@auth0/nextjs-auth0';
import { membersService } from '@/lib/modules/members/service';
import { RBAC } from '@/lib/shared/utils';
import { MemberTherifyUserPageProps } from '@/lib/modules/members/service/get-therify-user-props';
import { MemberNavigationPage } from '@/lib/shared/components/features/pages';
import { URL_PATHS } from '@/lib/sitemap';
import { PlanStatus } from '@prisma/client';

export const getServerSideProps = RBAC.requireMemberAuth(
    withPageAuthRequired({
        getServerSideProps: membersService.getTherifyUserPageProps,
    })
);
export default function ExpiredPlanPage({ user }: MemberTherifyUserPageProps) {
    const theme = useTheme();
    const router = useRouter();
    const isPlanExpired =
        !!user?.plan?.endDate &&
        isAfter(new Date(), new Date(user.plan.endDate));
    const isPlanActive =
        !!user &&
        (user.plan?.status === PlanStatus.active ||
            user.plan?.status === PlanStatus.trialing);

    if (!isPlanExpired && isPlanActive)
        return (
            <CenteredContainer
                fillSpace
                style={{ background: theme.palette.background.default }}
            >
                <H3>Plan is still active</H3>
                {user?.plan?.endDate && (
                    <Paragraph>
                        Your current plan access ends on{' '}
                        {format(new Date(user.plan.endDate), 'MMMM do, yyyy')}.
                    </Paragraph>
                )}
                <Button onClick={() => router.push(URL_PATHS.ROOT)}>
                    Go Home
                </Button>
            </CenteredContainer>
        );

    return (
        <MemberNavigationPage
            currentPath={URL_PATHS.MEMBERS.ACCOUNT.EXPIRED_PLAN}
            user={user}
        >
            <CenteredContainer
                fillSpace
                style={{ background: theme.palette.background.default }}
            >
                <ErrorContainer>
                    <H3>
                        Unfortunately, you no longer have access to Therify.
                    </H3>
                    {isPlanExpired && (
                        <Paragraph>
                            Your sponsoring organization’s contract with Therify
                            has expired. Please contact the account
                            administrator within your organization for further
                            information on future access to our services.
                        </Paragraph>
                    )}
                    {isPlanExpired && user.plan?.endDate && (
                        <Alert
                            icon={
                                <CenteredContainer marginRight={2}>
                                    <WarningRounded />
                                </CenteredContainer>
                            }
                            title={`Your plan expired on ${format(
                                new Date(user.plan.endDate),
                                'MMMM do, yyyy'
                            )}.`}
                            type="error"
                        />
                    )}
                    {!isPlanExpired && !isPlanActive && (
                        <Paragraph>
                            Please contact the account administrator within your
                            organization for further information about access to
                            our services.
                        </Paragraph>
                    )}
                    {!isPlanExpired && !isPlanActive && (
                        <Alert
                            icon={
                                <CenteredContainer marginRight={2}>
                                    <WarningRounded />
                                </CenteredContainer>
                            }
                            title={`Your plan status is not active.`}
                            type="error"
                        />
                    )}
                </ErrorContainer>
            </CenteredContainer>
        </MemberNavigationPage>
    );
}

const ErrorContainer = styled(Box)(({ theme }) => ({
    background: theme.palette.background.paper,
    borderRadius: theme.shape.borderRadius,
    padding: theme.spacing(10),
    border: `1px solide ${theme.palette.error.main}`,
    maxWidth: '800px',
}));
