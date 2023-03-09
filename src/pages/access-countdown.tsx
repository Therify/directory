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
    Button,
} from '@/lib/shared/components/ui';
import { GetServerSideProps } from 'next';
import { getSession } from '@auth0/nextjs-auth0';
import { AccountsService } from '@/lib/modules/accounts/service';
import { URL_PATHS } from '@/lib/sitemap';
import { TherifyUser } from '@/lib/shared/types';

export const getServerSideProps: GetServerSideProps = async (context) => {
    const session = await getSession(context.req, context.res);
    if (!session) {
        return {
            props: {
                redirect: {
                    destination: URL_PATHS.AUTH.LOGIN,
                    permanent: false,
                },
            },
        };
    }
    const { user } = await AccountsService.getUserDetailsById({
        userId: session.user.sub,
    });

    if (!user) {
        return {
            props: {
                redirect: {
                    destination: URL_PATHS.AUTH.LOGIN,
                    permanent: false,
                },
            },
        };
    }

    return {
        props: JSON.parse(
            JSON.stringify({
                user,
            })
        ),
    };
};
export default function AccessCountdownPage({
    user,
}: {
    user: TherifyUser.TherifyUser;
}) {
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
                    {isCountDownComplete && <Title>Welcome to Therify</Title>}
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
                        Please contact your account administrator within your
                        organization for further information about accessing our
                        services.
                    </Caption>
                </CenteredContainer>
                <Shape />
            </Container>
            <Button
                type="text"
                color="info"
                onClick={() => router.push(URL_PATHS.AUTH.LOGOUT)}
                style={{ marginTop: theme.spacing(4) }}
            >
                Logout
            </Button>
        </CenteredContainer>
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
