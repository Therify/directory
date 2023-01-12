import { useState } from 'react';
import { useRegistrationStorage } from '@/components/features/registration/ProviderRegistrationFlow/hooks';
import { RegisterProvider } from '@/lib/features/registration';
import { ProviderRegistrationFlow } from '@/components/features/registration';
import { Box, styled } from '@mui/material';
import { trpc } from '@/lib/utils/trpc';

export default function ProviderRegistrationPage() {
    const priceId = 'price_1MOmC0Allox7wzg5rapKGwqU';
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

    const registerProvider = async function (input: {
        providerDetails: RegisterProvider.Input['providerDetails'];
        numberOfSeats: RegisterProvider.Input['numberOfSeats'];
    }) {
        setRegistrationError(undefined);

        mutation.mutate({ ...input, priceId });
    };

    return (
        <PageContainer>
            <InnerContent>
                <ProviderRegistrationFlow
                    emailValidationUrl={`${window.location.origin}/api/accounts/is-email-unique`}
                    registerProvider={registerProvider}
                    errorMessage={registrationError}
                    clearErrorMessage={() => setRegistrationError(undefined)}
                    isRegisteringProvider={mutation.isLoading}
                    baseSeatPrice={42}
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
