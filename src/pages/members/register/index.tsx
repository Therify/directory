import { useState } from 'react';
import { useRouter } from 'next/router';
import { Box } from '@mui/material';
import { styled } from '@mui/material/styles';
import { useRegistrationStorage } from '@/components/features/registration/MemberRegistrationFlow/hooks';
import { RegisterMember } from '@/lib/features/registration';
import { MemberRegistrationFlow } from '@/components/features/registration';
import { trpc } from '@/lib/utils/trpc';
import { ROLES } from '@/lib/types/roles';
import { URL_PATHS } from '@/lib/sitemap';

export default function MemberRegistrationPage() {
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

        mutation.mutate(input);
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
