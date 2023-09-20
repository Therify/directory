import { Box, CircularProgress } from '@mui/material';
import { styled } from '@mui/material/styles';
import {
    CenteredContainer,
    TherifyLogo,
    H3,
    Paragraph,
    FormRenderer,
} from '@/lib/shared/components/ui';
import { ROLES } from '@/lib/shared/types/roles';
import { useRegistrationStorage } from './hooks';
import { Account } from '@prisma/client';
import Typography from '@mui/material/Typography';
import Link from 'next/link';
import { RegisterMember } from '../../../features/v3';
import { memberRegistrationFormConfig } from './registrationFormConfig';

interface MemberRegistrationFormProps {
    registerMember: (data: RegisterMember.Input) => void;
    errorMessage?: string;
    clearErrorMessage: () => void;
    isRegisteringMember: boolean;
    isRegistrationComplete: boolean;
    role: typeof ROLES.MEMBER;
    account?: Account;
    hasSeatsAvailable?: boolean;
}

export const MemberRegistrationForm = ({
    registerMember,
    errorMessage,
    isRegisteringMember,
    isRegistrationComplete,
    clearErrorMessage,
    role,
    account,
    hasSeatsAvailable = false,
}: MemberRegistrationFormProps) => {
    const { getStoredMemberDetails, storeMemberDetails } =
        useRegistrationStorage();
    const storedDefaults = getStoredMemberDetails();
    const isRegistrationSuccessful = isRegistrationComplete && !errorMessage;
    const isRegistering = isRegisteringMember || isRegistrationSuccessful;
    const handleSubmit = (data: RegisterMember.Input) => {
        storeMemberDetails(data);
        return registerMember(data);
    };

    if (!hasSeatsAvailable) {
        return (
            <FormBackgroundContainer>
                <HeaderContainer>
                    <Logo />
                </HeaderContainer>
                <FormContainer>
                    <CenteredContainer>
                        <H3>
                            Sorry,{' '}
                            <Typography
                                color="primary"
                                typography={'h3'}
                                sx={{ fontWeight: 700, display: 'inline' }}
                            >
                                {account?.name ?? 'the account provided'}
                            </Typography>{' '}
                            is currently at capacity.
                        </H3>
                        <Paragraph>
                            If you believe this is an error, please contact{' '}
                            <Link href="mailto:help@therify.co">
                                help@therify.co
                            </Link>{' '}
                            for assistance.
                        </Paragraph>
                    </CenteredContainer>
                </FormContainer>
            </FormBackgroundContainer>
        );
    }

    return (
        <FormBackgroundContainer>
            <HeaderContainer>
                <Logo />
            </HeaderContainer>
            {isRegistering ? (
                <FormContainer>
                    <CenteredContainer>
                        <H3>Creating your account...</H3>
                        <CircularProgress />
                    </CenteredContainer>
                </FormContainer>
            ) : (
                <Box width="100%">
                    <FormRenderer
                        defaultValues={{
                            user: {
                                ...storedDefaults?.user,
                                role,
                            },
                            profile: {
                                ...storedDefaults?.profile,
                            },
                        }}
                        errorMessage={errorMessage}
                        validationSchema={RegisterMember.inputSchema}
                        config={memberRegistrationFormConfig}
                        onSubmit={handleSubmit}
                        clearErrorMessage={clearErrorMessage}
                    />
                </Box>
            )}
        </FormBackgroundContainer>
    );
};
const FormBackgroundContainer = styled(Box)(({ theme }) => ({
    width: '100%',
    height: '100%',
    background: theme.palette.background.default,
    padding: theme.spacing(4),
}));
const HeaderContainer = styled(Box)(({ theme }) => ({
    display: 'flex',
    justifyContent: 'center',
    margin: theme.spacing(4, 0),
}));

const Logo = styled(TherifyLogo)(({ theme }) => ({
    height: '52px',
    marginBottom: theme.spacing(4),
    alignSelf: 'center',
}));

const FormContainer = styled(Box)(({ theme }) => ({
    width: '100%',
    minHeight: '300px',
    borderRadius: theme.shape.borderRadius,
    backgroundColor: theme.palette.background.paper,
    padding: theme.spacing(6.5, 8),
    marginTop: theme.spacing(10),
    [theme.breakpoints.up('md')]: {
        padding: theme.spacing(30),
    },
}));
