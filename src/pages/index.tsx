import { useEffect, useState } from 'react';
import { TwoColumnGrid } from '@/components/ui/Grids/TwoColumnGrid';
import { Button } from '@/components/ui/Button';
import { Caption, H1, Paragraph, LoadingContainer } from '@/components/ui';
import { CenteredContainer } from '@/components/ui/Layout/Containers/CenteredContainer';
import Box from '@mui/material/Box';
import { styled, useTheme } from '@mui/material/styles';
import { default as NextImage } from 'next/image';
import { useRouter } from 'next/router';
import { useUser } from '@auth0/nextjs-auth0/client';
import { URL_PATHS } from '@/lib/sitemap';
import { trpc } from '@/lib/utils/trpc';
import Link from 'next/link';

const ABSTRACT_SHAPE_URL =
    'https://res.cloudinary.com/dbrkfldqn/image/upload/v1673455675/app.therify.co/shapes/abstract-shape_fbvcil.svg' as const;

const THERIFY_LOGO_URL =
    'https://res.cloudinary.com/dbrkfldqn/image/upload/v1673453089/app.therify.co/logo/therify-logo_wqj1is.png' as const;

const LOGIN_IMAGES = [
    'https://res.cloudinary.com/dbrkfldqn/image/upload/v1673453029/app.therify.co/login/8_jvntyl.jpg',
    'https://res.cloudinary.com/dbrkfldqn/image/upload/v1673453029/app.therify.co/login/10_dj9do6.jpg',
    'https://res.cloudinary.com/dbrkfldqn/image/upload/v1673453029/app.therify.co/login/9_czs8ut.jpg',
    'https://res.cloudinary.com/dbrkfldqn/image/upload/v1673453028/app.therify.co/login/7_rz30ni.jpg',
    'https://res.cloudinary.com/dbrkfldqn/image/upload/v1673453028/app.therify.co/login/6_f9mgxy.jpg',
    'https://res.cloudinary.com/dbrkfldqn/image/upload/v1673453028/app.therify.co/login/4_wfhaze.jpg',
    'https://res.cloudinary.com/dbrkfldqn/image/upload/v1673453028/app.therify.co/login/5_jwipay.jpg',
    'https://res.cloudinary.com/dbrkfldqn/image/upload/v1673453028/app.therify.co/login/2_o6gks0.jpg',
    'https://res.cloudinary.com/dbrkfldqn/image/upload/v1673453028/app.therify.co/login/1_imvq51.jpg',
    'https://res.cloudinary.com/dbrkfldqn/image/upload/v1673453028/app.therify.co/login/3_sssprg.jpg',
] as const;

export default function Home() {
    const theme = useTheme();
    const router = useRouter();
    const { isLoading, user } = useUser();
    const [randomLoginImage, setRandomLoginImage] = useState<string | null>(
        null
    );
    useEffect(() => {
        setRandomLoginImage(
            LOGIN_IMAGES[Math.floor(Math.random() * LOGIN_IMAGES.length)]
        );
    }, []);
    const { data: planStatus } = trpc.useQuery(
        [
            'accounts.users.get-plan-status-by-user-id',
            {
                auth0Id: user?.sub ?? '',
            },
        ],
        {
            refetchOnWindowFocus: false,
            enabled: Boolean(user?.sub),
        }
    );
    if (user) {
        if (planStatus?.status === null) {
            router.push(URL_PATHS.PROVIDERS.ONBOARDING.BILLING);
        }
        return (
            <CenteredContainer fillSpace padding={8}>
                <Paragraph>
                    {JSON.stringify({ planStatus: planStatus?.status })}
                </Paragraph>
                <Paragraph>{JSON.stringify(user)}</Paragraph>
                <Button
                    fullWidth
                    onClick={() => router.push(URL_PATHS.AUTH.LOGOUT)}
                >
                    Logout
                </Button>
            </CenteredContainer>
        );
    }
    return (
        <LoadingContainer isLoading={isLoading}>
            <TwoColumnGrid
                fillSpace
                leftColumnSize={6}
                rightSlot={
                    <CenteredContainer fillSpace>
                        {/*
                        eslint-disable-next-line jsx-a11y/alt-text
                        */}
                        <Image fillSpace imageUrl={randomLoginImage} />
                    </CenteredContainer>
                }
                rightSlotSx={{
                    [theme.breakpoints.down('md')]: {
                        display: 'none',
                    },
                }}
                leftSlot={
                    <LoginContainer fillSpace>
                        <Box maxWidth={480}>
                            <TherifyLogo
                                alt="The Official logo of Therify Inc."
                                src={THERIFY_LOGO_URL}
                                data-cy="logo"
                                width={279}
                                height={96}
                            />
                            <Header>
                                The new standard for inclusive mental healthcare
                            </Header>

                            <Button
                                fullWidth
                                onClick={() =>
                                    router.push(URL_PATHS.AUTH.LOGIN)
                                }
                            >
                                Login
                            </Button>

                            <Caption
                                color="info"
                                style={{
                                    marginTop: theme.spacing(8),
                                }}
                            >
                                Dont have an account? <br />
                                <Link href="/members/register">
                                    Register to Find a Provider
                                </Link>
                                <br />
                                <Link href="/providers/therapist/register">
                                    Register as a Therapist
                                </Link>
                                <br />
                                <Link href="/providers/coach/register">
                                    Register as a Coach
                                </Link>
                            </Caption>
                        </Box>
                        <AbstractShape
                            height={260}
                            width={260}
                            alt="Abstract shape"
                            src={ABSTRACT_SHAPE_URL}
                        />
                    </LoginContainer>
                }
            />
        </LoadingContainer>
    );
}

const Header = styled(H1)(({ theme }) => ({
    ...theme.typography.h2,
    marginBottom: theme.spacing(10),
}));

const TherifyLogo = styled(NextImage)(({ theme }) => ({
    width: '152px',
    marginBottom: theme.spacing(10),
}));

const LoginContainer = styled(CenteredContainer)(({ theme }) => ({
    position: 'relative',
    background: theme.palette.background.default,
    padding: theme.spacing(4),
    overflow: 'hidden',
}));

const Image = styled(CenteredContainer, {
    shouldForwardProp: (prop) => prop !== 'imageUrl',
})<{ imageUrl: string | null }>(({ imageUrl }) => ({
    backgroundImage: imageUrl ? `url(${imageUrl})` : undefined,
    backgroundRepeat: 'no-repeat',
    backgroundPosition: 'center',
    backgroundSize: 'cover',
}));

const AbstractShape = styled(NextImage)(({ theme }) => ({
    position: 'absolute',
    transform: 'rotate(90deg)',
    top: -100,
    right: -100,
    [theme.breakpoints.up('md')]: {
        transform: 'rotate(0deg)',
        right: undefined,
        left: -100,
    },
}));
