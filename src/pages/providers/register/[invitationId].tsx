import { useState } from 'react';
import { isAfter } from 'date-fns';
import { useRouter } from 'next/router';
import { Box } from '@mui/material';
import { styled, useTheme } from '@mui/material/styles';
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
import { ProviderRegisterWithInvitationPageProps } from '@/lib/modules/providers/service/page-props/get-provider-register-with-invitation-page-props';
import {
    CenteredContainer,
    Alert,
    H1,
    Paragraph,
    Caption,
} from '@/lib/shared/components/ui';
import { ReportProblemRounded } from '@mui/icons-material';
import { InvitationStatus } from '@prisma/client';

export const getServerSideProps =
    ProvidersService.pageProps.register.withInvitationPageProps;

export default function ProviderInvitationRegistrationPage({
    invitationId,
    practice,
    profile,
    recipientEmail,
    invitationExpirationDate,
    invitationStatus,
    role,
}: ProviderRegisterWithInvitationPageProps) {
    console.log({
        invitationId,
        practice,
        profile,
        recipientEmail,
        invitationExpirationDate,
        invitationStatus,
        role,
    });
    const router = useRouter();
    const theme = useTheme();
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
        if (!invitationId || !profile || !role)
            throw new Error('Missing invitationId or profile designation');

        mutation.mutate({ ...input, invitationId, role });
    };
    const isEligibleStatus = invitationStatus === InvitationStatus.pending;
    const isExpired =
        invitationStatus === InvitationStatus.expired ||
        (invitationExpirationDate &&
            isAfter(new Date(), new Date(invitationExpirationDate)));
    const isAllDataFound =
        !!invitationId &&
        !!practice &&
        !!profile &&
        !!recipientEmail &&
        !!role &&
        !!invitationStatus;
    const isError = !isEligibleStatus || isExpired || !isAllDataFound;

    const expiredMessage = 'This invitation has expired.';
    const missingDataMessage = (
        <>
            This invitation is invalid. This could be because the invitation has
            been revoked, previously claimed, or is missing important details.
        </>
    );
    const statusMessage = getStatusErrorMessage(invitationStatus);
    const errorText = isExpired
        ? expiredMessage
        : statusMessage ?? missingDataMessage;

    return (
        <PageContainer>
            <InnerContent>
                {isError && (
                    <CenteredContainer
                        fillSpace
                        sx={{ maxWidth: '650px', margin: 'auto' }}
                    >
                        <Alert
                            icon={
                                <CenteredContainer width="50px">
                                    <ReportProblemRounded />
                                </CenteredContainer>
                            }
                            type="error"
                            title="Oh no! There's a problem."
                            message={errorText}
                            sx={{ width: '100%' }}
                        />
                        <Caption
                            marginTop={4}
                            style={{ color: theme.palette.text.secondary }}
                        >
                            Is this is a mistake, please reach out to your
                            practice admin or contact Therify support.
                        </Caption>
                    </CenteredContainer>
                )}
                {!isError && (
                    <ProviderRegistrationFlow
                        formTitle={<FormTitle practiceName={practice.name} />}
                        emailValidationUrl={
                            URL_PATHS.API.ACCOUNTS.IS_EMAIL_UNIQUE
                        }
                        registerProvider={registerProvider}
                        errorMessage={registrationError}
                        clearErrorMessage={() =>
                            setRegistrationError(undefined)
                        }
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
                )}
            </InnerContent>
        </PageContainer>
    );
}
const getStatusErrorMessage = (invitationStatus: InvitationStatus | null) => {
    switch (invitationStatus) {
        case InvitationStatus.expired:
            return 'This invitation has expired.';
        case InvitationStatus.declined:
            return 'This invitation has been declined.';
        case InvitationStatus.accepted:
            return 'This invitation has already been redeemed.';
        default:
            return undefined;
    }
};

const FormTitle = ({ practiceName }: { practiceName: string }) => {
    return (
        <>
            <H1>Welcome!</H1>
            <Paragraph size="large">
                You are moments away from joining{' '}
                <b>{practiceName} at Therify</b>.
            </Paragraph>
        </>
    );
};
const PageContainer = styled(Box)(({ theme }) => ({
    backgroundColor: theme.palette.background.default,
    overflowY: 'auto',
    height: '100%',
    width: '100%',
}));

const InnerContent = styled(Box)(({ theme }) => ({
    maxWidth: '1200px',
    minHeight: '100%',
    width: '100%',
    padding: theme.spacing(12, 4.5),
    margin: '0 auto',
}));
