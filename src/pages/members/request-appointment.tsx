import { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';
import { Box } from '@mui/material';
import { styled } from '@mui/material/styles';
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

    return (
        <CenteredContainer
            fillSpace
            style={{ background: theme.palette.background.default }}
        >
            <Container>
                <CenteredContainer zIndex={2}>
                    <Title>Please contact our care team.</Title>
                    <Caption secondary>
                        Click the button below and complete a consultation
                        request form. If you believe you have an emergency, do
                        not wait, please call 911.
                    </Caption>
                    <Button
                        onClick={() =>
                            router.push(
                                `${URL_PATHS.EXTERNAL.JOTFORM.REQUEST_APPOINTMENT}?email=${user.emailAddress}`
                            )
                        }
                    >
                        Follow this link to request an appointment.
                    </Button>
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
    zIndex: 0,
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
