import { Button } from '@/lib/shared/components/ui';
import { ConnectionRequest } from '@/lib/shared/types';
import { ConnectionStatus } from '@prisma/client';

export const ActionButtons = ({
    connectionRequest,
    onAccept,
    onDecline,
    onView,
}: {
    connectionRequest: ConnectionRequest.Type;
    onAccept: () => void;
    onDecline: () => void;
    onView?: () => void;
}) => {
    const isPending =
        connectionRequest.connectionStatus === ConnectionStatus.pending;
    const isAccepted =
        connectionRequest.connectionStatus === ConnectionStatus.accepted;
    return (
        <>
            {isPending && (
                <>
                    <Button
                        size="small"
                        onClick={onAccept}
                        sx={{ marginRight: 2 }}
                    >
                        Accept
                    </Button>
                    <Button
                        size="small"
                        type="outlined"
                        color="info"
                        onClick={onDecline}
                    >
                        Decline
                    </Button>
                </>
            )}
            {isAccepted && (
                <Button
                    size="small"
                    color="info"
                    type="outlined"
                    onClick={onView}
                >
                    Member Summary
                </Button>
            )}
        </>
    );
};
