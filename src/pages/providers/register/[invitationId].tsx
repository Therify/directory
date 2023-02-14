import { useState } from 'react';
import { useRouter } from 'next/router';
import { Box } from '@mui/material';
import { styled } from '@mui/material/styles';
import { useRegistrationStorage } from '@/lib/modules/registration/components/ProviderRegistrationFlow/hooks';
import {
    RegisterProvider,
    RegisterProviderWithInvitation,
} from '@/lib/modules/registration/features';
import { ProviderRegistrationFlow } from '@/lib/modules/registration/components';
import { trpc } from '@/lib/shared/utils/trpc';
import { ROLES } from '@/lib/shared/types/roles';
import { URL_PATHS } from '@/lib/sitemap';
import { ProvidersService } from '@/lib/modules/providers/service';
import { ProviderInvitationRegistrationPageProps } from '@/lib/modules/providers/service/page-props/get-provider-invitation-registration-page-props';
import { isAfter } from 'date-fns';

export const getServerSideProps =
    ProvidersService.pageProps.getProviderInvitationRegistrationPageProps;

export default function ProviderInvitationRegistrationPage({
    invitationId,
    practice,
    profile,
    recipientEmail,
    invitationExpirationDate,
}: ProviderInvitationRegistrationPageProps) {
    const router = useRouter();
    const [registrationError, setRegistrationError] = useState<string>();
    const { clearRegistrationStorage } = useRegistrationStorage();
    const handleError = (errorMessage: string) => {
        setRegistrationError(errorMessage);
    };

    const mutation = trpc.useMutation(
        `accounts.${RegisterProviderWithInvitation.TRPC_ROUTE}`,
        {
            onSuccess(response, { emailAddress }) {
                if (response.wasSuccessful) {
                    clearRegistrationStorage();

                    router.push(
                        `${
                            URL_PATHS.PROVIDERS.COACH.REGISTER_SUCCESS
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
        }
    );

    const registerProvider = async function (input: RegisterProvider.Input) {
        setRegistrationError(undefined);
        if (!invitationId || !profile?.designation)
            throw new Error('Missing invitationId or profile designation');
        const withInvitationInput: RegisterProviderWithInvitation.Input = {
            ...input,
            invitationId,
            // TODO: GET ROLE ON SSP
            // role: profile?.designation,
        };
        mutation.mutate(withInvitationInput);
    };

    const isExpired =
        invitationExpirationDate &&
        isAfter(new Date(), new Date(invitationExpirationDate));
    const isAllDataFound =
        !!invitationId && !!practice && !!profile && !!recipientEmail;
    if (isExpired) {
        return <div>TODO: Create expired message</div>;
    }

    if (!isAllDataFound) {
        return <div>TODO: Create error message</div>;
    }

    return (
        <PageContainer>
            <InnerContent>
                <ProviderRegistrationFlow
                    formTitle={<>Join {practice?.name} at Therify</>}
                    emailValidationUrl={URL_PATHS.API.ACCOUNTS.IS_EMAIL_UNIQUE}
                    registerProvider={registerProvider}
                    errorMessage={registrationError}
                    clearErrorMessage={() => setRegistrationError(undefined)}
                    isRegisteringProvider={mutation.isLoading}
                    isRegistrationComplete={mutation.isSuccess}
                    role={ROLES.PROVIDER_COACH}
                    isEmailReadOnly
                    defaultUserValues={{
                        emailAddress: recipientEmail,
                        givenName: profile.givenName,
                        surname: profile.surname,
                    }}
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
