import { trpc } from '@/lib/shared/utils/trpc';
import { useEffect, useState, useRef } from 'react';

export const useEmailVerification = (auth0UserId?: string) => {
    const [emailStatus, setEmailStatus] = useState<string | null>(null);
    const [jobId, setJobId] = useState<string | null>(null);
    const [sendEmailErrorMessage, setSendEmailErrorMessage] = useState<
        string | undefined
    >();
    const pollingRef = useRef<number | null>(null);

    const {
        mutate: sendEmailVerification,
        isLoading: isLoadingSendEmailVerification,
    } = trpc.useMutation('accounts.users.send-email-verification', {
        onSuccess: ({ status, jobId, errors }) => {
            const [errorMessage] = errors;
            setSendEmailErrorMessage(errorMessage);
            setEmailStatus(status);
            setJobId(jobId);
        },
        onError: (error) => {
            if (error instanceof Error) {
                return setSendEmailErrorMessage(error.message);
            }
            setSendEmailErrorMessage('There was an error sending the email.');
        },
    });

    const {
        data: getVerificationEmailSentStatus,
        isLoading: isLoadingGetVerificationEmailSentStatus,
        error: getVerificationEmailSentStatusError,
        refetch,
    } = trpc.useQuery(
        [
            'accounts.users.get-verification-email-status',
            {
                jobId: jobId ?? '',
            },
        ],
        {
            refetchOnWindowFocus: false,
            enabled: Boolean(jobId),
        }
    );

    useEffect(() => {
        if (jobId) {
            if (emailStatus === 'completed') {
                return window.clearInterval(pollingRef.current ?? undefined);
            }
            window.clearInterval(pollingRef.current ?? undefined);
            pollingRef.current = window.setInterval(() => {
                refetch();
            }, 2000);
        }
    }, [jobId, emailStatus, pollingRef, refetch]);

    useEffect(() => {
        if (getVerificationEmailSentStatus?.status) {
            setEmailStatus(getVerificationEmailSentStatus?.status);
        }
    }, [getVerificationEmailSentStatus?.status]);

    return {
        emailStatus,
        getVerificationEmailSentStatus: {
            status: getVerificationEmailSentStatus?.status,
            isLoading: isLoadingGetVerificationEmailSentStatus,
            error: getVerificationEmailSentStatusError?.message,
            getStatus: refetch,
        },
        sendVerificationEmail: {
            send: () => {
                if (!auth0UserId) {
                    return setSendEmailErrorMessage('User Id is required.');
                }
                setSendEmailErrorMessage(undefined);
                return sendEmailVerification({ auth0UserId });
            },
            isLoading: isLoadingSendEmailVerification,
            error: sendEmailErrorMessage,
            jobId,
        },
    };
};
