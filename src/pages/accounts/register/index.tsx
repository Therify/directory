import { useState } from 'react';
import { Box } from '@mui/material';
import { useRouter } from 'next/router';
import { styled } from '@mui/material/styles';

import { trpc } from '@/lib/shared/utils/trpc';
import { URL_PATHS } from '@/lib/sitemap';
import { ROLES } from '@/lib/shared/types/roles';
import { RegisterAccountOwner } from '@/lib/modules/registration/features';
import { useRegistrationStorage } from '@/lib/modules/registration/components/AccountOwnerRegistrationFlow/hooks';
import { AccountOwnerRegistrationFlow } from '@/lib/modules/registration/components/AccountOwnerRegistrationFlow';

export default function AccountOwnerRegistrationPage() {
    const router = useRouter();
    const [registrationError, setRegistrationError] = useState<string>();
    const [isRegistrationComplete, setIsRegistrationComplete] = useState(false);
    const { clearRegistrationStorage } = useRegistrationStorage();
    const handleError = (errorMessage: string) => {
        setRegistrationError(errorMessage);
    };

    const mutation = trpc.useMutation('accounts.users.register-account-owner', {
        onSuccess(response, { emailAddress }) {
            if (response.wasSuccessful) {
                clearRegistrationStorage();
                setIsRegistrationComplete(true);
                router.push(
                    `${
                        URL_PATHS.MEMBERS.REGISTER_SUCCESS
                    }?email=${encodeURIComponent(
                        emailAddress
                    )}&user_id=${encodeURIComponent(response.auth0UserId)}`
                );

                return;
            }
            setIsRegistrationComplete(false);
            const [error] = response.errors ?? [];
            handleError(error ?? 'Could not create user.');
        },
        onError(error) {
            setIsRegistrationComplete(false);
            setRegistrationError(error.message);
        },
    });

    const registerAccountOwner = async function (
        input: RegisterAccountOwner.Input
    ) {
        setRegistrationError(undefined);

        mutation.mutate({
            ...input,
        });
    };

    return (
        <PageContainer>
            <InnerContent>
                <AccountOwnerRegistrationFlow
                    emailValidationUrl={URL_PATHS.API.ACCOUNTS.IS_EMAIL_UNIQUE}
                    registerAccountOwner={registerAccountOwner}
                    errorMessage={registrationError}
                    clearErrorMessage={() => setRegistrationError(undefined)}
                    isRegisteringAccountOwner={mutation.isLoading}
                    isRegistrationComplete={isRegistrationComplete}
                    role={ROLES.ACCOUNT_OWNER}
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
