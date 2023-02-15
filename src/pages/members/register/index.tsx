import { useState } from 'react';
import { Box } from '@mui/material';
import { useRouter } from 'next/router';
import { Account } from '@prisma/client';
import { GetServerSideProps } from 'next';
import { styled } from '@mui/material/styles';

import { trpc } from '@/lib/shared/utils/trpc';
import { URL_PATHS } from '@/lib/sitemap';
import { ROLES } from '@/lib/shared/types/roles';
import { AccountsService } from '@/lib/modules/accounts/service';
import { RegisterMember } from '@/lib/modules/registration/features';
import { MemberRegistrationFlow } from '@/lib/modules/registration/components';
import { useRegistrationStorage } from '@/lib/modules/registration/components/MemberRegistrationFlow/hooks';

interface Props {
    hasRegistrationCode: boolean;
    registrationCode?: string;
    account?: Account & {
        createdAt: string;
    };
}

export default function MemberRegistrationPage(props: Props) {
    const { hasRegistrationCode, registrationCode, account } = props;
    const router = useRouter();
    const [registrationError, setRegistrationError] = useState<string>();
    const { clearRegistrationStorage } = useRegistrationStorage();
    const handleError = (errorMessage: string) => {
        setRegistrationError(errorMessage);
    };

    const mutation = trpc.useMutation('accounts.users.register-member', {
        onSuccess(response, { emailAddress }) {
            if (response.wasSuccessful) {
                clearRegistrationStorage();

                router.push(
                    `${
                        URL_PATHS.MEMBERS.REGISTER_SUCCESS
                    }?email=${encodeURIComponent(
                        emailAddress
                    )}&user_id=${encodeURIComponent(response.auth0UserId)}`
                );

                return;
            }
            const [error] = response.errors ?? [];
            handleError(error ?? 'Could not create user.');
        },
        onError(error) {
            setRegistrationError(error.message);
        },
    });

    const registerMember = async function (input: RegisterMember.Input) {
        setRegistrationError(undefined);

        mutation.mutate({
            ...input,
            registrationCode,
        });
    };

    return (
        <PageContainer>
            <InnerContent>
                <MemberRegistrationFlow
                    emailValidationUrl={URL_PATHS.API.ACCOUNTS.IS_EMAIL_UNIQUE}
                    registerMember={registerMember}
                    errorMessage={registrationError}
                    clearErrorMessage={() => setRegistrationError(undefined)}
                    isRegisteringMember={mutation.isLoading}
                    isRegistrationComplete={mutation.isSuccess}
                    role={ROLES.MEMBER}
                    account={account}
                />
            </InnerContent>
        </PageContainer>
    );
}

const PageContainer = styled(Box)(({ theme }) => ({
    backgroundColor: theme.palette.background.default,
    overflowY: 'auto',
    height: '100%',
    width: '100%',
}));

const InnerContent = styled(Box)(({ theme }) => ({
    maxWidth: '1200px',
    width: '100%',
    padding: theme.spacing(12, 4.5),
    margin: '0 auto',
}));

export const getServerSideProps: GetServerSideProps = async (ctx) => {
    const { registrationCode } = ctx.query;
    if (!registrationCode) {
        return {
            redirect: {
                destination: '/waiting-list',
                permanent: false,
            },
        };
    }
    try {
        const { account } = await AccountsService.getAccountByRegistrationCode({
            registrationCode: registrationCode as string,
        });
        if (account) {
            return {
                props: {
                    hasRegistrationCode: true,
                    registrationCode: registrationCode as string,
                    account,
                },
            };
        }
        return {
            props: {
                hasRegistrationCode: false,
            },
        };
    } catch (error) {
        console.error('Member Registration Error:', error);
        return {
            props: {
                hasRegistrationCode: false,
            },
        };
    }
};
