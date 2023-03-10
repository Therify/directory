import { Alert, CenteredContainer } from '@/lib/shared/components/ui';
import { WarningRounded } from '@mui/icons-material';
import { format } from 'date-fns';

export const PlanAlert = ({
    endDate,
    message,
    showExpiredMessage,
}: {
    endDate?: string;
    showExpiredMessage: boolean;
    message: string;
}) => {
    const expiredTitle = `Your plan expired${
        endDate ? ` on ${format(new Date(endDate), 'MMMM do, yyyy')}` : ''
    }.`;
    const title = showExpiredMessage
        ? expiredTitle
        : 'Your plan is not active.';
    return (
        <Alert
            icon={
                <CenteredContainer marginRight={2}>
                    <WarningRounded />
                </CenteredContainer>
            }
            title={title}
            type="error"
            message={message}
        />
    );
};
