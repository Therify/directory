import { useState } from 'react';
import { useRouter } from 'next/router';
import { Box } from '@mui/material';
import { styled } from '@mui/material/styles';
import { HandlePracticeOnboarding } from '@/lib/features/onboarding';
import { trpc } from '@/lib/utils/trpc';

export default function PracticeOnboardingPage() {
    const router = useRouter();
    const [errorMessage, setErrorMessage] = useState<string>();

    const mutation = trpc.useMutation(
        'accounts.onboarding.handle-practice-onboarding',
        {
            onSuccess(response) {
                const parseResult =
                    HandlePracticeOnboarding.outputSuccessSchema.safeParse(
                        response
                    );
                if (parseResult.success) {
                    window.location.href = parseResult.data.checkoutSessionUrl;
                    return;
                }
                const [error] = response.errors;
                if (error) {
                    setErrorMessage(error);
                    return;
                }
            },
            onError(error) {
                setErrorMessage(error.message);
            },
        }
    );

    const handlePracticeOnboarding = async function (
        input: HandlePracticeOnboarding.Input
    ) {
        setErrorMessage(undefined);

        mutation.mutate(input);
    };

    return (
        <PageContainer>
            <InnerContent>Billing</InnerContent>
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
