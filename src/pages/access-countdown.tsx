import { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';
import { Box } from '@mui/material';
import { styled } from '@mui/material/styles';
import { format } from 'date-fns';
import { useTheme } from '@mui/material/styles';
import { useRouter } from 'next/router';
import {
    Paragraph,
    H1,
    Caption,
    CenteredContainer,
    AbstractShape1,
    TherifyIcon,
} from '@/lib/shared/components/ui';
import { withPageAuthRequired } from '@auth0/nextjs-auth0';
import { membersService } from '@/lib/modules/members/service';
import { RBAC } from '@/lib/shared/utils';
import { MemberTherifyUserPageProps } from '@/lib/modules/members/service/get-therify-user-props';
import { MemberNavigationPage } from '@/lib/shared/components/features/pages';
import { URL_PATHS } from '@/lib/sitemap';

export const getServerSideProps = RBAC.requireMemberAuth(
    withPageAuthRequired({
        getServerSideProps: membersService.getTherifyUserPageProps,
    })
);
export default function AccessCountdownPage({
    user,
}: MemberTherifyUserPageProps) {
    const theme = useTheme();
    const router = useRouter();
    const [countdown, setCountdown] = useState('');
    const countdownRef = useRef<number>();
    const isCountDownComplete = countdown === '00:00:00';

    useEffect(() => {
        if (user?.plan?.startDate) {
            const getTimeRemaining = () => {
                if (!user?.plan?.startDate) return;
                const startDate = new Date(user.plan.startDate);
                const now = new Date();
                const diff = startDate.getTime() - now.getTime();
                return {
                    days: Math.floor(diff / (1000 * 60 * 60 * 24)),
                    hours: Math.floor((diff / (1000 * 60 * 60)) % 24),
                    minutes: Math.floor((diff / 1000 / 60) % 60),
                    seconds: Math.floor((diff / 1000) % 60),
                };
            };
            countdownRef.current = window.setInterval(() => {
                const { days, hours, minutes, seconds } =
                    getTimeRemaining() ?? {};

                setCountdown(
                    [
                        ...(days === undefined || days > 0
                            ? [withLeadingZero(days)]
                            : []),
                        withLeadingZero(hours),
                        withLeadingZero(minutes),
                        withLeadingZero(seconds),
                    ].join(':')
                );
                if (
                    [days, hours, minutes, seconds].every(
                        (time) => time !== undefined && time <= 0
                    )
                ) {
                    window.clearInterval(countdownRef.current);
                    router.push(URL_PATHS.ROOT);
                }
            }, 1000);
        }
        return () => {
            if (countdownRef.current) {
                window.clearInterval(countdownRef.current);
            }
        };
    }, [router, user?.plan?.startDate]);

    return (
        <MemberNavigationPage
            currentPath={URL_PATHS.MEMBERS.ACCOUNT.EXPIRED_PLAN}
            user={user}
        >
            <CenteredContainer
                fillSpace
                style={{ background: theme.palette.background.default }}
            >
                <Container>
                    <CenteredContainer zIndex={2}>
                        <motion.div
                            animate={
                                isCountDownComplete
                                    ? {
                                          rotate: [0, 360, 360],
                                          scale: [1, 1.3, 1],
                                      }
                                    : undefined
                            }
                            transition={{
                                duration: 1,
                                ease: 'easeInOut',
                                repeat: Infinity,
                                repeatDelay: 0.5,
                            }}
                            style={{ marginBottom: theme.spacing(4) }}
                        >
                            <TherifyIcon width="50px" />
                        </motion.div>
                        {isCountDownComplete && (
                            <Title>Welcome to Therify</Title>
                        )}
                        {!isCountDownComplete && (
                            <Title>Your access to Therify starts soon!</Title>
                        )}
                        {user?.plan?.startDate && (
                            <>
                                <Paragraph>
                                    Your plan with Therify starts on{' '}
                                    {format(
                                        new Date(user.plan.startDate),
                                        'MMMM do, yyyy'
                                    )}{' '}
                                    at{' '}
                                    {format(
                                        new Date(user.plan.startDate),
                                        'h:mm a'
                                    )}
                                    .
                                </Paragraph>
                                <CountDown>{countdown}</CountDown>
                            </>
                        )}
                        <Caption secondary>
                            Please contact your account administrator within
                            your organization for further information about
                            accessing our services.
                        </Caption>
                    </CenteredContainer>
                    <Shape />
                </Container>
            </CenteredContainer>
        </MemberNavigationPage>
    );
}
const Title = styled(H1)(({ theme }) => ({
    ...theme.typography.h2,
}));

const Container = styled(Box)(({ theme }) => ({
    background: theme.palette.background.paper,
    borderRadius: theme.shape.borderRadius,
    padding: theme.spacing(10),
    maxWidth: '800px',
    textAlign: 'center',
    position: 'relative',
    overflow: 'hidden',
}));

const Shape = styled(AbstractShape1)(({ theme }) => ({
    position: 'absolute',
    width: '250px',
    top: -100,
    right: -100,
    transform: 'rotate(-90deg)',
    zIndex: 1,
}));

const CountDown = styled(Paragraph)(({ theme }) => ({
    fontSize: theme.typography.h1.fontSize,
    fontWeight: 'bold',
    margin: theme.spacing(6, 0),
}));

const withLeadingZero = (num?: number) => {
    if (num === undefined || num < 0) return '00';
    return num.toString().padStart(2, '0');
};
