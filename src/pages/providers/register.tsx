import { useState } from 'react';
import { Box } from '@mui/material';
import { styled } from '@mui/material/styles';
import { useRegistrationStorage } from '@/components/features/registration/ProviderRegistrationFlow/hooks';
import { RegisterProvider } from '@/lib/features/registration';
import { ProviderRegistrationFlow } from '@/components/features/registration';
import { trpc } from '@/lib/utils/trpc';
import { GetServerSideProps, NextPage } from 'next';

export const getServerSideProps: GetServerSideProps<Props> = async (
    context
) => ({ props: { host: context.req.headers.host || null } });

type Props = { host: string | null };

export default function ProviderRegistrationPage({ host }: Props) {
    const [registrationError, setRegistrationError] = useState<string>();
    const { clearRegistrationStorage } = useRegistrationStorage();
    const handleError = (errorMessage: string) => {
        setRegistrationError(errorMessage);
    };

    const mutation = trpc.useMutation('accounts.users.register-provider', {
        onSuccess(response) {
            if (response.wasSuccessful) {
                clearRegistrationStorage();
                window.location.href = response.checkoutSessionUrl;
                return;
            }
            const [error] = response.errors ?? [];
            handleError(error ?? 'Could not create user.');
        },
        onError(error) {
            setRegistrationError(error.message);
        },
    });

    const registerProvider = async function (input: RegisterProvider.Input) {
        setRegistrationError(undefined);

        mutation.mutate(input);
    };

    return (
        <PageContainer>
            <InnerContent>
                <ProviderRegistrationFlow
                    emailValidationUrl="/api/accounts/is-email-unique"
                    registerProvider={registerProvider}
                    errorMessage={registrationError}
                    clearErrorMessage={() => setRegistrationError(undefined)}
                    isRegisteringProvider={mutation.isLoading}
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
