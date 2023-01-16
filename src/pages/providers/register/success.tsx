import { CheckCircleRounded as CheckIcon } from '@mui/icons-material';
import { Link, Box } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import { ReportProblemRounded } from '@mui/icons-material';
import {
    CelebrationContainer,
    H1,
    Button,
    Paragraph,
    Alert,
    ALERT_TYPE,
    CenteredContainer,
} from '@/components/ui';
import { useRouter } from 'next/router';
import { useEmailVerification } from '@/components/features/registration/ProviderRegistrationFlow/hooks';
import { ReactNode } from 'react';
import { motion } from 'framer-motion';

export default function RegistrationSuccessPage() {
    const theme = useTheme();
    const router = useRouter();
    const { email, user_id } = router.query;
    const {
        getVerificationEmailSentStatus,
        sendVerificationEmail,
        emailStatus,
    } = useEmailVerification(user_id?.toString());
    if (!(email && user_id)) {
        return (
            <CenteredContainer fillSpace>
                <Box width="100%" maxWidth="800px">
                    <ErrorAlert
                        title="Oh no! Something went wrong."
                        message={
                            "Looks like you're missing details in your registration link. Try checking the email you registered with to see if you have login instructions from us. If not, try logging in. If that doesn't work, you can alway try registering again."
                        }
                    />
                </Box>
            </CenteredContainer>
        );
    }

    const errorMessage =
        sendVerificationEmail.error || getVerificationEmailSentStatus.error;
    const isVerificationEmailSent = emailStatus === 'completed';

    const isVerificationEmailLoading =
        sendVerificationEmail.isLoading || emailStatus === 'pending';

    return (
        <CelebrationContainer
            display="flex"
            alignItems="center"
            justifyContent="center"
            height="100%"
            width="100%"
            color={theme.palette.primary.contrastText}
            textAlign="center"
        >
            <Box
                display="flex"
                alignItems="center"
                justifyContent="center"
                flexDirection="column"
                maxWidth="800px"
                style={{
                    padding: theme.spacing(4),
                    borderRadius: theme.shape.borderRadius,
                }}
            >
                <CheckIcon sx={{ fontSize: 100 }} />
                <H1>You did it!</H1>
                <Paragraph>
                    You have successfully registered with Therify! Please check{' '}
                    <b>{email}</b> for instructions on how to verify your
                    account. If you don&apos;t see an email from Therify, check
                    your spam folder. If you still can&apos;t find it, resend
                    your verification email.
                </Paragraph>

                <Box maxWidth="800px" width="100%" display="flex">
                    <Button
                        onClick={() => sendVerificationEmail.send()}
                        isLoading={isVerificationEmailLoading}
                        disabled={isVerificationEmailSent}
                        startIcon={isVerificationEmailSent && <CheckIcon />}
                        style={{
                            flex: 2,
                            backgroundColor: 'transparent',
                            color: theme.palette.primary.contrastText,
                            border: `1px solid ${theme.palette.primary.contrastText}`,
                            marginRight: theme.spacing(2),
                        }}
                    >
                        {isVerificationEmailSent
                            ? 'Verification email sent!'
                            : 'Resend verification email'}
                    </Button>
                    <Button
                        onClick={() => {
                            // TODO: Link to login
                            console.log('TODO: Go to login page');
                        }}
                        style={{
                            flex: 2,
                            backgroundColor: theme.palette.background.paper,
                            color: theme.palette.primary.main,
                            marginLeft: theme.spacing(2),
                        }}
                    >
                        Login
                    </Button>
                </Box>
                <Paragraph style={{ marginTop: theme.spacing(4) }}>
                    If you need support verifying your email, please contact us
                    at{' '}
                    <Link
                        href="mailto:help@therify.co?subject=Email%20Verification%20Support"
                        style={{
                            color: theme.palette.primary.contrastText,
                            textDecoration: 'underline',
                        }}
                    >
                        help@therify.co
                    </Link>
                    .
                </Paragraph>
                {errorMessage && (
                    <motion.div
                        initial={{ opacity: 0, scale: 0.7 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.3 }}
                    >
                        <ErrorAlert title={errorMessage ?? ''} darker />
                    </motion.div>
                )}
            </Box>
        </CelebrationContainer>
    );
}

const ErrorAlert = ({
    darker,
    ...props
}: {
    title: string;
    message?: ReactNode;
    darker?: boolean;
}) => {
    const theme = useTheme();
    return (
        <Alert
            icon={
                <CenteredContainer>
                    <ReportProblemRounded />
                </CenteredContainer>
            }
            type={ALERT_TYPE.ERROR}
            {...props}
            sx={{
                ...(darker && {
                    color: theme.palette.error.contrastText,
                    backgroundColor: theme.palette.error.dark,
                }),
            }}
        />
    );
};
