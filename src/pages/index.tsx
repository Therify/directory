import { useEffect, useState } from 'react';
import nookies, { destroyCookie } from 'nookies';
import { TwoColumnGrid } from '@/lib/shared/components/ui/Grids/TwoColumnGrid';
import {
    Caption,
    Button,
    H1,
    CenteredContainer,
} from '@/lib/shared/components/ui';
import Box from '@mui/material/Box';
import { styled, useTheme } from '@mui/material/styles';
import { default as NextImage } from 'next/image';
import { useRouter } from 'next/router';
import { URL_PATHS } from '@/lib/sitemap';
import Link from 'next/link';
import { GetServerSideProps } from 'next';
import { getSession } from '@auth0/nextjs-auth0';
import { AccountsService } from '@/lib/modules/accounts/service';
import { Role } from '@prisma/client';
import { TherifyUser } from '@/lib/shared/types';

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

function handleMemberRouting(user: TherifyUser.TherifyUser): string {
    const adminIstillOnboarding =
        user.roles.includes(Role.account_owner) && !user.plan;
    const isDtcMemberInOnboarding =
        user.roles.includes(Role.member_dtc) && !user.plan;

    if (adminIstillOnboarding)
        return URL_PATHS.ACCOUNT_OWNER.ONBOARDING.BILLING;

    if (isDtcMemberInOnboarding) return URL_PATHS.MEMBERS.ONBOARDING.BILLING;

    if (user.isAccountAdmin && !user.roles.includes(Role.member_dtc)) {
        return URL_PATHS.MEMBERS.ACCOUNT.BILLING_AND_PAYMENTS;
    }
    return URL_PATHS.MEMBERS.CARE;
}

const getUserRedirectPath = (user: TherifyUser.TherifyUser): string => {
    const [role] = user.roles;
    if (user.roles.includes('member')) {
        return handleMemberRouting(user);
    } else if (user.plan === null) {
        return URL_PATHS.PROVIDERS.ONBOARDING.ROOT;
    } else if (user.isPracticeAdmin) {
        return URL_PATHS.PROVIDERS.PRACTICE.PROFILES;
    } else if (role === Role.provider_therapist) {
        return URL_PATHS.PROVIDERS.THERAPIST.PROFILES;
    } else if (role === Role.provider_coach) {
        return URL_PATHS.PROVIDERS.COACH.PROFILES;
    } else {
        return URL_PATHS[404];
    }
};

export const getServerSideProps: GetServerSideProps = async (context) => {
    const session = await getSession(context.req, context.res);
    if (!session) {
        return {
            props: {
                user: null,
            },
        };
    }
    const { user } = await AccountsService.getUserDetailsById({
        userId: session.user.sub,
    });
    if (!user) {
        return {
            props: {
                user: null,
            },
        };
    }
    const cookies = nookies.get(context);
    if (!cookies.userRoles) {
        nookies.set(context, 'userRoles', user.roles.join(','), {
            maxAge: 30 * 24 * 60 * 60,
            path: '/',
        });
    }

    return {
        redirect: {
            destination: getUserRedirectPath(user),
            permanent: false,
        },
    };
};

export default function Home({
    user,
}: {
    user: TherifyUser.TherifyUser | null;
}) {
    const theme = useTheme();
    const router = useRouter();
    const [randomLoginImage, setRandomLoginImage] = useState<string | null>(
        null
    );
    useEffect(() => {
        setRandomLoginImage(
            LOGIN_IMAGES[Math.floor(Math.random() * LOGIN_IMAGES.length)]
        );
    }, []);
    useEffect(() => {
        if (user === null) {
            destroyCookie(null, 'userRoles');
        }
    }, [user]);

    return (
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
                            onClick={() => router.push(URL_PATHS.AUTH.LOGIN)}
                        >
                            Login
                        </Button>

                        <Caption
                            color="info"
                            style={{
                                marginTop: theme.spacing(8),
                            }}
                        >
                            Learn more about{' '}
                            <Link
                                href={URL_PATHS.EXTERNAL.THERIFY_CO.HOME}
                                style={{
                                    color: theme.palette.text.primary,
                                }}
                            >
                                Therify
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
